# Suivi de réécriture du CV

Ce document consigne les textes validés avant leur application dans le CV. Les propositions rejetées ou encore en discussion n'y figurent pas.

> **Révision technique en cours :** le titre, le sous-titre et la présentation globale restent validés. Le contenu de Xistar reste validé sur le fond, mais sa formulation doit être revalidée après réintégration des technologies, normes et protocoles sous forme de chips dans la carte. Ne pas l'appliquer aux sources avant cette revalidation.

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

Le nouveau texte présente le positionnement et la manière de travailler, sans répéter la chronologie détaillée dans les expériences. Il distingue le socle front-end et UI/UX du périmètre full-stack actuel.

### Expérience Xistar

**Statut :** validée sur le fond, révision technique à revalider, non appliquée
**Champs principaux :** `src/api/mockData.ts` → expérience `3`, mission `31` (`badge`, `cardSummary`, `desc`, `tasks`)  
**Traduction anglaise à harmoniser ultérieurement :** `src/api/mockDataLocales.ts` → `en.experiences.3.missions.31`

#### Avant — intitulé

> Développeur full stack

#### Après — intitulé validé

> Développeur full-stack

#### Avant — carte

> Développeur full stack sur Xistar, poste de commandement tactique maritime dans le navigateur : image tactique temps réel #maplibre #deckgl en symbologie OTAN APP-6D, conduite de missions et de drones, mur d'écrans synchronisé et rejeu complet des opérations. Temps réel bout-en-bout #mqtt #socketio, une base de code → trois produits (défense, portuaire, démo) via un registre de features #treeshaking, qualité outillée #vitest #gitlabci.

#### Après — carte validée

> Développeur full-stack sur Xistar, un poste de commandement tactique maritime accessible depuis le navigateur. J’interviens sur l’interface opérateur et l’interopérabilité avec les systèmes partenaires, de l’ingestion des données à leur publication via MQTT et API REST. L’application pilote un mur d’écrans depuis un poste maître et propose un rejeu temporel pour les rapports de situation et les débriefings.

#### Avant — description détaillée

> Développement de Xistar, poste de commandement tactique maritime dans le navigateur : un produit unique couvrant la boucle capteur → opérateur → décision → action → analyse. Image tactique temps réel (MapLibre + deck.gl, symbologie OTAN APP-6D, grille MGRS, bathymétrie), conduite de missions et de drones avec enchaînements automatiques et humain dans la boucle, mur d'écrans synchronisé avec push distant, rejeu complet des opérations. Architecture « pont » : adaptateurs isolés aux frontières (AIS, NMEA, CoT, MAVLink) vers un modèle canonique diffusé via MQTT et Socket.io. Une seule base de code produit trois déclinaisons (défense, portuaire, démo) grâce à un registre de features par profil avec lazy loading et tree-shaking.

#### Après — description détaillée validée

> Xistar réunit la situation tactique, la conduite de missions et de drones, la gestion des alertes, le pilotage multi-écran et le rejeu des opérations. Le produit échange en direct avec des systèmes partenaires pour recevoir leurs données, transmettre des ordres et publier des informations vers d’autres applications. Ses profils de déploiement et la communication entre instances permettent de l’adapter aux contextes défense, portuaire et démonstration.

#### Avant — contributions détaillées

- Développer l'interface opérateur : situation tactique, panneaux de missions, console d'alertes BAM/CAM avec escalade et humain dans la boucle
- Implémenter le rendu cartographique MapLibre + deck.gl : symbologie APP-6D, trails, vecteurs de route, grille MGRS, bathymétrie
- Concevoir le système de features à registre par profil : manifests, lazy loading, builds tree-shakés — trois produits sans fork fonctionnel
- Brancher le temps réel bout-en-bout : flux capteurs (AIS, NMEA, CoT, MAVLink) adaptés en frontière puis diffusés via MQTT et Socket.io jusqu'à l'UI
- Mettre en place le rejeu synchronisé multi-écrans et le mur d'écrans avec push distant de vues
- Outiller la qualité : Vitest front et back, lint, pipeline GitLab CI en 5 étapes avec déploiement taggé et smoke tests

#### Après — contributions détaillées validées

- Concevoir l’espace de travail opérateur sous forme de panneaux Dockview pour organiser la situation tactique, la cartographie et les vues de mission.
- Développer le système d’alertes et ses mécanismes d’escalade, avec une API dédiée et l’envoi de notifications par e-mail.
- Assurer l’interopérabilité avec les systèmes partenaires : ingestion des données, transmission des ordres et publication via des brokers MQTT et une API REST.
- Développer l’application multi-écran et sa gestion centralisée depuis un poste maître, avec partage distant et synchronisation des vues.
- Mettre en place un rejeu temporel des opérations destiné à l’analyse, aux rapports de situation et aux débriefings.

#### Motif de la réécriture

La nouvelle version met en avant l’interopérabilité, la gestion centralisée du mur d’écrans, le rejeu temporel et la capacité d’adaptation aux différents déploiements. Dockview et le système d’alertes sont présentés comme deux responsabilités distinctes. Les technologies déjà visibles dans les badges ne structurent plus la carte.
