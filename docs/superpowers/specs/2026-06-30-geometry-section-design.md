# Design: Section Géométrie dans les Mathématiques

## Contexte

LudoÉduc propose des exercices de maths (calcul, droite graduée, problèmes…) mais n'a pas de section géométrie. Le besoin validé est d'ajouter une nouvelle sous-section "Géométrie" dans la partie Mathématiques, contenant 3 exercices interactifs avec rendu SVG, disponibles pour tous les niveaux CE1 à CM2 avec difficulté progressive.

## Objectif

Permettre aux élèves de pratiquer :
1. La reconnaissance de formes géométriques ("Qui est-ce ?")
2. Le calcul de périmètres avec dimensions affichées sur la forme
3. L'identification de droites parallèles ou perpendiculaires

## Approche retenue

Approche 1 : fichier dédié par responsabilité, cohérente avec le pattern existant `database/numberline.ts` + `components/ExerciseRunner.tsx`.

## Fichiers créés ou modifiés

| Fichier | Action | Responsabilité |
|---|---|---|
| `types.ts` | Modifier | Ajouter `ShapeIdTask`, `PerimeterTask`, `ParallelTask` |
| `database/geometry.ts` | Créer | Pools de questions par niveau pour les 3 exercices |
| `data.ts` | Modifier | Exporter `getShapeIdQuestions`, `getPerimeterQuestions`, `getParallelQuestions` |
| `components/GeometryExercise.tsx` | Créer | Composants SVG `ShapeIdExercise`, `PerimeterExercise`, `ParallelExercise` |
| `App.tsx` | Modifier | Bouton "Géométrie" + état `geometrieMenu` + 3 cartes de lancement |
| `components/ExerciseRunner.tsx` | Modifier | Routing vers `GeometryExercise` pour les types `shape-id`, `perimeter`, `parallel` |

## Types de données

### ShapeIdTask
```ts
interface ShapeIdTask {
  id: number;
  level: Level;
  targetShape: string;        // nom affiché à l'élève, ex. "triangle rectangle"
  choices: ShapeChoice[];     // 4 choix dont 1 correct
}

interface ShapeChoice {
  shapeKey: string;           // identifiant de la forme SVG
  label: string;              // nom de la forme
  isCorrect: boolean;
}
```

### PerimeterTask
```ts
interface PerimeterTask {
  id: number;
  level: Level;
  shapeKey: string;           // identifiant de la forme SVG
  sides: number[];            // longueurs des côtés dans l'ordre d'affichage
  answer: number;             // somme des côtés
  unit: string;               // ex. "cm"
}
```

### ParallelTask
```ts
interface ParallelTask {
  id: number;
  level: Level;
  lineA: { x1: number; y1: number; x2: number; y2: number };
  lineB: { x1: number; y1: number; x2: number; y2: number };
  answer: 'parallel' | 'perpendicular' | 'neither';
}
```

## Exercice 1 : "Qui est-ce ?" (`shape-id`)

### Rendu
- Affichage du nom de la forme en grand au centre.
- Grille 2×2 de formes SVG cliquables.
- Surbrillance au survol (border amber).
- Validation immédiate au clic (comme les QCM existants).

### Progression par niveau
| Niveau | Formes disponibles |
|---|---|
| CE1 | carré, rectangle, triangle, cercle |
| CE2 | + losange, trapèze |
| CM1 | + parallélogramme, pentagone |
| CM2 | + hexagone, octogone |

### Pool de questions
- Minimum 10 questions par niveau dans la base.
- Les 4 choix sont tirés aléatoirement parmi les formes du niveau (1 correct + 3 distracteurs).

## Exercice 2 : "Calcule un périmètre" (`perimeter`)

### Rendu
- Forme SVG centrée, taille fixe (ex. 220×220 viewBox).
- Dimensions annotées sur chaque côté via `<text>` SVG positionné au milieu de chaque arête.
- Champ numérique en dessous (même style que les autres exercices maths).
- Bouton Valider. Accepte les réponses avec virgule ou point pour les décimales.

### Progression par niveau
| Niveau | Formes | Dimensions |
|---|---|---|
| CE1 | carré, rectangle | entiers 1-20 |
| CE2 | + triangle équilatéral, triangle isocèle | entiers 1-50 |
| CM1 | + pentagone régulier, polygone irrégulier (4-5 côtés) | entiers 1-100 |
| CM2 | toutes formes | décimales (1 chiffre après virgule) |

### Pool de questions
- Minimum 12 questions par niveau dans la base (configs avec dimensions variées).
- La réponse est pré-calculée dans la config.

## Exercice 3 : "Parallèle ou perpendiculaire ?" (`parallel`)

### Rendu
- Canvas SVG unique (ex. 300×200 viewBox) avec les deux droites.
- 2 boutons (CE1) ou 3 boutons (CE2+) : "Parallèles", "Perpendiculaires", "Ni l'un ni l'autre".
- Validation au clic sur un bouton.

### Progression par niveau
| Niveau | Cas proposés | Boutons |
|---|---|---|
| CE1 | parallèle et perpendiculaire uniquement | 2 |
| CE2 | + sécante oblique ("ni l'un ni l'autre") | 3 |
| CM1 | idem CE2 avec angles variés | 3 |
| CM2 | idem CM1 avec orientations moins évidentes | 3 |

### Pool de questions
- Minimum 10 questions par niveau dans la base.
- Les droites sont définies par leurs coordonnées SVG (x1,y1,x2,y2).

## Navigation (App.tsx)

- Nouveau bouton "Géométrie 📐" dans la section Maths, même style amber que les autres boutons.
- Ouvre un état `geometrieMenu` affichant 3 cartes :
  - "Qui est-ce ?" → lance `startExercise('maths', 'shape-id')`
  - "Calcule un périmètre" → lance `startExercise('maths', 'perimeter')`
  - "Parallèle ou perpendiculaire ?" → lance `startExercise('maths', 'parallel')`
- Bouton retour vers le menu principal, cohérent avec les autres sous-menus.

## Intégration ExerciseRunner

- Les types `shape-id`, `perimeter`, `parallel` sont détectés dans le routing existant.
- Le composant `GeometryExercise` reçoit `task` et `onValidate`, même contrat que les autres exercices.
- Le système de score, d'encouragements et de résumé final est inchangé.

## Gestion d'erreur et robustesse

- Si le pool d'un niveau est insuffisant pour générer `limit` questions uniques, on recycle (pas de plantage).
- La validation des périmètres accepte `"12"`, `"12.0"`, `"12,0"` comme équivalents.
- Les formes SVG sont toutes dessinées à taille normalisée (viewBox fixe) pour un rendu cohérent sur mobile.

## Hors scope

- Pas d'angles à mesurer.
- Pas d'aires (seulement périmètres).
- Pas de construction géométrique interactive (tracé de formes).
- Pas de nouveaux niveaux au-delà de CM2.
