# Stories / Testimonies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static `/stories` section (index + per-testimony detail pages) showing YouTube video where available, an audio fallback otherwise, and a cleaned transcript always — with no backend.

**Architecture:** Testimonies live as a hardcoded TypeScript array in the Next repo, read at build time. Routes mirror the existing `blog/` pattern (static index + statically-generated detail pages). Transcript markdown rendering is shared with the blog via an extracted util. A small client component picks video vs. audio.

**Tech Stack:** Next.js 16 (App Router, static export), React 18, TypeScript, FontAwesome. No test framework in this repo — verification is `pnpm lint` + `pnpm build` (clean static export) + dev-server visual checks. **TDD-with-a-runner is intentionally omitted: the repo has no test framework and "minimal dependencies" is a hard rule; adding one is out of scope.**

**Convention note:** The repo's CLAUDE.md says "CSS Modules for component styles," but the codebase has zero `.module.css` files and uses global classes in `app/app.css` (e.g. `blog-card`, `page-hero`). Per writing-plans guidance (follow established patterns), this plan reuses global classes and adds story-specific styles to `app/app.css`.

---

## File Structure

**Create:**
- `app/types/stories.ts` — `Story` interface.
- `app/stories/content/stories.ts` — the hardcoded story data array + helper selectors.
- `app/lib/markdown.ts` — extracted `markdownToHtml` (shared by blog + stories).
- `app/stories/page.tsx` — index page (static).
- `app/stories/[slug]/page.tsx` — detail page (`generateStaticParams` + `generateMetadata`).
- `app/stories/[slug]/StoryMedia.tsx` — client component: YouTube embed or `<audio>`.
- `app/stories/[slug]/StoryTranscript.tsx` — client component: renders transcript via shared util.

**Modify:**
- `app/blog/[slug]/BlogContent.tsx` — import shared `markdownToHtml` instead of inline copy.
- `app/components/Footer.tsx:25` — add Stories link to Quick Links.
- `app/sitemap.ts` — add per-story detail URLs (dynamic `[slug]` routes aren't auto-discovered).
- `app/app.css` — add story-specific styles.
- `app/im-new/page.tsx`, `app/visit/page.tsx` — add a CTA link to `/stories`.

---

## Task 1: Story type

**Files:**
- Create: `app/types/stories.ts`

- [ ] **Step 1: Create the type file**

```ts
// app/types/stories.ts

/**
 * A single testimony / "Why Thrive?" story.
 * Hardcoded static content — no API, no DB. Read at build time.
 */
export interface Story {
  slug: string;          // URL-friendly id, e.g. "merna"
  name: string;          // display name, e.g. "Merna Steger-Graziano"
  title: string;         // short hook / headline shown on the card
  summary: string;       // one-line preview for card + meta description
  order: number;         // ascending sort order on the index
  isActive: boolean;     // soft-delete convention; false = hidden everywhere
  youtubeId?: string;    // YouTube video id (no URL), if a video exists
  audioUrl?: string;     // absolute mp3 url, used only when youtubeId is absent
  photoUrl?: string;     // optional headshot url; card falls back to a default
  transcript: string;    // cleaned testimony, markdown
}
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors referencing `app/types/stories.ts`.

- [ ] **Step 3: Commit**

```bash
git add app/types/stories.ts
git commit -m "feat(stories): add Story content type"
```

---

## Task 2: Extract shared markdown util (refactor, no behavior change)

**Files:**
- Create: `app/lib/markdown.ts`
- Modify: `app/blog/[slug]/BlogContent.tsx`

- [ ] **Step 1: Create the shared util — move the three functions verbatim from `BlogContent.tsx`**

```ts
// app/lib/markdown.ts

/**
 * Escape HTML special characters.
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return text.replace(/[&<>]/g, (char) => map[char] || char);
}

/**
 * Process inline markdown formatting (bold, quotes).
 */
export function processInlineFormatting(text: string): string {
  let result = escapeHtml(text);
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/[“”]([^“”]+)[“”]/g, '<span class=\'blog-quote\'>"$1"</span>');
  result = result.replace(/(?<!=)"([^"<>]+)"(?!>)/g, '<span class=\'blog-quote\'>"$1"</span>');
  return result;
}

/**
 * Convert basic markdown to HTML.
 * Handles: headers (##), bold (**), paragraphs, quotes.
 */
export function markdownToHtml(markdown: string): string {
  const lines = markdown.split('\n');
  const htmlLines: string[] = [];
  let inParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (i === 0 && !line.startsWith('##') && !line.startsWith('**')) {
      continue;
    }

    if (!line) {
      if (inParagraph) {
        htmlLines.push('</p>');
        inParagraph = false;
      }
      continue;
    }

    if (line.startsWith('## ')) {
      if (inParagraph) {
        htmlLines.push('</p>');
        inParagraph = false;
      }
      const headerText = line.slice(3);
      htmlLines.push(`<h2>${escapeHtml(headerText)}</h2>`);
      continue;
    }

    line = processInlineFormatting(line);

    if (!inParagraph) {
      htmlLines.push('<p>');
      inParagraph = true;
    } else {
      htmlLines.push(' ');
    }
    htmlLines.push(line);
  }

  if (inParagraph) {
    htmlLines.push('</p>');
  }

  return htmlLines.join('');
}
```

> NOTE: the curly-quote regex uses `“`/`”` escapes — behaviorally identical to the literal smart quotes in the original `BlogContent.tsx`, but safe to type into a plan/source without copy-paste corruption.

- [ ] **Step 2: Replace the inline copy in `BlogContent.tsx` with an import**

Replace the entire body of `app/blog/[slug]/BlogContent.tsx` with:

```tsx
"use client";

import { markdownToHtml } from "../../lib/markdown";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const htmlContent = markdownToHtml(content);

  return (
    <div
      className="blog-detail-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
```

- [ ] **Step 3: Verify the blog still renders identically**

Run: `pnpm dev`, open `http://localhost:3000/blog`, open any post.
Expected: post body renders exactly as before (headings, bold, quote spans). No console errors.

- [ ] **Step 4: Lint + typecheck**

Run: `pnpm lint && pnpm exec tsc --noEmit`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add app/lib/markdown.ts app/blog/[slug]/BlogContent.tsx
git commit -m "refactor(blog): extract markdownToHtml into shared lib/markdown"
```

---

## Task 3: Story data array (structure first, transcripts in Task 4)

**Files:**
- Create: `app/stories/content/stories.ts`

- [ ] **Step 1: Create the data module with all 11 entries and selectors. Use empty-string transcripts as placeholders — Task 4 fills them.**

```ts
// app/stories/content/stories.ts
import { Story } from "../../types/stories";

/**
 * Hardcoded testimonies. Edit this file to add/update/hide a story.
 * Video stories carry youtubeId; audio-only stories carry audioUrl.
 */
const stories: Story[] = [
  { slug: "merna",          name: "Merna Steger-Graziano", title: "I fell in love with Jesus",              summary: "After heartbreak and depression, Merna found a love story she never expected.", order: 1,  isActive: true, youtubeId: "XET4Bl-COXs", transcript: "" },
  { slug: "daysha",         name: "Daysha",                title: "I found a place I could trust",          summary: "A nervous freshman who was welcomed, baptized, and found her calling with kids.", order: 2,  isActive: true, youtubeId: "LPnRsykdC2M", transcript: "" },
  { slug: "dan",            name: "Dan",                   title: "They treat you like family",             summary: "After five years without real connection elsewhere, Dan found relationships that ran deep.", order: 3,  isActive: true, youtubeId: "3wTa3XGPWSc", transcript: "" },
  { slug: "kevin",          name: "Kevin Wilder",          title: "I felt like I was supposed to be here",  summary: "Kevin picked a flyer off his AC unit and found the ministry God had for him.", order: 4,  isActive: true, youtubeId: "mnvstqzAEsI", transcript: "" },
  { slug: "john-and-haley", name: "John & Haley",          title: "Come as you are",                        summary: "A young family found authentic, Jesus-centered community across the street from home.", order: 5,  isActive: true, youtubeId: "JDgI5SMyU40", transcript: "" },
  { slug: "james",          name: "James",                 title: "This is my family now",                  summary: "A worship leader who left the big churches to finally be known.", order: 6,  isActive: true, youtubeId: "vwfnN2fqrrE", transcript: "" },
  { slug: "hugo-and-ashley", name: "Hugo & Ashley",        title: "We never left",                          summary: "A couple who came back for the worship and stayed for the family.", order: 7,  isActive: true, youtubeId: "cDwjNgnAvKk", transcript: "" },
  { slug: "danielle",       name: "Danielle Reese",        title: "This became my home",                    summary: "A shy freshman who broke out of her shell and found lifelong friendships.", order: 8,  isActive: true, youtubeId: "Mvcb3lU5yOo", transcript: "" },
  { slug: "jaden",          name: "Jaden",                 title: "Opportunities I'd never have had",       summary: "A year and a half of growth, mission trips, and a community like no other.", order: 9,  isActive: true, youtubeId: "73GRlnXhOi4", transcript: "" },
  { slug: "aj",             name: "AJ",                    title: "The Word got into me",                   summary: "Through profound loss, AJ pressed on — and found community he didn't know he needed.", order: 10, isActive: true, youtubeId: "_C22jptAHJk", transcript: "" },
  { slug: "misc",           name: "Voices of Thrive",      title: "Why we're here",                         summary: "Longtime members on what community at Thrive really means.", order: 11, isActive: true, youtubeId: "PUzuL4hfqXY", transcript: "" },
];

/** All active stories, sorted for display. */
export function getActiveStories(): Story[] {
  return stories
    .filter((s) => s.isActive)
    .sort((a, b) => a.order - b.order);
}

/** A single active story by slug, or undefined if missing/inactive. */
export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.isActive && s.slug === slug);
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add app/types/stories.ts app/stories/content/stories.ts
git commit -m "feat(stories): add story data array and selectors"
```

---

## Task 4: Fill in cleaned transcripts (editorial)

**Files:**
- Modify: `app/stories/content/stories.ts`

This is the content task. For each of the 11 stories, set `transcript` to a cleaned version of the raw transcript: remove spoken-word filler, self-corrections, and stage directions ("move the microphone"); **trim fundraising / "support Thrive FGCU" / "give us your credit card" appeals**; preserve the person's voice. Use `\n\n` between paragraphs (the markdown util treats blank lines as paragraph breaks).

- [ ] **Step 1: Draft all 11 cleaned transcripts as template-literal strings, replacing the empty `transcript: ""` values.**

Example shape (Merna — illustrative; produce the full cleaned text for each):

```ts
  {
    slug: "merna",
    name: "Merna Steger-Graziano",
    title: "I fell in love with Jesus",
    summary: "After heartbreak and depression, Merna found a love story she never expected.",
    order: 1,
    isActive: true,
    youtubeId: "XET4Bl-COXs",
    transcript: `My name is Merna Steger-Graziano, and I want to tell you a love story.

I was born on a farm in Minnesota. I never liked living there — in fact, I thought I was adopted for years, because I didn't fit in...

[full cleaned testimony continues, paragraphs separated by blank lines]`,
  },
```

> Raw transcripts are in the conversation/spec. **Wyatt reviews these drafts before publish** (gate — see Execution Handoff). Do NOT invent facts; only clean and trim what was said.

- [ ] **Step 2: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: clean (watch for unescaped backticks inside template literals).

- [ ] **Step 3: Commit**

```bash
git add app/stories/content/stories.ts
git commit -m "content(stories): add cleaned testimony transcripts"
```

---

## Task 5: StoryMedia component (video vs. audio)

**Files:**
- Create: `app/stories/[slug]/StoryMedia.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/stories/[slug]/StoryMedia.tsx
"use client";

interface StoryMediaProps {
  name: string;
  youtubeId?: string;
  audioUrl?: string;
}

/**
 * Renders the best available media for a story:
 *  - youtubeId present  -> responsive YouTube embed
 *  - else audioUrl      -> native audio player
 *  - else               -> nothing (transcript stands alone)
 */
export default function StoryMedia({ name, youtubeId, audioUrl }: StoryMediaProps) {
  if (youtubeId) {
    return (
      <div className="story-media story-media--video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={`${name} — Why Thrive?`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (audioUrl) {
    return (
      <div className="story-media story-media--audio">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio controls preload="metadata" src={audioUrl}>
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  return null;
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add app/stories/[slug]/StoryMedia.tsx
git commit -m "feat(stories): add StoryMedia (video/audio) component"
```

---

## Task 6: StoryTranscript component

**Files:**
- Create: `app/stories/[slug]/StoryTranscript.tsx`

- [ ] **Step 1: Create the component (reuses shared markdown util)**

```tsx
// app/stories/[slug]/StoryTranscript.tsx
"use client";

import { markdownToHtml } from "../../lib/markdown";

interface StoryTranscriptProps {
  transcript: string;
}

export default function StoryTranscript({ transcript }: StoryTranscriptProps) {
  const html = markdownToHtml(transcript);
  return (
    <div
      className="blog-detail-content story-transcript"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add app/stories/[slug]/StoryTranscript.tsx
git commit -m "feat(stories): add StoryTranscript renderer"
```

---

## Task 7: Stories index page

**Files:**
- Create: `app/stories/page.tsx`

- [ ] **Step 1: Create the index page (mirrors `app/blog/page.tsx`)**

```tsx
// app/stories/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { getActiveStories } from "./content/stories";

export const metadata: Metadata = {
  title: "Stories | Thrive Community Church",
  description: "Why Thrive? Real stories from people who found family, faith, and belonging at Thrive Community Church in Estero, FL.",
  openGraph: {
    title: "Stories | Thrive Community Church",
    description: "Why Thrive? Real stories of life change and belonging from our church family.",
    url: "https://thrive-fl.org/stories",
  },
};

export default function StoriesPage() {
  const stories = getActiveStories();

  return (
    <div className="page-wrapper">
      <section className="page-hero page-hero-stories">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Stories</h1>
          <p className="page-hero-subtitle">Why Thrive?</p>
        </div>
      </section>

      <section className="section stories-section">
        <div className="container">
          <div className="stories-grid">
            {stories.map((story, index) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="story-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="story-card__content">
                  <span className="story-card__badge">
                    <FontAwesomeIcon icon={story.youtubeId ? faPlay : faHeadphones} />
                    {story.youtubeId ? "Watch" : "Listen"}
                  </span>
                  <h2 className="story-card__title">{story.title}</h2>
                  <p className="story-card__name">{story.name}</p>
                  <p className="story-card__summary">{story.summary}</p>
                  <span className="story-card__action">
                    Read Story
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Visual check**

Run: `pnpm dev`, open `http://localhost:3000/stories`.
Expected: hero "Stories / Why Thrive?", a grid of 11 cards, video cards show "Watch", Daysha/Dan show "Listen". Cards link to `/stories/<slug>`.

- [ ] **Step 3: Lint + typecheck**

Run: `pnpm lint && pnpm exec tsc --noEmit`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add app/stories/page.tsx
git commit -m "feat(stories): add stories index page"
```

---

## Task 8: Story detail page

**Files:**
- Create: `app/stories/[slug]/page.tsx`

- [ ] **Step 1: Create the detail page (mirrors `app/blog/[slug]/page.tsx`)**

```tsx
// app/stories/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getActiveStories, getStoryBySlug } from "../content/stories";
import StoryMedia from "./StoryMedia";
import StoryTranscript from "./StoryTranscript";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getActiveStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return { title: "Story | Thrive Community Church" };
  }

  const description = story.summary.slice(0, 160);
  const ogImage = story.youtubeId
    ? `https://i.ytimg.com/vi/${story.youtubeId}/hqdefault.jpg`
    : "https://static.thrive-fl.org/og-image.jpg";

  return {
    title: `${story.name}: ${story.title} | Stories | Thrive Community Church`,
    description,
    openGraph: {
      title: `${story.name} — Why Thrive?`,
      description,
      url: `https://thrive-fl.org/stories/${slug}`,
      type: "article",
      images: [{ url: ogImage }],
    },
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      <nav className="breadcrumb-nav">
        <div className="container">
          <Link href="/stories" className="breadcrumb-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            All Stories
          </Link>
        </div>
      </nav>

      <article className="section blog-detail-section">
        <div className="container blog-detail-container">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": `${story.name}: ${story.title}`,
                "description": story.summary,
                "image": story.youtubeId
                  ? `https://i.ytimg.com/vi/${story.youtubeId}/hqdefault.jpg`
                  : "https://static.thrive-fl.org/og-image.jpg",
                "url": `https://thrive-fl.org/stories/${story.slug}`,
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://thrive-fl.org/stories/${story.slug}`,
                },
                "author": {
                  "@type": "Organization",
                  "name": "Thrive Community Church",
                  "url": "https://thrive-fl.org",
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Thrive Community Church",
                  "url": "https://thrive-fl.org",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://static.thrive-fl.org/thrive-logo.png",
                  },
                },
              }),
            }}
          />

          <header className="blog-detail-header">
            <h1 className="blog-detail-title">{story.title}</h1>
            <p className="story-detail-name">{story.name}</p>
          </header>

          <StoryMedia name={story.name} youtubeId={story.youtubeId} audioUrl={story.audioUrl} />

          <StoryTranscript transcript={story.transcript} />

          <footer className="blog-detail-footer">
            <hr />
            <p>
              A story from <Link href="/">Thrive Community Church</Link> in Estero, Southwest Florida.
            </p>
          </footer>

          <div className="blog-detail-cta">
            <p>Want to see for yourself?</p>
            <Link href="/im-new" className="btn btn-primary">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
```

- [ ] **Step 2: Visual check — video, audio, and 404**

Run: `pnpm dev`. Then:
- Open `http://localhost:3000/stories/merna` → YouTube embed renders, transcript below.
- Open `http://localhost:3000/stories/daysha` → YouTube embed renders, transcript below.
- Open `http://localhost:3000/stories/nope` → 404 page.

Expected: as described; no console errors.

> All 11 stories currently use video. The `StoryMedia` audio branch and the `audioUrl` field
> are retained for future audio-only stories but are unexercised by the current data set.

- [ ] **Step 3: Lint + typecheck**

Run: `pnpm lint && pnpm exec tsc --noEmit`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add app/stories/[slug]/page.tsx
git commit -m "feat(stories): add story detail page"
```

---

## Task 9: Footer link + sitemap entries

**Files:**
- Modify: `app/components/Footer.tsx`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Add the Stories link to the Footer Quick Links (after Blog)**

In `app/components/Footer.tsx`, in the "Quick Links" `<ul>` (currently lines 22-31), add after the Blog `<li>`:

```tsx
              <li><Link href="/stories">Stories</Link></li>
```

- [ ] **Step 2: Add per-story URLs to the sitemap**

In `app/sitemap.ts`, add an import near the other service imports (top of file):

```ts
import { getActiveStories } from "./stories/content/stories";
```

Then build story entries and include them in the returned array. Add this just before the `return [...]` (around line 138):

```ts
  const storyEntries: MetadataRoute.Sitemap = getActiveStories().map((story) => ({
    url: `${baseUrl}/stories/${story.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
```

And change the final return to include them:

```ts
  return [...staticEntries, ...theocologyEntries, ...blogEntries, ...sermonEntries, ...storyEntries];
```

> The `/stories` index page itself is auto-discovered by `getStaticPages` (it's a static `page.tsx`), so no manual entry needed for the index. Only the dynamic `[slug]` detail routes must be added.

- [ ] **Step 3: Verify**

Run: `pnpm dev`, open `http://localhost:3000/sitemap.xml`.
Expected: contains `/stories` and each `/stories/<slug>`. Footer shows a "Stories" link that navigates to the index.

- [ ] **Step 4: Lint + typecheck**

Run: `pnpm lint && pnpm exec tsc --noEmit`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add app/components/Footer.tsx app/sitemap.ts
git commit -m "feat(stories): link Stories in footer and sitemap"
```

---

## Task 10: Story styles

**Files:**
- Modify: `app/app.css`

- [ ] **Step 1: Add story-specific styles. Reuse existing tokens/classes where possible; add only what's story-specific.**

Append to `app/app.css`:

```css
/* ===== Stories ===== */
.page-hero-stories {
  /* match the blog hero treatment; swap background if a story hero image is added later */
  background: var(--gradient-hero, linear-gradient(135deg, #1a2a3a, #2c4a5e));
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.story-card {
  display: block;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.story-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}
.story-card__content { padding: 1.5rem; }
.story-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-primary, #2c4a5e);
  margin-bottom: 0.75rem;
}
.story-card__title { font-size: 1.25rem; margin: 0 0 0.25rem; }
.story-card__name { font-size: 0.9rem; color: #666; margin: 0 0 0.75rem; }
.story-card__summary { color: #444; margin: 0 0 1rem; }
.story-card__action {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: var(--color-primary, #2c4a5e);
}

.story-detail-name {
  font-size: 1.1rem;
  color: #666;
  margin-top: 0.25rem;
}

.story-media { margin: 1.5rem 0 2rem; }
.story-media--video {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
}
.story-media--video iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.story-media--audio audio { width: 100%; }
```

> If `--gradient-hero`, `--color-primary`, etc. are not defined in `app.css`, the fallbacks after the comma apply. Confirm against existing tokens and prefer the real token names if present.

- [ ] **Step 2: Visual check**

Run: `pnpm dev`, review `/stories` and a couple of detail pages at desktop + mobile widths.
Expected: cards laid out in a responsive grid; video embed is 16:9 responsive; audio player full width.

- [ ] **Step 3: Lint**

Run: `pnpm lint`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add app/app.css
git commit -m "feat(stories): add stories styles"
```

---

## Task 11: CTA links from I'm New and Visit + audio asset note

**Files:**
- Modify: `app/im-new/page.tsx`
- Modify: `app/visit/page.tsx`

- [ ] **Step 1: Add a link/CTA to `/stories` on each page.**

On `app/im-new/page.tsx` and `app/visit/page.tsx`, add a contextual link to `/stories` in an existing section (e.g., near other "next step" links). Minimal, consistent with each page's existing markup, for example:

```tsx
<Link href="/stories" className="btn btn-secondary">Hear our stories</Link>
```

> Read each page first and place the link where it fits the existing layout; do not restructure the page. Ensure `Link` is imported (it is, in both files — verify).

- [ ] **Step 2: Visual check**

Run: `pnpm dev`, open `/im-new` and `/visit`.
Expected: a working link to `/stories` on each, styled consistently.

- [ ] **Step 3: Lint + typecheck**

Run: `pnpm lint && pnpm exec tsc --noEmit`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add app/im-new/page.tsx app/visit/page.tsx
git commit -m "feat(stories): link to Stories from I'm New and Visit"
```

**Audio assets:** none required. All 11 stories use YouTube video, so no mp3 uploads are needed
for this release. The `StoryMedia` audio branch / `audioUrl` field remain in place for any
future audio-only story.

---

## Task 12: Final verification

- [ ] **Step 1: Clean production build**

Run: `pnpm build`
Expected: build succeeds with no errors; `/stories` and all 11 `/stories/[slug]` routes appear as statically generated.

- [ ] **Step 2: Lint clean**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Final manual pass**

Run: `pnpm start` (serves the production build), then verify:
- `/stories` grid (11 cards, correct Watch/Listen badges).
- A few story detail pages (e.g. `/stories/merna`, `/stories/daysha`) — embed + transcript.
- Footer "Stories" link works from any page.
- `/sitemap.xml` includes all story URLs.

- [ ] **Step 4: Open PR against `dev`**

```bash
git push -u origin feature/stories-testimonies
gh pr create --base dev --title "Add Stories / testimonies section" --body "Adds a static /stories section: index + per-testimony pages with YouTube video (audio fallback for Daysha & Dan) and cleaned transcripts. No backend changes. See docs/superpowers/specs/2026-06-05-stories-testimonies-design.md."
```

---

## Self-Review

**Spec coverage:**
- Static content model → Tasks 1, 3, 4. ✓
- `/stories` index + `[slug]` detail mirroring blog → Tasks 7, 8. ✓
- Video-or-audio-or-transcript media logic → Task 5 (StoryMedia). ✓
- Reuse `markdownToHtml` via shared util (no blog regression) → Task 2. ✓
- Footer link only (not header) → Task 9. ✓
- Sitemap entries → Task 9. ✓
- Soft-delete `isActive` honored → Tasks 1, 3 (selectors filter it). ✓
- Editorial cleanup + fundraising trim, Wyatt review gate → Task 4. ✓
- Asset mapping (all 11 youtubeIds, Merna spelling) → Task 3 data. ✓
- CTA links from I'm New / Visit → Task 11. ✓
- Verification via build/lint (no test framework) → Task 12. ✓

**Placeholder scan:** Task 4 transcripts are intentionally authored during execution (content, gated on review) — every other task has complete code. No "TBD"/"handle edge cases" placeholders.

**Type consistency:** `Story` fields (`slug`, `name`, `title`, `summary`, `order`, `isActive`, `youtubeId?`, `audioUrl?`, `photoUrl?`, `transcript`) are used consistently across Tasks 1, 3, 5, 7, 8. Selectors `getActiveStories()` / `getStoryBySlug()` defined in Task 3 and used identically in Tasks 7, 8, 9. `markdownToHtml` signature matches between Task 2 (def) and Tasks 2/6 (use).
