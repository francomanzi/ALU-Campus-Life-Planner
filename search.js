// scripts/search.js — Juventus (safe regex compiler + highlight)

// Safe compile: returns RegExp or null on bad pattern
export function juventusCompile(input, flags = 'i') {
  if (!input || input.trim() === '') return null;
  try {
    return new RegExp(input, flags);
  } catch {
    return null;
  }
}

// Highlight all matches with <mark>, HTML-escaping the rest
export function juventusHighlight(text, re) {
  if (!re) return escHtml(String(text));

  const str = String(text);
  // Always use global flag so we get all matches
  const gRe = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');

  let result = '';
  let last = 0;
  let match;

  while ((match = gRe.exec(str)) !== null) {
    result += escHtml(str.slice(last, match.index));
    result += `<mark>${escHtml(match[0])}</mark>`;
    last = gRe.lastIndex;
    // Guard against zero-length matches looping forever
    if (match[0].length === 0) gRe.lastIndex++;
  }

  result += escHtml(str.slice(last));
  return result;
}

function escHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

