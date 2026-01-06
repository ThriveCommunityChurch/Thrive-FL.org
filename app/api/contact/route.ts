import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "thrive-fl.org";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@thrive-fl.org";

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, formData } = body;

    if (!token) {
      return NextResponse.json(
        { error: "reCAPTCHA token is required" },
        { status: 400 }
      );
    }

    if (!RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
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
          score: recaptchaData.score 
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
          score 
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

    const subjectLabels: Record<string, string> = {
      general: "General Inquiry",
      visit: "Planning a Visit",
      prayer: "Prayer Request",
      volunteer: "Getting Involved",
      pastoral: "Pastoral Care",
      other: "Other",
    };

    const emailSubject = `Contact Form: ${subjectLabels[formData.subject] || formData.subject} - ${formData.name}`;
    const emailBody = `
New contact form submission from thrive-fl.org

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Subject: ${subjectLabels[formData.subject] || formData.subject}

Message:
${formData.message}

---
This message was sent via the contact form on thrive-fl.org
reCAPTCHA Score: ${recaptchaData.score}
    `.trim();

    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `Thrive Website <noreply@${MAILGUN_DOMAIN}>`,
      to: [CONTACT_EMAIL],
      "h:Reply-To": formData.email,
      subject: emailSubject,
      text: emailBody,
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

