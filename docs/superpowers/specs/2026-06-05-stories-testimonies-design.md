# Stories / Testimonies — Design Spec

**Repo:** Thrive-FL.org (Next.js 16, static-first, AWS Amplify)
**Date:** 2026-06-05
**Status:** Approved — ready for build plan

## Problem

Thrive-FL.org has no testimonies page. The only social proof on the site is a single
hardcoded quote on the Small Groups page. We have 11 recorded testimonies ("Why Thrive?"
series + named stories) with transcripts already in hand and videos on YouTube. We want a
dedicated, evergreen page where new and considering visitors can hear why people love
Thrive.

## Goals

- A dedicated `/stories` section: an index page + one detail page per testimony.
- Each detail page shows video (if available), audio fallback (if no video), and the
  cleaned transcript (always).
- Zero backend work — fits the repo's "static-first / data from API or static files" rule.
- Reuse existing patterns (blog routes, markdown rendering, card/grid components).

## Non-Goals (out of scope)

- Transcription / AI pipeline — transcripts already exist.
- Blog API (ThriveChurchOfficialAPI) or MongoDB changes.
- Adding a `VideoUrl` field to the blog model.
- Header navigation entry (footer only).
- Inline quote blocks on other pages — a possible cheap follow-up once stories exist, not
  part of this work.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Storage | Static content files in the Next repo (no backend) |
| Media | Video (YouTube) if available → else audio (static host) → transcript always |
| Audio host | `static.thrive-fl.org/stories/<slug>.mp3` |
| Audio player | Lightweight native `<audio>` element — NOT the existing `AudioPlayerContext` |
| Transcript rendering | Reuse blog's `markdownToHtml`, extracted to a shared util |
| Navigation | Footer link only (not Header) |
| Route / title | `/stories`, titled "Stories", hero subtitle "Why Thrive?" |
| Editorial | Claude drafts all 11 cleaned testimonies; Wyatt reviews before publish |
| Soft delete | Static content carries `isActive` flag, honoring repo convention |

## Architecture

### Content model

One static data module under `app/stories/content/`. Each story:

```ts
interface Story {
  slug: string;          // URL-friendly, e.g. "myrna"
  name: string;          // "Myrna Steger-Graziano"
  title: string;         // short hook / headline for the card
  summary: string;       // one-line preview for card + meta description
  order: number;         // sort order on the index
  isActive: boolean;     // soft-delete convention; false = hidden
  youtubeId?: string;    // YouTube video id, if a video exists
  audioUrl?: string;     // e.g. https://static.thrive-fl.org/stories/myrna.mp3
  photoUrl?: string;     // optional headshot; falls back to a default
  transcript: string;    // cleaned markdown
}
```

Stories are read at build time. The active set is filtered (`isActive === true`) and
sorted by `order`.

### Routes (mirror the existing blog pattern)

- `app/stories/page.tsx` — index. Renders a grid of `StoryCard`s. Static.
- `app/stories/[slug]/page.tsx` — detail page.
  - `generateStaticParams()` — one path per active story.
  - `generateMetadata()` — title, description (from `summary`), OpenGraph (`type: article`),
    and Article JSON-LD. Modeled on `app/blog/[slug]/page.tsx`.
  - `notFound()` for unknown / inactive slugs.

### Detail page media logic

```
if story.youtubeId   → responsive YouTube iframe embed
else if story.audioUrl → <StoryMedia> native audio player
(transcript always rendered below)
```

### Components

- `StoryCard` — photo/name/hook → links to detail. Mirrors `SermonSeriesCard`.
- `StoryGrid` — grid wrapper. Mirrors `SermonSeriesGrid`.
- `StoryMedia` — picks video vs audio; renders the responsive YouTube embed or a small
  native `<audio>` element. Client component.
- Transcript — rendered via the shared markdown util (see below).

### Shared markdown util

Extract `markdownToHtml` (currently inline in `app/blog/[slug]/BlogContent.tsx`) into a
shared module (e.g. `app/lib/markdown.ts`). Both `BlogContent` and the story transcript
renderer consume it. Behavior must remain identical for the blog (no regression).

### Why NOT reuse `AudioPlayerContext`

The existing global audio player is hard-coupled to the `SermonMessage` type (series
title, artwork, persistent bottom bar). Bending it to testimonies costs more than a small
purpose-built `<audio>` element and would entangle two unrelated features. A native audio
element is sufficient for a single-clip story page.

### Navigation & SEO

- Add "Stories" link to `app/components/Footer.tsx`.
- Add `/stories` index + each `/stories/<slug>` to `app/sitemap.ts`.
- Add CTA links to `/stories` from `im-new` and `visit` pages (small additions).

### Styling

CSS Modules per component (repo convention). Reuse blog/sermon visual language for
cohesion (cards, detail header, content typography).

## Editorial work (content, parallel to build)

Claude drafts cleaned versions of all 11 testimonies:

- Remove spoken-word filler, self-corrections, and stage directions ("move the
  microphone").
- Trim fundraising / "support Thrive FGCU" / "give us your credit card" appeals — several
  testimonies were recorded for a support week and end with giving asks that read oddly on
  a public "why our church" page.
- Preserve each person's voice and the substance of their story.

Stories on hand: Myrna, Daysha, Dan, Kevin, John & Haley, James, Hugo & Ashley, Danielle,
Jaden, AJ, and a multi-person "MISC" piece. Wyatt reviews drafts before publish.

## Assets — provided

YouTube IDs (video stories) and audio-only fallbacks:

All 11 stories have published YouTube video:

| Story | slug | youtubeId |
|-------|------|-----------|
| Merna | merna | XET4Bl-COXs |
| Daysha | daysha | LPnRsykdC2M |
| Dan | dan | 3wTa3XGPWSc |
| Kevin | kevin | mnvstqzAEsI |
| John & Haley | john-and-haley | JDgI5SMyU40 |
| James | james | vwfnN2fqrrE |
| Hugo & Ashley | hugo-and-ashley | cDwjNgnAvKk |
| Danielle | danielle | Mvcb3lU5yOo |
| Jaden | jaden | 73GRlnXhOi4 |
| AJ | aj | _C22jptAHJk |
| MISC | misc | PUzuL4hfqXY |

**Name correction:** the first story is **Merna** (not "Myrna" as the raw transcript spells it).

**All stories now use video** — the audio-only fallback is no longer needed for any current
story. The `StoryMedia` audio branch and `audioUrl` field stay in the design (zero cost, useful
for future audio-only stories), but no mp3s need uploading for this release.

Still outstanding:
- Optional: a headshot per person for cards (default image used otherwise).

## Verification

- `pnpm build` produces a clean static export (required before PR).
- `pnpm lint` clean.
- `/stories` renders the grid; each `/stories/<slug>` renders with correct media branch
  (video where `youtubeId` set, audio where only `audioUrl` set, transcript always).
- Footer shows the Stories link; sitemap includes the new routes.
- Blog pages still render identically after the `markdownToHtml` extraction.

## PR target

`dev` (per repo convention).
