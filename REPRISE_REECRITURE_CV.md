# Reprise de la réécriture du CV

Ce document permet de reprendre le travail depuis une nouvelle session sans dépendre de l'historique de la conversation.

## État du travail

- Branche de travail : `rewrite`.
- Les textes validés sont consignés dans `SUIVI_REECRITURE_CV.md`.
- Aucun texte validé n'a encore été appliqué aux fichiers source du CV.
- Ne pas modifier les données du CV avant une demande explicite d'application globale.
- La réécriture est menée expérience par expérience. Une proposition encore en discussion ne doit pas être ajoutée au journal des textes validés.

## Cadre éditorial convenu

- Utiliser le skill local `writing-natural-technical-french` et suivre ses règles pour chaque nouvelle proposition.
- Pour toute question éditoriale facultative, passer exclusivement par `request_user_input` lorsqu'il est disponible. Éviter les questions facultatives si l'outil ne l'est pas.
- Présenter la personne et son positionnement, sans résumer une seconde fois la chronologie déjà visible dans les expériences.
- Refléter un profil full-stack disposant d'une expertise front-end et UI/UX, sans réduire l'ensemble du parcours au front-end.
- Ne pas généraliser les micro-frontends à tout le parcours : cette architecture concerne principalement l'expérience IECA.
- Ne pas placer l'AR/VR au premier plan du positionnement global : il s'agit d'expériences plus anciennes et ce marché n'est pas la cible principale actuelle.
- Éviter « temps réel » comme formule de positionnement générique, car son sens dépend du domaine. Employer un terme plus précis dans le contexte concerné.
- Conserver un ton professionnel et cohérent. Dans les expériences retravaillées — cartes, descriptions et contributions — intégrer sous forme de chips les technologies, normes et protocoles réellement utiles à côté de la réalisation concernée. La présentation globale reste sans chips ni spécification de technologies. Éviter les inventaires détachés et les formulations promotionnelles non étayées.
- Lors de l'application aux sources, étendre le rendu des chips à `mission.desc` et `mission.tasks` ; actuellement, seul `cardSummary` transforme les marqueurs `#terme` en chips.
- Ne pas inventer de résultat, de métrique, de responsabilité ou de niveau de leadership.

## Textes déjà validés

Le titre, le sous-titre, la présentation globale, l'objectif professionnel, les compétences principales, Xistar, IECA, AOA et l'ensemble des projets Oreka Ingénierie sont validés. Les versions avant/après et leurs cibles exactes figurent dans `SUIVI_REECRITURE_CV.md`.

Le titre et le sous-titre ne nécessitent pas de chips. La présentation globale conserve son rôle de positionnement et ne contient ni chips ni spécification de technologies.

Décisions importantes prises pour Xistar :

- faire apparaître le périmètre full-stack sans réduire la mission à des micro-frontends ;
- faire apparaître la participation à la conception fonctionnelle à partir des besoins opérationnels, en lien avec les parcours opérateur, les interactions et le comportement des fonctionnalités ;
- intégrer la stack confirmée de Xistar : TypeScript et React pour l'interface, Go pour les services ;
- distinguer Dockview et l'organisation de l'interface du système d'alertes ;
- préciser que l'escalade des alertes passe par une API dédiée ainsi que par des notifications par e-mail ;
- mettre en avant l'interopérabilité : ingestion des données partenaires, transmission des ordres et publication via MQTT et API REST ;
- décrire l'application multi-écran, sa gestion centralisée depuis un poste maître et la communication entre instances ;
- présenter le rejeu temporel comme un support à l'analyse, aux rapports de situation et aux débriefings ;
- insister sur la capacité d'adaptation aux différents profils de déploiement plutôt que sur la modularité technique.

### Généralisation des chips dans Xistar — validée

**Carte**

> Développeur full-stack sur Xistar, un poste de commandement tactique maritime accessible depuis le navigateur. Je participe à la conception fonctionnelle des parcours opérateur et à leur réalisation en #typescript et #react, ainsi qu'au développement des services en #go. Le produit combine une cartographie tactique #maplibre #deckgl en symbologie OTAN #app-6d, l'interopérabilité #mqtt #api-rest, le pilotage multi-écran et le rejeu temporel.

**Description détaillée**

> Xistar réunit la situation tactique, la conduite de missions et de drones, la gestion des alertes, le pilotage multi-écran et le rejeu des opérations. Je participe à la conception fonctionnelle à partir des besoins opérationnels, en définissant les parcours opérateur, les interactions et le comportement attendu des fonctionnalités. L'interface repose sur #typescript, #react et #dockview ; la cartographie utilise #maplibre et #deckgl pour afficher une symbologie OTAN #app-6d, une grille #mgrs et la bathymétrie. Les services #go ingèrent des flux partenaires #ais, #nmea, #cot et #mavlink, transmettent des ordres et publient des informations via #mqtt et #api-rest. Les profils de déploiement et la communication entre instances permettent d'adapter le produit aux contextes défense, portuaire et démonstration.

**Contributions validées**

- Participer à la conception fonctionnelle de Xistar à partir des besoins opérationnels : définir les parcours opérateur, les interactions et le comportement attendu des fonctionnalités.
- Concevoir en #typescript et #react l'espace de travail opérateur sous forme de panneaux #dockview, puis intégrer la cartographie #maplibre #deckgl en symbologie OTAN #app-6d.
- Développer le système d'alertes et ses mécanismes d'escalade, avec une #api dédiée et l'envoi de notifications par e-mail.
- Assurer dans les services #go l'interopérabilité avec les systèmes partenaires : ingestion des flux #ais, #nmea, #cot et #mavlink, transmission des ordres et publication via #mqtt et #api-rest.
- Développer l'application multi-écran et sa gestion centralisée depuis un poste maître, puis mettre en place le rejeu temporel destiné à l'analyse, aux rapports de situation et aux débriefings.

## Expérience IECA — validée

### Faits apportés par l'utilisateur

- Mission principalement front-end, avec quelques extensions de fonctionnalités côté back-end.
- Participation à la mise en place de plusieurs domaines fonctionnels : connecteurs, calculs, conditions, alertes et scripting.
- Conception de composants partagés, sans limiter la mission à ce seul périmètre : table configurable, socle de routage et sélecteur de propriétés.
- Réalisation, lors d'un IP Sprint, d'un sujet d'application mobile destiné à la communication externe des alertes vers les opérateurs d'astreinte.

### Version validée

**Carte**

> Développeur front-end sur IECA, la plateforme IIoT Edge de Schneider Electric, avec des interventions ponctuelles côté back-end. J'ai contribué à plusieurs domaines fonctionnels — connecteurs, calculs, conditions, alertes et scripting — ainsi qu'au socle partagé de l'architecture #microfrontend fondée sur #vue3 #typescript et #single-spa.

**Description détaillée**

> Au sein d'une équipe #scrum pluridisciplinaire, j'ai développé des applications Edge organisées en #microfrontend avec #vue3, #typescript et #single-spa. Mon périmètre couvrait principalement les interfaces et leur architecture, avec quelques extensions de fonctionnalités back-end. J'intervenais à la fois sur les domaines fonctionnels de la plateforme, les composants partagés, les tests et le suivi de la qualité du code.

**Contributions validées**

- Participer au développement des fonctionnalités liées aux connecteurs, aux calculs, aux conditions, aux alertes et au scripting.
- Concevoir en #vue3 et #typescript des composants partagés, dont une table configurable, un socle de routage et un sélecteur de propriétés.
- Étendre ponctuellement les fonctionnalités back-end nécessaires aux évolutions prises en charge côté front-end.
- Développer avec #jest les tests unitaires des composants, des stores #pinia et des fonctions utilitaires, puis suivre les performances et la qualité du code avec #sonarqube.
- Concevoir, lors d'un IP Sprint, un prototype d'application #mobile destiné à transmettre les alertes aux opérateurs d'astreinte en dehors de la plateforme IECA.

La dernière contribution remplace l'ancienne formulation centrée sur la présentation du prototype aux Product Owners et précise sa finalité pour les opérateurs d'astreinte.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `1`, mission `11`.
- `src/api/mockDataLocales.ts` : version française de l'expérience `1`, mission `11`.
- La version anglaise devra ensuite être harmonisée sans traduire littéralement les formulations françaises.

## Expérience AOA — validée

La version validée conserve une dominante front-end tout en faisant apparaître la participation au serveur de projets en Python.

**Carte**

> Développeur en #csharp et #unity sur Augmented Operator Advisor, une application industrielle #ar multiplateforme pour #android, #ios et #windows. Mon travail a porté sur l'architecture front-end et les interfaces opérateur, le fonctionnement #offline et la compatibilité des projets entre versions. J'ai également participé au développement du serveur de projets en #python et à ses échanges #http avec l'application.

**Description détaillée**

> Pendant six ans, j'ai développé en #csharp et #unity les interfaces et l'architecture front-end d'une application #ar destinée aux opérateurs industriels. Le périmètre couvrait les versions #android, #ios et #windows, leur personnalisation pour les clients #oem, le fonctionnement #offline et la préparation des applications pour les différentes plateformes de distribution. J'ai également contribué au serveur de projets en #python et à la communication #http avec l'application.

**Contributions validées**

- Concevoir en #csharp et #unity l'architecture front-end et une interface adaptée à #android, #ios et #windows, en modes portrait et paysage.
- Développer le fonctionnement #offline et la synchronisation #http, puis contribuer aux évolutions du serveur de projets en #python et à la gestion des erreurs réseau.
- Assurer la rétrocompatibilité des projets par la lecture des anciens formats et leur migration à la volée.
- Mettre en place un système de styles externalisé pour produire des versions personnalisées aux couleurs des clients #oem.
- Créer sous #unity un outil de tests unitaires intégré aux étapes précédant et suivant les builds.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `1`, mission `12`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `1`, mission `12`.

## Expérience générale Oreka Ingénierie — validée

La version validée met en avant la conception fonctionnelle et la création de serious games et de simulateurs, sans masquer leur réalisation technique.

**Intitulé conservé**

> Développeur C# / Unity 3D

**Carte**

> Développeur C# / Unity 3D chez Oreka Ingénierie sur des serious games #seriousgame, des simulateurs et des outils de visualisation pour EDF, RTE, AREVA, DCNS et SUEZ. J'intervenais dès la conception fonctionnelle pour traduire les besoins et les procédures métier en scénarios interactifs, puis sur leur réalisation en #csharp sous #unity, l'intégration de modèles issus de la #cao et la livraison des applications.

**Description détaillée**

> Pendant quatre ans, j'ai participé à la conception fonctionnelle et au développement d'applications interactives pour l'industrie, le nucléaire et la défense. À partir des besoins clients et des procédures métier, je contribuais à définir les parcours, les scénarios, les interactions et les maquettes fonctionnelles des serious games #seriousgame et des simulateurs. J'assurais ensuite leur réalisation en #csharp sous #unity, l'intégration des modèles issus de #solidworks et #3dsmax, l'optimisation CPU/GPU et la préparation des livraisons.

**Contributions validées**

- Participer à la conception fonctionnelle : analyser les besoins clients, étudier leur faisabilité technique et formaliser les parcours, les interactions et les maquettes.
- Concevoir des serious games #seriousgame et des simulateurs à partir des procédures métier, puis structurer les scénarios à l'aide de graphes d'états, de conditions et de déclencheurs.
- Développer en #csharp sous #unity les interfaces et les systèmes interactifs 2D/3D, dont les interactions propres aux dispositifs #vr et #ar.
- Intégrer et optimiser des modèles issus de la #cao avec #solidworks et #3dsmax : maillages, niveaux de détail, lightmaps, matériaux et shaders.
- Optimiser les performances CPU/GPU avec les outils de profiling de #unity, puis préparer les builds, corriger les anomalies et accompagner les démonstrations client.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `2`, mission `21`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `2`, mission `21`.

## Projet Simulhom — validé

La version validée met en avant la conception fonctionnelle menée avec des ergonomes, l'UX/UI et la restitution des risques posturaux.

**Intitulé validé**

> Conception fonctionnelle & UX/UI

**Carte**

> Conception fonctionnelle et UX/UI de Simulhom, un simulateur ergonomique 3D destiné à prévenir les troubles musculosquelettiques en milieu industriel. En collaboration avec des ergonomes, j'ai traduit les méthodes d'analyse posturale en parcours, visualisations et retours compréhensibles pour l'utilisateur, puis participé à leur réalisation en #csharp sous #unity.

**Description détaillée**

> Simulhom est un simulateur ergonomique 3D conçu pour analyser les postures de travail et visualiser les risques de TMS. J'ai participé à la conception fonctionnelle du produit avec des ergonomes, puis conçu les parcours et l'interface #uiux afin de rendre les indicateurs posturaux lisibles et exploitables. J'ai également contribué au développement de l'application en #csharp sous #unity et à l'intégration des retours visuels dans la scène 3D.

**Contributions validées**

- Participer à la conception fonctionnelle du produit avec des ergonomes, en formalisant les usages et les scénarios d'analyse.
- Concevoir les parcours, l'interface #uiux et les retours visuels associés aux risques posturaux.
- Développer en #csharp sous #unity les interactions et les composants du simulateur 3D.
- Intégrer l'analyse posturale et restituer les indicateurs de risque au fil de la simulation.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `2`, mission `22`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `2`, mission `22`.

## Projet Dosicase — validé

La version validée relie la conception UX/UI aux objectifs pédagogiques de la formation en radioprotection et à l'intégration du simulateur.

**Intitulé validé**

> Conception UX/UI

**Carte**

> Conception UX/UI de Dosicase, un simulateur destiné à la formation en radioprotection sur chantier-école. J'ai structuré les parcours et conçu les interfaces pour rendre les risques radiologiques et les scénarios de formation compréhensibles pour les apprenants, puis participé à leur intégration dans l'application en #csharp sous #unity.

**Description détaillée**

> Dosicase met la simulation au service de la formation pratique en radioprotection. J'ai conçu l'expérience et l'interface #uiux pour présenter les situations et les risques radiologiques de manière pédagogique, puis contribué à leur intégration dans le simulateur en #csharp sous #unity. Le travail portait autant sur l'organisation des informations que sur les interactions nécessaires à l'apprentissage en chantier-école.

**Contributions validées**

- Structurer le parcours pédagogique à partir des objectifs de formation en radioprotection.
- Concevoir l'interface #uiux et organiser les informations liées aux situations et aux risques radiologiques.
- Définir les interactions du simulateur nécessaires à l'apprentissage pratique en chantier-école.
- Participer à l'intégration de l'expérience dans l'application en #csharp sous #unity.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `2`, mission `23`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `2`, mission `23`.

## Projet EMEM — validé

La version validée décrit précisément la simulation, la représentation des flux, la gestion des matériaux radioactifs et les interfaces opérateur.

**Intitulé validé**

> Développeur C# / Simulation 3D

**Carte**

> Développement d'une simulation 3D interactive de l'EMEM, une enceinte mobile destinée à l'évacuation de matériel en environnement nucléaire. J'ai contribué à la représentation des flux et des matériaux radioactifs ainsi qu'à la conception des interfaces de contrôle pour les opérateurs, en #csharp avec #unity et #wpf.

**Description détaillée**

> L'application représentait le fonctionnement de l'enceinte mobile et les opérations liées à l'évacuation de matériel en contexte nucléaire. Mon travail portait sur le développement #csharp de la simulation sous #unity, la visualisation des flux et la gestion des matériaux radioactifs. J'ai également développé les interfaces opérateur en #wpf pour piloter et suivre la simulation.

**Contributions validées**

- Développer en #csharp sous #unity la simulation 3D interactive de l'enceinte mobile.
- Représenter en 3D les flux associés aux opérations d'évacuation de matériel.
- Implémenter la gestion et la représentation des matériaux radioactifs dans la simulation.
- Concevoir en #wpf les interfaces de contrôle destinées aux opérateurs.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `2`, mission `24`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `2`, mission `24`.

## Projet Aeroball — validé

La version validée met en avant la transformation des procédures opérationnelles en séquences de formation, puis leur réalisation en simulation 3D.

**Intitulé validé**

> Développeur C# / Serious game

**Carte**

> Développement d'un serious game #seriousgame destiné à former les opérateurs à l'utilisation du poste de contrôle Aeroball en environnement nucléaire. J'ai participé à la traduction des procédures opérationnelles en scénarios interactifs, puis à leur réalisation sous #unity en #csharp et à la modélisation 3D de l'environnement de formation.

**Description détaillée**

> Le projet reproduisait en simulation le déroulement des procédures associées au poste de contrôle Aeroball. Mon travail portait sur la transformation des procédures opérationnelles en séquences de formation interactives, le développement en #csharp sous #unity et la modélisation 3D de l'environnement. Le serious game #seriousgame permettait aux opérateurs de s'entraîner à l'utilisation du poste de contrôle dans un cadre simulé.

**Contributions validées**

- Analyser les procédures opérationnelles du poste de contrôle Aeroball et les traduire en scénarios de formation.
- Concevoir les séquences et les interactions du serious game #seriousgame.
- Développer en #csharp sous #unity la simulation 3D et le déroulement des scénarios.
- Modéliser l'environnement de formation et l'intégrer dans l'application.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `2`, mission `25`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `2`, mission `25`.

## Projet de formation en radioprotection — validé

La version validée distingue les procédures de sécurité, les scénarios d'accident, la gestion des équipes de secours et leur réalisation en simulation 3D.

**Intitulé validé**

> Développeur C# / Simulation de formation

**Carte**

> Développement d'un module de formation interactive 3D consacré à la radioprotection et aux procédures de sécurité nucléaire. J'ai participé à la conception et à la réalisation de scénarios d'accident simulés, incluant la gestion des équipes de secours, puis à leur intégration en #csharp sous #unity.

**Description détaillée**

> Le module proposait des scénarios d'accident simulés pour former aux procédures de radioprotection et de sécurité nucléaire. Mon travail portait sur la structuration des séquences de formation, la modélisation du déroulement des scénarios et la gestion des équipes de secours. J'ai ensuite développé et intégré ces mécanismes en #csharp sous #unity dans un environnement 3D.

**Contributions validées**

- Traduire les procédures de sécurité nucléaire en séquences de formation interactives.
- Concevoir les scénarios d'accident simulés et leur déroulement.
- Implémenter la gestion des équipes de secours au sein de la simulation.
- Développer en #csharp sous #unity le module de formation et son environnement 3D.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `2`, mission `26`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `2`, mission `26`.

## Projet de maintenance des générateurs de vapeur — validé

La version validée replace le projet dans le contexte des arrêts de tranche et décrit la transposition des procédures de maintenance en serious game.

**Intitulé validé**

> Développeur C# / Serious game

**Carte**

> Développement d'un serious game #seriousgame destiné à préparer les interventions de maintenance des générateurs de vapeur pendant les arrêts de tranche. J'ai participé à la transposition des procédures de maintenance nucléaire en scénarios interactifs, puis à leur réalisation en #csharp sous #unity dans un environnement 3D.

**Description détaillée**

> Le serious game #seriousgame reproduisait les procédures de maintenance des générateurs de vapeur réalisées pendant les arrêts de tranche. Mon travail portait sur la structuration des séquences d'intervention, leur représentation dans un environnement 3D et le développement des interactions en #csharp sous #unity. L'application était conçue pour préparer les intervenants à ces opérations en environnement nucléaire.

**Contributions validées**

- Analyser les procédures de maintenance des générateurs de vapeur et les traduire en scénarios de formation.
- Structurer les séquences et les interactions correspondant aux différentes étapes d'intervention.
- Représenter en 3D l'environnement et le déroulement des opérations de maintenance.
- Développer en #csharp sous #unity le serious game #seriousgame et ses mécanismes interactifs.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `2`, mission `27`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `2`, mission `27`.

## Projet de radioprotection en chirurgie interventionnelle — validé

La version validée décrit la dosimétrie au cours des scénarios, les zones exposées et l'intégration des protocoles de radioprotection dans la simulation médicale.

**Intitulé validé**

> Développeur C# / Simulation médicale 3D

**Carte**

> Développement d'une simulation médicale 3D destinée à former les équipes de chirurgie interventionnelle aux pratiques de radioprotection. J'ai contribué à la représentation de la dosimétrie au cours des scénarios, à la visualisation des zones exposées aux rayonnements et à l'intégration des protocoles opérateur en #csharp sous #unity.

**Description détaillée**

> L'application simulait des situations de chirurgie interventionnelle pour former les équipes à l'exposition radiologique et aux précautions associées. Mon travail portait sur l'intégration de la #dosimetrie dans la simulation, la visualisation des zones exposées et la restitution des protocoles de #radioprotection destinés aux opérateurs. J'ai développé ces éléments en #csharp sous #unity dans un environnement 3D.

**Contributions validées**

- Traduire les protocoles de #radioprotection en séquences de formation destinées aux équipes chirurgicales.
- Intégrer la #dosimetrie et représenter son évolution au cours des scénarios simulés.
- Visualiser les zones exposées aux rayonnements dans l'environnement 3D.
- Développer en #csharp sous #unity la simulation médicale et ses interactions.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : expérience `2`, mission `28`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `2`, mission `28`.

## Objectif professionnel — validé

Le champ validé reste volontairement généraliste : il ne cible ni domaine ni technologie particuliers.

**Avant**

> Poste Front End web dans un contexte industriel · Vue.js ou React · TypeScript · micro-frontend · équipe orientée qualité & UX

**Après validé**

> Développement full-stack · Expertise front-end et UI/UX · Conception fonctionnelle · Équipe attentive à la qualité produit

**Cibles à synchroniser lors de l'application**

- `src/api/mockDataLocales.ts` : `fr.profile.seeking`.
- `src/api/mockDataLocales.ts` : `en.profile.seeking`, à reformuler en anglais sans traduction littérale.

## Compétences principales — validées

La nouvelle organisation reflète le périmètre full-stack, l'interopérabilité et l'outillage documentés dans les expériences.

**Avant**

- **Frameworks :** Vue3, React, single-spa, Jest, Flutter, Unity 3D.
- **Outils :** Docker, Git, Postman, Jira, Figma.

**Après validé**

- **Langages :** TypeScript, Go, C#, Python.
- **Front-end & visualisation :** React, Vue 3, single-spa, Dockview, MapLibre, deck.gl, Unity 3D.
- **Services & interopérabilité :** API REST, MQTT, AIS, NMEA, CoT, MAVLink.
- **Qualité & outils :** Jest, Vitest, SonarQube, GitLab CI, Docker, Git, Postman, Jira, Figma.

**Principes de sélection validés**

- Faire apparaître les compétences documentées dans les expériences validées.
- Distinguer les langages, l'interface, les échanges système et l'outillage.
- Ne pas faire de la section un inventaire exhaustif ; les détails restent attachés aux expériences.
- Retirer Flutter, qui n'est relié à aucune expérience actuellement documentée.

**Cibles à synchroniser lors de l'application**

- `src/api/mockData.ts` : `mockSkills`.
- `src/api/mockDataLocales.ts` : `fr.skills` et `en.skills`.
- Vérifier la hauteur de la barre latérale après passage de deux à quatre groupes.

## Étape suivante : formations et diplômes

La proposition suivante harmonise les libellés, corrige « licence » et distingue les formations, le stage et les diplômes. Elle n'est pas encore validée.

**Formation React · TypeScript**

- Libellé : `📌 Formation`
- Intitulé : `React · TypeScript`
- Établissement et date : `Datacorp · 2026`
- Description : `Formation approfondie à React et TypeScript, centrée sur les pratiques modernes du développement front-end.`

**Formation TypeScript · Docker · Vue.js**

- Libellé : `📌 Formation`
- Intitulé : `TypeScript · Docker · Vue.js`
- Établissement et date : `Datacorp · 2023`
- Description : `Formations professionnelles à TypeScript, Docker et Vue.js, appliquées au développement d'applications web.`

**Stage de fin de licence**

- Libellé : `📌 Stage`
- Intitulé : `Polymorph`
- Contexte et date : `Stage de fin de licence · 2013`
- Description : `Design graphique · Communication visuelle`

**Licence 3D temps réel**

- Libellé : `📌 Diplôme`
- Intitulé : `Licence 3D temps réel`
- Établissement et date : `3DI Laval · 2012–2013`
- Description : `Unity 3D · Réalité virtuelle · 3D temps réel`

**BTS Communication visuelle**

- Libellé : `📌 Diplôme`
- Intitulé : `BTS Communication visuelle — option Multimédia`
- Établissement et date : `3DI Laval · 2010–2012`
- Description : `Multimédia · Web · Vidéo`

**Cibles à synchroniser après validation**

- `src/api/mockData.ts` : `mockFormation`.
- `src/api/mockDataLocales.ts` : `fr.formation` et `en.formation`.

## Point de reprise recommandé

1. Faire valider la section formations et diplômes, puis ajouter son avant/après dans `SUIVI_REECRITURE_CV.md`.
2. Auditer ensuite les derniers champs de profil et les contenus dupliqués avant l'application globale aux sources.
3. Conserver la conception fonctionnelle parmi les axes à faire apparaître lorsqu'elle est documentée dans les contenus suivants.
4. Appliquer les changements aux sources uniquement lorsque l'utilisateur le demandera explicitement, puis étendre le rendu des chips, harmoniser les doublons et les traductions.

## Points techniques repérés lors de l'audit initial

- Plusieurs contenus sont dupliqués entre `src/api/mockData.ts` et `src/api/mockDataLocales.ts` ; les deux sources devront rester cohérentes lors de l'application.
- Certaines traductions et certains accents sont incomplets ou incohérents.
- Les coordonnées de contact, dont l'adresse e-mail et la présentation du téléphone, devront être vérifiées avant finalisation.
- L'export Word contient également des contenus susceptibles de dupliquer les données affichées et devra être contrôlé après la réécriture.
- Le rendu des chips est actuellement limité à `cardSummary`. L'application finale devra utiliser le même rendu pour `mission.desc` et chaque entrée de `mission.tasks`, tandis que l'export Word devra éviter d'afficher des marqueurs `#` bruts.
