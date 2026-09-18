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
- Conserver un ton professionnel et cohérent. Éviter les inventaires de technologies, les hashtags dans les paragraphes et les formulations promotionnelles non étayées.
- Ne pas inventer de résultat, de métrique, de responsabilité ou de niveau de leadership.

## Textes déjà validés

Le titre, le sous-titre, la présentation globale et l'expérience Xistar sont validés. Leurs versions avant/après et leurs cibles exactes figurent dans `SUIVI_REECRITURE_CV.md`, qui fait foi pour leur future application.

Décisions importantes prises pour Xistar :

- faire apparaître le périmètre full-stack sans réduire la mission à des micro-frontends ;
- distinguer Dockview et l'organisation de l'interface du système d'alertes ;
- préciser que l'escalade des alertes passe par une API dédiée ainsi que par des notifications par e-mail ;
- mettre en avant l'interopérabilité : ingestion des données partenaires, transmission des ordres et publication via MQTT et API REST ;
- décrire l'application multi-écran, sa gestion centralisée depuis un poste maître et la communication entre instances ;
- présenter le rejeu temporel comme un support à l'analyse, aux rapports de situation et aux débriefings ;
- insister sur la capacité d'adaptation aux différents profils de déploiement plutôt que sur la modularité technique.

## Travail en cours : IECA

### Faits apportés par l'utilisateur

- Mission principalement front-end, avec quelques extensions de fonctionnalités côté back-end.
- Participation à la mise en place de plusieurs domaines fonctionnels : connecteurs, calculs, conditions, alertes et scripting.
- Conception de composants partagés, sans limiter la mission à ce seul périmètre : table configurable, socle de routage et sélecteur de propriétés.
- Réalisation, lors d'un IP Sprint, d'un sujet d'application mobile destiné à la communication externe des alertes vers les opérateurs d'astreinte.

### Proposition actuelle — non validée

**Carte**

> Développeur front-end sur IECA, la plateforme IIoT Edge de Schneider Electric, avec des interventions ponctuelles côté back-end. Au sein de l'équipe, j'ai contribué aux domaines fonctionnels des connecteurs, des calculs, des conditions, des alertes et du scripting. J'ai également conçu des composants partagés, notamment une table configurable, un socle de routage et un sélecteur de propriétés.

**Description détaillée**

> Développement d'applications Edge industrielles organisées en micro-frontends, au sein d'une équipe Scrum pluridisciplinaire. Mon intervention était principalement front-end, complétée par l'extension ponctuelle de fonctionnalités back-end. Le périmètre couvrait plusieurs domaines fonctionnels de la plateforme, le micro-frontend utilitaire partagé, les tests et le suivi de la qualité du code.

**Contributions proposées**

- Contribuer à la mise en place des fonctionnalités liées aux connecteurs, aux calculs, aux conditions, aux alertes et au scripting.
- Concevoir des composants partagés, dont une table configurable, un socle de routage et un sélecteur de propriétés.
- Étendre ponctuellement les fonctionnalités back-end nécessaires aux évolutions prises en charge côté front-end.
- Développer les tests unitaires des composants, des stores Pinia et des fonctions utilitaires, puis suivre les performances et la qualité du code.
- Concevoir, lors d'un IP Sprint, un prototype d'application mobile destiné à transmettre les alertes aux opérateurs d'astreinte en dehors de la plateforme IECA.

La dernière contribution remplace l'ancienne formulation centrée sur la présentation du prototype aux Product Owners. Elle n'a pas encore été validée dans sa rédaction définitive.

**Cibles à synchroniser après validation**

- `src/api/mockData.ts` : expérience `1`, mission `11`.
- `src/api/mockDataLocales.ts` : version française de l'expérience `1`, mission `11`.
- La version anglaise devra ensuite être harmonisée sans traduire littéralement les formulations françaises.

## Étape suivante : AOA

Les textes ci-dessous ont été proposés mais ne sont pas encore validés.

**Carte**

> Développement d'Augmented Operator Advisor, une application industrielle multiplateforme pour Android, iOS et Windows. Mon travail a porté sur l'architecture front-end et les interfaces opérateur, ainsi que sur le fonctionnement hors ligne, la synchronisation avec le serveur et la compatibilité des projets entre versions.

**Description détaillée**

> Pendant six ans, j'ai développé les interfaces et l'architecture front-end d'une application de réalité augmentée destinée aux opérateurs industriels. Le périmètre couvrait les versions mobiles et desktop, leur personnalisation pour les clients OEM, la communication avec le serveur de projets et la préparation des applications pour les différentes plateformes de distribution.

**Contributions proposées**

- Concevoir l'architecture front-end et une interface adaptée à Android, iOS et Windows, en modes portrait et paysage.
- Développer le fonctionnement hors ligne, la synchronisation au retour de la connexion et la gestion des erreurs réseau.
- Assurer la rétrocompatibilité des projets par la lecture des anciens formats et leur migration à la volée.
- Mettre en place un système de styles externalisé pour produire des versions personnalisées aux couleurs des clients OEM.
- Créer un outil de tests unitaires intégré aux étapes précédant et suivant les builds.

**Cibles à synchroniser après validation**

- `src/api/mockData.ts` : expérience `1`, mission `12`.
- `src/api/mockDataLocales.ts` : versions française et anglaise de l'expérience `1`, mission `12`.

## Point de reprise recommandé

1. Reprendre avec la proposition IECA ci-dessus.
2. Faire valider la carte, la description et les cinq contributions, en particulier la formulation du sujet d'IP Sprint.
3. Une fois IECA validée, ajouter son avant/après dans `SUIVI_REECRITURE_CV.md`.
4. Reprendre ensuite la proposition AOA en veillant à ne pas survaloriser l'AR/VR dans le positionnement général.
5. Continuer avec les expériences suivantes selon le même processus.
6. Appliquer les changements aux sources uniquement lorsque l'utilisateur le demandera explicitement, puis harmoniser les doublons et les traductions.

## Points techniques repérés lors de l'audit initial

- Plusieurs contenus sont dupliqués entre `src/api/mockData.ts` et `src/api/mockDataLocales.ts` ; les deux sources devront rester cohérentes lors de l'application.
- Certaines traductions et certains accents sont incomplets ou incohérents.
- Les coordonnées de contact, dont l'adresse e-mail et la présentation du téléphone, devront être vérifiées avant finalisation.
- L'export Word contient également des contenus susceptibles de dupliquer les données affichées et devra être contrôlé après la réécriture.
