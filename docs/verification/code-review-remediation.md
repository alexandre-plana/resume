# Vérification de la remédiation de la code review

Cette page rassemble les contrôles automatisés et la recette manuelle effectués
sur la branche `codex/resume-review-remediation`.

## Commandes de qualité

À exécuter depuis la racine du dépôt :

```bash
npm test
npm run lint
npm run build
npm run check:bundle
npm audit --omit=dev
```

`npm test` couvre la navigation, la localisation, les dialogues, les données
API et la vue imprimable. `npm run check:bundle` reconstruit l'application puis
vérifie que le chunk initial ne contient pas de marqueurs OOXML `docx`.

## Résultats manuels

| Scénario | Résultat | Navigateur |
| --- | --- | --- |
| Toolbar à 320 × 800 | GREEN : `document.documentElement.scrollWidth=305 <= innerWidth=320`; FR `left=4.61,right=38.31`, EN `left=38.31,right=72.89`, Word DEV `left=64.23,right=183.56`, Print `left=187.56,right=297` | Chromium intégré Codex |
| Dialogue projet à 320 px | GREEN : rectangle `left=12,right=285.4,top=74.9,bottom=775.4`; `scrollWidth=clientWidth=283` | Chromium intégré Codex |
| Toolbar à 768 px | GREEN : `docScroll=753 <= 768`, FR/EN/Word/Print dans le viewport | Chromium intégré Codex |
| Dialogue projet à 768 px | GREEN : rectangle `left=12,right=733.4,top=66.6,bottom=883.5`; `scrollWidth=clientWidth=731` | Chromium intégré Codex |
| Toolbar à 1280 px | GREEN : `docScroll=1265 <= 1280`, tous les contrôles visibles | Chromium intégré Codex |
| Dialogue projet à 1280 px | GREEN : rectangle `left=459,right=1115,top=157.8,bottom=795.0`; `scrollWidth=clientWidth=838` | Chromium intégré Codex |
| Navigation clavier de la toolbar | GREEN : Tab depuis FR atteint EN, Word DEV, Print puis `tab-personal`; FR/EN sont activables au clavier | Chromium intégré Codex |
| Navigation clavier des onglets | GREEN : les flèches parcourent Aperçu → Formations → Projets persos → Aperçu; Entrée active l'onglet et `aria-selected`/panneaux restent cohérents | Chromium intégré Codex |
| Dialogue mission et projet | GREEN : Entrée ouvre, le focus arrive sur Fermer, Tab/Maj+Tab restent dans le dialogue, Échap ferme et restitue le focus à la carte; le défilement est libéré | Chromium intégré Codex |
| Changement de langue | GREEN : `<html lang="en">` puis `<html lang="fr">` après EN puis FR | Chromium intégré Codex |
| Fragment `#personal-project-4` | GREEN : Projets persos est chargé et le focus arrive sur `personal-project-4` | Chromium intégré Codex |
| Fragment `#personal-project-[` | GREEN : Aperçu est affiché après rechargement et aucune erreur console n'est observée | Chromium intégré Codex |
| Panneau Aperçu et QR | GREEN : sur Formations et Projets persos, `#panel-overview` reste monté avec les expériences et un QR local; le CSS d'impression force `.overviewPanel` visible et masque les panneaux secondaires | Chromium intégré Codex |
| Aperçu avant impression depuis les trois onglets | NON VÉRIFIÉ : l'activation d'Imprimer a bloqué CDP dans le navigateur intégré et aucun aperçu exploitable n'a pu être observé | Chromium intégré Codex |

## Procédure restante pour l'impression

Dans Chrome ou Edge, démarrer l'application avec `npm run dev`, ouvrir
`http://localhost:5173/resume/`, puis sélectionner successivement Aperçu,
Formations et Projets persos. Cliquer sur Imprimer depuis chaque onglet et
vérifier dans l'aperçu que les expériences professionnelles et le QR code
local sont présents. Fermer l'aperçu entre chaque scénario et consigner le
résultat dans la ligne correspondante ci-dessus.

Chrome et Edge n'étaient pas disponibles via CUA pendant cette recette; les
trois aperçus restent donc explicitement NON VÉRIFIÉS.

## Contrôles de dépôt

- Le défaut responsive observé à 320 px a été corrigé par
  `fe81a97 fix: keep mobile toolbar controls visible`.
- Le commit galerie utilisateur/main `3777434 feat: add optional project image galleries`
  est conservé comme ancêtre de la branche; son avancement a été effectué
  extérieurement à cette phase.
- La compilation ne doit laisser aucun `.tsbuildinfo`, `vite.config.js` ou
  `vite.config.d.ts` suivi par Git.
