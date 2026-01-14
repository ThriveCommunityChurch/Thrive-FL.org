import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * CriticalCSS Component
 * 
 * Inlines critical above-the-fold CSS directly into the HTML head.
 * This eliminates render-blocking CSS requests for the initial paint.
 * 
 * The full app.css is still loaded but won't block rendering because
 * the critical styles are already applied.
 */
export default function CriticalCSS() {
  // Read the critical CSS file at build time
  const criticalCSSPath = join(process.cwd(), 'app', 'critical.css');
  
  let criticalCSS = '';
  try {
    criticalCSS = readFileSync(criticalCSSPath, 'utf-8');
  } catch {
    // In development or if file doesn't exist, return nothing
    console.warn('Critical CSS file not found, skipping inline styles');
    return null;
  }

  // Minify CSS by removing comments, extra whitespace, and newlines
  const minifiedCSS = criticalCSS
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove space around punctuation
    .trim();

  return (
    <style
      id="critical-css"
      dangerouslySetInnerHTML={{ __html: minifiedCSS }}
    />
  );
}

