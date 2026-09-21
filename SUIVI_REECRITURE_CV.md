# Suivi de réécriture du CV

Ce document consigne les versions avant/après, leur statut de validation et les révisions demandées avant leur application dans le CV.

## Version française

### Titre et sous-titre

**Statut :** validés et appliqués
**Champs principaux :** `src/api/mockDataLocales.ts` → `fr.profile.title` et `fr.profile.subtitle`  
**Sources synchronisées :** `src/api/mockData.ts` → `mockProfile.title` et `mockProfile.subtitle`

#### Avant

> Développeur Front End  
> Industrie · UI/UX · Multi Plateforme

#### Après

> Développeur full-stack, expertise front-end  
> Applications industrielles · UI/UX · Multiplateforme

#### Motif de la réécriture

Le titre reflète le périmètre full-stack actuel sans effacer l'expertise front-end construite au fil du parcours. Le sous-titre conserve des domaines documentés et évite la mention « Temps réel », dont le sens varie selon les secteurs.

### Présentation globale

**Statut :** validée et appliquée
**Champ principal :** `src/api/mockDataLocales.ts` → `fr.profile.bio`  
**Source synchronisée :** `src/api/mockData.ts` → `mockProfile.bio`

#### Avant — texte actuellement affiché

> Développeur Front-End avec 13 ans d’expérience, j’ai évolué dans des secteurs industriels exigeants (énergie, nucléaire, défense, IIoT). J’ai appris à concevoir des interfaces intuitives et fiables, en collaborant avec des équipes pluridisciplinaires et en adaptant les solutions aux besoins métier. Curieux, rigoureux et orienté qualité, je maîtrise les architectures modernes (micro-frontend, Vue, React, TypeScript) et je place l’expérience utilisateur au cœur de chaque projet.

#### Après — texte validé

> Développeur spécialisé dans les applications industrielles, j’ai construit une expertise front-end et UI/UX que j’étends aujourd’hui au développement full-stack. Sur Xistar, j’interviens de l’interface opérateur aux services qui intègrent et diffusent les données opérationnelles. J’aborde le développement en reliant usages métier, architecture et contraintes techniques, avec une attention portée à la cohérence du produit, de la maquette au code livré.

#### Motif de la réécriture

Le nouveau texte présente le positionnement et la manière de travailler, sans répéter la chronologie détaillée dans les expériences. Il distingue le socle front-end et UI/UX du périmètre full-stack actuel, sans détailler les technologies qui figurent dans les expériences.

### Expérience Xistar

**Statut :** validée et appliquée
**Champs principaux :** `src/api/mockData.ts` → expérience `3`, mission `31` (`badge`, `cardSummary`, `desc`, `tasks`)  
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.3.missions.31`

#### Avant — intitulé

> Développeur full stack

#### Après — intitulé validé

> Développeur full-stack

#### Avant — carte

> Développeur full stack sur Xistar, poste de commandement tactique maritime dans le navigateur : image tactique temps réel #maplibre #deckgl en symbologie OTAN APP-6D, conduite de missions et de drones, mur d'écrans synchronisé et rejeu complet des opérations. Temps réel bout-en-bout #mqtt #socketio, une base de code → trois produits (défense, portuaire, démo) via un registre de features #treeshaking, qualité outillée #vitest #gitlabci.

#### Après — carte validée

> Développeur full-stack sur Xistar, un poste de commandement tactique maritime accessible depuis le navigateur. Je participe à la conception fonctionnelle des parcours opérateur et à leur réalisation en #typescript et #react, ainsi qu’au développement des services en #go. Le produit combine une cartographie tactique #maplibre #deckgl en symbologie OTAN #app-6d, l’interopérabilité #mqtt #api-rest, le pilotage multi-écran et le rejeu temporel.

#### Avant — description détaillée

> Développement de Xistar, poste de commandement tactique maritime dans le navigateur : un produit unique couvrant la boucle capteur → opérateur → décision → action → analyse. Image tactique temps réel (MapLibre + deck.gl, symbologie OTAN APP-6D, grille MGRS, bathymétrie), conduite de missions et de drones avec enchaînements automatiques et humain dans la boucle, mur d'écrans synchronisé avec push distant, rejeu complet des opérations. Architecture « pont » : adaptateurs isolés aux frontières (AIS, NMEA, CoT, MAVLink) vers un modèle canonique diffusé via MQTT et Socket.io. Une seule base de code produit trois déclinaisons (défense, portuaire, démo) grâce à un registre de features par profil avec lazy loading et tree-shaking.

#### Après — description détaillée validée

> Xistar réunit la situation tactique, la conduite de missions et de drones, la gestion des alertes, le pilotage multi-écran et le rejeu des opérations. Je participe à la conception fonctionnelle à partir des besoins opérationnels, en définissant les parcours opérateur, les interactions et le comportement attendu des fonctionnalités. L’interface repose sur #typescript, #react et #dockview ; la cartographie utilise #maplibre et #deckgl pour afficher une symbologie OTAN #app-6d, une grille #mgrs et la bathymétrie. Les services #go ingèrent des flux partenaires #ais, #nmea, #cot et #mavlink, transmettent des ordres et publient des informations via #mqtt et #api-rest. Les profils de déploiement et la communication entre instances permettent d’adapter le produit aux contextes défense, portuaire et démonstration.

#### Avant — contributions détaillées

- Développer l'interface opérateur : situation tactique, panneaux de missions, console d'alertes BAM/CAM avec escalade et humain dans la boucle
- Implémenter le rendu cartographique MapLibre + deck.gl : symbologie APP-6D, trails, vecteurs de route, grille MGRS, bathymétrie
- Concevoir le système de features à registre par profil : manifests, lazy loading, builds tree-shakés — trois produits sans fork fonctionnel
- Brancher le temps réel bout-en-bout : flux capteurs (AIS, NMEA, CoT, MAVLink) adaptés en frontière puis diffusés via MQTT et Socket.io jusqu'à l'UI
- Mettre en place le rejeu synchronisé multi-écrans et le mur d'écrans avec push distant de vues
- Outiller la qualité : Vitest front et back, lint, pipeline GitLab CI en 5 étapes avec déploiement taggé et smoke tests

#### Après — contributions détaillées validées

- Participer à la conception fonctionnelle de Xistar à partir des besoins opérationnels : définir les parcours opérateur, les interactions et le comportement attendu des fonctionnalités.
- Concevoir en #typescript et #react l’espace de travail opérateur sous forme de panneaux #dockview, puis intégrer la cartographie #maplibre #deckgl en symbologie OTAN #app-6d.
- Développer le système d’alertes et ses mécanismes d’escalade, avec une #api dédiée et l’envoi de notifications par e-mail.
- Assurer dans les services #go l’interopérabilité avec les systèmes partenaires : ingestion des flux #ais, #nmea, #cot et #mavlink, transmission des ordres et publication via #mqtt et #api-rest.
- Développer l’application multi-écran et sa gestion centralisée depuis un poste maître, puis mettre en place le rejeu temporel destiné à l’analyse, aux rapports de situation et aux débriefings.

#### Motif de la réécriture

La nouvelle version fait apparaître la conception fonctionnelle à partir des besoins opérationnels, puis sa traduction dans les parcours, les interactions et les fonctionnalités de Xistar. Elle conserve l’interopérabilité, la gestion centralisée du mur d’écrans, le rejeu temporel et la capacité d’adaptation aux différents déploiements. Dockview et le système d’alertes restent présentés comme deux responsabilités distinctes. Les technologies, la norme APP-6D et les protocoles d’échange sont intégrés au contexte des réalisations sous forme de chips, sans transformer les textes en inventaires techniques.

### Expérience IECA

**Statut :** validée et appliquée
**Champs principaux :** `src/api/mockData.ts` → expérience `1`, mission `11` ; `src/api/mockDataLocales.ts` → `fr.experiences.1.missions.11`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.1.missions.11`

#### Avant — intitulé

> Développeur front end

#### Après — intitulé validé

> Développeur front-end

#### Avant — carte

> Développeur frontend sur la plateforme IIoT Edge de Schneider : conception de composants mutualisés #vue3 #typescript pour plusieurs équipes projet, structuration de l’architecture #single-spa #microfrontend, industrialisation de la qualité avec #jest et #sonarqube, contribution active au delivery #scrum orienté performance et maintenabilité. Exemples de tâches : création de composants graphiques, intégration d’un module de gestion des alertes, optimisation du chargement des données, mise en place de tests unitaires, refactoring, amélioration de l’accessibilité.

#### Après — carte validée

> Développeur front-end sur IECA, la plateforme IIoT Edge de Schneider Electric, avec des interventions ponctuelles côté back-end. J’ai contribué à plusieurs domaines fonctionnels — connecteurs, calculs, conditions, alertes et scripting — ainsi qu’au socle partagé de l’architecture #microfrontend fondée sur #vue3 #typescript et #single-spa.

#### Avant — description détaillée

> Développement d’applications Edge industrielles en architecture micro-frontend avec Vue 3 et TypeScript. Contribution active à la vie du projet en Scrum, avec un focus constant sur la qualité, la performance et l’accessibilité.

#### Après — description détaillée validée

> Au sein d’une équipe #scrum pluridisciplinaire, j’ai développé des applications Edge organisées en #microfrontend avec #vue3, #typescript et #single-spa. Mon périmètre couvrait principalement les interfaces et leur architecture, avec quelques extensions de fonctionnalités back-end. J’intervenais à la fois sur les domaines fonctionnels de la plateforme, les composants partagés, les tests et le suivi de la qualité du code.

#### Avant — contributions détaillées

- Concevoir et développer des composants front réutilisables par les différentes équipes du projet.
- Implémenter une architecture micro-frontend.
- Implémenter les tests unitaires en utilisant Jest.
- Surveiller les performances et le bon fonctionnement de l’application, et améliorer la qualité du code via SonarQube.
- Amélioration continue de l’architecture et de la scalabilité du projet.

#### Après — contributions détaillées validées

- Participer au développement des fonctionnalités liées aux connecteurs, aux calculs, aux conditions, aux alertes et au scripting.
- Concevoir en #vue3 et #typescript des composants partagés, dont une table configurable, un socle de routage et un sélecteur de propriétés.
- Étendre ponctuellement les fonctionnalités back-end nécessaires aux évolutions prises en charge côté front-end.
- Développer avec #jest les tests unitaires des composants, des stores #pinia et des fonctions utilitaires, puis suivre les performances et la qualité du code avec #sonarqube.
- Concevoir, lors d’un IP Sprint, un prototype d’application #mobile destiné à transmettre les alertes aux opérateurs d’astreinte en dehors de la plateforme IECA.

#### Motif de la réécriture

La nouvelle version restitue l’étendue de la mission au-delà des composants partagés : domaines fonctionnels de la plateforme, dominante front-end, interventions back-end ponctuelles, tests et sujet d’IP Sprint. Les technologies et outils sont rattachés aux contributions concernées sous forme de chips.

### Expérience Augmented Operator Advisor (AOA)

**Statut :** validée et appliquée
**Champs principaux :** `src/api/mockData.ts` → expérience `1`, mission `12` ; `src/api/mockDataLocales.ts` → `fr.experiences.1.missions.12`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.1.missions.12`

#### Intitulé conservé

> Développeur C# / Unity

#### Avant — carte

> Développeur #csharp sur une application #ar industrielle multi-plateforme : conception d'interfaces opérateur #mobile et desktop, structuration de l'architecture front, gestion du mode #offline, de la communication #api avec le serveur de projets, et fiabilisation continue des versions en production.

#### Après — carte validée

> Développeur en #csharp et #unity sur Augmented Operator Advisor, une application industrielle #ar multiplateforme pour #android, #ios et #windows. Mon travail a porté sur l’architecture front-end et les interfaces opérateur, le fonctionnement #offline et la compatibilité des projets entre versions. J’ai également participé au développement du serveur de projets en #python et à ses échanges #http avec l’application.

#### Avant — description détaillée

> Développement pendant 6 ans d'une application AR multi-plateforme (Android, iOS, Windows) pour opérateurs industriels Schneider Electric. Conception et implémentation des interfaces opérateur (tableaux de bord, navigation, interactions tactiles et manettes), gestion des états complexes de la couche AR, mise en place du mode offline avec synchronisation automatique, création d'outils de tests unitaires pour Unity, gestion de la compatibilité multi-version, intégration d'un système de styles externalisé pour clients OEM, optimisation des performances et fiabilisation continue des versions en production.

#### Après — description détaillée validée

> Pendant six ans, j’ai développé en #csharp et #unity les interfaces et l’architecture front-end d’une application #ar destinée aux opérateurs industriels. Le périmètre couvrait les versions #android, #ios et #windows, leur personnalisation pour les clients #oem, le fonctionnement #offline et la préparation des applications pour les différentes plateformes de distribution. J’ai également contribué au serveur de projets en #python et à la communication #http avec l’application.

#### Avant — contributions détaillées

- Conception et développement d'une interface entièrement responsive (iOS, Android, Windows - modes portrait et paysage).
- Compilation, préparation et déploiement des applications sur les différents stores (Google Play, App Store, SESU).
- Création d'un outil dédié aux tests unitaires sous Unity 3D, intégré aux phases de pre-build et post-build.
- Mise en place d'un système de styles externalisé permettant de livrer des versions personnalisées aux couleurs des clients, notamment pour les OEM.
- Conception de l'architecture front-end de l'application : découpage modulaire, conventions de code et séparation des responsabilités.
- Développement d'un système offline avec synchronisation automatique des données dès le rétablissement de la connexion.
- Désérialisation et gestion de la rétrocompatibilité entre les versions de projets : lecture des anciens formats, migration silencieuse à la volée.
- Implémentation de la couche de communication avec le serveur de projets : requêtes HTTP, gestion des erreurs réseau et logique de reconnexion.
- Gestion du cycle de vie des données applicatives : invalidation du cache local, stratégie de rafraîchissement et purge des données obsolètes.

#### Après — contributions détaillées validées

- Concevoir en #csharp et #unity l’architecture front-end et une interface adaptée à #android, #ios et #windows, en modes portrait et paysage.
- Développer le fonctionnement #offline et la synchronisation #http, puis contribuer aux évolutions du serveur de projets en #python et à la gestion des erreurs réseau.
- Assurer la rétrocompatibilité des projets par la lecture des anciens formats et leur migration à la volée.
- Mettre en place un système de styles externalisé pour produire des versions personnalisées aux couleurs des clients #oem.
- Créer sous #unity un outil de tests unitaires intégré aux étapes précédant et suivant les builds.

#### Motif de la réécriture

La nouvelle version décrit le périmètre multiplateforme et les responsabilités techniques sans faire de l’AR le centre du profil. Elle distingue l’architecture front-end, le fonctionnement hors connexion, la compatibilité des projets, la personnalisation OEM et la contribution ciblée au serveur de projets en Python. Les technologies et le protocole sont rattachés aux réalisations concernées sous forme de chips.

### Expérience générale Oreka Ingénierie

**Statut :** validée et appliquée
**Champs principaux :** `src/api/mockData.ts` → expérience `2`, mission `21` ; `src/api/mockDataLocales.ts` → `fr.experiences.2.missions.21`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.2.missions.21`

#### Intitulé conservé

> Développeur C# / Unity 3D

#### Avant — carte

> Développeur #csharp sur des projets #vr #ar industriels pour grands comptes : analyse approfondie des besoins clients, modélisation et intégration 3D #3dsmax #unity3D, développement d'interfaces et de systèmes interactifs 2D/3D, conception UI/UX immersif, optimisation #performance, implémentation de scénarios métier, préparation et livraison de versions clients (debug, support démo), contribution à la qualité visuelle et technique, collaboration sur des contextes sensibles (nucléaire, armement).

#### Après — carte validée

> Développeur C# / Unity 3D chez Oreka Ingénierie sur des serious games #seriousgame, des simulateurs et des outils de visualisation pour EDF, RTE, AREVA, DCNS et SUEZ. J’intervenais dès la conception fonctionnelle pour traduire les besoins et les procédures métier en scénarios interactifs, puis sur leur réalisation en #csharp sous #unity, l’intégration de modèles issus de la #cao et la livraison des applications.

#### Avant — description détaillée

> Pendant quatre années au sein d'Oreka Ingénierie, j'ai occupé le poste de développeur C# / Unity 3D sur des projets VR/AR à forte dimension industrielle. Analyse approfondie des besoins clients, participation aux propositions commerciales, modélisation et intégration 3D (optimisation mesh, lightmaps, shaders), conception UI/UX pour environnements immersifs (VR/AR), développement d'applications interactives haute performance (systèmes d'état, scénarios métier, interactions contrôleur/manette), optimisation des performances (profiling Unity, pooling, pipelines d'import), préparation et livraison de versions clients (builds automatisés, debug, support démo). Collaboration avec grands comptes (EDF, Suez, DCNS, RTE, MBDA) sur des contextes sensibles (nucléaire, armement), avec des exigences techniques élevées. Expertise Unity, C#, VR/AR, UI/UX immersif, outils 3D (SolidWorks, 3ds Max), capacité à proposer des solutions techniques adaptées et efficaces.

#### Après — description détaillée validée

> Pendant quatre ans, j’ai participé à la conception fonctionnelle et au développement d’applications interactives pour l’industrie, le nucléaire et la défense. À partir des besoins clients et des procédures métier, je contribuais à définir les parcours, les scénarios, les interactions et les maquettes fonctionnelles des serious games #seriousgame et des simulateurs. J’assurais ensuite leur réalisation en #csharp sous #unity, l’intégration des modèles issus de #solidworks et #3dsmax, l’optimisation CPU/GPU et la préparation des livraisons.

#### Avant — contributions détaillées

- Développement d'interfaces et de systèmes interactifs 2D/3D sous Unity (C#) : architecture des scènes, scripting gameplay, gestion des événements, systèmes d'interaction VR/AR.
- Intégration et traitement de modèles issus de la CAO (SolidWorks) : optimisation mesh, baking, LOD, lightmaps, réglages matériaux/shaders.
- Optimisation des performances en environnements industriels : profiling Unity, réduction du coût CPU/GPU, pooling d'objets, optimisation des assets et des pipelines d'import.
- Développement de modules techniques spécifiques : gestion d'I/O, logique métier, systèmes d'état, chargement dynamique de contenu.
- Implémentation de scénarios interactifs basés sur les procédures métier : graphes d'états, logiques conditionnelles, triggers.
- Conception d'interfaces immersives adaptées aux usages VR/AR : ergonomie, spatialisation, interactions contrôleur/manette.
- Participation à la définition technique des besoins client : spécifications, faisabilité, choix technologiques, maquettes fonctionnelles.
- Contribution à la qualité visuelle et technique : direction artistique, cohérence des assets, refinements UI/UX.
- Préparation et livraison de versions internes et clients : automatisation partielle des builds, debug, support des démonstrations.

#### Après — contributions détaillées validées

- Participer à la conception fonctionnelle : analyser les besoins clients, étudier leur faisabilité technique et formaliser les parcours, les interactions et les maquettes.
- Concevoir des serious games #seriousgame et des simulateurs à partir des procédures métier, puis structurer les scénarios à l’aide de graphes d’états, de conditions et de déclencheurs.
- Développer en #csharp sous #unity les interfaces et les systèmes interactifs 2D/3D, dont les interactions propres aux dispositifs #vr et #ar.
- Intégrer et optimiser des modèles issus de la #cao avec #solidworks et #3dsmax : maillages, niveaux de détail, lightmaps, matériaux et shaders.
- Optimiser les performances CPU/GPU avec les outils de profiling de #unity, puis préparer les builds, corriger les anomalies et accompagner les démonstrations client.

#### Motif de la réécriture

La nouvelle version place la conception fonctionnelle et les serious games au premier plan : analyse des besoins, formalisation des parcours et transformation des procédures métier en scénarios interactifs. Le développement Unity, l’intégration 3D, l’optimisation et la livraison restent visibles comme mise en œuvre de cette conception. La VR et l’AR sont conservées dans le contexte des dispositifs concernés sans devenir le positionnement général du profil.

### Projet Simulhom

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `2`, mission `22` ; `src/api/mockDataLocales.ts` → `fr.experiences.2.missions.22`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.2.missions.22`

#### Avant — intitulé

> Conception générale & UX/UI

#### Après — intitulé validé

> Conception fonctionnelle & UX/UI

#### Avant — carte

> Conception générale et UX/UI du simulateur ergonomique 3D #vr #csharp #Unity3D pour la prévention des TMS en milieu industriel. Collaboration avec des ergonomes, analyse posturale temps réel, feedback visuel des risques, interface opérateur intuitive.

#### Après — carte validée

> Conception fonctionnelle et UX/UI de Simulhom, un simulateur ergonomique 3D destiné à prévenir les troubles musculosquelettiques en milieu industriel. En collaboration avec des ergonomes, j’ai traduit les méthodes d’analyse posturale en parcours, visualisations et retours compréhensibles pour l’utilisateur, puis participé à leur réalisation en #csharp sous #unity.

#### Avant — description détaillée

> Conception générale du produit en collaboration avec des ergonomes, conception et réalisation UX/UI. Simulateur ergonomique 3D pour la prévention des TMS en milieu industriel. Analyse posturale temps réel, feedback visuel des risques.

#### Après — description détaillée validée

> Simulhom est un simulateur ergonomique 3D conçu pour analyser les postures de travail et visualiser les risques de TMS. J’ai participé à la conception fonctionnelle du produit avec des ergonomes, puis conçu les parcours et l’interface #uiux afin de rendre les indicateurs posturaux lisibles et exploitables. J’ai également contribué au développement de l’application en #csharp sous #unity et à l’intégration des retours visuels dans la scène 3D.

#### Avant — contributions détaillées

- Conception générale du produit.
- Collaboration avec des ergonomes.
- Conception et réalisation UX/UI.
- Développement Unity 3D.

#### Après — contributions détaillées validées

- Participer à la conception fonctionnelle du produit avec des ergonomes, en formalisant les usages et les scénarios d’analyse.
- Concevoir les parcours, l’interface #uiux et les retours visuels associés aux risques posturaux.
- Développer en #csharp sous #unity les interactions et les composants du simulateur 3D.
- Intégrer l’analyse posturale et restituer les indicateurs de risque au fil de la simulation.

#### Motif de la réécriture

La nouvelle version présente Simulhom comme un travail de conception fonctionnelle et UX/UI mené avec des ergonomes. Elle relie l’analyse posturale aux parcours, aux visualisations et aux retours proposés à l’utilisateur, tout en conservant la contribution au développement Unity et C#.

### Projet Dosicase

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `2`, mission `23` ; `src/api/mockDataLocales.ts` → `fr.experiences.2.missions.23`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.2.missions.23`

#### Avant — intitulé

> Conception & Design UI/UX

#### Après — intitulé validé

> Conception UX/UI

#### Avant — carte

> Conception et design UX/UI du simulateur Dosicase pour la radioprotection. #csharp #unity3D #simulation #ux #ui #radioprotection

#### Après — carte validée

> Conception UX/UI de Dosicase, un simulateur destiné à la formation en radioprotection sur chantier-école. J’ai structuré les parcours et conçu les interfaces pour rendre les risques radiologiques et les scénarios de formation compréhensibles pour les apprenants, puis participé à leur intégration dans l’application en #csharp sous #unity.

#### Avant — description détaillée

> Outil de simulation de radioactivité destiné aux chantiers école pour la formation en radioprotection. #csharp #unity3D #simulation #ux #ui #radioprotection. Conception de l'interface utilisateur et design UX pour rendre accessible la compréhension des risques radiologiques. Focus sur la pédagogie et l'apprentissage pratique.

#### Après — description détaillée validée

> Dosicase met la simulation au service de la formation pratique en radioprotection. J’ai conçu l’expérience et l’interface #uiux pour présenter les situations et les risques radiologiques de manière pédagogique, puis contribué à leur intégration dans le simulateur en #csharp sous #unity. Le travail portait autant sur l’organisation des informations que sur les interactions nécessaires à l’apprentissage en chantier-école.

#### Avant — contributions détaillées

- Conception UI/UX.
- Simulation radioprotection.
- Design pédagogique.

#### Après — contributions détaillées validées

- Structurer le parcours pédagogique à partir des objectifs de formation en radioprotection.
- Concevoir l’interface #uiux et organiser les informations liées aux situations et aux risques radiologiques.
- Définir les interactions du simulateur nécessaires à l’apprentissage pratique en chantier-école.
- Participer à l’intégration de l’expérience dans l’application en #csharp sous #unity.

#### Motif de la réécriture

La nouvelle version précise la finalité de Dosicase et relie le travail UX/UI aux besoins pédagogiques de la formation en radioprotection. Elle distingue la structuration du parcours, l’organisation des informations, la conception des interactions et la contribution à l’intégration technique.

### Projet EMEM

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `2`, mission `24` ; `src/api/mockDataLocales.ts` → `fr.experiences.2.missions.24`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.2.missions.24`

#### Avant — intitulé

> C# / 3D Developer

#### Après — intitulé validé

> Développeur C# / Simulation 3D

#### Avant — carte

> Simulation 3D interactive d'une enceinte mobile nucléaire. #csharp #unity3D #simulation #nuclear #3d #wpf

#### Après — carte validée

> Développement d’une simulation 3D interactive de l’EMEM, une enceinte mobile destinée à l’évacuation de matériel en environnement nucléaire. J’ai contribué à la représentation des flux et des matériaux radioactifs ainsi qu’à la conception des interfaces de contrôle pour les opérateurs, en #csharp avec #unity et #wpf.

#### Avant — description détaillée

> Simulation 3D interactive d'une enceinte mobile nucléaire. #csharp #unity3D #simulation #nuclear #3d #wpf. Visualisation 3D des flux, gestion des matériaux radioactifs, interfaces de contrôle temps réel pour opérateurs.

#### Après — description détaillée validée

> L’application représentait le fonctionnement de l’enceinte mobile et les opérations liées à l’évacuation de matériel en contexte nucléaire. Mon travail portait sur le développement #csharp de la simulation sous #unity, la visualisation des flux et la gestion des matériaux radioactifs. J’ai également développé les interfaces opérateur en #wpf pour piloter et suivre la simulation.

#### Avant — contributions détaillées

- Simulation 3D.
- Gestion des matériaux radioactifs.
- Interfaces temps réel.

#### Après — contributions détaillées validées

- Développer en #csharp sous #unity la simulation 3D interactive de l’enceinte mobile.
- Représenter en 3D les flux associés aux opérations d’évacuation de matériel.
- Implémenter la gestion et la représentation des matériaux radioactifs dans la simulation.
- Concevoir en #wpf les interfaces de contrôle destinées aux opérateurs.

#### Motif de la réécriture

La nouvelle version explicite le rôle de l’EMEM et les responsabilités exercées sur la simulation, les flux, les matériaux radioactifs et les interfaces opérateur. Elle remplace la mention générique « temps réel » par une description concrète du pilotage et du suivi de la simulation.

### Projet Aeroball

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `2`, mission `25` ; `src/api/mockDataLocales.ts` → `fr.experiences.2.missions.25`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.2.missions.25`

#### Avant — intitulé

> C# / 3D Developer

#### Après — intitulé validé

> Développeur C# / Serious game

#### Avant — carte

> Serious game de formation Aeroball pour le nucléaire. #csharp #unity3D #seriousgame #simulation #nuclear #3d

#### Après — carte validée

> Développement d’un serious game #seriousgame destiné à former les opérateurs à l’utilisation du poste de contrôle Aeroball en environnement nucléaire. J’ai participé à la traduction des procédures opérationnelles en scénarios interactifs, puis à leur réalisation sous #unity en #csharp et à la modélisation 3D de l’environnement de formation.

#### Avant — description détaillée

> Serious game de formation pour l'utilisation du poste de contrôle Aeroball en milieu nucléaire. #csharp #unity3D #seriousgame #simulation #nuclear #3d. Simulation 3D interactive, développement C# et modélisation 3D pour reproduire fidèlement les procédures opérationnelles.

#### Après — description détaillée validée

> Le projet reproduisait en simulation le déroulement des procédures associées au poste de contrôle Aeroball. Mon travail portait sur la transformation des procédures opérationnelles en séquences de formation interactives, le développement en #csharp sous #unity et la modélisation 3D de l’environnement. Le serious game #seriousgame permettait aux opérateurs de s’entraîner à l’utilisation du poste de contrôle dans un cadre simulé.

#### Avant — contributions détaillées

- Serious game.
- Simulation 3D.
- Modélisation procédurale.

#### Après — contributions détaillées validées

- Analyser les procédures opérationnelles du poste de contrôle Aeroball et les traduire en scénarios de formation.
- Concevoir les séquences et les interactions du serious game #seriousgame.
- Développer en #csharp sous #unity la simulation 3D et le déroulement des scénarios.
- Modéliser l’environnement de formation et l’intégrer dans l’application.

#### Motif de la réécriture

La nouvelle version présente Aeroball comme un travail de transposition des procédures opérationnelles en séquences de formation interactives. Elle distingue la conception des scénarios, le développement de la simulation et la modélisation de l’environnement.

### Projet de formation en radioprotection

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `2`, mission `26` ; `src/api/mockDataLocales.ts` → `fr.experiences.2.missions.26`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.2.missions.26`

#### Avant — intitulé

> C# / 3D Developer

#### Après — intitulé validé

> Développeur C# / Simulation de formation

#### Avant — carte

> Module de formation interactive 3D sur la radioprotection et la sécurité nucléaire. #csharp #unity3D #simulation #radioprotection #training #3d

#### Après — carte validée

> Développement d’un module de formation interactive 3D consacré à la radioprotection et aux procédures de sécurité nucléaire. J’ai participé à la conception et à la réalisation de scénarios d’accident simulés, incluant la gestion des équipes de secours, puis à leur intégration en #csharp sous #unity.

#### Avant — description détaillée

> Module de formation interactive 3D sur la radioprotection et les procédures de sécurité nucléaire. #csharp #unity3D #simulation #radioprotection #training #3d. Simulations de scénarios d'accident, gestion des équipes de secours.

#### Après — description détaillée validée

> Le module proposait des scénarios d’accident simulés pour former aux procédures de radioprotection et de sécurité nucléaire. Mon travail portait sur la structuration des séquences de formation, la modélisation du déroulement des scénarios et la gestion des équipes de secours. J’ai ensuite développé et intégré ces mécanismes en #csharp sous #unity dans un environnement 3D.

#### Avant — contributions détaillées

- Formation radioprotection.
- Simulation scénarios.
- Gestion équipes.

#### Après — contributions détaillées validées

- Traduire les procédures de sécurité nucléaire en séquences de formation interactives.
- Concevoir les scénarios d’accident simulés et leur déroulement.
- Implémenter la gestion des équipes de secours au sein de la simulation.
- Développer en #csharp sous #unity le module de formation et son environnement 3D.

#### Motif de la réécriture

La nouvelle version distingue les procédures de radioprotection, les scénarios d’accident et la gestion des équipes de secours. Elle montre comment ces éléments sont structurés en séquences de formation avant leur développement dans le module 3D.

### Projet de maintenance des générateurs de vapeur

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `2`, mission `27` ; `src/api/mockDataLocales.ts` → `fr.experiences.2.missions.27`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.2.missions.27`

#### Avant — intitulé

> C# / 3D Developer

#### Après — intitulé validé

> Développeur C# / Serious game

#### Avant — carte

> Serious game pour la maintenance nucléaire des générateurs de vapeurs. #csharp #unity3D #seriousgame #simulation #maintenance #nuclear #3d

#### Après — carte validée

> Développement d’un serious game #seriousgame destiné à préparer les interventions de maintenance des générateurs de vapeur pendant les arrêts de tranche. J’ai participé à la transposition des procédures de maintenance nucléaire en scénarios interactifs, puis à leur réalisation en #csharp sous #unity dans un environnement 3D.

#### Avant — description détaillée

> Serious game destiné à préparer les interventions durant les arrêts de tranche pour la maintenance des générateurs de vapeurs. #csharp #unity3D #seriousgame #simulation #maintenance #nuclear #3d. Simulation 3D temps réel, développement C# pour reproduire les procédures complexes de maintenance en environnement nucléaire.

#### Après — description détaillée validée

> Le serious game #seriousgame reproduisait les procédures de maintenance des générateurs de vapeur réalisées pendant les arrêts de tranche. Mon travail portait sur la structuration des séquences d’intervention, leur représentation dans un environnement 3D et le développement des interactions en #csharp sous #unity. L’application était conçue pour préparer les intervenants à ces opérations en environnement nucléaire.

#### Avant — contributions détaillées

- Maintenance nucléaire.
- Simulation 3D.
- Développement C#.

#### Après — contributions détaillées validées

- Analyser les procédures de maintenance des générateurs de vapeur et les traduire en scénarios de formation.
- Structurer les séquences et les interactions correspondant aux différentes étapes d’intervention.
- Représenter en 3D l’environnement et le déroulement des opérations de maintenance.
- Développer en #csharp sous #unity le serious game #seriousgame et ses mécanismes interactifs.

#### Motif de la réécriture

La nouvelle version replace le projet dans le contexte des arrêts de tranche et décrit la transposition des procédures de maintenance en scénarios interactifs. Elle distingue la structuration des interventions, leur représentation 3D et le développement du serious game.

### Projet de radioprotection en chirurgie interventionnelle

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `2`, mission `28` ; `src/api/mockDataLocales.ts` → `fr.experiences.2.missions.28`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.2.missions.28`

#### Avant — intitulé

> C# / 3D Developer

#### Après — intitulé validé

> Développeur C# / Simulation médicale 3D

#### Avant — carte

> Simulation 3D pour la formation chirurgicale et la radioprotection. #csharp #unity3D #simulation #medical #dosimetry #healthcare #3d

#### Après — carte validée

> Développement d’une simulation médicale 3D destinée à former les équipes de chirurgie interventionnelle aux pratiques de radioprotection. J’ai contribué à la représentation de la dosimétrie au cours des scénarios, à la visualisation des zones exposées aux rayonnements et à l’intégration des protocoles opérateur en #csharp sous #unity.

#### Avant — description détaillée

> Simulation 3D pour la formation des équipes chirurgicales. #csharp #unity3D #simulation #medical #dosimetry #healthcare #3d. Dosimétrie en temps réel, visualisation des zones sensibles aux radiations, protocole de radioprotection opérateur.

#### Après — description détaillée validée

> L’application simulait des situations de chirurgie interventionnelle pour former les équipes à l’exposition radiologique et aux précautions associées. Mon travail portait sur l’intégration de la #dosimetrie dans la simulation, la visualisation des zones exposées et la restitution des protocoles de #radioprotection destinés aux opérateurs. J’ai développé ces éléments en #csharp sous #unity dans un environnement 3D.

#### Avant — contributions détaillées

- Simulation médicale.
- Dosimétrie temps réel.
- Radioprotection opérateur.

#### Après — contributions détaillées validées

- Traduire les protocoles de #radioprotection en séquences de formation destinées aux équipes chirurgicales.
- Intégrer la #dosimetrie et représenter son évolution au cours des scénarios simulés.
- Visualiser les zones exposées aux rayonnements dans l’environnement 3D.
- Développer en #csharp sous #unity la simulation médicale et ses interactions.

#### Motif de la réécriture

La nouvelle version replace la dosimétrie et les protocoles de radioprotection dans les scénarios de formation destinés aux équipes chirurgicales. Elle remplace la mention « temps réel » par une description concrète de l’évolution de la dosimétrie et de la visualisation des zones exposées.

### Objectif professionnel

**Statut :** retiré du CV le 21 septembre 2026
**Anciennes sources supprimées :** `src/api/mockData.ts` → `mockProfile.seeking` ; `src/api/mockDataLocales.ts` → `fr.profile.seeking` et `en.profile.seeking`

#### Avant

> Poste Front End web dans un contexte industriel · Vue.js ou React · TypeScript · micro-frontend · équipe orientée qualité & UX

#### Après — texte validé

> Développement full-stack · Expertise front-end et UI/UX · Conception fonctionnelle · Équipe attentive à la qualité produit

#### Motif de la réécriture

Le nouvel objectif ne limitait plus la recherche à un domaine, une technologie ou une architecture particulière. Il exprimait le type de rôle recherché, les axes d’expertise et l’attention portée à la qualité produit.

#### Décision ultérieure

L’encart « À la recherche d’un poste » a finalement été retiré des versions web et Word. Les données, traductions, styles et références de typage associés ont également été supprimés afin de ne pas conserver de code inutilisé.

### Coordonnées

**Statut :** correction validée et appliquée
**Champ principal :** `src/api/mockData.ts` → `mockProfile.email` et `mockProfile.phone`

#### Avant

> alexandre.plana@gmail
>
> 06.71.03.97.84

#### Après — présentation validée

> alexandre.plana@gmail.com
>
> +33 6 71 03 97 84

#### Motif de la correction

L’adresse e-mail affichée auparavant était incomplète. Le numéro adopte maintenant un format international plus adapté à la diffusion du CV. L’intitulé employeur et la localisation restent inchangés, faute d’information plus précise à leur sujet. Le composant d’affichage du téléphone a été adapté à ce format.

### Compétences principales

**Statut :** validées et appliquées
**Champ principal :** `src/api/mockData.ts` → `mockSkills`
**Libellés synchronisés :** `src/api/mockDataLocales.ts` → `fr.skills` et `en.skills`

#### Avant

- **Frameworks :** Vue3, React, single-spa, Jest, Flutter, Unity 3D.
- **Outils :** Docker, Git, Postman, Jira, Figma.

#### Après — organisation validée

- **Langages :** TypeScript, Go, C#, Python.
- **Front-end & visualisation :** React, Vue 3, single-spa, Dockview, MapLibre, deck.gl, Unity 3D.
- **Services & interopérabilité :** API REST, MQTT, AIS, NMEA, CoT, MAVLink.
- **Qualité & outils :** Jest, Vitest, SonarQube, GitLab CI, Docker, Git, Postman, Jira, Figma.

#### Motif de la réécriture

La nouvelle organisation reflète le périmètre full-stack et les compétences documentées dans les expériences validées. Elle distingue les langages, les interfaces et la visualisation, les échanges système et l’outillage. Flutter est retiré faute d’expérience actuellement documentée dans le CV. La hauteur de la barre latérale a été contrôlée lors de l’application.

### Formations et diplômes

**Statut :** validés et appliqués
**Champs principaux :** `src/api/mockData.ts` → `mockFormation`
**Traductions synchronisées :** `src/api/mockDataLocales.ts` → `fr.formation` et `en.formation`

#### Avant

1. `📌 Formations` — **React · TypeScript** — Datacorp · 2026
   Formation approfondie sur React et les bonnes pratiques front-end modernes.
2. `📌 Formations` — **TypeScript · Docker · Vue.js** — Datacorp · 2023
   Formations professionnelles sur les technologies web modernes utilisées dans mes missions actuelles.
3. `📌 Formations` — **Stage Polymorph** — Stage fin de license · 2013
   Design graphique · Communication visuelle.
4. `📌 Diplome` — **Licence 3D Temps Réel** — 3DI Laval · 2012–2013
   3D temps réel · Réalité virtuelle · Unity 3D.
5. `📌 Diplome` — **BTS Communication Visuelle opt. Multimédia** — 3DI Laval · 2010–2012
   Multimédia · Web · Vidéo.

#### Après — textes validés

1. `📌 Formation` — **React · TypeScript** — Datacorp · 2026
   Formation approfondie à React et TypeScript, centrée sur les pratiques modernes du développement front-end.
2. `📌 Formation` — **TypeScript · Docker · Vue.js** — Datacorp · 2023
   Formations professionnelles à TypeScript, Docker et Vue.js, appliquées au développement d’applications web.
3. `📌 Stage` — **Polymorph** — Stage de fin de licence · 2013
   Design graphique · Communication visuelle.
4. `📌 Diplôme` — **Licence 3D temps réel** — 3DI Laval · 2012–2013
   Unity 3D · Réalité virtuelle · 3D temps réel.
5. `📌 Diplôme` — **BTS Communication visuelle — option Multimédia** — 3DI Laval · 2010–2012
   Multimédia · Web · Vidéo.

#### Motif de la réécriture

La nouvelle version distingue les formations professionnelles, le stage et les diplômes. Elle corrige les libellés et l’orthographe, homogénéise les intitulés et remplace la description anglaise présente dans la version française de la formation React.

### Projet Xistar — simulateur de drones et de flotte navale

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `3`, mission `32`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.3.missions.32`

#### Avant — intitulé

> Développeur full stack

#### Après — intitulé validé

> Développeur TypeScript / Simulation

#### Avant — description

> Simulateur Node.js de drones et de flotte navale alimentant Xistar en flux réalistes (positions, états, détections) pour les démos et le développement — conforme au principe « zéro donnée mock » de la plateforme.

#### Après — carte validée

> Développement d’un simulateur de drones et de flotte navale destiné à alimenter Xistar avec des flux représentatifs des conditions d’exploitation. Réalisé en #typescript sous #nodejs, il génère positions, états et détections, puis les publie via #mqtt pour les démonstrations et la mise au point des fonctionnalités, sans recourir à des mocks statiques.

#### Après — description détaillée validée

> Le simulateur génère des données de position, d’état et de détection pour des drones et des navires, puis les transmet à Xistar via #mqtt. Je l’ai développé en #typescript sous #nodejs afin de disposer de flux contrôlables pour les démonstrations et le développement. Il remplace les jeux de données statiques par des entités simulées dont l’état évolue pendant l’exécution.

#### Après — contributions détaillées validées

- Modéliser les drones, les navires et les états nécessaires aux scénarios de simulation.
- Générer des flux de positions, d’états et de détections pendant l’exécution.
- Publier les données du simulateur vers Xistar via #mqtt.
- Développer l’outil en #typescript sous #nodejs pour les démonstrations et la mise au point des fonctionnalités.

#### Motif de la réécriture

La nouvelle version explicite les données produites, leur publication vers Xistar et l’usage du simulateur pour le développement et les démonstrations. Elle reformule le principe « zéro donnée mock » en distinguant les entités simulées des jeux de données statiques.

### Projet Xistar — application mobile

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `3`, mission `33`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.3.missions.33`

#### Avant — intitulé

> Développeur full stack

#### Après — intitulé validé

> Développeur TypeScript / Application mobile

#### Avant — description

> Application mobile de réception des alertes BAM/CAM et d'émission d'ordres (escalade, ordre de retour) : l'opérateur reste dans la boucle depuis le terrain.

#### Après — carte validée

> Développement d’une application mobile permettant aux opérateurs de recevoir les alertes BAM/CAM et de transmettre des ordres depuis le terrain. Réalisée en #typescript avec #react, elle prend en charge l’escalade des alertes et l’émission d’ordres de retour, et communique avec Xistar via #socketio.

#### Après — description détaillée validée

> L’application mobile prolonge Xistar sur le terrain : elle reçoit les alertes BAM/CAM et permet à l’opérateur d’agir sans passer par le poste principal. J’ai développé l’interface en #typescript avec #react ainsi que les échanges #socketio nécessaires à l’escalade des alertes et à l’émission d’ordres de retour.

#### Après — contributions détaillées validées

- Concevoir les parcours mobiles liés à la réception des alertes et à l’émission d’ordres.
- Afficher les alertes BAM/CAM et les informations nécessaires à leur traitement.
- Implémenter l’escalade des alertes et l’envoi des ordres de retour.
- Développer l’interface en #typescript avec #react et intégrer les échanges via #socketio.

#### Motif de la réécriture

La nouvelle version précise le rôle de l’application pour les opérateurs sur le terrain et distingue les parcours mobiles, les fonctions d’alerte et d’ordre ainsi que la communication avec Xistar.

### Projet Xistar — émulateur de mur d’écrans

**Statut :** validé et appliqué
**Champs principaux :** `src/api/mockData.ts` → expérience `3`, mission `34`
**Traduction anglaise harmonisée :** `src/api/mockDataLocales.ts` → `en.experiences.3.missions.34`

#### Avant — intitulé

> Développeur full stack

#### Après — intitulé validé

> Développeur TypeScript / Émulateur multi-écran

#### Avant — description

> Émulateur de mur d'écrans pour développer et démontrer la conduite multi-vues sans salle physique : ensembles d'écrans, mission board, push distant de vues. Stack React / Vite.

#### Après — carte validée

> Développement d’un émulateur de mur d’écrans permettant de concevoir et démontrer les usages multi-vues de Xistar sans disposer d’une salle équipée. Réalisé en #typescript avec #react et #vite, il reproduit des ensembles d’écrans, un tableau de mission et l’envoi distant de vues depuis le poste maître.

#### Après — description détaillée validée

> L’émulateur reproduit la configuration d’un mur d’écrans physique : ensembles d’écrans, tableau de mission et envoi distant de vues. Je l’ai développé en #typescript avec #react et #vite afin de travailler sur la gestion centralisée des affichages et de préparer les démonstrations sans mobiliser une salle équipée.

#### Après — contributions détaillées validées

- Modéliser les ensembles d’écrans et leurs configurations d’affichage.
- Reproduire le tableau de mission utilisé dans la conduite multi-vues.
- Implémenter l’envoi distant de vues depuis le poste maître vers les écrans émulés.
- Développer l’outil en #typescript avec #react et #vite pour le développement et les démonstrations.

#### Motif de la réécriture

La nouvelle version distingue l’émulateur du mur d’écrans opérationnel. Elle précise son rôle dans la reproduction des configurations, du tableau de mission et de la commande distante pour le développement et les démonstrations.

### Graphique de répartition des langages

**Statut :** suppression validée et appliquée
**Champs principaux :** `src/api/mockData.ts` → `mockProfile.languages` ; `src/App.tsx` → bloc `languageStack`

#### Avant

> TypeScript 35 % · C# 35 % · HTML5/CSS 20 % · Dart 10 %

#### Après — décision validée

> Suppression du graphique de répartition des langages et des pourcentages associés.

La section « Langues », consacrée au français et à l’anglais, est conservée. La section « Compétences principales » validée reste la référence pour présenter les langages et technologies.

#### Motif de la suppression

Les pourcentages ne reposent sur aucune mesure documentée et donnent une impression de précision artificielle. Ils ne reflètent plus le profil présenté : Dart n’est relié à aucune expérience actuellement documentée, tandis que Go et Python sont absents du graphique. La section de compétences couvre déjà ces informations sans hiérarchie arbitraire.

#### Cibles à traiter lors de l’application

- Supprimer ou ne plus exposer `mockProfile.languages` dans `src/api/mockData.ts`.
- Retirer le bloc visuel `languageStack` dans `src/App.tsx`.
- Supprimer la traduction devenue inutilisée dans `src/locales/index.ts` si elle ne sert plus ailleurs.
- Vérifier que `src/utils/exportCvToWord.ts` ne dépend pas de ces données.

### Ancien onglet « Projets » et export Word

**Statut :** nettoyage appliqué

L'ancien onglet « Projets » n'était plus présent dans la navigation du CV web, mais son composant, ses données et ses services restaient chargés. L'export Word les reprenait dans une section qui répétait les expériences professionnelles.

Ce circuit a été supprimé. L'export Word utilise désormais directement les données localisées chargées par l'interface et restitue les sections visibles : profil, langues, compétences, expériences, formations, projets personnels et centres d'intérêt.

### Projet personnel Ohlabo

**Statut :** retrait validé et appliqué

Ohlabo est retiré du CV web et de l'export Word, son avancement étant jugé insuffisant pour le présenter parmi les projets personnels. Les données françaises et anglaises correspondantes ont été supprimées.

### Sélection des projets personnels

**Statut :** sélection appliquée

La section est désormais limitée à `iasit`, `vorrery`, `kin` et `n-fold-protocol`. Les projets `specia` et `lavis · Aquarelle Studio` ont été retirés du CV web et de l'export Word, de même que leurs traductions anglaises.

### Projet personnel Kin

**Statut :** nouvelle carte appliquée

**Source vérifiée :** [alexandre-plana/kin](https://github.com/alexandre-plana/kin)

#### Carte

> Conception d'une mémoire numérique familiale privée et auto-hébergée, destinée à conserver photos, vidéos et documents sur un serveur domestique. Le produit prévoit une galerie Android, une administration locale et un accès mobile distant, avec une attention particulière portée à la fiabilité du stockage et à la maîtrise des données.

#### Description détaillée

> Le dépôt rassemble le cadrage fonctionnel et technique de Kin. La feuille de route progresse d'un socle exécutable vers une bibliothèque familiale installable, puis vers la recherche, les albums partagés et un coffre documentaire. Chaque livrable précise les usages, les limites de sécurité et les contrats à préserver avant l'implémentation.

#### Points clés

- Structuration de la feuille de route en 13 livrables fonctionnels, du socle technique à l'organisation familiale.
- Conception du stockage : contrôles d'intégrité, sauvegarde et restauration locales, synchronisation par machine à états.
- Définition d'une galerie Android, de fichiers simples et d'albums partageables.
- Modèle d'authentification, appairage des appareils, groupes, audiences et règles de visibilité.
- Administration web locale et accès mobile distant prévu via Cloudflare Tunnel.

#### Positionnement retenu

La carte distingue explicitement le cadrage du développement : le dépôt contient une conception fonctionnelle et technique structurée, mais pas encore l'implémentation des applications décrites. Le rôle affiché est donc « Conception produit & architecture » et le statut reste « en conception ».

### Projet personnel N-Fold Protocol

**Statut :** nouvelle carte appliquée

**Source vérifiée :** [alexandre-plana/n-fold-protocol](https://github.com/alexandre-plana/n-fold-protocol)

#### Carte

> Conception et développement d'un jeu tactique 3D centré sur la programmation d'une escouade autonome. Le joueur configure l'ordre de priorité des aptitudes, lance un scénario déterministe, observe les décisions prises par les personnages, puis ajuste ses règles. Le prototype vise à rendre chaque comportement prévisible, lisible et explicable.

#### Description détaillée

> Le projet sépare les données conçues dans Godot, une simulation C# indépendante du moteur et la couche de présentation 3D. Le prototype permet déjà de déplacer un point de commandement, de piloter une formation, d'affronter un ennemi et de configurer un programme composé d'aptitudes ordonnées, tout en conservant une exécution reproductible.

#### Points clés

- Simulation C# à pas fixe séparée des scènes et animations Godot, avec snapshots et événements déterministes.
- Déplacement d'escouade autour d'un point de commandement, formation configurable et locomotion synchronisée.
- Programme de personnage composé d'un passif et de quatre emplacements d'aptitudes ordonnés avec solution de repli.
- Combat découpé en phases préparation, exécution et récupération, avec ciblage et retours visuels.
- Validation par tests .NET, tests Godot sans interface et contrats automatisés en Python.

#### Technologies présentées sous forme de chips

`#godot` · `#csharp` · `#.net8` · `#3d` · `#tests`

### Projet personnel Iasit

**Statut :** validé et appliqué

#### Avant — type

> Outillage dev

#### Après — type validé

> Pilotage du développement assisté par IA

#### Avant — rôle

> Développeur full stack

#### Après — rôle validé

> Conception produit & développement full-stack

#### Avant — carte

> Outil de pilotage pour le développement assisté par agents IA : tâches, exécutions et findings traçables, génération de prompts canoniques (run / verify / fix) et orchestration de lots complets. Il pilote le backlog de mes autres projets persos — 580 commits en deux mois.

#### Après — carte validée

> Iasit est un outil de pilotage du développement assisté par des agents IA. Je l'ai conçu pour structurer le cycle préparation, exécution, vérification, correction et acceptation, suivre les bugs sous forme de findings, puis capitaliser sur les problèmes récurrents en les promouvant en learned rules. Ces règles sont réinjectées dans les futurs prompts afin d'améliorer progressivement les exécutions. L'application repose sur #react #typescript et un runtime #nodejs.

#### Avant — description détaillée

> Né du développement assisté par agents IA : l'outil trace tout ce qui compte (tâches, exécutions, findings) et génère des prompts canoniques exécutés par un agent externe — l'app elle-même n'exécute aucune IA, le périmètre est volontairement borné. C'est le méta-outil du lot : kin et vorrery embarquent ses données de pilotage.

#### Après — description détaillée validée

> Le runtime #nodejs gère plusieurs projets et maintient un statut de référence pour chaque tâche. Les bugs et les écarts constatés pendant les vérifications sont enregistrés sous forme de findings, avec leur sévérité, leurs preuves, les fichiers concernés et une correction proposée. Un finding ouvert déclenche le cycle `fix` puis `re-verify` et bloque l'acceptation tant qu'il n'est pas traité.
>
> Lorsqu'un enseignement peut être réutilisé, le finding est promu explicitement en learned rule. La règle conserve son origine, son périmètre et son statut ; les règles actives pertinentes sont ensuite sélectionnées et intégrées aux futurs prompts. Cette boucle permet à Iasit de capitaliser sur les erreurs rencontrées et d'adapter progressivement les instructions transmises aux agents.

#### Avant — points clés

- Formats canoniques Task / TaskExecution / VerificationFinding, statut comme source de vérité unique.
- Prompts run / verify / fix / next en double rendu : fullPrompt + compactInstruction.
- Batch : orchestration d'une plage de tâches (run → verify → fix → re-verify) avec parité CLI/runtime.
- Registry d'agents et chaîne de handoff documentée (analyst → … → release-operator).
- Graphe de contexte Sigma.js avec mode focus, index de fichiers du dépôt, réconciliation d'artefacts.

#### Après — points clés validés

- Concevoir les formats de référence pour les tâches, les exécutions et les findings, puis valider leurs données avec #zod.
- Développer en #react et #typescript les vues de suivi ainsi que le graphe de contexte #sigmajs reliant tâches, exécutions, findings et fichiers.
- Construire un runtime #nodejs multi-projets qui génère les instructions `run`, `verify`, `fix` et `next`, à l'unité ou par lots, et expose leur cycle via #api-rest et #mcp.
- Gérer les bugs à travers une boucle traçable `verify → finding → fix → re-verify`, avec preuves, sévérité, fichiers concernés et blocage de l'acceptation en présence d'écarts ouverts.
- Promouvoir les enseignements réutilisables en learned rules, conserver leur provenance et réinjecter les règles actives pertinentes dans les futurs prompts.

#### Motif de la réécriture

La nouvelle version présente d'abord la finalité de l'outil et son cycle de pilotage. Elle remplace la métrique des 580 commits par des responsabilités vérifiables, détaille la gestion des bugs et décrit la promotion des findings en learned rules comme un mécanisme explicite de capitalisation. L'amélioration des futurs prompts découle de règles sélectionnées selon leur pertinence ; elle n'est pas présentée comme un apprentissage autonome.

#### Cibles synchronisées

- `src/api/mockData.ts` : projet personnel `4`.
- `src/api/mockDataLocales.ts` : traduction anglaise du projet personnel `4`.

### Projet personnel Vorrery

**Statut :** validé et appliqué

#### Avant — type

> App web 3D

#### Après — type validé

> Sandbox pédagogique 3D

#### Avant — rôle

> Développeur full stack

#### Après — rôle validé

> Conception produit & développement front-end 3D

#### Avant — carte

> Forge orbitale 3D : des planètes procédurales déterministes se construisent couche par couche sous les yeux de l'utilisateur, puis rejoignent une maquette de système vivante. Laboratoire de gravité à 32 corps, trous noirs à lentille gravitationnelle, génération en Web Workers et couche mathématique intégralement testée.

#### Après — carte validée

> Vorrery est un sandbox pédagogique 3D conçu pour expérimenter, observer et comprendre par la manipulation. L'utilisateur construit ses propres systèmes, ajuste leurs paramètres et visualise immédiatement les conséquences de ses choix. Le produit combine exploration libre, expériences guidées et parcours adaptés aux enfants dans une interface #react #typescript rendue avec #threejs et #react-three-fiber.

#### Avant — description détaillée

> Le parti-pris : rendre la génération visible. Chaque planète traverse une timeline de couches (orbite, proto-sphère, géologie, relief, hydrosphère, climat, biomes, atmosphère, lunes…) où chaque étape modifie la scène à l'écran. Des contraintes physiques simplifiées (masse, gravité, albédo, pression) orientent l'archétype et les avertissements d'habitabilité.

#### Après — description détaillée validée

> Vorrery place l'expérimentation au centre de l'expérience. L'utilisateur peut créer une scène, modifier ses paramètres, comparer différents scénarios, revenir sur ses actions et recommencer avec les mêmes conditions. La génération reste visible étape par étape afin de montrer comment chaque choix transforme le résultat, plutôt que de présenter uniquement une scène terminée.
>
> Plusieurs niveaux d'accompagnement coexistent : un sandbox libre, un laboratoire proposant des outils de manipulation et de visualisation, des scénarios guidés et un espace destiné aux enfants. Ce dernier repose sur des consignes courtes, une narration audio et un carnet d'observations, sans score, échec ni progression imposée.

#### Avant — points clés

- Forge procédurale déterministe à couches visibles, génération en Web Workers hors thread principal.
- Laboratoire de gravité : 32 corps, gizmos masse/position/vélocité, prédictions de trajectoire, sphères de Hill, undo/redo.
- Objets compacts : trous noirs, pulsars et étoiles à neutrons.
- Scène pour enfants avec sonification orbitale et narration audio.
- Couche mathématique présentée comme intégralement testée.

#### Après — points clés validés

- Concevoir un sandbox permettant de créer, modifier et rejouer des expériences à partir de paramètres contrôlables.
- Rendre la génération procédurale visible sous forme d'étapes successives afin de relier chaque transformation au résultat obtenu.
- Proposer plusieurs modes d'exploration : manipulation libre, expériences guidées, configurations prédéfinies et parcours adaptés aux enfants.
- Concevoir une expérience pédagogique fondée sur l'observation et l'essai, avec narration audio, sonification et carnet d'observations plutôt que des récompenses artificielles.
- Développer l'interface en #react et #typescript, le rendu avec #threejs et #react-three-fiber, et déporter les calculs dans des #web-workers pour préserver la fluidité des manipulations.

#### Motif de la réécriture

La nouvelle version présente Vorrery comme un environnement d'expérimentation avant d'en détailler le domaine scientifique. Elle met en avant la manipulation, les différents niveaux d'accompagnement et la démarche pédagogique. Les mécanismes liés à l'espace, à la gravité et aux modèles physiques restent présents dans le produit, mais servent de support aux usages plutôt que de structurer la carte. La promesse absolue d'une couche mathématique intégralement testée est retirée.

#### Cibles synchronisées

- `src/api/mockData.ts` : projet personnel `6`.
- `src/api/mockDataLocales.ts` : traduction anglaise du projet personnel `6`.
