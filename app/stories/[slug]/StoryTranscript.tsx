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
