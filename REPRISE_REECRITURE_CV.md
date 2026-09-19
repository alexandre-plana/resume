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
- Conserver un ton professionnel et cohérent. Dans tous les contenus rédactionnels retravaillés — présentation globale, cartes, descriptions et contributions — intégrer sous forme de chips les technologies, normes et protocoles réellement utiles à côté de la réalisation concernée. Éviter les inventaires détachés et les formulations promotionnelles non étayées.
- Lors de l'application aux sources, étendre le rendu des chips à `profile.bio`, `mission.desc` et `mission.tasks` ; actuellement, seul `cardSummary` transforme les marqueurs `#terme` en chips.
- Ne pas inventer de résultat, de métrique, de responsabilité ou de niveau de leadership.

## Textes déjà validés

Le titre et le sous-titre restent validés. La présentation globale et l'expérience Xistar sont validées sur le fond, mais doivent être revalidées après généralisation des chips à tous leurs contenus rédactionnels. Les versions avant/après et leurs cibles exactes figurent dans `SUIVI_REECRITURE_CV.md`.

Le titre et le sous-titre ne nécessitent pas de chips. La présentation globale doit conserver son rôle de positionnement tout en faisant apparaître les technologies et protocoles les plus structurants.

### Présentation globale enrichie — à valider

> Développeur spécialisé dans les applications industrielles, j'ai construit une expertise front-end et UI/UX autour de #typescript, #react et #vue3, que j'étends aujourd'hui au développement full-stack. Sur Xistar, j'interviens de l'interface opérateur aux services qui intègrent et diffusent les données via #mqtt et #api-rest. J'aborde le développement en reliant usages métier, architecture et contraintes techniques, avec une attention portée à la cohérence du produit, de la maquette au code livré.

Décisions importantes prises pour Xistar :

- faire apparaître le périmètre full-stack sans réduire la mission à des micro-frontends ;
- distinguer Dockview et l'organisation de l'interface du système d'alertes ;
- préciser que l'escalade des alertes passe par une API dédiée ainsi que par des notifications par e-mail ;
- mettre en avant l'interopérabilité : ingestion des données partenaires, transmission des ordres et publication via MQTT et API REST ;
- décrire l'application multi-écran, sa gestion centralisée depuis un poste maître et la communication entre instances ;
- présenter le rejeu temporel comme un support à l'analyse, aux rapports de situation et aux débriefings ;
- insister sur la capacité d'adaptation aux différents profils de déploiement plutôt que sur la modularité technique.

### Généralisation des chips dans Xistar — à valider

**Carte**

> Développeur full-stack sur Xistar, un poste de commandement tactique maritime accessible depuis le navigateur. J'interviens sur l'interface opérateur #dockview, la cartographie #maplibre #deckgl en symbologie OTAN #app-6d et l'interopérabilité avec les systèmes partenaires via #mqtt et #api-rest. L'application pilote un mur d'écrans depuis un poste maître et propose un rejeu temporel pour les rapports de situation et les débriefings.

**Description détaillée**

> Xistar réunit la situation tactique, la conduite de missions et de drones, la gestion des alertes, le pilotage multi-écran et le rejeu des opérations. Son interface cartographique s'appuie sur #maplibre et #deckgl pour afficher une symbologie OTAN #app-6d, une grille #mgrs et la bathymétrie. Le produit ingère des flux partenaires #ais, #nmea, #cot et #mavlink, transmet des ordres et publie des informations via #mqtt et #api-rest. Ses profils de déploiement et la communication entre instances permettent de l'adapter aux contextes défense, portuaire et démonstration.

**Contributions enrichies à valider**

- Concevoir l'espace de travail opérateur sous forme de panneaux #dockview et intégrer la cartographie #maplibre #deckgl en symbologie OTAN #app-6d.
- Développer le système d'alertes et ses mécanismes d'escalade, avec une #api dédiée et l'envoi de notifications par e-mail.
- Assurer l'interopérabilité avec les systèmes partenaires : ingestion des flux #ais, #nmea, #cot et #mavlink, transmission des ordres et publication via #mqtt et #api-rest.
- Développer l'application multi-écran et sa gestion centralisée depuis un poste maître, avec partage distant et synchronisation des vues.
- Mettre en place un rejeu temporel des opérations destiné à l'analyse, aux rapports de situation et aux débriefings.

## Travail en cours : IECA

### Faits apportés par l'utilisateur

- Mission principalement front-end, avec quelques extensions de fonctionnalités côté back-end.
- Participation à la mise en place de plusieurs domaines fonctionnels : connecteurs, calculs, conditions, alertes et scripting.
- Conception de composants partagés, sans limiter la mission à ce seul périmètre : table configurable, socle de routage et sélecteur de propriétés.
- Réalisation, lors d'un IP Sprint, d'un sujet d'application mobile destiné à la communication externe des alertes vers les opérateurs d'astreinte.

### Proposition actuelle — non validée

**Carte**

> Développeur front-end sur IECA, la plateforme IIoT Edge de Schneider Electric, avec des interventions ponctuelles côté back-end. J'ai contribué à plusieurs domaines fonctionnels — connecteurs, calculs, conditions, alertes et scripting — ainsi qu'au socle partagé de l'architecture #microfrontend fondée sur #vue3 #typescript et #single-spa.

**Description détaillée**

> Au sein d'une équipe #scrum pluridisciplinaire, j'ai développé des applications Edge organisées en #microfrontend avec #vue3, #typescript et #single-spa. Mon périmètre couvrait principalement les interfaces et leur architecture, avec quelques extensions de fonctionnalités back-end. J'intervenais à la fois sur les domaines fonctionnels de la plateforme, les composants partagés, les tests et le suivi de la qualité du code.

**Contributions proposées**

- Participer au développement des fonctionnalités liées aux connecteurs, aux calculs, aux conditions, aux alertes et au scripting.
- Concevoir en #vue3 et #typescript des composants partagés, dont une table configurable, un socle de routage et un sélecteur de propriétés.
- Étendre ponctuellement les fonctionnalités back-end nécessaires aux évolutions prises en charge côté front-end.
- Développer avec #jest les tests unitaires des composants, des stores #pinia et des fonctions utilitaires, puis suivre les performances et la qualité du code avec #sonarqube.
- Concevoir, lors d'un IP Sprint, un prototype d'application #mobile destiné à transmettre les alertes aux opérateurs d'astreinte en dehors de la plateforme IECA.

La dernière contribution remplace l'ancienne formulation centrée sur la présentation du prototype aux Product Owners. Elle n'a pas encore été validée dans sa rédaction définitive.

**Cibles à synchroniser après validation**

- `src/api/mockData.ts` : expérience `1`, mission `11`.
- `src/api/mockDataLocales.ts` : version française de l'expérience `1`, mission `11`.
- La version anglaise devra ensuite être harmonisée sans traduire littéralement les formulations françaises.

## Étape suivante : AOA

Les textes ci-dessous ont été proposés mais ne sont pas encore validés.

**Carte**

> Développeur #csharp #unity sur Augmented Operator Advisor, une application industrielle multiplateforme pour #android #ios et #windows. Mon travail a porté sur l'architecture front-end et les interfaces opérateur, ainsi que sur le fonctionnement #offline, la synchronisation avec le serveur et la compatibilité des projets entre versions.

**Description détaillée**

> Pendant six ans, j'ai développé en #csharp et #unity les interfaces et l'architecture front-end d'une application #ar destinée aux opérateurs industriels. Le périmètre couvrait les versions #android, #ios et #windows, leur personnalisation pour les clients #oem, la communication #api avec le serveur de projets et la préparation des applications pour les différentes plateformes de distribution.

**Contributions proposées**

- Concevoir en #csharp et #unity l'architecture front-end et une interface adaptée à #android, #ios et #windows, en modes portrait et paysage.
- Développer le fonctionnement #offline, la synchronisation avec l'#api au retour de la connexion et la gestion des erreurs réseau.
- Assurer la rétrocompatibilité des projets par la lecture des anciens formats et leur migration à la volée.
- Mettre en place un système de styles externalisé pour produire des versions personnalisées aux couleurs des clients #oem.
- Créer sous #unity un outil de tests unitaires intégré aux étapes précédant et suivant les builds.

**Cibles à synchroniser après validation**

- `src/api/mockData.ts` : expérience `1`, mission `12`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `1`, mission `12`.

## Point de reprise recommandé

1. Faire valider la présentation globale et Xistar après généralisation des chips à tous les textes retravaillés.
2. Reprendre avec la proposition IECA enrichie de chips dans la carte, la description et les contributions.
3. Faire valider IECA, en particulier la formulation du sujet d'IP Sprint, puis ajouter son avant/après dans `SUIVI_REECRITURE_CV.md`.
4. Reprendre ensuite la proposition AOA enrichie de chips, sans survaloriser l'AR/VR dans le positionnement général.
5. Continuer avec les expériences suivantes selon le même processus.
6. Appliquer les changements aux sources uniquement lorsque l'utilisateur le demandera explicitement, puis étendre le rendu des chips, harmoniser les doublons et les traductions.

## Points techniques repérés lors de l'audit initial

- Plusieurs contenus sont dupliqués entre `src/api/mockData.ts` et `src/api/mockDataLocales.ts` ; les deux sources devront rester cohérentes lors de l'application.
- Certaines traductions et certains accents sont incomplets ou incohérents.
- Les coordonnées de contact, dont l'adresse e-mail et la présentation du téléphone, devront être vérifiées avant finalisation.
- L'export Word contient également des contenus susceptibles de dupliquer les données affichées et devra être contrôlé après la réécriture.
- Le rendu des chips est actuellement limité à `cardSummary`. L'application finale devra utiliser le même rendu pour `profile.bio`, `mission.desc` et chaque entrée de `mission.tasks`, tandis que l'export Word devra éviter d'afficher des marqueurs `#` bruts.
