/**
 * Heuristic spam scoring for contact form submissions.
 *
 * reCAPTCHA tells us whether a *bot* filled the form. It does nothing about a
 * real person at a marketing agency typing a sales pitch into the prayer
 * request box, which is the bulk of what actually reaches the inbox. This
 * module scores the submission content itself and lets the API route decide
 * whether to deliver, flag, or quarantine it.
 *
 * Intentionally dependency-free: the published spam packages are either
 * trained on email corpora (naive Bayes with no solicitation training data) or
 * pull in native modules that do not belong in a serverless route.
 */

export interface SpamSignal {
  /** Stable identifier, useful for grepping logs */
  id: string;
  /** How strongly this signal points at spam */
  weight: number;
  /** Human-readable explanation included in flagged emails */
  detail: string;
}

export type SpamVerdict = "clean" | "suspicious" | "spam";

export interface SpamAssessment {
  score: number;
  verdict: SpamVerdict;
  signals: SpamSignal[];
}

export interface SpamCheckInput {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  /** Hidden field no human ever sees - anything in it is a bot */
  honeypot?: unknown;
  /** Milliseconds between form render and submit, as reported by the client */
  elapsedMs?: unknown;
}

/** At or above this, the message is delivered but marked for the team */
export const SUSPICIOUS_THRESHOLD = 4;

/** At or above this, the message is treated as spam and kept out of the inbox */
export const SPAM_THRESHOLD = 7;

/** A human needs at least a few seconds to fill out the form */
const MIN_FILL_TIME_MS = 3000;

interface ContentRule {
  id: string;
  pattern: RegExp;
  weight: number;
  detail: string;
}

/**
 * Sales / solicitation language. Weights are deliberately conservative:
 * a single match should rarely be enough on its own, because church members
 * do legitimately write things like "I do web design and would love to serve."
 * Spam almost always trips several of these at once.
 */
const CONTENT_RULES: ContentRule[] = [
  // Cold agency outreach - the single most common category of form spam
  {
    id: "seo",
    pattern: /\b(seo|search engine optimi[sz]ation)\b/,
    weight: 3,
    detail: "SEO services pitch",
  },
  {
    id: "backlinks",
    pattern: /\b(back ?links?|link ?building|guest post(ing|s)?|do-?follow|domain authority)\b/,
    weight: 4,
    detail: "Backlink / guest post scheme",
  },
  {
    id: "rankings",
    pattern: /\b(first page of google|page one of google|top (10|ten) (of |on )?google|google ranking|rank (higher|your (site|website))|search rankings?)\b/,
    weight: 3,
    detail: "Search ranking promises",
  },
  {
    id: "dev-services",
    pattern: /\b(web(site)? (design|development|redesign|revamp)|mobile app development|app development (company|services)|software development (company|services))\b/,
    weight: 2,
    detail: "Website / app development services",
  },
  {
    id: "marketing-services",
    pattern: /\b(digital marketing|lead generation|social media marketing|email marketing (campaign|services)|ppc campaign|google ads management)\b/,
    weight: 3,
    detail: "Marketing services pitch",
  },
  {
    id: "cold-open",
    pattern: /\b(i (was |am )?(just )?(browsing|visit(ed|ing)|came across|stumbled (up)?on)|we (noticed|came across|found|reviewed) your (web ?site|site|page))\b/,
    weight: 3,
    detail: "Classic cold-outreach opener",
  },
  {
    id: "growth-promise",
    pattern: /\b(increase (your )?(traffic|sales|revenue|conversions|visibility)|drive more (traffic|leads|sales|customers)|grow your (business|audience|revenue))\b/,
    weight: 3,
    detail: "Traffic / revenue growth promises",
  },
  {
    id: "sales-offer",
    pattern: /\b(free (quote|trial|consultation|audit|proposal|sample)|no obligation|special offer|limited time offer|money.back guarantee)\b/,
    weight: 2,
    detail: "Sales offer language",
  },
  {
    id: "outsourcing",
    pattern: /\b(outsourc(e|ing)|offshore (team|development)|white.?label|dedicated (developers?|team|resources))\b/,
    weight: 3,
    detail: "Outsourcing / staffing pitch",
  },
  {
    id: "form-letter",
    pattern: /\b(dear (sir|madam|sir\/madam|owner)|to whom it may concern|dear (website )?(owner|admin|webmaster))\b/,
    weight: 2,
    detail: "Mass-mail salutation",
  },
  {
    id: "proposal",
    pattern: /\b(business (proposal|opportunity)|investment opportunity|partnership proposal|collaboration opportunity)\b/,
    weight: 3,
    detail: "Unsolicited business proposal",
  },
  {
    id: "crypto",
    pattern: /\b(crypto(currency)?|bitcoin|forex|binary options|trading (bot|signals)|nft (drop|project))\b/,
    weight: 3,
    detail: "Crypto / trading pitch",
  },
  // Kept low on purpose: someone asking for pastoral care may genuinely be
  // writing about debt.
  {
    id: "finance",
    pattern: /\b(payday loan|debt relief|credit repair|loan offer|guaranteed approval)\b/,
    weight: 1,
    detail: "Financial services language",
  },
  {
    id: "adult-pharma",
    pattern: /\b(viagra|cialis|casino|porn|escort service|sex ?cam|adult ?dating)\b/,
    weight: 6,
    detail: "Adult / pharma spam",
  },
  {
    id: "bulk-mail",
    pattern: /\b(unsubscribe|opt.?out of (these|future) (emails|messages)|remove me from (your|this) (list|database)|if you (are )?not interested,? (just )?reply)\b/,
    weight: 4,
    detail: "Bulk mailing boilerplate",
  },
  {
    id: "pricing",
    pattern: /\b(price list|our (rates|packages|pricing)|hourly rate|send you (a |our )?(quotation|quote|portfolio|samples))\b/,
    weight: 2,
    detail: "Vendor pricing language",
  },
  {
    id: "meeting-push",
    pattern: /\b(schedule a (call|demo|meeting)|book a (call|demo)|\d{2}.minute call|hop on a (quick )?call)\b/,
    weight: 2,
    detail: "Sales meeting request",
  },
];

/** Throwaway inbox providers - real people contacting a church do not use these */
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "sharklasers.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
  "mintemail.com",
  "spam4.me",
]);

const URL_SOURCE =
  /(https?:\/\/|www\.)[^\s<>"]+|\b[a-z0-9-]+\.(com|net|org|io|ru|cn|xyz|top|info|biz|online|site|shop)\b/
    .source;
const URL_PATTERN_GLOBAL = new RegExp(URL_SOURCE, "gi");
const URL_PATTERN = new RegExp(URL_SOURCE, "i");
const MARKUP_PATTERN = /<a\s|<\/a>|\[url[=\]]|\[\/url\]|<script/i;
const NON_LATIN_PATTERN = /[Ѐ-ӿ؀-ۿ一-鿿぀-ヿ가-힯]/;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * Undo the letter-spacing trick spammers use to slip past keyword matching
 * ("S E O", "b.a.c.k.l.i.n.k.s"). Joins runs of single characters that are
 * separated by a space, dot, dash, or underscore.
 */
function deobfuscate(text: string): string {
  return text.replace(/\b(\w)(?:[\s._-]+(\w)\b)+/g, (match) =>
    match.replace(/[\s._-]+/g, "")
  );
}

function countMatches(text: string, pattern: RegExp): number {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

function capsRatio(text: string): number {
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length === 0) {
    return 0;
  }
  const upper = letters.replace(/[^A-Z]/g, "").length;
  return upper / letters.length;
}

/**
 * Score a contact form submission. Higher scores mean more spam-like.
 *
 * The caller decides what to do with the verdict - this function has no
 * side effects and never throws on malformed input.
 */
export function evaluateSubmission(input: SpamCheckInput): SpamAssessment {
  const signals: SpamSignal[] = [];

  const addSignal = (id: string, weight: number, detail: string) => {
    signals.push({ id, weight, detail });
  };

  const name = asString(input.name);
  const email = asString(input.email);
  const phone = asString(input.phone);
  const message = asString(input.message);
  const honeypot = asString(input.honeypot);

  // --- Bot tells -----------------------------------------------------------

  if (honeypot.trim().length > 0) {
    addSignal("honeypot", 10, "Hidden honeypot field was filled in");
  }

  if (typeof input.elapsedMs === "number" && Number.isFinite(input.elapsedMs)) {
    if (input.elapsedMs >= 0 && input.elapsedMs < MIN_FILL_TIME_MS) {
      addSignal(
        "too-fast",
        5,
        `Form submitted ${input.elapsedMs}ms after loading`
      );
    }
  }

  // --- Content signals -----------------------------------------------------

  const haystack = deobfuscate(`${name} ${message}`.toLowerCase());

  for (const rule of CONTENT_RULES) {
    if (rule.pattern.test(haystack)) {
      addSignal(rule.id, rule.weight, rule.detail);
    }
  }

  const linkCount = countMatches(message, URL_PATTERN_GLOBAL);
  if (linkCount > 0) {
    // One link is common enough in a genuine message (a social profile when
    // someone volunteers); several is not.
    addSignal(
      "links",
      Math.min(linkCount * 2, 6),
      `${linkCount} link${linkCount === 1 ? "" : "s"} in the message`
    );
  }

  if (MARKUP_PATTERN.test(message)) {
    addSignal("markup", 5, "Message contains HTML or BBCode markup");
  }

  if (NON_LATIN_PATTERN.test(message)) {
    addSignal("non-latin", 4, "Message contains non-Latin script");
  }

  if (message.length > 40 && capsRatio(message) > 0.6) {
    addSignal("shouting", 2, "Message is mostly uppercase");
  }

  if (/!{3,}/.test(message)) {
    addSignal("exclamations", 1, "Excessive exclamation marks");
  }

  // --- Identity signals ----------------------------------------------------

  const emailDomain = email.toLowerCase().split("@")[1] ?? "";
  if (emailDomain && DISPOSABLE_EMAIL_DOMAINS.has(emailDomain)) {
    addSignal("disposable-email", 4, `Disposable email domain (${emailDomain})`);
  }

  if (URL_PATTERN.test(name)) {
    addSignal("url-in-name", 3, "Name field contains a URL");
  }

  if (phone && /[a-zA-Z]/.test(phone)) {
    addSignal("bad-phone", 2, "Phone field contains letters");
  }

  const score = signals.reduce((total, signal) => total + signal.weight, 0);

  let verdict: SpamVerdict = "clean";
  if (score >= SPAM_THRESHOLD) {
    verdict = "spam";
  } else if (score >= SUSPICIOUS_THRESHOLD) {
    verdict = "suspicious";
  }

  return { score, verdict, signals };
}

/** One-line summary for logs and flagged email footers */
export function describeAssessment(assessment: SpamAssessment): string {
  if (assessment.signals.length === 0) {
    return "no spam signals";
  }

  const details = assessment.signals
    .map((signal) => `${signal.detail} (+${signal.weight})`)
    .join("; ");

  return `score ${assessment.score} - ${details}`;
}
