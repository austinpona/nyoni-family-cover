# Trust materials — what is collected, and what is still missing

Last updated: 30 August 2026.

The site used to carry **no evidence that Nyoni is real**. That has changed. It
now names the person who runs it, the town it operates from, the registered
company behind it, and it carries one real photograph. That was the single
largest weakness on the site and it is now substantially closed.

**Nothing below may be invented, estimated or rounded up.** A fabricated member
count on a funeral product is fraud, and one family discovering it would end the
business.

Authority for every public claim is
`../nyoni marketing tean/CLAIMS.md`. If a claim is not VERIFIED there, it does
not go on this site.

## Collected — now live on the site

- [x] **Who runs Nyoni.** Austin Pona, **manager**. Confirmed 7 August 2026.
      *Never upgrade that title.* Not "founder", not "owner", not "director" —
      those belong to Humphrey Kurisani Mandlazi, the sole CIPC director.
      Printing them for Pona would be a false statement about who controls a
      funeral business.
- [x] **Where it is based.** Phalaborwa, Limpopo. Serving all of Limpopo.
      `areaServed` in the page schema was corrected from "South Africa" to
      Limpopo — over-claiming coverage is a promise that breaks on the worst
      possible day.
- [x] **Registration.** Nyoni Community Cover (Pty) Ltd, 2026/657999/07,
      registered 19 August 2026. Verified from the COR 14.3 certificate.
      Carried in the new `WhoWeAre` section, the footer, `/terms` and
      `/privacy`.
- [x] **One real photograph.** Nyoni's own cattle, Limpopo, August 2026
      (`public/images/nyoni-cattle-limpopo.webp`; untouched original in
      `assets/photographs/`). Captioned as what it is — it is **not** a
      delivery to a family and nothing may imply that it is.

### The wording rule that governs all of it

Registration means the company legally exists. It does **not** mean the product
is approved, guaranteed, insured or underwritten. The site says so explicitly,
in the section that carries the number. That caveat is not a disclaimer to be
trimmed later — it is the brand position.

**Still forbidden in all public material:** insured · underwritten · policy ·
cover is guaranteed · FSP licence · NPO number · any insurer's name.

The registered office is **deliberately not published**. 2 Troupand Street is a
private home and the director's residential address. It is public record on
CIPC, but printing it on a website is a different act from it being findable.

## Still missing — ask the client

- [ ] **How long Nyoni has operated.** "Serving families since 2019" is worth
      more than every visual choice on the site. Never estimate it.
- [ ] **A photograph of Austin.** Name, role and town are confirmed; the face is
      not. One portrait would do more than any redesign.
- [ ] **Photographs of an actual delivery** — a real cow, real maize meal, a real
      bakkie, on a real day, with the family's written permission. Both the
      strategy document and the restructure briefing independently name this as
      the highest-value asset Nyoni could own. **The next delivery must be
      photographed.**
- [ ] **How many families are members.** Only if the exact figure is known.
- [ ] **One or two families who will vouch**, with permission to use their words.
- [ ] **Exactly how payment is made** — EFT, cash, debit order, and to whom.
      Currently the site directs everyone to WhatsApp instead, which is correct
      until this is confirmed in writing.
- [ ] **The duration of "20 loaves of bread per day"** on the On the Go add-on.
      Do not market that add-on until it is fixed.

## Open risks carried into the site — not design problems

These come from `Nyoni-Restructure-Decision.pdf` (25 August 2026) and are
recorded here because they affect what the site says.

1. **The R1 500 duplicate-registration rule is still live on this site.**
   The briefing (§7.1, decision 2) says to remove it: it is a cash payment on a
   death, and the cleanest possible evidence of carrying on insurance business.
   Austin's decision on 30 August 2026 was to **leave it in place** until both
   founders agree the replacement. This is the top open risk on the site.
   Replacement options in the briefing are the goods portion to the second
   family, or a refund of contributions — not rands.

2. **`/terms` and `/privacy` are still not attorney-reviewed** while the
   application form collects SA ID numbers. The briefing calls this a live POPIA
   exposure that exists today, independent of everything else. The privacy
   notice now names the responsible party (the registered company), which it
   could not do before, but **no Information Officer is named** — POPIA requires
   a responsible person, and until one is, the phone number carries that role.

3. **"No age limit. No health questions."** is still on the site and is still
   one of Nyoni's strongest lines. The briefing's arithmetic (§5) shows it is
   anti-selection: the product breaks even at about age 70. The recommended fix
   is a published age surcharge above 70 rather than a refusal — decision 4,
   needing both founders and an actuary. **No site change has been made here**;
   it is a product decision, not a copy decision.

4. **February 2027** is when the first members clear six paid months and a claim
   becomes possible. Everything above is sized against that date.

## Already fixed in code

- The **arrears contradiction is gone.** The site said "outstanding payments must
  be settled before claiming" while `BUSINESS_RULES.md` A4b says Nyoni tracks no
  arrears. The briefing flagged it as something a member would find and a
  regulator would read as evasiveness. Removed from `site-data.ts`, `faq.tsx`
  and `/terms`, and replaced with the verified wording: a missed month pauses
  your count, Nyoni is not a lender, your months must simply be paid up to claim.
- The **lapse rule** now states the firm version paired with the recovery —
  stating the lapse without "pay again and you are active again" is technically
  true and practically cruel.
- The stats strip is labelled "membership terms at a glance", because that is
  what those four numbers are — not social proof.
- The six-month waiting period is explained rather than merely stated.
- WhatsApp is the primary call to action, ahead of the online form.
