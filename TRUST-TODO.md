# Trust materials to collect from Nyoni

The site is well built and honest, but it contains **no evidence that Nyoni is
real**. No founder, no address, no registration, no member who will vouch.

In South Africa, funeral cover has a long history of people losing money to
schemes that disappeared. A polished anonymous website does not read as
professional to that audience — it reads as risk. This is the single largest
remaining weakness on the site, and no amount of design fixes it.

**Nothing below may be invented, estimated or rounded up.** A fabricated member
count on a funeral product is fraud, and one family discovering it would end the
business. Collect the real answers, then the site can state them.

## Ask the client for

### Identity — highest priority

- [ ] **Who runs Nyoni.** A real name, role and a photograph. One face changes
      the page more than any redesign.
- [ ] **How long it has operated.** "Serving families since 2019" is worth more
      than every visual choice on the site.
- [ ] **Where it is based.** Town and province at minimum; a physical address if
      there is an office families can visit.
- [ ] **Registration or legal status.** Company registration number, or the
      structure it operates under (burial society, stokvel, NPO, FSP licence).
      If it is unregistered, say nothing rather than imply otherwise.

### Proof it works

- [ ] **How many families are currently members.** Only if the exact figure is
      known.
- [ ] **One or two families who will vouch**, with permission to use their words
      and their name or initials.
- [ ] **Photographs of an actual delivery** — a real cow, real maize meal, a real
      bakkie on a real day. These would be the most persuasive images the site
      could carry, and far better than stock or generated imagery.
- [ ] **Community leaders or churches** who know Nyoni and permit being named.

### Operational clarity

- [ ] **Exactly how payment is made** — EFT, cash, debit order, and to whom.
      Vagueness here is where trust dies.
- [ ] **Exactly who to contact on the day**, and whether that number is answered
      after hours. A funeral does not wait for business hours.
- [ ] **Which areas are actually served.** The site currently says "South
      Africa"; the schema says the same. If delivery is realistically Limpopo
      and surrounds, say Limpopo. Over-claiming coverage is a promise that will
      be broken at the worst possible moment.

## Where each goes once collected

| Material | Placement |
| --- | --- |
| Founder name + photo + years operating | New "Who is Nyoni" section, directly after `WaitingPeriod` |
| Registration number, address | Footer, near the legal links |
| Member count, testimonials | Replace or supplement the stats strip |
| Delivery photographs | The `Benefits` section, replacing the illustrated icons |
| Payment method, contact-on-the-day | `HowItWorks`, and the FAQ |
| Real service area | `page.tsx` LocalBusiness schema `areaServed`, and the copy |

## Already fixed in code

- The stats strip no longer poses as social proof — it is labelled "membership
  terms at a glance", because that is what those four numbers are.
- The six-month waiting period is now explained rather than merely stated.
- WhatsApp is the primary call to action, ahead of the online form.
