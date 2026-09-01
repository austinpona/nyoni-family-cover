/**
 * South African ID number validation.
 *
 * The application form used to accept any 13 digits. That is a real problem on
 * this product rather than a tidiness one: a mistyped ID passes the form, goes
 * into the WhatsApp message, and is only caught at Department of Home Affairs
 * verification — which happens when the family is claiming, i.e. the worst
 * possible moment to discover a typo made months earlier.
 *
 * Structure: YYMMDD SSSS C A Z
 *   0-5   date of birth
 *   6-9   sequence (0000-4999 female, 5000-9999 male)
 *   10    citizenship (0 citizen, 1 permanent resident)
 *   11    legacy digit, carries no meaning — do not read it
 *   12    Luhn check digit
 *
 * A valid checksum means the number is well-formed. It does NOT mean it belongs
 * to the person in front of you, and nothing here is a substitute for Home
 * Affairs verification.
 */

/** Rejects impossible dates such as 9902310000000 (31 February). */
function parseIdDateParts(digits: string): { year: number; month: number; day: number } | null {
  const year = Number(digits.slice(0, 2));
  const month = Number(digits.slice(2, 4));
  const day = Number(digits.slice(4, 6));
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  // Validate against the real length of that month. The century is unknown, so
  // February is checked against a leap year — 29 February is accepted, and the
  // century ambiguity is resolved by a human against the document, never here.
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > daysInMonth[month - 1]) return null;
  return { year, month, day };
}

export function isValidSaIdNumber(id: string): boolean {
  const digits = id.replace(/\s/g, "");
  if (!/^\d{13}$/.test(digits)) return false;
  if (!parseIdDateParts(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 13; i += 1) {
    let d = Number(digits[i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

/**
 * The check digit for a 12-digit stem. Used by the tests to build valid
 * numbers without hardcoding real people's IDs.
 */
export function saIdCheckDigit(stem12: string): number {
  if (!/^\d{12}$/.test(stem12)) throw new Error("Expected 12 digits");
  let sum = 0;
  for (let i = 0; i < 12; i += 1) {
    let d = Number(stem12[i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return (10 - (sum % 10)) % 10;
}

/** Masked form for anything a human might read over a shoulder, or a log. */
export function maskSaIdNumber(id: string): string {
  const d = id.replace(/\s/g, "");
  if (!/^\d{13}$/.test(d)) return "invalid";
  return `${d.slice(0, 6)} **** ${d.slice(10, 12)} ${d.slice(12)}`;
}
