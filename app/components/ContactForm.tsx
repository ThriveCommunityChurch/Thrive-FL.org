"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleExclamation,
  faExclamationTriangle,
  faPaperPlane,
  faRotateRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

const RECAPTCHA_SITE_KEY = "6LfhCccqAAAAAKlzmPF-A9_yarsAtARSBgE7WqRF";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  initialSubject?: string;
}

type FieldName = "name" | "email" | "phone" | "subject" | "message";

const FIELD_ORDER: FieldName[] = ["name", "email", "phone", "subject", "message"];

function validateField(name: FieldName, value: string): string | null {
  switch (name) {
    case "name":
      if (!value.trim()) return "Please tell us your name.";
      if (value.trim().length < 2) return "That name looks a little short.";
      return null;
    case "email":
      if (!value.trim()) return "We need your email so we can reply.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        return "That email doesn't look quite right — mind checking it?";
      return null;
    case "phone":
      if (!value.trim()) return null;
      if (value.replace(/\D/g, "").length < 7) return "That phone number looks incomplete.";
      return null;
    case "subject":
      if (!value) return "Please pick a subject so this reaches the right person.";
      return null;
    case "message":
      if (!value.trim()) return "Don't forget your message.";
      if (value.trim().length < 10) return "A few more words help us help you (10+ characters).";
      return null;
  }
}

type SubmitErrorKind = "network" | "validation" | "server";

const SUBMIT_ERROR_COPY: Record<SubmitErrorKind, string> = {
  network:
    "We couldn't reach our server — check your connection and try again. Nothing you typed was lost.",
  validation:
    "Hmm, that didn't go through. Nothing you typed was lost — try again, or email us directly.",
  server:
    "Something's off on our end. Your message is still here — try again in a bit, or email us directly.",
};

function getSubmitLabel(subject: string): string {
  switch (subject) {
    case "visit":
      return "Plan My Visit";
    case "prayer":
      return "Request Prayer";
    case "volunteer":
      return "I Want to Serve";
    case "pastoral":
      return "Request Care";
    default:
      return "Send Message";
  }
}

export default function ContactForm({ initialSubject = "" }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<SubmitErrorKind | null>(null);

  // Per-field validation: errors appear on blur and live-correct as you type.
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});

  // Honeypot: hidden from real users, irresistible to bots. Anything typed
  // here marks the submission as spam server-side.
  const [honeypot, setHoneypot] = useState("");

  // How long the form was on screen before submit. Bots fill and post
  // instantly; people take several seconds.
  const mountedAt = useRef<number>(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const field = name as FieldName;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Live-correct fields the user has already touched.
    if (touched[field]) {
      const error = validateField(field, value);
      setFieldErrors((prev) => ({ ...prev, [field]: error ?? undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const field = name as FieldName;
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setFieldErrors((prev) => ({ ...prev, [field]: error ?? undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Validate everything up front; mark all touched so further edits
    // live-correct. Focus the first problem instead of a wall of errors.
    const errors: Partial<Record<FieldName, string>> = {};
    for (const field of FIELD_ORDER) {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    }
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    setFieldErrors(errors);
    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    await submitForm();
  };

  const submitForm = async () => {
    setStatus("submitting");
    setSubmitError(null);

    try {
      // Execute reCAPTCHA
      const token = await new Promise<string>((resolve, reject) => {
        if (typeof window !== "undefined" && window.grecaptcha?.enterprise) {
          window.grecaptcha.enterprise.ready(async () => {
            try {
              const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
                action: "submit",
              });
              resolve(token);
            } catch (err) {
              reject(err);
            }
          });
        } else {
          reject(new Error("reCAPTCHA not loaded"));
        }
      });

      // Build a semantic contact type from the selected subject so the API
      // can choose the right email template and recipient.
      const mapSubjectToType = (subject: string): string => {
        switch (subject) {
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
      };

      const type = mapSubjectToType(formData.subject || "general");

      // Send form data to backend API for verification and email handling
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          type,
          data: formData,
          honeypot,
          elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : undefined,
        }),
      });

      // Drain the body (ignored — the status code is what we act on).
      await response.json().catch(() => null);

      if (!response.ok) {
        setStatus("error");
        setSubmitError(response.status >= 500 ? "server" : "validation");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: initialSubject, message: "" });
      setHoneypot("");
      setFieldErrors({});
      setTouched({});
      mountedAt.current = Date.now();
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setSubmitError("network");
    }
  };

  const subjectOptions = [
    { value: "", label: "Select a subject..." },
    { value: "general", label: "General Inquiry" },
    { value: "visit", label: "Planning a Visit" },
    { value: "prayer", label: "Prayer Request" },
    { value: "volunteer", label: "Getting Involved" },
    { value: "pastoral", label: "Pastoral Care" },
    { value: "other", label: "Other" },
  ];

  const getMessageConfig = (subject: string) => {
    switch (subject) {
      case "visit":
        return {
          label: "How can we help you with your visit?",
          placeholder:
            "When are you thinking of visiting? Any questions about kids, parking, or what to expect?",
        };
      case "prayer":
        return {
          label: "How can we pray for you?",
          placeholder:
            "Share as much or as little as you're comfortable with. Our team will be praying for you.",
        };
      case "volunteer":
        return {
          label: "Where would you like to serve?",
          placeholder:
            "Tell us which areas you're interested in (worship, kids, tech, hospitality, etc.) and a little about yourself.",
        };
      case "pastoral":
        return {
          label: "What would you like to talk about?",
          placeholder:
            "Share a bit about what you're walking through and how we can best care for you.",
        };
      case "other":
        return {
          label: "Message",
          placeholder: "How can we help you?",
        };
      case "general":
      default:
        return {
          label: "Message",
          placeholder: "How can we help you?",
        };
    }
  };

  const { label: messageLabel, placeholder: messagePlaceholder } = getMessageConfig(
    formData.subject,
  );

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      {/*
        Honeypot. Positioned off-screen rather than display:none so bots that
        skip hidden fields still take the bait. Deliberately NOT aria-hidden -
        hiding a focusable input from the accessibility tree is an anti-pattern,
        and a screen reader user who filled this in would have their message
        silently dropped. The label tells them to leave it alone instead.
      */}
      <div className="contact-form-hp">
        <label htmlFor="website">
          Leave this field blank (it is here to catch automated submissions)
        </label>
        <input
          type="text"
          id="website"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="contact-form-row">
        <div className={`contact-form-group${fieldErrors.name ? " contact-form-group-error" : ""}`}>
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Your name"
            disabled={status === "submitting"}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name && (
            <p className="contact-form-field-error" id="name-error">
              <FontAwesomeIcon icon={faCircleExclamation} /> {fieldErrors.name}
            </p>
          )}
        </div>
        <div
          className={`contact-form-group${fieldErrors.email ? " contact-form-group-error" : ""}`}
        >
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="your@email.com"
            disabled={status === "submitting"}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p className="contact-form-field-error" id="email-error">
              <FontAwesomeIcon icon={faCircleExclamation} /> {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="contact-form-row">
        <div
          className={`contact-form-group${fieldErrors.phone ? " contact-form-group-error" : ""}`}
        >
          <label htmlFor="phone">
            Phone <span className="optional">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(239) 555-0123"
            disabled={status === "submitting"}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          />
          {fieldErrors.phone && (
            <p className="contact-form-field-error" id="phone-error">
              <FontAwesomeIcon icon={faCircleExclamation} /> {fieldErrors.phone}
            </p>
          )}
        </div>
        <div
          className={`contact-form-group${fieldErrors.subject ? " contact-form-group-error" : ""}`}
        >
          <label htmlFor="subject">
            Subject <span className="required">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={status === "submitting"}
            aria-invalid={!!fieldErrors.subject}
            aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldErrors.subject && (
            <p className="contact-form-field-error" id="subject-error">
              <FontAwesomeIcon icon={faCircleExclamation} /> {fieldErrors.subject}
            </p>
          )}
        </div>
      </div>

      <div
        className={`contact-form-group${fieldErrors.message ? " contact-form-group-error" : ""}`}
      >
        <label htmlFor="message">
          {messageLabel} <span className="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder={messagePlaceholder}
          rows={5}
          disabled={status === "submitting"}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {fieldErrors.message && (
          <p className="contact-form-field-error" id="message-error">
            <FontAwesomeIcon icon={faCircleExclamation} /> {fieldErrors.message}
          </p>
        )}
      </div>

      {status === "success" && (
        <div className="contact-form-message contact-form-success" role="status">
          <FontAwesomeIcon icon={faCheck} />
          <span>Thank you! Your message has been sent. We&apos;ll get back to you soon.</span>
        </div>
      )}

      {status === "error" && submitError && (
        <div className="contact-form-message contact-form-error" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <div className="contact-form-error-body">
            <span>{SUBMIT_ERROR_COPY[submitError]}</span>
            <div className="contact-form-error-actions">
              <button type="button" className="contact-form-retry" onClick={submitForm}>
                <FontAwesomeIcon icon={faRotateRight} /> Try Again
              </button>
              <a href="mailto:info@thrive-fl.org">Email us instead</a>
            </div>
          </div>
        </div>
      )}

      <div className="contact-form-footer">
        <p className="contact-form-privacy">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{" "}
          apply.
        </p>

        <button
          type="submit"
          className="btn btn-primary contact-form-submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              Sending...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} />
              {getSubmitLabel(formData.subject)}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
