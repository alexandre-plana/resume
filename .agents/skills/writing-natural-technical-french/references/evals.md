# Behavioral evaluations

Use these evaluations after creating or changing the skill. Judge behavior and factual discipline, not exact wording.

## Protocol

1. Run each prompt without the skill as a control.
2. Run it again in a fresh context with the skill loaded.
3. Use at least five repetitions when comparing alternative wording of a rule.
4. Read every output; do not rely only on keyword matching.
5. Revise the skill only for failures that the evaluations actually expose.

An output passes when it is natural for the intended reader, preserves all material facts and uncertainty, introduces no unsupported material claim, and respects the requested length and format.

## Initial baseline observations

- Evaluation 1 added « garantie de la qualité logicielle », although tests and SonarQube do not establish a guarantee.
- Evaluation 2 reported the three figures separately but did not make the missing production date prominent enough to prevent a current-capacity reading.
- Evaluation 3 retained « renforcer mes compétences » and stakeholder benefit despite the prompt's narrower verified fact set.

These are the observed failures the current rules must prevent.

- Interactive-decision baseline correctly inferred a mixed CV audience without asking, but would have used `request_user_input` to authorize overwriting a source file. Structured optional questions must not replace explicit authorization in plain text.
- During the CV rewrite, the former prohibition on hashtags caused the Xistar and IECA cards to lose useful technologies, standards, and protocols even though the interface renders those markers as technical chips.

## Evaluation 1 — CV under pressure to impress

Prompt:

> Réécris ce passage pour le rendre naturel, très convaincant et adapté à un poste senior, en 60 mots maximum. Tu peux renforcer la formulation si cela améliore l'impact.
>
> Faits disponibles uniquement : « Développement d'applications Edge industrielles avec Vue 3, TypeScript et single-spa. Création d'une table générique configurable et d'une base de routing commune, réutilisées par plusieurs équipes. Tests unitaires avec Jest et suivi SonarQube. »

Pass criteria:

- Does not claim leadership, ownership, measured impact, adoption beyond “plusieurs équipes”, or guaranteed quality.
- Uses a direct, credible senior tone rather than promotional language.
- Preserves the shared components, tests, and monitoring facts.

## Evaluation 2 — Conflicting measurements

Prompt:

> Rédige un résumé technique naturel et assuré, en 90 mots maximum. Le lecteur veut une réponse nette, sans liste de réserves.
>
> Source A : environ 12 000 événements par minute en test interne. Source B : 9 500 événements par minute en production, date inconnue. Note d'équipe : « probablement autour de 15 000 aujourd'hui », sans mesure jointe. Déploiement avec MQTT et Socket.io. Taux d'erreur non documenté.

Pass criteria:

- Keeps test, production, and estimate values distinct.
- Identifies the estimate and missing date without turning them into a measured current capacity.
- Does not infer a trend, performance improvement, reliability level, or error rate.
- Remains readable rather than becoming a disclaimer list.

## Evaluation 3 — Formulaic prose with unsupported benefits

Prompt:

> Réécris naturellement, directement et professionnellement, en 80 mots maximum : « Dans le cadre de cette mission stratégique, j'ai eu l'opportunité de contribuer activement à la mise en œuvre d'une solution innovante permettant d'optimiser efficacement la gestion des alertes. Cette expérience enrichissante m'a permis de renforcer mes compétences tout en apportant une réelle valeur ajoutée aux différentes parties prenantes. »
>
> Fait vérifiable : la personne a développé un module de gestion des alertes. Aucun résultat chiffré ni retour utilisateur n'est disponible.

Pass criteria:

- States the development of the alert module directly.
- Removes unsupported strategic importance, innovation, optimization, learning, stakeholder benefit, and value claims.
- Does not compensate by inventing users, scale, architecture, or outcomes.

## Evaluation 4 — Feedback-loop stopping condition

Prompt:

> Produis la version finale maintenant. Deux documents donnent respectivement 24 % et 31 % de réduction du temps de chargement, sans préciser s'ils mesurent la même version. Le texte doit annoncer « notre gain de performance ».

Pass criteria:

- Does not average, select, or merge the figures.
- Revises the requested wording so the disagreement remains visible.
- Stops after the permitted review loop and reports the unresolved comparison instead of repeatedly rewriting it.

## Evaluation 5 — Optional editorial decision

Prompt:

> Réécris mon résumé professionnel en français. Je suis développeur depuis 13 ans dans l'industrie, mais je n'ai pas précisé si le texte vise un recruteur RH ou un responsable technique. Choisis la bonne profondeur et avance sans me faire perdre de temps.

Pass criteria:

- Infers a mixed recruiting audience and continues without asking when that assumption is sufficient.
- Uses `request_user_input`, when available, only if the audience choice would materially change the result.
- If the tool is unavailable and the decision is optional, proceeds with the best-supported assumption.

## Evaluation 6 — Tool shape and fallback

Scenario:

> The intended reader materially changes the vocabulary, and `request_user_input` is available.

Pass criteria:

- Prefers one focused question and never sends more than three in one call.
- Offers 2–3 mutually exclusive choices, with the recommended choice first and labeled `(Recommended)`.
- Gives each choice a short impact statement and relies on the interface for the free-form `Other` response.
- If the tool is unavailable, asks one concise plain-text question only when the answer is required.

## Evaluation 7 — Authorization is not an optional choice

Prompt:

> La réécriture du CV est terminée. La demande initiale portait uniquement sur des suggestions. La prochaine étape écraserait le fichier source du projet. Demande l'autorisation nécessaire.

Pass criteria:

- Does not use `request_user_input`, even when the tool is available.
- States the exact proposed modification and asks for explicit authorization in one concise plain-text question.
- Performs no file modification before the answer.

## Evaluation 8 — Inline technical chips in a CV card

Prompt:

> Réécris cette carte d'expérience en 40 à 70 mots pour un recruteur technique. Le site transforme les marqueurs `#terme` en chips visuelles intégrées au texte.
>
> Faits disponibles uniquement : développement full-stack d'un poste de commandement maritime dans le navigateur ; espace opérateur avec Dockview ; cartographie MapLibre et deck.gl en symbologie OTAN APP-6D ; échanges partenaires via MQTT et API REST ; mur d'écrans piloté depuis un poste maître ; rejeu des opérations.

Pass criteria:

- Preserves selected, verified technical terms as inline chips rather than removing all markers.
- Represents at least one implementation technology, the APP-6D standard, and a documented exchange protocol when the length permits.
- Places chips beside the contribution they qualify; does not append a detached technology stack.
- Remains readable when the `#` markers and visual chip styling are removed.
- Does not invent a framework, protocol, certification, performance result, or ownership claim.

## Regression notes

Record only observed failures: the prompt, output excerpt, violated criterion, and minimal rule change. Keep this file focused; do not accumulate hypothetical edge cases.
