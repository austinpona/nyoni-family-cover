# Nyoni Brand System

Single source of truth for every Nyoni page, component, poster and document.
The machine truth is `src/app/globals.css` — these must always agree.

## Voice

**Three words:** calm, credible, warm.

**Never:** hype, exclamation marks, urgency tactics, "amazing", "revolutionary",
"empower", US idioms ("reach out", "touch base"), any wording that pressures a
grieving family.

**Person:** "you" for the visitor, "Nyoni" for the business.

**Reading level:** plain English, short sentences. Many visitors read English as
a second language.

**Category rule.** This is funeral support. A family reads this page during or
in anticipation of the worst week of their lives. Restraint reads as
competence. State facts plainly. Never sell.

Say the waiting period and the conditions **before** the visitor has to ask.
Hiding them would be the single fastest way to lose trust.

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `charcoal` | `#292825` | Body text, dark surfaces |
| `deep-black` | `#181714` | Hero, dark sections, footer |
| `cream` | `#f7f3ea` | Page background |
| `soft-cream` | `#fffdf9` | Raised surfaces |
| `gold` | `#89662f` | Links, primary buttons, emphasis on light |
| `light-gold` | `#c5a165` | Accents on dark, hover states |
| `muted` | `#5f625f` | Secondary text — verified 4.5:1 on cream |
| `whatsapp` | `#24764b` | WhatsApp actions only |

**Accent footprint:** gold stays under ~10% of any screen. It marks actions and
one emphasis per heading — never decoration.

**Contrast:** `muted` on `cream` is the tightest pair in the system and passes
4.5:1. Never introduce a lighter grey for body text. On dark sections, body
text sits at `cream/70` or above — never below.

## Type

Three fonts, each with one job. Do not add a fourth.

| Role | Font | Treatment |
| --- | --- | --- |
| Display | Barlow Condensed 600 | Uppercase, `-0.025em`, line-height 0.95 |
| Body | Libre Franklin 400/600 | 16px minimum, line-height 1.6–1.75 |
| Accent | Cormorant Garamond 600 italic | Headline emphasis only |

**The signature.** Major headings pair condensed uppercase with a gold serif
italic phrase:

> Practical support. *When it matters.*
> One family. *A plan that fits.*
> Your family should not *face it alone.*

One serif phrase per heading. Two makes it noise, none makes it generic.

Loaded via `next/font/google` with `display: "swap"`.

## Space

Base 4px. Sections use `.section-pad` — `clamp(4rem, 8vw, 7rem)`.
Container is `.container-shell` — `min(100% - 2rem, 78rem)`.

## Shape

- **Radius:** sharp by default. Cards may use `rounded-xl`; buttons never round.
- **Borders:** hairline at 15–20% charcoal on light, 12% white on dark.
- **Shadows:** one soft elevation, never stacked.

## Motion

150–300ms, ease-out, `transform` and `opacity` only. Scroll reveals play once —
never re-animate on scroll-up. The marquee is the only continuous motion and
must stop under `prefers-reduced-motion`.

## Rhythm

The page alternates dark and light. This is the structural identity:

```
dark hero → dark stats → marquee → cream → dark how-it-works → cream → dark footer
```

Never let three light sections run consecutively.

## Locale

- Currency **R210**, larger amounts **R1 234,56** (space separator, comma decimal)
- Phone **063 602 1868**, links as `+27636021868`
- Dates **DD/MM/YYYY**
- `lang="en"`, OpenGraph `locale: "en_ZA"`

## Never

- Purple-to-blue gradients
- Emoji as icons (lucide-react only)
- Stock photography of unrelated smiling people
- Three identical feature cards
- Centred everything
- A fourth font
- Hardcoded hex values in components — use tokens, or the next rebrand misses them

## Applying this

Reference this file before generating any Nyoni asset — page, component,
poster, PDF, social graphic. For `design-studio` runs, paste Colour, Type and
Never into every agent brief as locked constraints.
