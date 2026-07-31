# Flare — Guest Memory Layer for Independent Hospitality

*Working concept document — v0.1*

---

## 1. One-line summary

Flare is a guest-memory and relationship layer that plugs into a property's existing PMS (and, longer-term, other lifestyle venues) to help hospitality staff remember, understand, and act on guests as individuals — especially in the long silence *between* stays, where most of the relationship actually lives and where most loyalty systems have nothing to offer.

Flare is not a loyalty program. It has no points, no tiers, no punch cards. It is a quiet intelligence layer that turns scattered, half-forgotten details about a guest into a small number of well-timed, human-delivered moments of care.

---

## 2. The problem: the neglected window

Hospitality technology has optimized almost everything about the stay itself — booking, check-in, room assignment, billing, post-stay surveys. What it has almost entirely ignored is the interval *between* stays, which for most guests is the majority of the year.

During that interval:
- Taste and circumstance drift. A guest who wanted a quiet room in spring may be traveling with a newborn by winter.
- Memory fades — not the guest's memory of the hotel, but the hotel's memory of the guest. Staff turn over. Notes live in someone's head or a sticky note, not in a system.
- Competitors quietly interject. A well-timed email from a competing property can capture a guest a hotel already earned the right to keep, simply because the hotel said nothing in the meantime.

Traditional loyalty programs respond to this with tiers, points, and a promotional calendar borrowed from mass retail. This creates the opposite of intimacy: guests feel *tracked*, not *remembered*. A birthday email with a 10%-off code is not memory — it is automation wearing memory's clothes.

Flare starts from a different premise: **the inter-stay interval is the main surface, not the afterthought.** The product's job is to produce a small number of sharp, well-spaced reinstatements of memory — few enough, and quiet enough, that each one still lands as care rather than as another line item on a marketing calendar.

Design commitments that follow from this:
- No tiers or points. Loyalty mechanics are not the point; being known is the point.
- Intelligence stays backstage. The guest should never interact with "the system" — they interact with a person who happens to remember things well.
- No promotional cadence copied from retail. Frequency is governed by relevance and restraint, not a content calendar.
- Guests should feel *understood*, never *targeted*.

---

## 3. The engine: capture → model → orchestrate → deliver

Flare is structured as a loop, not a database. Each stage feeds the next, and outcomes flow back in to refine the model.

### 3.1 Capture

Flare pulls from two kinds of sources, deliberately combined:

**Structured, formal data — already sitting in the PMS:**
- Stay history: dates, room types, rate context, length of stay, booking channel
- Guest profile fields already on file: contact info, past requests, billing history
- Operational records: past service requests, maintenance tickets tied to a stay, loyalty/CRM fields if they already exist

**Unstructured, informal signals — the layer no PMS captures today:**
- Voice notes and short verbal fragments from any staff member (front desk, concierge, housekeeping, F&B) — captured through a frictionless "whisper box," not a form
- Concierge conversations and their content, not just the fact that a conversation happened
- Behavioral signals: time spent looking at a property or experience the guest never actually booked
- Firm rejections — declined offers, "no" to an upsell, a request that was clearly refused — weighted with real signal strength, not discarded. A hard "no" is treated as informative as a strong "yes."

The combination matters. PMS data tells you *what happened*. The informal layer tells you *what it meant*. Flare treats both as inputs to the same guest model, rather than keeping "official" data in the PMS and "soft" impressions in someone's head.

### 3.2 Model

Captured fragments are not stored as a flat CRM row ("last stay: March; preference: king bed"). They are assembled into a **living taste graph** per guest, which includes:

- **Taste vectors** — a continuously updated representation of preferences across room ambience, dining style, wellness interests, pace of travel, social vs. private orientation, and so on
- **Rejection half-lives** — a declined offer doesn't stay "declined" forever; its relevance decays or resurfaces depending on context, the same way a real relationship would reinterpret an old "no" in light of new circumstances
- **Companion modes** — recognition that the same guest behaves differently traveling solo, as a couple, with family, or with colleagues, and the model should not flatten these into one preference set
- **Drift detection** — explicit tracking of when a guest's pattern is changing (a couple who now travels with an infant; a solo business traveler who has started extending trips for leisure), so the system notices the person changing before the relationship goes stale

This is the core IP distinction from a traditional CRM: a CRM stores facts about a guest. Flare's model represents a guest as an evolving person, and treats staleness as a first-class signal to watch for.

### 3.3 Orchestrate

Before anything reaches a guest, or a staff member acting on a guest's behalf, it passes through governance logic:

- **Cadence governor** — actively limits frequency. The system's default posture is silence; it has to earn the right to surface something, not the reverse.
- **Sensitivity gate** — screens for tone and timing risk (e.g., don't resurface a "return to where you had that anniversary dinner" prompt if the model's confidence about the occasion is low, or if enough time has passed that it could land as intrusive rather than thoughtful).
- **Architectural/stylistic fit** — recommendations and phrasing are shaped to match the specific property's character, not a generic template. A minimalist mountain retreat and a maximalist urban boutique hotel should not sound alike.
- **Staff voice adapter** — outgoing suggestions are shaped so a specific staff member can deliver them in their own words, not as a canned script.

### 3.4 Deliver

This is the most important structural decision in the product, and it is **not** "send an automated message."

Flare's output is most often an **action surfaced to the right human being**, not a message sent directly to the guest. For example: a prompt to a specific staff member — "Reach out to [guest] today. You noted last year they mentioned expecting a child around this time — worth a personal note or call" — rather than an automated SMS to the guest themselves.

This distinction matters for three reasons:
1. **Trust and tone control.** A human deciding whether and how to act preserves the "remembered, not marketed to" feeling that is the entire value proposition. Automation that reaches the guest directly, even if well-personalized, risks collapsing back into the retail cadence Flare is explicitly trying to avoid.
2. **Judgment for edge cases.** A human can recognize when a signal is wrong, outdated, or inappropriate to act on (e.g., a guest who mentioned a pregnancy that may not have gone to term) in a way a fully automated send cannot.
3. **Differentiation from every automated CRM/marketing tool on the market.** Most competitors' entire pitch is "automate the outreach." Flare's pitch is closer to "give the right human the right memory at the right moment, and get out of the way."

Delivery, when it does involve direct guest contact, is restricted to private channels (not broadcast marketing channels), and always initiated or sent by a human.

---

## 4. Illustrative example (paraphrased, not verbatim from any existing source)

A guest mentions, almost in passing, over breakfast, that a flavor on the table reminded her of childhood summers. The moment isn't logged as a "preference" in any formal sense — it's just a fragment a server happened to notice and drop into the whisper box.

Months later, something small and unannounced arrives during a return stay: a dish echoing that flavor, or a short handwritten note referencing it. No promotion, no logo, no obvious mechanism. The guest doesn't experience "the system" — she experiences being remembered by people who, as far as she can tell, just paid attention.

That is the product's entire ambition compressed into one moment: **quiet correctness, not visible cleverness.**

---

## 5. Why this is not a loyalty program, and why that distinction is commercially important

| Traditional loyalty / CRM | Flare |
|---|---|
| Points, tiers, punch cards | No points, no tiers |
| Guest is a segment ("Gold member") | Guest is an individual, modeled continuously |
| Marketing calendar drives frequency | Relevance and restraint drive frequency |
| Automated send is the end product | A human decision/action is the end product |
| Rejections are noise to filter out | Rejections are signal, weighted like acceptances |
| Optimized for the stay and the next booking | Optimized for the interval between stays |
| One CRM record per guest | A living, decaying, evolving taste graph per guest |

This distinction is what should be led with commercially: Flare is not competing with loyalty/CRM vendors on features. It is arguing that the entire category has been solving the wrong interval — the stay — while ignoring the interval that actually determines whether a guest comes back.

---

## 6. Product architecture and PMS relationship

Flare is explicitly designed as a **layer that sits on top of a property's existing PMS**, not a replacement for one.

- **Data in:** reads stay history, guest profile, and reservation data from the PMS via API/integration.
- **Data in (informal):** captures voice notes, staff observations, and behavioral signals through its own lightweight capture surface (the "whisper box") — this is unstructured input a PMS was never built to hold.
- **Data out:** surfaces recommended actions to staff (via whatever interface — dashboard, notification, or eventually integrated into the PMS's own staff-facing screens) and, less often, sends direct guest communication through private channels.

This "sits on top of, does not replace" positioning is deliberate for two reasons:

1. **Lower integration risk for the hotel.** A property does not need to migrate its core operating system to adopt Flare — a major factor in adoption speed for independent and boutique properties that are often wary of long, disruptive PMS migrations.
2. **Positioning relative to existing distribution/channel-management infrastructure (e.g., RateWizz-style products, PMS partner ecosystems).** Flare is not a competitor to a channel manager or PMS — it is a natural complement that can be distributed through the same PMS partnerships a channel-management business already has, without displacing any existing vendor relationship. This makes it a plausible "adjacent layer" for a group like AROBS to add to an existing hospitality-technology portfolio (RateWizz for distribution, a PMS partner for operations, Flare for guest relationship) rather than a rip-and-replace pitch.

---

## 7. Target segment

Flare's guest-memory model — high-touch, staff-mediated, built around individual richness rather than segment-level automation — only makes economic and cultural sense for properties where:

- Guests are (or could become) meaningfully repeat visitors
- Staff have (or could have) direct, ongoing relationships with guests, rather than pure high-volume, low-touch turnover
- The brand promise already leans on personalization and distinctiveness, not price or scale

This points toward **independent luxury and boutique hotels**, rather than budget or high-volume branded chains. This is the same segment the broader Nestino product concept targets, and the same segment RateWizz's mass-market, white-label distribution model does *not* primarily serve — which is the basis for positioning Flare as a complementary, non-overlapping addition to an existing hospitality-technology portfolio rather than internal competition.

---

## 8. Open questions to resolve before going to market

These are flagged honestly, not glossed over, because they materially affect how the business case should be pitched:

1. **Data ownership and consent architecture.** The product depends on capturing informal, sometimes sensitive personal information (health context, family circumstances, emotional disclosures). A clear, guest-facing consent model is not optional — it is core to the "guests should feel understood, never targeted" promise being credible rather than creepy. This needs a concrete legal/privacy design (GDPR-compliant, given the Romanian/EU market) before any pilot.

2. **Operational load on staff.** The capture mechanism ("whisper box") requires staff behavior change — actually logging fragments in the moment. Adoption research should validate that this is lower-friction than it sounds, or the product's core data source will simply not fill up.

3. **Cold-start problem.** The model's value compounds over time and multiple stays. Early guests, and any property just starting with Flare, will see a much thinner "taste graph" than the product's marketing examples suggest. The pitch and the pilot design should account for this honestly.

4. **What "delivery as action" requires operationally.** Prompting a staff member to "call this guest today" only works if someone is actually empowered and available to act on the prompt. This is a heavier organizational dependency than a fully automated system, and should be scoped clearly with any pilot property (who owns follow-through, and how is it measured).

5. **Brand-name clearance.** "Flare" should be checked for trademark conflicts and domain availability in relevant markets before further investment in brand collateral — this has not yet been verified.

---

## 9. Relationship to the rest of the Nestino concept

Flare originated as "Curina," the guest-identity and lifestyle-network layer inside the broader Nestino hospitality OS concept (PMS + direct-demand engine + guest layer). As a standalone pitch — particularly to a strategic partner like AROBS — Flare can be positioned either:

- **As an integration-ready layer** that plugs into any existing PMS a partner already has relationships with (the more conservative, faster-to-pilot pitch), or
- **As part of the broader Nestino OS vision** (the more ambitious, higher-risk-higher-reward pitch), where PMS, direct demand, and guest memory share one operating layer.

For an initial conversation with a strategic, publicly listed partner, the narrower "integration-ready layer" framing is likely the lower-friction entry point: it asks for a pilot, not a bet on an unproven full operating system.

---

*This document reflects an early-stage concept and has not yet been market-tested with paying customers. It should be treated as a working thesis to be refined through partner conversations and pilot data, not as validated fact.*