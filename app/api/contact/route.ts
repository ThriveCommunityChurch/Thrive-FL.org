import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "thrive-fl.org";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@thrive-fl.org";
// Prayer requests should always route to this address unless overridden later
const PRAYER_EMAIL = "prayers@thrive-fl.org";

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

// Supported contact types for building email templates. These cover
// the main flows across the site (contact, care, baptism, serving, etc.).
type ContactType =
  | "contact.general"
  | "contact.visit"
  | "contact.prayer"
  | "contact.volunteer"
  | "contact.pastoral"
  | "contact.other"
  | "care.prayer"
  | "care.pastoral"
  | "baptism"
  | "serve"
  | "smallGroups"
  | "kids"
  | "college";

interface BaseSubmissionData {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string; // legacy field from original ContactForm
  message?: string;
  [key: string]: unknown;
}

interface EmailTemplateResult {
  to: string;
  subject: string;
  text: string;
}

/**
 * Sanitize user input to prevent injection attacks.
 * - Removes control characters (except basic whitespace)
 * - Strips newlines/carriage returns (prevents header injection)
 * - Trims excessive whitespace
 * - Limits length to prevent abuse
 */
function sanitizeInput(
  value: unknown,
  maxLength: number = 1000,
  allowNewlines: boolean = false
): string {
  if (typeof value !== "string") {
    return "";
  }

  let sanitized = value;

  // Remove null bytes and other dangerous control characters (keep tabs for allowNewlines case)
  // eslint-disable-next-line no-control-regex
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  if (!allowNewlines) {
    // Strip newlines and carriage returns to prevent header injection
    sanitized = sanitized.replace(/[\r\n]/g, " ");
  } else {
    // Normalize line endings to \n and limit consecutive newlines
    sanitized = sanitized.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    sanitized = sanitized.replace(/\n{3,}/g, "\n\n");
  }

  // Collapse multiple spaces into one (but preserve intentional newlines if allowed)
  if (!allowNewlines) {
    sanitized = sanitized.replace(/\s+/g, " ");
  } else {
    // Only collapse horizontal whitespace, preserve newlines
    sanitized = sanitized.replace(/[^\S\n]+/g, " ");
  }

  // Trim and limit length
  sanitized = sanitized.trim().slice(0, maxLength);

  return sanitized;
}

/**
 * Validate and sanitize an email address.
 * Returns empty string if invalid.
 */
function sanitizeEmail(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  const sanitized = sanitizeInput(value, 254, false);

  // Basic email format check - must have @ and no dangerous characters
  // This is intentionally simple; the real validation happens on send
  const emailRegex = /^[^\s@<>()[\]\\,;:]+@[^\s@<>()[\]\\,;:]+\.[^\s@<>()[\]\\,;:]+$/;

  if (!emailRegex.test(sanitized)) {
    return "";
  }

  return sanitized.toLowerCase();
}

/**
 * Sanitize a phone number - allow only digits, spaces, dashes, parens, and +
 */
function sanitizePhone(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  // Keep only phone-safe characters
  const sanitized = value.replace(/[^\d\s\-+().]/g, "").trim();

  return sanitized.slice(0, 30);
}

function normalizeContactType(subjectValue: string | undefined): ContactType {
  switch (subjectValue) {
    case "visit":
      return "contact.visit";
    case "prayer":
      return "contact.prayer";
    case "volunteer":
      return "contact.volunteer";
    case "pastoral":
      return "contact.pastoral";
    case "other":
      return "contact.other";
    case "general":
    default:
      return "contact.general";
  }
}

/**
 * Build the outgoing email metadata (to/subject/body) based on a
 * semantic contact type and the structured submission data.
 *
 * NOTE: This intentionally keeps templates server-side so the frontend
 * just sends data, not pre-formatted mailto bodies.
 */
function buildEmailFromSubmission(
  type: ContactType,
  data: BaseSubmissionData,
  recaptchaScore?: number
): EmailTemplateResult {
  // Sanitize all user inputs to prevent injection attacks
  const rawName = sanitizeInput(data.name, 200, false);
  const rawEmail = sanitizeEmail(data.email);
  const rawPhone = sanitizePhone(data.phone);
  const rawMessage = sanitizeInput(data.message, 5000, true); // Allow newlines in message body

  const name = rawName || "(No name provided)";
  const email = rawEmail || "(No email provided)";
  const phone = rawPhone || "(No phone provided)";
  const message = rawMessage || "(No additional message provided)";

  // Helper to append a footer with basic metadata
  const withFooter = (body: string) => {
    const scoreLine =
      typeof recaptchaScore === "number"
        ? `reCAPTCHA Score: ${recaptchaScore}`
        : "reCAPTCHA Score: (not available)";

    return `
${body}

---
This message was sent via the contact form on thrive-fl.org
${scoreLine}
    `.trim();
  };

  // Route all prayer-related requests to the dedicated prayer inbox
  const defaultTo = CONTACT_EMAIL;
  const prayerTo = PRAYER_EMAIL;

  switch (type) {
    case "contact.visit": {
      const subject = `First-Time Visit Questions - ${name}`;
      const body = `New visit inquiry from thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

Visit / first-time questions:
${message}`;
      return { to: defaultTo, subject, text: withFooter(body) };
    }
    case "contact.prayer":
    case "care.prayer": {
      const subject = `Prayer Request - ${name}`;
      const body = `New prayer request submitted via thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

Prayer request:
${message}`;
      return { to: prayerTo, subject, text: withFooter(body) };
    }
    case "contact.volunteer":
    case "serve": {
      const subject = `Serving / Getting Involved - ${name}`;
      const body = `New serving interest from thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

Serving interest details:
${message}`;
      return { to: defaultTo, subject, text: withFooter(body) };
    }
    case "contact.pastoral":
    case "care.pastoral": {
      const subject = `Pastoral Care Request - ${name}`;
      const body = `New pastoral care request from thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

What they are walking through / care request:
${message}`;
      return { to: defaultTo, subject, text: withFooter(body) };
    }
    case "baptism": {
      const subject = `Baptism Inquiry - ${name}`;
      const body = `New baptism inquiry from thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

Story / questions about baptism:
${message}`;
      return { to: defaultTo, subject, text: withFooter(body) };
    }
    case "smallGroups": {
      const subject = `Small Groups Interest - ${name}`;
      const body = `New small groups interest from thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

Small group interest / availability:
${message}`;
      return { to: defaultTo, subject, text: withFooter(body) };
    }
    case "kids": {
      const subject = `Thrive Kids Question - ${name}`;
      const body = `New Thrive Kids question from thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

Question / details:
${message}`;
      return { to: defaultTo, subject, text: withFooter(body) };
    }
    case "college": {
      const subject = `ThriveFGCU Question - ${name}`;
      const body = `New ThriveFGCU question from thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

Question / details:
${message}`;
      return { to: defaultTo, subject, text: withFooter(body) };
    }
    case "contact.other": {
      const subject = `Website Contact (Other) - ${name}`;
      const body = `New website contact (Other) from thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;
      return { to: defaultTo, subject, text: withFooter(body) };
    }
    case "contact.general":
    default: {
      const subject = `General Inquiry - ${name}`;
      const body = `New general inquiry from thrive-fl.org

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;
      return { to: defaultTo, subject, text: withFooter(body) };
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "reCAPTCHA token is required" },
        { status: 400 }
      );
    }

    if (!RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Server configuration error: RECAPTCHA_SECRET_KEY missing" },
        { status: 500 }
      );
    }

    // Verify the reCAPTCHA token with Google
    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        }),
      }
    );

    const recaptchaData: RecaptchaResponse = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        {
          error: "reCAPTCHA verification failed",
          details: recaptchaData["error-codes"],
          score: recaptchaData.score,
        },
        { status: 400 }
      );
    }

    // Check the score (0.0 - 1.0, higher is more likely human)
    const score = recaptchaData.score ?? 0;
    if (score < 0.5) {
      return NextResponse.json(
        {
          error: "Verification failed - please try again",
          score,
        },
        { status: 400 }
      );
    }

    // Send email via Mailgun
    if (!MAILGUN_API_KEY) {
      console.error("MAILGUN_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: MAILGUN_API_KEY,
    });

    // Support both the new payload shape ({ token, type, data }) and the legacy
    // ContactForm payload ({ token, formData }). This keeps the transition
    // backwards-compatible.
    let type: ContactType;
    let submissionData: BaseSubmissionData;

    if (body.type && body.data) {
      type = body.type as ContactType;
      submissionData = body.data as BaseSubmissionData;
    } else if (body.formData) {
      const legacy = body.formData as BaseSubmissionData;
      type = normalizeContactType(legacy.subject as string | undefined);
      submissionData = legacy;
    } else {
      return NextResponse.json(
        { error: "Invalid payload: expected { token, type, data } or { token, formData }" },
        { status: 400 }
      );
    }

    const { to, subject, text } = buildEmailFromSubmission(
      type,
      submissionData,
      score
    );

    // Sanitize the Reply-To email to prevent header injection
    const replyToEmail = sanitizeEmail(submissionData.email);

    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `Thrive Website <noreply@${MAILGUN_DOMAIN}>`,
      to: [to],
      // Keep Reply-To so the team can respond directly to the person (only if valid)
      ...(replyToEmail ? { "h:Reply-To": replyToEmail } : {}),
      subject,
      text,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

