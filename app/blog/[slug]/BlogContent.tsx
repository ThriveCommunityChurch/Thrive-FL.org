"use client";

interface BlogContentProps {
  content: string;
}

/**
 * Converts basic markdown to HTML
 * Handles: headers (##), bold (**), paragraphs, quotes
 */
function markdownToHtml(markdown: string): string {
  // Process line by line
  const lines = markdown.split('\n');
  const htmlLines: string[] = [];
  let inParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Skip the title if it matches first line (already shown in header)
    if (i === 0 && !line.startsWith('##') && !line.startsWith('**')) {
      continue;
    }

    // Empty line - close paragraph if open
    if (!line) {
      if (inParagraph) {
        htmlLines.push('</p>');
        inParagraph = false;
      }
      continue;
    }

    // Headers (## Heading)
    if (line.startsWith('## ')) {
      if (inParagraph) {
        htmlLines.push('</p>');
        inParagraph = false;
      }
      const headerText = line.slice(3);
      htmlLines.push(`<h2>${escapeHtml(headerText)}</h2>`);
      continue;
    }

    // Process inline formatting
    line = processInlineFormatting(line);

    // Regular paragraph
    if (!inParagraph) {
      htmlLines.push('<p>');
      inParagraph = true;
    } else {
      htmlLines.push(' ');
    }
    htmlLines.push(line);
  }

  // Close any open paragraph
  if (inParagraph) {
    htmlLines.push('</p>');
  }

  return htmlLines.join('');
}

/**
 * Process inline markdown formatting (bold, quotes)
 */
function processInlineFormatting(text: string): string {
  // Escape HTML first
  let result = escapeHtml(text);

  // Bold: **text** -> <strong>text</strong>
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Curly quotes are already in content, wrap them in a styled span
  // Match quoted text between curly quotes (use a placeholder to avoid re-matching)
  result = result.replace(/[""]([^""]+)[""]/g, '<span class=\'blog-quote\'>"$1"</span>');

  // Also handle straight quotes that aren't part of HTML attributes
  // Only match quotes that have content and aren't preceded by = (attribute values)
  result = result.replace(/(?<!=)"([^"<>]+)"(?!>)/g, '<span class=\'blog-quote\'>"$1"</span>');

  return result;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return text.replace(/[&<>]/g, (char) => map[char] || char);
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

