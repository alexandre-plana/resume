# Suivi de réécriture du CV

Ce document consigne les versions avant/après, leur statut de validation et les révisions demandées avant leur application dans le CV.

## Version française

### Titre et sous-titre

**Statut :** validés, non appliqués  
**Champs principaux :** `src/api/mockDataLocales.ts` → `fr.profile.title` et `fr.profile.subtitle`  
**Doublons à synchroniser lors de l'application :** `src/api/mockData.ts` → `mockProfile.title` et `mockProfile.subtitle`

#### Avant

> Développeur Front End  
> Industrie · UI/UX · Multi Plateforme

#### Après

> Développeur full-stack, expertise front-end  
> Applications industrielles · UI/UX · Multiplateforme

#### Motif de la réécriture

Le titre reflète le périmètre full-stack actuel sans effacer l'expertise front-end construite au fil du parcours. Le sous-titre conserve des domaines documentés et évite la mention « Temps réel », dont le sens varie selon les secteurs.

### Présentation globale

**Statut :** validée, non appliquée
**Champ principal :** `src/api/mockDataLocales.ts` → `fr.profile.bio`  
**Doublon à synchroniser lors de l'application :** `src/api/mockData.ts` → `mockProfile.bio`

#### Avant — texte actuellement affiché

> Développeur Front-End avec 13 ans d’expérience, j’ai évolué dans des secteurs industriels exigeants (énergie, nucléaire, défense, IIoT). J’ai appris à concevoir des interfaces intuitives et fiables, en collaborant avec des équipes pluridisciplinaires et en adaptant les solutions aux besoins métier. Curieux, rigoureux et orienté qualité, je maîtrise les architectures modernes (micro-frontend, Vue, React, TypeScript) et je place l’expérience utilisateur au cœur de chaque projet.

#### Après — texte validé

> Développeur spécialisé dans les applications industrielles, j’ai construit une expertise front-end et UI/UX que j’étends aujourd’hui au développement full-stack. Sur Xistar, j’interviens de l’interface opérateur aux services qui intègrent et diffusent les données en temps réel. J’aborde le développement en reliant usages métier, architecture et contraintes techniques, avec une attention portée à la cohérence du produit, de la maquette au code livré.

#### Motif de la réécriture

Le nouveau texte présente le positionnement et la manière de travailler, sans répéter la chronologie détaillée dans les expériences. Il distingue le socle front-end et UI/UX du périmètre full-stack actuel, sans détailler les technologies qui figurent dans les expériences.

### Expérience Xistar

**Statut :** validée, non appliquée
**Champs principaux :** `src/api/mockData.ts` → expérience `3`, mission `31` (`badge`, `cardSummary`, `desc`, `tasks`)  
**Traduction anglaise à harmoniser ultérieurement :** `src/api/mockDataLocales.ts` → `en.experiences.3.missions.31`

#### Avant — intitulé

> Développeur full stack

#### Après — intitulé validé

> Développeur full-stack

#### Avant — carte

> Développeur full stack sur Xistar, poste de commandement tactique maritime dans le navigateur : image tactique temps réel #maplibre #deckgl en symbologie OTAN APP-6D, conduite de missions et de drones, mur d'écrans synchronisé et rejeu complet des opérations. Temps réel bout-en-bout #mqtt #socketio, une base de code → trois produits (défense, portuaire, démo) via un registre de features #treeshaking, qualité outillée #vitest #gitlabci.

#### Après — carte validée

> Développeur full-stack sur Xistar, un poste de commandement tactique maritime accessible depuis le navigateur. J’interviens sur l’interface opérateur en #typescript et #react, les services en #go, la cartographie #maplibre #deckgl en symbologie OTAN #app-6d et l’interopérabilité via #mqtt et #api-rest. L’application pilote un mur d’écrans depuis un poste maître et propose un rejeu temporel pour les rapports de situation et les débriefings.

#### Avant — description détaillée

> Développement de Xistar, poste de commandement tactique maritime dans le navigateur : un produit unique couvrant la boucle capteur → opérateur → décision → action → analyse. Image tactique temps réel (MapLibre + deck.gl, symbologie OTAN APP-6D, grille MGRS, bathymétrie), conduite de missions et de drones avec enchaînements automatiques et humain dans la boucle, mur d'écrans synchronisé avec push distant, rejeu complet des opérations. Architecture « pont » : adaptateurs isolés aux frontières (AIS, NMEA, CoT, MAVLink) vers un modèle canonique diffusé via MQTT et Socket.io. Une seule base de code produit trois déclinaisons (défense, portuaire, démo) grâce à un registre de features par profil avec lazy loading et tree-shaking.

#### Après — description détaillée validée

> Xistar réunit la situation tactique, la conduite de missions et de drones, la gestion des alertes, le pilotage multi-écran et le rejeu des opérations. L’interface opérateur repose sur #typescript, #react et #dockview ; la cartographie utilise #maplibre et #deckgl pour afficher une symbologie OTAN #app-6d, une grille #mgrs et la bathymétrie. Les services #go ingèrent des flux partenaires #ais, #nmea, #cot et #mavlink, transmettent des ordres et publient des informations via #mqtt et #api-rest. Les profils de déploiement et la communication entre instances permettent d’adapter le produit aux contextes défense, portuaire et démonstration.

#### Avant — contributions détaillées

- Développer l'interface opérateur : situation tactique, panneaux de missions, console d'alertes BAM/CAM avec escalade et humain dans la boucle
- Implémenter le rendu cartographique MapLibre + deck.gl : symbologie APP-6D, trails, vecteurs de route, grille MGRS, bathymétrie
- Concevoir le système de features à registre par profil : manifests, lazy loading, builds tree-shakés — trois produits sans fork fonctionnel
- Brancher le temps réel bout-en-bout : flux capteurs (AIS, NMEA, CoT, MAVLink) adaptés en frontière puis diffusés via MQTT et Socket.io jusqu'à l'UI
- Mettre en place le rejeu synchronisé multi-écrans et le mur d'écrans avec push distant de vues
- Outiller la qualité : Vitest front et back, lint, pipeline GitLab CI en 5 étapes avec déploiement taggé et smoke tests

#### Après — contributions détaillées validées

- Concevoir en #typescript et #react l’espace de travail opérateur sous forme de panneaux #dockview, puis intégrer la cartographie #maplibre #deckgl en symbologie OTAN #app-6d.
- Développer le système d’alertes et ses mécanismes d’escalade, avec une #api dédiée et l’envoi de notifications par e-mail.
- Assurer dans les services #go l’interopérabilité avec les systèmes partenaires : ingestion des flux #ais, #nmea, #cot et #mavlink, transmission des ordres et publication via #mqtt et #api-rest.
- Développer l’application multi-écran et sa gestion centralisée depuis un poste maître, avec partage distant et synchronisation des vues.
- Mettre en place un rejeu temporel des opérations destiné à l’analyse, aux rapports de situation et aux débriefings.

#### Motif de la réécriture

La nouvelle version met en avant l’interopérabilité, la gestion centralisée du mur d’écrans, le rejeu temporel et la capacité d’adaptation aux différents déploiements. Dockview et le système d’alertes sont présentés comme deux responsabilités distinctes. Les technologies, la norme APP-6D et les protocoles d’échange sont intégrés au contexte des réalisations sous forme de chips dans la carte, la description et les contributions, sans transformer les textes en inventaires techniques.

### Expérience IECA

**Statut :** validée, non appliquée
**Champs principaux :** `src/api/mockData.ts` → expérience `1`, mission `11` ; `src/api/mockDataLocales.ts` → `fr.experiences.1.missions.11`
**Traduction anglaise à harmoniser ultérieurement :** `src/api/mockDataLocales.ts` → `en.experiences.1.missions.11`

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

**Statut :** validée, non appliquée
**Champs principaux :** `src/api/mockData.ts` → expérience `1`, mission `12` ; `src/api/mockDataLocales.ts` → `fr.experiences.1.missions.12`
**Traduction anglaise à harmoniser ultérieurement :** `src/api/mockDataLocales.ts` → `en.experiences.1.missions.12`

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

**Statut :** validée, non appliquée
**Champs principaux :** `src/api/mockData.ts` → expérience `2`, mission `21` ; `src/api/mockDataLocales.ts` → `fr.experiences.2.missions.21`
**Traduction anglaise à harmoniser ultérieurement :** `src/api/mockDataLocales.ts` → `en.experiences.2.missions.21`

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
