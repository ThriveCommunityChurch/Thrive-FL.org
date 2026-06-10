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
