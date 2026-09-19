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

Le titre, le sous-titre, la présentation globale, Xistar, IECA, AOA et l'expérience générale Oreka Ingénierie sont validés. Les versions avant/après et leurs cibles exactes figurent dans `SUIVI_REECRITURE_CV.md`.

Le titre et le sous-titre ne nécessitent pas de chips. La présentation globale conserve son rôle de positionnement et ne contient ni chips ni spécification de technologies.

Décisions importantes prises pour Xistar :

- faire apparaître le périmètre full-stack sans réduire la mission à des micro-frontends ;
- intégrer la stack confirmée de Xistar : TypeScript et React pour l'interface, Go pour les services ;
- distinguer Dockview et l'organisation de l'interface du système d'alertes ;
- préciser que l'escalade des alertes passe par une API dédiée ainsi que par des notifications par e-mail ;
- mettre en avant l'interopérabilité : ingestion des données partenaires, transmission des ordres et publication via MQTT et API REST ;
- décrire l'application multi-écran, sa gestion centralisée depuis un poste maître et la communication entre instances ;
- présenter le rejeu temporel comme un support à l'analyse, aux rapports de situation et aux débriefings ;
- insister sur la capacité d'adaptation aux différents profils de déploiement plutôt que sur la modularité technique.

### Généralisation des chips dans Xistar — validée

**Carte**

> Développeur full-stack sur Xistar, un poste de commandement tactique maritime accessible depuis le navigateur. J'interviens sur l'interface opérateur en #typescript et #react, les services en #go, la cartographie #maplibre #deckgl en symbologie OTAN #app-6d et l'interopérabilité via #mqtt et #api-rest. L'application pilote un mur d'écrans depuis un poste maître et propose un rejeu temporel pour les rapports de situation et les débriefings.

**Description détaillée**

> Xistar réunit la situation tactique, la conduite de missions et de drones, la gestion des alertes, le pilotage multi-écran et le rejeu des opérations. L'interface opérateur repose sur #typescript, #react et #dockview ; la cartographie utilise #maplibre et #deckgl pour afficher une symbologie OTAN #app-6d, une grille #mgrs et la bathymétrie. Les services #go ingèrent des flux partenaires #ais, #nmea, #cot et #mavlink, transmettent des ordres et publient des informations via #mqtt et #api-rest. Les profils de déploiement et la communication entre instances permettent d'adapter le produit aux contextes défense, portuaire et démonstration.

**Contributions validées**

- Concevoir en #typescript et #react l'espace de travail opérateur sous forme de panneaux #dockview, puis intégrer la cartographie #maplibre #deckgl en symbologie OTAN #app-6d.
- Développer le système d'alertes et ses mécanismes d'escalade, avec une #api dédiée et l'envoi de notifications par e-mail.
- Assurer dans les services #go l'interopérabilité avec les systèmes partenaires : ingestion des flux #ais, #nmea, #cot et #mavlink, transmission des ordres et publication via #mqtt et #api-rest.
- Développer l'application multi-écran et sa gestion centralisée depuis un poste maître, avec partage distant et synchronisation des vues.
- Mettre en place un rejeu temporel des opérations destiné à l'analyse, aux rapports de situation et aux débriefings.

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

## Révision de Xistar — conception fonctionnelle

Les textes ci-dessous remplaceraient la version Xistar précédemment validée. Cette révision n'est pas encore validée.

**Carte révisée**

> Développeur full-stack sur Xistar, un poste de commandement tactique maritime accessible depuis le navigateur. Je participe à la conception fonctionnelle des parcours opérateur et à leur réalisation en #typescript et #react, ainsi qu'au développement des services en #go. Le produit combine une cartographie tactique #maplibre #deckgl en symbologie OTAN #app-6d, l'interopérabilité #mqtt #api-rest, le pilotage multi-écran et le rejeu temporel.

**Description détaillée révisée**

> Xistar réunit la situation tactique, la conduite de missions et de drones, la gestion des alertes, le pilotage multi-écran et le rejeu des opérations. Je participe à la conception fonctionnelle à partir des besoins opérationnels, en définissant les parcours opérateur, les interactions et le comportement attendu des fonctionnalités. L'interface repose sur #typescript, #react et #dockview ; la cartographie utilise #maplibre et #deckgl pour afficher une symbologie OTAN #app-6d, une grille #mgrs et la bathymétrie. Les services #go ingèrent des flux partenaires #ais, #nmea, #cot et #mavlink, transmettent des ordres et publient des informations via #mqtt et #api-rest. Les profils de déploiement et la communication entre instances permettent d'adapter le produit aux contextes défense, portuaire et démonstration.

**Contributions révisées**

- Participer à la conception fonctionnelle de Xistar à partir des besoins opérationnels : définir les parcours opérateur, les interactions et le comportement attendu des fonctionnalités.
- Concevoir en #typescript et #react l'espace de travail opérateur sous forme de panneaux #dockview, puis intégrer la cartographie #maplibre #deckgl en symbologie OTAN #app-6d.
- Développer le système d'alertes et ses mécanismes d'escalade, avec une #api dédiée et l'envoi de notifications par e-mail.
- Assurer dans les services #go l'interopérabilité avec les systèmes partenaires : ingestion des flux #ais, #nmea, #cot et #mavlink, transmission des ordres et publication via #mqtt et #api-rest.
- Développer l'application multi-écran et sa gestion centralisée depuis un poste maître, puis mettre en place le rejeu temporel destiné à l'analyse, aux rapports de situation et aux débriefings.

## Point de reprise recommandé

1. Faire valider la révision Xistar consacrée à la conception fonctionnelle, puis remplacer la version validée dans `SUIVI_REECRITURE_CV.md`.
2. Continuer avec les projets détaillés d'Oreka selon le même processus.
3. Conserver la conception fonctionnelle parmi les axes à faire apparaître lorsqu'elle est documentée dans les expériences suivantes.
4. Appliquer les changements aux sources uniquement lorsque l'utilisateur le demandera explicitement, puis étendre le rendu des chips, harmoniser les doublons et les traductions.

## Points techniques repérés lors de l'audit initial

- Plusieurs contenus sont dupliqués entre `src/api/mockData.ts` et `src/api/mockDataLocales.ts` ; les deux sources devront rester cohérentes lors de l'application.
- Certaines traductions et certains accents sont incomplets ou incohérents.
- Les coordonnées de contact, dont l'adresse e-mail et la présentation du téléphone, devront être vérifiées avant finalisation.
- L'export Word contient également des contenus susceptibles de dupliquer les données affichées et devra être contrôlé après la réécriture.
- Le rendu des chips est actuellement limité à `cardSummary`. L'application finale devra utiliser le même rendu pour `mission.desc` et chaque entrée de `mission.tasks`, tandis que l'export Word devra éviter d'afficher des marqueurs `#` bruts.
