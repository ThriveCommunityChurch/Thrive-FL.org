/**
 * Semantic spam check for contact form submissions using TypeSafe's Jev model.
 *
 * Complements the keyword heuristics in spamFilter.ts: Jev judges what the
 * message *is* (a sales pitch, a mass template, a real inquiry), so reworded
 * pitches that dodge every regex are still caught. Never throws - any failure
 * returns `null` and the caller falls back to the heuristics alone.
 */

import type { SpamVerdict } from "./spamFilter";

const TYPESAFE_ENDPOINT = "https://api.typesafe.ai/v1/systemone";
const TYPESAFE_MODEL = "jev-latest";
const TIMEOUT_MS = 4000;

/** Probability thresholds, tuned against real submissions over time */
const SPAM_SOLICITATION = 0.85;
const SPAM_MASS_OUTREACH = 0.9;
const SPAM_MAX_GENUINE = 0.3;
const SUSPICIOUS_SOLICITATION = 0.5;
const SUSPICIOUS_MASS_OUTREACH = 0.7;

export interface JevSpamInput {
  formType: string;
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

export interface JevSpamAssessment {
  verdict: SpamVerdict;
  solicitation: number;
  massOutreach: number;
  genuine: number;
}

const QUESTIONS = {
  solicitation: {
    type: "noul",
    instructions:
      "Is `submission.message` an unsolicited pitch offering or selling a product or service to the church (web design, SEO, marketing, staffing, software, financing, etc.)?",
    criteria: {
      true: "The sender is a vendor or agency trying to sell, offer a free sample/trial, or set up a sales call",
      false:
        "The sender is asking the church for something, offering to volunteer, sharing a prayer need, or asking a question; a member mentioning their own job while asking to serve is not a pitch",
    },
  },
  massOutreach: {
    type: "noul",
    instructions:
      "Does `submission.message` read like a template sent to many organizations rather than written to this specific church?",
    criteria: {
      true: "Generic wording like 'your business', no church-specific details, opt-out lines, marketing boilerplate",
      false: "Refers to this church, its people, services, or the sender's own personal situation",
    },
  },
  genuine: {
    type: "noul",
    instructions:
      "Is `submission` a genuine message from someone who wants to visit, attend, get involved with, get care or prayer from, or ask a real question of the church?",
  },
} as const;

type QuestionId = keyof typeof QUESTIONS;

interface SystemOneResponse {
  answers?: Partial<Record<QuestionId, { noul?: unknown }>>;
}

function asString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.slice(0, maxLength) : "";
}

function classify(solicitation: number, massOutreach: number, genuine: number): SpamVerdict {
  if (
    (solicitation >= SPAM_SOLICITATION || massOutreach >= SPAM_MASS_OUTREACH) &&
    genuine <= SPAM_MAX_GENUINE
  ) {
    return "spam";
  }
  if (
    solicitation >= SUSPICIOUS_SOLICITATION ||
    (massOutreach >= SUSPICIOUS_MASS_OUTREACH && genuine < 0.5)
  ) {
    return "suspicious";
  }
  return "clean";
}

/** Returns `null` when the key is missing or the API call fails in any way */
export async function checkWithJev(input: JevSpamInput): Promise<JevSpamAssessment | null> {
  const apiKey = process.env.TYPESAFE_API_KEY;
  if (!apiKey) {
    return null;
  }

  const message = asString(input.message, 5000);
  if (!message.trim()) {
    return null;
  }

  try {
    const response = await fetch(TYPESAFE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: TYPESAFE_MODEL,
        state: {
          submission: {
            form: input.formType,
            name: asString(input.name, 200),
            email: asString(input.email, 254),
            message,
          },
        },
        questions: QUESTIONS,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`Jev spam check failed: HTTP ${response.status}`);
      return null;
    }

    const data = (await response.json()) as SystemOneResponse;
    const probability = (id: QuestionId) => {
      const value = data.answers?.[id]?.noul;
      return typeof value === "number" && Number.isFinite(value) ? value : null;
    };

    const solicitation = probability("solicitation");
    const massOutreach = probability("massOutreach");
    const genuine = probability("genuine");
    if (solicitation === null || massOutreach === null || genuine === null) {
      console.error("Jev spam check returned an unexpected response shape");
      return null;
    }

    return {
      verdict: classify(solicitation, massOutreach, genuine),
      solicitation,
      massOutreach,
      genuine,
    };
  } catch (error) {
    console.error("Jev spam check failed:", error);
    return null;
  }
}

/** One-line summary for email footers and logs */
export function describeJevAssessment(assessment: JevSpamAssessment | null): string {
  if (!assessment) {
    return "Jev spam check: unavailable";
  }
  const pct = (value: number) => `${Math.round(value * 100)}%`;
  return (
    `Jev spam check: ${assessment.verdict} ` +
    `(sales pitch ${pct(assessment.solicitation)}, ` +
    `mass template ${pct(assessment.massOutreach)}, ` +
    `genuine inquiry ${pct(assessment.genuine)})`
  );
}
