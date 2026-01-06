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

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
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

      // Send form data to backend API for verification
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, formData }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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
        <label htmlFor="message">Message <span className="required">*</span></label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="How can we help you?"
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

