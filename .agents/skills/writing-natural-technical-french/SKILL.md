---
name: writing-natural-technical-french
description: Use when drafting or revising French professional or technical prose that feels formulaic, inflated, repetitive, mechanically structured, or insufficiently grounded in available facts.
---

# Writing Natural Technical French

## Outcome

Write French that a competent practitioner could plausibly have written for the intended reader. Preserve the source's meaning, uncertainty, constraints, terminology, and voice.

Priority: **fidelity → reader fit → precision → clarity → natural rhythm → concision**.

The user's requested voice and format take precedence. Do not turn creative, commercial, legal, or intentionally informal writing into neutral technical prose unless asked.

## Establish the frame

Before drafting, determine from the request and sources:

- the document type and intended reader;
- what the reader must understand, decide, or do;
- the facts available and their level of certainty;
- the appropriate technical depth and the author's existing voice.

If the reader is unspecified, infer the most likely reader from the document. Use only the technical depth that reader needs.

## Interactive decisions

When an optional clarification or user decision would materially improve the writing, use `request_user_input` when it is available in the current mode.

Use it for consequential editorial choices such as:

- intended reader or recruitment target;
- tone and degree of technical detail;
- document structure or emphasis;
- which source should take precedence;
- how to handle a material factual contradiction.

For each call:

- prefer one focused question and never exceed three;
- provide 2–3 concise, mutually exclusive options;
- place the recommended option first and label it `(Recommended)`;
- explain the practical effect of each option in one short sentence;
- do not add an `Other` option because the interface provides it automatically.

If `request_user_input` is unavailable, ask one concise plain-text question only when the answer is required to continue safely. If the question is optional and receives no answer, continue using the best-supported assumption and state that assumption when it materially affects the result.

Do not use `request_user_input` for permission requests, destructive actions, external side effects, or confirmations that require explicit authorization. Ask those questions directly in plain text at the point when authorization is required. Do not ask about minor details that can reasonably be inferred from the document, its audience, or the available evidence.

## Writing contract

Build the text around **context → main information → explanation or evidence → consequence**. Adapt that shape when another order is clearer; do not manufacture sections to fill it.

Use concrete subjects and verbs. Keep stable technical terms instead of varying them for style. Let a sentence provide information, state a logical relation, or make a necessary transition. Remove it when it only praises, announces, repeats, or dramatizes.

For drafting, organize around the reader's need. For rewriting, preserve useful authorial voice and every material qualification. For summarizing, prioritize material facts over source order, including figures, dates, thresholds, dependencies, exceptions, risks, decisions, disagreements, and uncertainty.

For patterns and a complete before/after example, read [references/anti-ai-patterns.md](references/anti-ai-patterns.md).

## Check claims against evidence

Maintain a brief internal claim ledger for material assertions:

| Status | Meaning | Treatment |
|---|---|---|
| Supported | Directly backed by a supplied or checked source | State at the source's level of certainty |
| Inference | Reasonably derived from supported facts | Make the inference explicit |
| Uncertain | Plausible but not established | Qualify, omit, or flag it |
| Contradicted | Sources materially disagree | Expose the disagreement; do not blend it away |

Verify material names, figures, dates, units, comparisons, causal claims, adoption, performance, and outcomes when suitable sources and permitted tools are available. Prefer the user's primary material, then authoritative primary sources. Match the effort to the consequence of an error.

Never invent a metric, result, causal link, user response, degree of adoption, consensus, or certainty. Do not upgrade “contributed to” into “led”, tests into “guaranteed quality”, or an estimate into a measured result. When verification is impossible, preserve the uncertainty instead of silently completing the claim.

When the request explicitly separates prose to rewrite from a set of verified or available facts, treat that fact set as the evidence authority. Remove factual claims from the prose when they are absent from, or contradicted by, that evidence base. Instructions such as “do not lose information” preserve supported information; they do not authorize unsupported claims. Preserve non-factual voice or intent only when it does not imply an unverified result.

## Feedback loop

1. Draft once from the established frame.
2. Run a **fact pass**: inspect every material claim using the ledger.
3. Run a **reader pass**: check clarity, tone, rhythm, repetition, jargon, and document fit.
4. Revise only passages that fail either pass; preserve sound wording.
5. Re-run both passes on the changed passages.

Use one revision cycle by default and at most two when problems remain. If a consequential claim is still unsupported or contradictory, state the limitation or ask for the missing fact when it blocks a useful answer.

## CV and portfolio mode

- Summary: 60–100 words; specialization and trajectory, without a list of personal qualities.
- Experience card: context, role, and up to two meaningful contributions in 40–70 words.
- Detailed experience: four or five concrete actions or outcomes, beginning with precise verbs when using bullets.
- Treat verified technologies, frameworks, standards, and protocols as material information when they help a recruiter understand the contribution or match the profile to a role.
- When the target format renders `#terms` as inline technical chips, place a selected chip beside the action, subsystem, standard, or protocol it qualifies; for example: `cartographie #maplibre #deckgl en symbologie #app-6d`.
- Keep the sentence readable when chip styling is removed. Use canonical, source-supported terms and prefer a few discriminating chips to a detached stack inventory.
- Determine chip scope field by field. Apply the convention consistently to experience cards, detailed descriptions, and contribution bullets when requested. Keep a profile or general introduction chip-free when the user wants positioning rather than stack detail. Titles and short labels remain plain unless the user explicitly includes them.
- Check that each target field actually renders the markers as chips. When it does not, record the required presentation-layer change instead of silently limiting chips to the fields already supported.
- Use quantified outcomes only when documented. Otherwise describe scope, constraints, reuse, or responsibility precisely.

## Final check

Before delivery, confirm that the opening reaches useful information quickly, terminology is consistent, nearby sentences do not restate one another, claims match their evidence, and the text stops when its work is done.

When testing or changing this skill, use [references/evals.md](references/evals.md).
