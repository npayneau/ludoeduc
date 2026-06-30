# Design: Marqueurs intermediaires en points pour les droites a virgule

## Contexte

L'exercice de droite graduee affiche aujourd'hui des petits traits intermediaires.
Le besoin valide est le suivant:

- Pour tous les exercices a virgule, remplacer les traits intermediaires par des points noirs.
- Les points doivent apparaitre sur chaque petite graduation possible.
- Les exercices non decimaux conservent les traits intermediaires existants.

## Objectif

Introduire un mode d'affichage explicite des graduations intermediaires pour permettre:

- un rendu en trait (`line`) pour les droites non decimales,
- un rendu en point (`dot`) pour les droites decimales,
- une extension future vers d'autres styles de marqueurs sans refonte du composant.

## Approche retenue

Approche 2 validee: ajout d'un champ de configuration explicite `intermediateMarker` avec union litterale:

- `line`
- `dot`

Ce champ est defini dans les configurations de generation, propage dans le type de tache, puis utilise par le composant de rendu.

## Modifications de conception

### 1) Contrat de donnees

- Ajouter `intermediateMarker: 'line' | 'dot'` au contrat de tache de droite graduee (`NumberLineTask`).
- Ajouter le meme champ au type interne de configuration des droites (`LineConfig`).

### 2) Donnees par niveau

- Mettre `intermediateMarker: 'dot'` pour les configurations CM2 a virgule (snapStep `0.5` et `0.1`).
- Mettre `intermediateMarker: 'line'` pour les autres configurations (CE1/CE2/CM1 et toute autre droite non decimale).

### 3) Generation des questions

- Propager `intermediateMarker` dans les objets `NumberLineTask` retournes par le generateur.

### 4) Rendu UI

- Conserver le calcul existant des `intermediateTicks` (positions identiques, logique pedagogique inchangee).
- Rendu conditionnel:
  - `line`: trait vertical fin (comportement actuel).
  - `dot`: cercle noir centre sur la graduation intermediaire.
- Ajouter une valeur par defaut defensive (`line`) au point de rendu si le champ est absent (compatibilite ascendante).

## Flux et impact

1. Le generateur choisit une configuration de droite.
2. La configuration transporte le style `intermediateMarker`.
3. La tache envoyee au composant contient ce style.
4. Le composant affiche traits ou points selon la valeur.

Impact attendu:

- Droites a virgule: points noirs sur chaque petite graduation possible.
- Droites non decimales: rendu actuel conserve.
- Aucun impact sur le drag/click, le snapping, l'arrondi ni la validation des reponses.

## Gestion d'erreur et robustesse

- Defaut de rendu en `line` si `intermediateMarker` manquant pour eviter une casse sur d'anciens objets.
- Aucun changement de logique numerique, donc risque faible d'effets de bord sur precision.

## Verification

Verification manuelle minimale:

1. Lancer un exercice CM2 decimale et verifier les points noirs intermediaires.
2. Verifier le cas snapStep `0.5` puis `0.1`.
3. Lancer un exercice non decimale (ex. CE2/CM1) et verifier les traits intermediaires.
4. Verifier qu'un placement/validation fonctionne identiquement avant/apres.

Verification technique optionnelle:

- Ajouter un test de rendu conditionnel si une infrastructure de test composant existe.

## Hors scope

- Changement des couleurs globales du composant.
- Ajout de labels supplementaires sur les graduations.
- Modification de la logique de generation des cibles.
