"use client";

import { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner, faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

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

export default function ContactForm({ initialSubject = "" }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // Execute reCAPTCHA
      const token = await new Promise<string>((resolve, reject) => {
        if (typeof window !== "undefined" && window.grecaptcha?.enterprise) {
          window.grecaptcha.enterprise.ready(async () => {
            try {
              const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action: "submit" });
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
        body: JSON.stringify({ token, type, data: formData }),
      });

      const result = await response.json();

	      if (!response.ok) {
	        throw new Error(result.error || "Submission failed");
	      }

	      setStatus("success");
	      setFormData({ name: "", email: "", phone: "", subject: initialSubject, message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("There was an error submitting your message. Please try again.");
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

  const { label: messageLabel, placeholder: messagePlaceholder } = getMessageConfig(formData.subject);

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form-row">
        <div className="contact-form-group">
          <label htmlFor="name">Name <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            disabled={status === "submitting"}
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="email">Email <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-form-group">
          <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(239) 555-0123"
            disabled={status === "submitting"}
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="subject">Subject <span className="required">*</span></label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={status === "submitting"}
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

	      <div className="contact-form-group">
	        <label htmlFor="message">{messageLabel} <span className="required">*</span></label>
	        <textarea
	          id="message"
	          name="message"
	          value={formData.message}
	          onChange={handleChange}
	          required
	          placeholder={messagePlaceholder}
	          rows={5}
	          disabled={status === "submitting"}
	        />
	      </div>

      {status === "success" && (
        <div className="contact-form-message contact-form-success">
          <FontAwesomeIcon icon={faCheck} />
          <span>Thank you! Your message has been sent. We&apos;ll get back to you soon.</span>
        </div>
      )}

      {status === "error" && (
        <div className="contact-form-message contact-form-error">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="contact-form-footer">
        <p className="contact-form-privacy">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>{" "}
          apply.
        </p>

        <button
          type="submit"
          className="btn btn-primary contact-form-submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              Sending...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}

