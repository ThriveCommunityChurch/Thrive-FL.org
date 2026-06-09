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
