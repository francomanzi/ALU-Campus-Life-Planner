// scripts/validators.js — Madrid (regex validation)

// Rule 1: No leading/trailing spaces, non-empty
const DESC_PATTERN = /^\S(?:.*\S)?$/;

// Rule 2: Positive number, up to 2 decimal places
const DURATION_PATTERN = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

// Rule 3: YYYY-MM-DD date format
const DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

// Rule 4: Letters only; words separated by a space or hyphen
const TAG_PATTERN = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// Advanced Rule A: back-reference — detects duplicate adjacent words (e.g. "the the")
const DUPE_WORDS = /\b(\w+)\s+\1\b/i;

// Advanced Rule B: negative lookahead — description must not be all digits
const NOT_ALL_DIGITS = /^(?!\d+$).+$/;

export const madridRules = {
  description: { pattern: DESC_PATTERN, message: 'Cannot start or end with a space.' },
  duration:    { pattern: DURATION_PATTERN, message: 'Enter a number like 1 or 1.5 (max 2 decimal places).' },
  date:        { pattern: DATE_PATTERN, message: 'Use YYYY-MM-DD format (e.g. 2025-09-29).' },
  tag:         { pattern: TAG_PATTERN, message: 'Letters only. Words can be separated by spaces or hyphens.' }
};

// Returns an error string, or null if valid
export function madridValidate(field, value) {
  const rule = madridRules[field];
  if (!rule) return null;

  const v = String(value).trim();

  if (v === '') return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;

  if (!rule.pattern.test(value)) return rule.message;

  // Extra checks on description only
  if (field === 'description') {
    if (DUPE_WORDS.test(v)) return 'Duplicate adjacent words detected (e.g. "the the").';
    if (!NOT_ALL_DIGITS.test(v)) return 'Description cannot be numbers only.';
  }

  return null; // valid
}

// Export the individual advanced matchers for tests
export function madridDuplicateWords(text) {
  return DUPE_WORDS.test(text);
}

export function madridNotAllDigits(text) {
  return NOT_ALL_DIGITS.test(text.trim());
}

