# Portfolio vivant — atelier d’interfaces

Le brief utilisateur autorise une refonte complète et délègue la direction artistique et les bibliothèques. Réalisation dans le dépôt existant, sans publication distante.

## Direction
Une composition éditoriale ivoire / encre / orange signal, une grande typographie, des repères numérotés et des démonstrations sombres. La narration suit identité, réalisations manipulables, méthode, parcours, contact. Une sculpture d’interfaces en SVG illustre les trois dimensions du travail et change au clic. L’introduction typographique reste courte, sans écran bloquant.

## Contenu et architecture
Réutiliser les hooks et traductions existants pour conserver toutes les missions, formations, compétences et projets. Conserver l’application CV classique et ses fiches détaillées, via un paramètre `view=cv`. Le changement de langue est partagé. Le CV s’imprime / s’enregistre en PDF via le navigateur, et le téléchargement Word devient disponible en production par import différé.

Créer un nouveau point d’entrée Portfolio, un module de démonstrations, une scène Three.js chargée seulement sur activation, des styles isolés et des tests de comportements.

## Démonstrations
- Xistar : cartographie SVG schématique originale, trois entités fictives sélectionnables, lecture/pause et rejeu temporel, couches, panneau déplaçable et redimensionnable. Aucune donnée réelle et aucune dépendance à un serveur cartographique.
- Design system : thème, accent, rayon, densité et états réellement modifiables.
- Iasit : simulation de pipeline avec exécution, finding optionnel, correction, nouvelle vérification, acceptation et réinitialisation.
- Vorrery : véritable scène Three.js manipulable par pointeur et clavier, paramètres orbitaux et vitesse. Schéma de remplacement si WebGL indisponible.

## Mouvement et contraintes
Motion pour ressorts et révélations ; CSS pour retours de survol et introduction inférieure à une seconde. Respect du mouvement réduit et commande globale de pause des animations. Pas de scroll forcé. Navigation ancres, clavier, tactile, focus visible, annonces de statut et contraste lisible. Arrêter les boucles hors écran / onglet masqué et nettoyer GPU, écouteurs, timers. Livrable statique compatible `/resume/` sur GitHub Pages.

## Vérification
Tests métier des simulations et interactions principales ; suite existante conservée ; lint, compilation et contrôle du bundle ; examen visuel et interactions navigateur, mobile et mouvement réduit si les outils le permettent. Ne pas revendiquer un audit ou une mesure non réalisés.
