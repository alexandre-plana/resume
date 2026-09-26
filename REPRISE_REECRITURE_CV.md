# Reprise de la réécriture du CV

Ce document permet de reprendre le travail depuis une nouvelle session sans dépendre de l'historique de la conversation.

## État du travail

- Branche de travail : `rewrite`.
- Les textes validés sont consignés dans `SUIVI_REECRITURE_CV.md`.
- Tous les textes validés à ce stade ont été appliqués aux fichiers source du CV, en français et en anglais.
- Le rendu web et l'export Word utilisent désormais les mêmes données et la même sélection de contenus.
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
- Le rendu web transforme les marqueurs `#terme` en chips dans les cartes, les descriptions détaillées et les contributions. L'export Word applique le même traitement sans laisser apparaître de marqueurs bruts.
- Ne pas inventer de résultat, de métrique, de responsabilité ou de niveau de leadership.

## Textes déjà validés

Le titre, le sous-titre, la présentation globale, les compétences principales, les formations, Xistar, IECA, AOA et l'ensemble des projets Oreka Ingénierie sont validés. Les versions avant/après et leurs cibles exactes figurent dans `SUIVI_REECRITURE_CV.md`.

Les coordonnées ont également été appliquées : l’adresse e-mail est `alexandre.plana@gmail.com` et le téléphone est présenté au format international `+33 6 71 03 97 84`. L’intitulé employeur et la localisation restent inchangés. Le composant d’affichage du téléphone accepte ce format.

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

## Projets personnels — sélection appliquée

La sélection des projets personnels affichés dans le CV web et dans l'export Word est désormais limitée à :

- `iasit` ;
- `vorrery` ;
- `kin` ;
- `n-fold-protocol`.

`specia`, `lavis · Aquarelle Studio` et `ohlabo` ont été retirés. Les traductions anglaises inutilisées ont également été supprimées.

La carte `kin` a été réécrite à partir du dépôt [alexandre-plana/kin](https://github.com/alexandre-plana/kin). Elle présente le projet comme un travail de conception produit et d'architecture, conformément à son état actuel : cadrage fonctionnel et technique détaillé, sans revendiquer une implémentation applicative encore absente du dépôt.

Une carte `n-fold-protocol` a été créée à partir du dépôt [alexandre-plana/n-fold-protocol](https://github.com/alexandre-plana/n-fold-protocol). Elle décrit le prototype Godot/C# actuellement implémenté : simulation déterministe à pas fixe, déplacement en formation, combat, programmation d'aptitudes et stratégie de validation automatisée.

## Projet personnel Iasit — validé et appliqué

La réécriture de la carte `iasit` est appliquée aux versions française et anglaise du CV. Elle présente l'outil comme un système de pilotage du développement assisté par des agents IA, structuré autour du cycle préparation, exécution, vérification, correction et acceptation.

La gestion des bugs doit apparaître comme une boucle traçable `verify → finding → fix → re-verify`. Les findings conservent leur sévérité, leurs preuves, les fichiers concernés et la correction proposée ; leur présence bloque l'acceptation tant qu'ils restent ouverts.

La capitalisation repose sur la promotion explicite d'un finding en learned rule. La règle conserve sa provenance, son périmètre et son statut, puis les règles actives pertinentes sont sélectionnées et intégrées aux futurs prompts. Présenter ce mécanisme comme une amélioration continue fondée sur les problèmes rencontrés, et non comme un apprentissage autonome non supervisé.

## Projet personnel Vorrery — validé et appliqué

La réécriture de la carte `vorrery` est appliquée aux versions française et anglaise du CV. L'angle retenu est celui d'un sandbox pédagogique 3D fondé sur la manipulation, l'observation et la comparaison de scénarios.

La présentation doit mettre en avant la coexistence de plusieurs niveaux d'accompagnement : exploration libre, laboratoire de manipulation, expériences guidées et parcours pour enfants. La génération visible étape par étape, la possibilité de rejouer une expérience et l'absence de score ou de progression imposée constituent les principaux éléments pédagogiques à conserver.

Les détails liés à l'espace, à la gravité et aux modèles physiques restent des supports de l'expérience, mais ne doivent pas dominer la carte. Les technologies discriminantes restent intégrées au texte sous forme de chips : `#react`, `#typescript`, `#threejs`, `#react-three-fiber` et `#web-workers`.

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

**Cibles synchronisées**

- `src/api/mockData.ts` : expérience `1`, mission `11`.
- `src/api/mockDataLocales.ts` : version française de l'expérience `1`, mission `11`.
- La version anglaise a été harmonisée sans reprendre littéralement les formulations françaises.

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

**Cibles synchronisées**

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

**Cibles synchronisées**

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

**Cibles synchronisées**

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

**Cibles synchronisées**

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

**Cibles synchronisées**

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

**Cibles synchronisées**

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

**Cibles synchronisées**

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

**Cibles synchronisées**

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

**Cibles synchronisées**

- `src/api/mockData.ts` : expérience `2`, mission `28`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `2`, mission `28`.

## Objectif professionnel — retiré du CV

Le champ avait été validé dans une formulation généraliste, puis retiré du CV à la demande de l’utilisateur le 21 septembre 2026. La donnée, son libellé, son style et son rendu dans l’export Word ont été supprimés du code.

**Avant**

> Poste Front End web dans un contexte industriel · Vue.js ou React · TypeScript · micro-frontend · équipe orientée qualité & UX

**Après validé**

> Développement full-stack · Expertise front-end et UI/UX · Conception fonctionnelle · Équipe attentive à la qualité produit

**Anciennes cibles supprimées**

- `src/api/mockData.ts` : `mockProfile.seeking`.
- `src/api/mockDataLocales.ts` : `fr.profile.seeking` et `en.profile.seeking`.
- `src/App.tsx`, `src/App.module.css`, `src/locales/index.ts`, `src/types/index.ts`, `src/hooks/useApi.ts` et `src/utils/exportCvToWord.ts` : références de présentation et de typage associées.

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

**Cibles synchronisées**

- `src/api/mockData.ts` : `mockSkills`.
- `src/api/mockDataLocales.ts` : `fr.skills` et `en.skills`.
- Vérifier la hauteur de la barre latérale après passage de deux à quatre groupes.

## Formations et diplômes — validés

La version validée harmonise les libellés, corrige « licence » et distingue les formations, le stage et les diplômes.

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

**Cibles synchronisées**

- `src/api/mockData.ts` : `mockFormation`.
- `src/api/mockDataLocales.ts` : `fr.formation` et `en.formation`.

## Simulateur de drones et de flotte navale — validé

Les textes validés concernent le projet Xistar `32`.

**Intitulé validé**

> Développeur TypeScript / Simulation

**Carte**

> Développement d'un simulateur de drones et de flotte navale destiné à alimenter Xistar avec des flux représentatifs des conditions d'exploitation. Réalisé en #typescript sous #nodejs, il génère positions, états et détections, puis les publie via #mqtt pour les démonstrations et la mise au point des fonctionnalités, sans recourir à des mocks statiques.

**Description détaillée**

> Le simulateur génère des données de position, d'état et de détection pour des drones et des navires, puis les transmet à Xistar via #mqtt. Je l'ai développé en #typescript sous #nodejs afin de disposer de flux contrôlables pour les démonstrations et le développement. Il remplace les jeux de données statiques par des entités simulées dont l'état évolue pendant l'exécution.

**Contributions validées**

- Modéliser les drones, les navires et les états nécessaires aux scénarios de simulation.
- Générer des flux de positions, d'états et de détections pendant l'exécution.
- Publier les données du simulateur vers Xistar via #mqtt.
- Développer l'outil en #typescript sous #nodejs pour les démonstrations et la mise au point des fonctionnalités.

**Cibles synchronisées**

- `src/api/mockData.ts` : expérience `3`, mission `32`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `3`, mission `32`.

## Application mobile Xistar — validée

Les textes validés concernent le projet Xistar `33`.

**Intitulé validé**

> Développeur TypeScript / Application mobile

**Carte**

> Développement d'une application mobile permettant aux opérateurs de recevoir les alertes BAM/CAM et de transmettre des ordres depuis le terrain. Réalisée en #typescript avec #react, elle prend en charge l'escalade des alertes et l'émission d'ordres de retour, et communique avec Xistar via #socketio.

**Description détaillée**

> L'application mobile prolonge Xistar sur le terrain : elle reçoit les alertes BAM/CAM et permet à l'opérateur d'agir sans passer par le poste principal. J'ai développé l'interface en #typescript avec #react ainsi que les échanges #socketio nécessaires à l'escalade des alertes et à l'émission d'ordres de retour.

**Contributions validées**

- Concevoir les parcours mobiles liés à la réception des alertes et à l'émission d'ordres.
- Afficher les alertes BAM/CAM et les informations nécessaires à leur traitement.
- Implémenter l'escalade des alertes et l'envoi des ordres de retour.
- Développer l'interface en #typescript avec #react et intégrer les échanges via #socketio.

**Cibles synchronisées**

- `src/api/mockData.ts` : expérience `3`, mission `33`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `3`, mission `33`.

## Émulateur de mur d'écrans — validé

Les textes validés concernent le projet Xistar `34`.

**Intitulé validé**

> Développeur TypeScript / Émulateur multi-écran

**Carte**

> Développement d'un émulateur de mur d'écrans permettant de concevoir et démontrer les usages multi-vues de Xistar sans disposer d'une salle équipée. Réalisé en #typescript avec #react et #vite, il reproduit des ensembles d'écrans, un tableau de mission et l'envoi distant de vues depuis le poste maître.

**Description détaillée**

> L'émulateur reproduit la configuration d'un mur d'écrans physique : ensembles d'écrans, tableau de mission et envoi distant de vues. Je l'ai développé en #typescript avec #react et #vite afin de travailler sur la gestion centralisée des affichages et de préparer les démonstrations sans mobiliser une salle équipée.

**Contributions validées**

- Modéliser les ensembles d'écrans et leurs configurations d'affichage.
- Reproduire le tableau de mission utilisé dans la conduite multi-vues.
- Implémenter l'envoi distant de vues depuis le poste maître vers les écrans émulés.
- Développer l'outil en #typescript avec #react et #vite pour le développement et les démonstrations.

**Cibles synchronisées**

- `src/api/mockData.ts` : expérience `3`, mission `34`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `3`, mission `34`.

## Graphique de répartition des langages — suppression validée

Le profil affiche actuellement une barre de répartition fondée sur les valeurs suivantes : TypeScript 35 %, C# 35 %, HTML5/CSS 20 % et Dart 10 %.

**Décision validée**

Supprimer ce graphique et les données `profile.languages` associées.

**Motifs**

- Les pourcentages ne correspondent à aucune mesure documentée et donnent une impression de précision artificielle.
- Dart ne reflète pas les expériences actuellement présentées dans le CV.
- Go et Python, désormais documentés, en sont absents.
- La section « Compétences principales » validée présente déjà les langages sans hiérarchie arbitraire.
- La section « Langues » consacrée au français et à l'anglais reste inchangée.

**Cibles à traiter lors de l'application**

- `src/api/mockData.ts` : supprimer ou ne plus exposer `mockProfile.languages`.
- `src/App.tsx` : retirer le bloc visuel `languageStack`.
- `src/locales/index.ts` : supprimer la traduction devenue inutilisée si elle ne sert plus ailleurs.
- `src/utils/exportCvToWord.ts` : retirer toute dépendance à `profile.languages` lors de l'application de cette décision aux sources.

## Nettoyage de l'ancien onglet « Projets » et de l'export Word — appliqué

L'audit du rendu a confirmé que l'ancien onglet « Projets » n'était plus accessible depuis la navigation. Son composant et ses données étaient encore chargés en arrière-plan, et l'export Word les ajoutait sous forme d'une section dupliquant les expériences.

Le reliquat a été supprimé : composant, données, traductions, services, requête, type et styles associés. Les anciens états d'onglets « projects » et « skills », ainsi que le circuit d'activité vide, ont également été retirés.

L'export Word reçoit désormais directement les données localisées déjà chargées par l'interface web. Il reprend les sections réellement accessibles : profil, langues, compétences, expériences, formations, projets personnels et centres d'intérêt. La logique de fusion propre à l'ancien export et la section des projets professionnels dupliqués ont été supprimées.

**Vérifications effectuées**

- `npm run lint` : réussi.
- `npm run build` : réussi.
- Tests des exports français et anglais depuis le CV local : documents `.docx` générés sans erreur dans la console.
- Contrôle des deux documents : présence des expériences, formations et projets personnels ; absence de section autonome reprenant les anciens projets professionnels.

## Projet personnel Ohlabo — retiré

Ohlabo a été supprimé de la liste des projets personnels, car son avancement ne justifie pas encore sa présence dans le CV. La suppression s'applique au rendu web, à la traduction anglaise et à l'export Word. Les traductions des projets personnels sont désormais associées à leur identifiant stable plutôt qu'à leur position dans la liste, afin d'éviter tout décalage lors d'un ajout ou d'un retrait.

## État actuel

1. Les textes validés sont appliqués aux versions française et anglaise.
2. Les expériences, formations et projets personnels disposent tous de leur contenu anglais.
3. Les rendus web et Word ont été contrôlés, notamment la barre latérale, les coordonnées, les chips techniques et la suppression du graphique de langages.

### Avancement de la passe d’application — session du 20 septembre 2026

- Le titre, le sous-titre, la présentation globale, l’objectif professionnel, les coordonnées, les compétences et les formations ont été appliqués aux données de base et aux traductions de profil.
- Les missions Xistar `31` à `34`, IECA `11`, AOA `12` et Oreka `21` à `28` ont été réécrites dans `src/api/mockData.ts`.
- Les traductions anglaises correspondantes ont été finalisées dans `src/api/mockDataLocales.ts`, y compris les huit projets Oreka qui n’étaient pas traduits auparavant.
- Le graphique de répartition des langages a été retiré du type, des données et de l’interface. L’objectif professionnel, ajouté à cette étape, a ensuite été supprimé des versions web et Word le 21 septembre 2026.
- Le composant téléphone accepte désormais le format international `+33 6 71 03 97 84`.
- `npm run lint` et `npm run build` ont réussi après l’application des textes validés.

### Finalisation — session du 21 septembre 2026

- Les rendus web français et anglais ont été contrôlés ; les traductions des projets Oreka sont rattachées à la bonne expérience.
- Les exports Word français et anglais sont générés depuis les mêmes données localisées que le CV web.
- Les deux documents Word comptent huit pages. Leur rendu a été contrôlé page par page, notamment les coupures de tableaux entre les pages et la lisibilité des intitulés de contributions.
- Les fichiers livrés sont `artifacts/cv-alexandre-plana-fr-2026-09-21.docx` et `artifacts/cv-alexandre-plana-en-2026-09-21.docx`.

### Harmonisation anglaise — session du 26 septembre 2026

- Les niveaux de langue sont désormais localisés : `French · Native` et `English · Technical` dans la version anglaise.
- Le titre anglais, les libellés de navigation et les intitulés de sections ont été reformulés pour éviter les calques, notamment `Education & Training`, `Personal Projects` et `Selected Contributions`.
- Les textes anglais de Xistar, IECA, AOA, Dosicase, Iasit et Vorrery ont été relus et harmonisés avec les contenus français validés, sans modifier le périmètre des responsabilités.
- Dans l’export Word, chaque fiche de projet personnel est désormais conservée sur une même page afin d’éviter qu’un titre soit isolé du reste de son contenu.

## Points techniques repérés lors de l'audit initial

- Les contenus partagés entre `src/api/mockData.ts` et `src/api/mockDataLocales.ts` ont été synchronisés lors de l’application.
- Les traductions anglaises et les libellés français ont été harmonisés pour les contenus retravaillés.
- L’adresse e-mail corrigée et le téléphone au format international sont appliqués aux deux rendus.
- L’export Word utilise les mêmes données localisées que le rendu web et a été contrôlé après l’application globale des textes validés.
- Le rendu des chips est mutualisé entre les résumés, les descriptions et les contributions du CV web. L'export Word convertit également les marqueurs en badges intégrés au texte.
