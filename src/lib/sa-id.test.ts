/**
 * Run with: npm test
 *
 * Uses Node's built-in test runner and native TypeScript stripping, so the
 * repo gains test coverage without gaining a test framework, a config file or
 * a single dependency. That matters here: this project is maintained on a slow
 * machine, and every dependency is a future upgrade someone has to do.
 *
 * No real person's ID number appears below. Valid numbers are constructed from
 * a stem plus a computed check digit.
 */
import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { isValidSaIdNumber, maskSaIdNumber, saIdCheckDigit } from "./sa-id.ts";

/** Builds a well-formed ID from a 12-digit stem. */
const valid = (stem12: string) => stem12 + String(saIdCheckDigit(stem12));

describe("isValidSaIdNumber", () => {
  it("accepts well-formed numbers across a range of birth dates", () => {
    for (const stem of [
      "800101500108", // 1 Jan, male sequence, citizen
      "010229500008", // 29 Feb — the century is unknown, so leap days must pass
      "751231499908", // 31 Dec, female sequence
      "600615123408",
      "451105000018", // permanent resident
    ]) {
      assert.equal(isValidSaIdNumber(valid(stem)), true, `expected ${valid(stem)} to be valid`);
    }
  });

  it("rejects anything that is not exactly 13 digits", () => {
    assert.equal(isValidSaIdNumber(""), false);
    assert.equal(isValidSaIdNumber("123"), false);
    assert.equal(isValidSaIdNumber("80010150010800"), false);
    assert.equal(isValidSaIdNumber("80010150010a"), false);
    assert.equal(isValidSaIdNumber("8001015001o81"), false);
  });

  it("rejects a wrong check digit", () => {
    const good = valid("800101500108");
    const lastDigit = Number(good[12]);
    const bad = good.slice(0, 12) + String((lastDigit + 1) % 10);
    assert.equal(isValidSaIdNumber(good), true);
    assert.equal(isValidSaIdNumber(bad), false, "a single wrong check digit must fail");
  });

  it("catches a single-digit typo, which is the whole point", () => {
    const good = valid("800101500108");
    let caught = 0;
    for (let i = 0; i < 12; i += 1) {
      for (let d = 0; d <= 9; d += 1) {
        if (String(d) === good[i]) continue;
        const typo = good.slice(0, i) + String(d) + good.slice(i + 1);
        if (!isValidSaIdNumber(typo)) caught += 1;
      }
    }
    // Luhn catches every single-digit substitution.
    assert.equal(caught, 108, "expected all 108 single-digit typos to be rejected");
  });

  it("rejects impossible dates even when the checksum is right", () => {
    assert.equal(isValidSaIdNumber(valid("990231000008")), false, "31 February");
    assert.equal(isValidSaIdNumber(valid("991301000008")), false, "month 13");
    assert.equal(isValidSaIdNumber(valid("990001000008")), false, "month 00");
    assert.equal(isValidSaIdNumber(valid("990100000008")), false, "day 00");
    assert.equal(isValidSaIdNumber(valid("990432000008")), false, "day 32");
    assert.equal(isValidSaIdNumber(valid("990431000008")), false, "31 April");
  });

  it("ignores surrounding whitespace", () => {
    const good = valid("800101500108");
    assert.equal(isValidSaIdNumber(` ${good} `), true);
    assert.equal(isValidSaIdNumber(`${good.slice(0, 6)} ${good.slice(6)}`), true);
  });
});

describe("maskSaIdNumber", () => {
  it("hides the sequence block", () => {
    const good = valid("800101500108");
    const masked = maskSaIdNumber(good);
    assert.equal(masked.includes("****"), true);
    assert.equal(masked.includes(good.slice(6, 10)), false, "sequence must not survive masking");
  });

  it("does not pretend an invalid number is fine", () => {
    assert.equal(maskSaIdNumber("nope"), "invalid");
  });
});
