# Geometry Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter une section Géométrie dans les Maths avec 3 exercices interactifs SVG (reconnaissance de formes, calcul de périmètre, parallèle/perpendiculaire) disponibles CE1→CM2.

**Architecture:** Nouveau fichier `database/geometry.ts` (pools de données), nouveau composant `components/GeometryExercise.tsx` (3 composants SVG), 3 nouveaux types dans `types.ts`, wiring dans `data.ts`, `ExerciseRunner.tsx` et `App.tsx`.

**Tech Stack:** React 19, TypeScript 5.8, Tailwind CSS (classes existantes), SVG inline, Vite 6.

## Global Constraints

- Pas de nouvelles dépendances npm.
- Toutes les classes CSS utilisent le style Tailwind amber existant pour les maths.
- Les formes SVG ont un viewBox fixe `0 0 220 220` sauf `ParallelExercise` qui utilise `0 0 300 200`.
- Validation des périmètres : accepter `"12"`, `"12.0"` et `"12,0"` comme équivalents.
- Chaque pool contient au minimum 10 questions par niveau.
- Même contrat `onValidate: (correct: boolean, value?: string) => void` que tous les exercices existants.
- `build` vérifié avec `npm run build` après chaque tâche.

---

### Task 1 : Types TypeScript pour la géométrie

**Files:**
- Modify: `types.ts`

**Interfaces:**
- Produces:
  - `ShapeChoice { shapeKey: string; label: string; isCorrect: boolean }`
  - `ShapeIdTask { id: number; level: Level; targetShape: string; choices: ShapeChoice[] }`
  - `PerimeterTask { id: number; level: Level; shapeKey: string; sides: number[]; answer: number; unit: string }`
  - `ParallelTask { id: number; level: Level; lineA: {x1:number;y1:number;x2:number;y2:number}; lineB: {x1:number;y1:number;x2:number;y2:number}; answer: 'parallel'|'perpendicular'|'neither' }`

- [ ] **Step 1 : Ajouter les types dans `types.ts`**

Ouvrir `types.ts` et ajouter à la fin du fichier (après `AdjAdvTransformTask`) :

```ts
// Géométrie

export interface ShapeChoice {
  shapeKey: string;
  label: string;
  isCorrect: boolean;
}

export interface ShapeIdTask {
  id: number;
  level: Level;
  targetShape: string;
  choices: ShapeChoice[];
}

export interface PerimeterTask {
  id: number;
  level: Level;
  shapeKey: string;
  sides: number[];
  answer: number;
  unit: string;
}

export interface ParallelTask {
  id: number;
  level: Level;
  lineA: { x1: number; y1: number; x2: number; y2: number };
  lineB: { x1: number; y1: number; x2: number; y2: number };
  answer: 'parallel' | 'perpendicular' | 'neither';
}
```

- [ ] **Step 2 : Vérifier le build**

```
npm run build
```
Attendu : `✓ built in XXXms` sans erreur TypeScript.

- [ ] **Step 3 : Commit**

```
git add types.ts
git commit -m "feat(geometry): add ShapeIdTask, PerimeterTask, ParallelTask types"
```

---

### Task 2 : Base de données géométrie (`database/geometry.ts`)

**Files:**
- Create: `database/geometry.ts`

**Interfaces:**
- Consumes: `ShapeIdTask`, `PerimeterTask`, `ParallelTask`, `Level` depuis `../types`
- Produces:
  - `SHAPE_ID_DATABASE: ShapeIdTask[]`
  - `PERIMETER_DATABASE: PerimeterTask[]`
  - `PARALLEL_DATABASE: ParallelTask[]`

- [ ] **Step 1 : Créer `database/geometry.ts`**

```ts
import { ShapeIdTask, PerimeterTask, ParallelTask } from '../types';

// ─── Formes disponibles par niveau ───────────────────────────────────────────
// CE1 : carré, rectangle, triangle, cercle
// CE2 : + losange, trapèze
// CM1 : + parallélogramme, pentagone
// CM2 : + hexagone, octogone

// ─── "Qui est-ce ?" ───────────────────────────────────────────────────────────
export const SHAPE_ID_DATABASE: ShapeIdTask[] = [
  // ── CE1 ──
  { id: 0, level: 'CE1', targetShape: 'carré',
    choices: [
      { shapeKey: 'square',    label: 'carré',     isCorrect: true  },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
    ]},
  { id: 1, level: 'CE1', targetShape: 'rectangle',
    choices: [
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: true  },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
    ]},
  { id: 2, level: 'CE1', targetShape: 'triangle',
    choices: [
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: true  },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
    ]},
  { id: 3, level: 'CE1', targetShape: 'cercle',
    choices: [
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: true  },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
    ]},
  { id: 4, level: 'CE1', targetShape: 'carré',
    choices: [
      { shapeKey: 'square',    label: 'carré',     isCorrect: true  },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
    ]},
  { id: 5, level: 'CE1', targetShape: 'triangle',
    choices: [
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: true  },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
    ]},
  { id: 6, level: 'CE1', targetShape: 'cercle',
    choices: [
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: true  },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
    ]},
  { id: 7, level: 'CE1', targetShape: 'rectangle',
    choices: [
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: true  },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
    ]},
  { id: 8, level: 'CE1', targetShape: 'carré',
    choices: [
      { shapeKey: 'square',    label: 'carré',     isCorrect: true  },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
    ]},
  { id: 9, level: 'CE1', targetShape: 'triangle',
    choices: [
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: true  },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
    ]},

  // ── CE2 ──
  { id: 10, level: 'CE2', targetShape: 'losange',
    choices: [
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: true  },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
      { shapeKey: 'trapezoid', label: 'trapèze',   isCorrect: false },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
    ]},
  { id: 11, level: 'CE2', targetShape: 'trapèze',
    choices: [
      { shapeKey: 'trapezoid', label: 'trapèze',   isCorrect: true  },
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: false },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
    ]},
  { id: 12, level: 'CE2', targetShape: 'losange',
    choices: [
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: true  },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
      { shapeKey: 'trapezoid', label: 'trapèze',   isCorrect: false },
    ]},
  { id: 13, level: 'CE2', targetShape: 'carré',
    choices: [
      { shapeKey: 'square',    label: 'carré',     isCorrect: true  },
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: false },
      { shapeKey: 'trapezoid', label: 'trapèze',   isCorrect: false },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
    ]},
  { id: 14, level: 'CE2', targetShape: 'trapèze',
    choices: [
      { shapeKey: 'trapezoid', label: 'trapèze',   isCorrect: true  },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: false },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
    ]},
  { id: 15, level: 'CE2', targetShape: 'rectangle',
    choices: [
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: true  },
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: false },
      { shapeKey: 'trapezoid', label: 'trapèze',   isCorrect: false },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
    ]},
  { id: 16, level: 'CE2', targetShape: 'cercle',
    choices: [
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: true  },
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: false },
      { shapeKey: 'trapezoid', label: 'trapèze',   isCorrect: false },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
    ]},
  { id: 17, level: 'CE2', targetShape: 'losange',
    choices: [
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: true  },
      { shapeKey: 'circle',    label: 'cercle',    isCorrect: false },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
      { shapeKey: 'rectangle', label: 'rectangle', isCorrect: false },
    ]},
  { id: 18, level: 'CE2', targetShape: 'triangle',
    choices: [
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: true  },
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: false },
      { shapeKey: 'trapezoid', label: 'trapèze',   isCorrect: false },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
    ]},
  { id: 19, level: 'CE2', targetShape: 'trapèze',
    choices: [
      { shapeKey: 'trapezoid', label: 'trapèze',   isCorrect: true  },
      { shapeKey: 'triangle',  label: 'triangle',  isCorrect: false },
      { shapeKey: 'square',    label: 'carré',     isCorrect: false },
      { shapeKey: 'rhombus',   label: 'losange',   isCorrect: false },
    ]},

  // ── CM1 ──
  { id: 20, level: 'CM1', targetShape: 'parallélogramme',
    choices: [
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: true  },
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: false },
      { shapeKey: 'trapezoid',     label: 'trapèze',         isCorrect: false },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
    ]},
  { id: 21, level: 'CM1', targetShape: 'pentagone',
    choices: [
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: true  },
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: false },
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: false },
      { shapeKey: 'rectangle',     label: 'rectangle',       isCorrect: false },
    ]},
  { id: 22, level: 'CM1', targetShape: 'losange',
    choices: [
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: true  },
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: false },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
      { shapeKey: 'square',        label: 'carré',           isCorrect: false },
    ]},
  { id: 23, level: 'CM1', targetShape: 'parallélogramme',
    choices: [
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: true  },
      { shapeKey: 'rectangle',     label: 'rectangle',       isCorrect: false },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
      { shapeKey: 'trapezoid',     label: 'trapèze',         isCorrect: false },
    ]},
  { id: 24, level: 'CM1', targetShape: 'pentagone',
    choices: [
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: true  },
      { shapeKey: 'trapezoid',     label: 'trapèze',         isCorrect: false },
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: false },
      { shapeKey: 'circle',        label: 'cercle',          isCorrect: false },
    ]},
  { id: 25, level: 'CM1', targetShape: 'trapèze',
    choices: [
      { shapeKey: 'trapezoid',     label: 'trapèze',         isCorrect: true  },
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: false },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: false },
    ]},
  { id: 26, level: 'CM1', targetShape: 'carré',
    choices: [
      { shapeKey: 'square',        label: 'carré',           isCorrect: true  },
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: false },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: false },
    ]},
  { id: 27, level: 'CM1', targetShape: 'rectangle',
    choices: [
      { shapeKey: 'rectangle',     label: 'rectangle',       isCorrect: true  },
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: false },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
      { shapeKey: 'trapezoid',     label: 'trapèze',         isCorrect: false },
    ]},
  { id: 28, level: 'CM1', targetShape: 'parallélogramme',
    choices: [
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: true  },
      { shapeKey: 'square',        label: 'carré',           isCorrect: false },
      { shapeKey: 'triangle',      label: 'triangle',        isCorrect: false },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
    ]},
  { id: 29, level: 'CM1', targetShape: 'pentagone',
    choices: [
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: true  },
      { shapeKey: 'square',        label: 'carré',           isCorrect: false },
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: false },
      { shapeKey: 'circle',        label: 'cercle',          isCorrect: false },
    ]},

  // ── CM2 ──
  { id: 30, level: 'CM2', targetShape: 'hexagone',
    choices: [
      { shapeKey: 'hexagon',       label: 'hexagone',        isCorrect: true  },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: false },
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: false },
    ]},
  { id: 31, level: 'CM2', targetShape: 'octogone',
    choices: [
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: true  },
      { shapeKey: 'hexagon',       label: 'hexagone',        isCorrect: false },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: false },
    ]},
  { id: 32, level: 'CM2', targetShape: 'parallélogramme',
    choices: [
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: true  },
      { shapeKey: 'hexagon',       label: 'hexagone',        isCorrect: false },
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: false },
      { shapeKey: 'trapezoid',     label: 'trapèze',         isCorrect: false },
    ]},
  { id: 33, level: 'CM2', targetShape: 'hexagone',
    choices: [
      { shapeKey: 'hexagon',       label: 'hexagone',        isCorrect: true  },
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: false },
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: false },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
    ]},
  { id: 34, level: 'CM2', targetShape: 'octogone',
    choices: [
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: true  },
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: false },
      { shapeKey: 'hexagon',       label: 'hexagone',        isCorrect: false },
      { shapeKey: 'trapezoid',     label: 'trapèze',         isCorrect: false },
    ]},
  { id: 35, level: 'CM2', targetShape: 'losange',
    choices: [
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: true  },
      { shapeKey: 'hexagon',       label: 'hexagone',        isCorrect: false },
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: false },
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: false },
    ]},
  { id: 36, level: 'CM2', targetShape: 'pentagone',
    choices: [
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: true  },
      { shapeKey: 'hexagon',       label: 'hexagone',        isCorrect: false },
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: false },
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: false },
    ]},
  { id: 37, level: 'CM2', targetShape: 'hexagone',
    choices: [
      { shapeKey: 'hexagon',       label: 'hexagone',        isCorrect: true  },
      { shapeKey: 'trapezoid',     label: 'trapèze',         isCorrect: false },
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: false },
      { shapeKey: 'square',        label: 'carré',           isCorrect: false },
    ]},
  { id: 38, level: 'CM2', targetShape: 'octogone',
    choices: [
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: true  },
      { shapeKey: 'pentagon',      label: 'pentagone',       isCorrect: false },
      { shapeKey: 'trapezoid',     label: 'trapèze',         isCorrect: false },
      { shapeKey: 'square',        label: 'carré',           isCorrect: false },
    ]},
  { id: 39, level: 'CM2', targetShape: 'parallélogramme',
    choices: [
      { shapeKey: 'parallelogram', label: 'parallélogramme', isCorrect: true  },
      { shapeKey: 'octagon',       label: 'octogone',        isCorrect: false },
      { shapeKey: 'hexagon',       label: 'hexagone',        isCorrect: false },
      { shapeKey: 'rhombus',       label: 'losange',         isCorrect: false },
    ]},
];

// ─── Calcule un périmètre ─────────────────────────────────────────────────────
export const PERIMETER_DATABASE: PerimeterTask[] = [
  // ── CE1 : carré et rectangle, entiers 1-20 ──
  { id: 0,  level: 'CE1', shapeKey: 'square',    sides: [5, 5, 5, 5],       answer: 20,  unit: 'cm' },
  { id: 1,  level: 'CE1', shapeKey: 'rectangle', sides: [8, 3, 8, 3],       answer: 22,  unit: 'cm' },
  { id: 2,  level: 'CE1', shapeKey: 'square',    sides: [4, 4, 4, 4],       answer: 16,  unit: 'cm' },
  { id: 3,  level: 'CE1', shapeKey: 'rectangle', sides: [6, 2, 6, 2],       answer: 16,  unit: 'cm' },
  { id: 4,  level: 'CE1', shapeKey: 'square',    sides: [7, 7, 7, 7],       answer: 28,  unit: 'cm' },
  { id: 5,  level: 'CE1', shapeKey: 'rectangle', sides: [10, 4, 10, 4],     answer: 28,  unit: 'cm' },
  { id: 6,  level: 'CE1', shapeKey: 'square',    sides: [3, 3, 3, 3],       answer: 12,  unit: 'cm' },
  { id: 7,  level: 'CE1', shapeKey: 'rectangle', sides: [9, 5, 9, 5],       answer: 28,  unit: 'cm' },
  { id: 8,  level: 'CE1', shapeKey: 'square',    sides: [6, 6, 6, 6],       answer: 24,  unit: 'cm' },
  { id: 9,  level: 'CE1', shapeKey: 'rectangle', sides: [12, 4, 12, 4],     answer: 32,  unit: 'cm' },
  { id: 10, level: 'CE1', shapeKey: 'square',    sides: [8, 8, 8, 8],       answer: 32,  unit: 'cm' },
  { id: 11, level: 'CE1', shapeKey: 'rectangle', sides: [15, 3, 15, 3],     answer: 36,  unit: 'cm' },

  // ── CE2 : + triangle, entiers 1-50 ──
  { id: 12, level: 'CE2', shapeKey: 'square',    sides: [12, 12, 12, 12],   answer: 48,  unit: 'cm' },
  { id: 13, level: 'CE2', shapeKey: 'rectangle', sides: [15, 8, 15, 8],     answer: 46,  unit: 'cm' },
  { id: 14, level: 'CE2', shapeKey: 'triangle',  sides: [7, 7, 7],          answer: 21,  unit: 'cm' },
  { id: 15, level: 'CE2', shapeKey: 'triangle',  sides: [5, 8, 6],          answer: 19,  unit: 'cm' },
  { id: 16, level: 'CE2', shapeKey: 'square',    sides: [14, 14, 14, 14],   answer: 56,  unit: 'cm' },
  { id: 17, level: 'CE2', shapeKey: 'rectangle', sides: [20, 9, 20, 9],     answer: 58,  unit: 'cm' },
  { id: 18, level: 'CE2', shapeKey: 'triangle',  sides: [10, 10, 10],       answer: 30,  unit: 'cm' },
  { id: 19, level: 'CE2', shapeKey: 'triangle',  sides: [6, 9, 7],          answer: 22,  unit: 'cm' },
  { id: 20, level: 'CE2', shapeKey: 'square',    sides: [18, 18, 18, 18],   answer: 72,  unit: 'cm' },
  { id: 21, level: 'CE2', shapeKey: 'rectangle', sides: [25, 10, 25, 10],   answer: 70,  unit: 'cm' },
  { id: 22, level: 'CE2', shapeKey: 'triangle',  sides: [12, 8, 9],         answer: 29,  unit: 'cm' },
  { id: 23, level: 'CE2', shapeKey: 'triangle',  sides: [15, 15, 12],       answer: 42,  unit: 'cm' },

  // ── CM1 : + pentagone régulier, entiers 1-100 ──
  { id: 24, level: 'CM1', shapeKey: 'square',    sides: [25, 25, 25, 25],   answer: 100, unit: 'cm' },
  { id: 25, level: 'CM1', shapeKey: 'rectangle', sides: [40, 15, 40, 15],   answer: 110, unit: 'cm' },
  { id: 26, level: 'CM1', shapeKey: 'triangle',  sides: [30, 40, 50],       answer: 120, unit: 'cm' },
  { id: 27, level: 'CM1', shapeKey: 'pentagon',  sides: [20, 20, 20, 20, 20], answer: 100, unit: 'cm' },
  { id: 28, level: 'CM1', shapeKey: 'square',    sides: [35, 35, 35, 35],   answer: 140, unit: 'cm' },
  { id: 29, level: 'CM1', shapeKey: 'rectangle', sides: [60, 20, 60, 20],   answer: 160, unit: 'cm' },
  { id: 30, level: 'CM1', shapeKey: 'triangle',  sides: [25, 35, 30],       answer: 90,  unit: 'cm' },
  { id: 31, level: 'CM1', shapeKey: 'pentagon',  sides: [15, 15, 15, 15, 15], answer: 75, unit: 'cm' },
  { id: 32, level: 'CM1', shapeKey: 'square',    sides: [45, 45, 45, 45],   answer: 180, unit: 'cm' },
  { id: 33, level: 'CM1', shapeKey: 'rectangle', sides: [50, 30, 50, 30],   answer: 160, unit: 'cm' },
  { id: 34, level: 'CM1', shapeKey: 'pentagon',  sides: [12, 12, 12, 12, 12], answer: 60, unit: 'cm' },
  { id: 35, level: 'CM1', shapeKey: 'triangle',  sides: [45, 55, 60],       answer: 160, unit: 'cm' },

  // ── CM2 : décimales ──
  { id: 36, level: 'CM2', shapeKey: 'square',    sides: [4.5, 4.5, 4.5, 4.5],  answer: 18,   unit: 'cm' },
  { id: 37, level: 'CM2', shapeKey: 'rectangle', sides: [7.5, 3.5, 7.5, 3.5],  answer: 22,   unit: 'cm' },
  { id: 38, level: 'CM2', shapeKey: 'triangle',  sides: [5.5, 6.5, 4.5],       answer: 16.5, unit: 'cm' },
  { id: 39, level: 'CM2', shapeKey: 'pentagon',  sides: [3.5, 3.5, 3.5, 3.5, 3.5], answer: 17.5, unit: 'cm' },
  { id: 40, level: 'CM2', shapeKey: 'square',    sides: [6.5, 6.5, 6.5, 6.5],  answer: 26,   unit: 'cm' },
  { id: 41, level: 'CM2', shapeKey: 'rectangle', sides: [9.5, 4.5, 9.5, 4.5],  answer: 28,   unit: 'cm' },
  { id: 42, level: 'CM2', shapeKey: 'triangle',  sides: [8.5, 7.5, 6.5],       answer: 22.5, unit: 'cm' },
  { id: 43, level: 'CM2', shapeKey: 'pentagon',  sides: [5.5, 5.5, 5.5, 5.5, 5.5], answer: 27.5, unit: 'cm' },
  { id: 44, level: 'CM2', shapeKey: 'square',    sides: [8.5, 8.5, 8.5, 8.5],  answer: 34,   unit: 'cm' },
  { id: 45, level: 'CM2', shapeKey: 'rectangle', sides: [12.5, 5.5, 12.5, 5.5], answer: 36,  unit: 'cm' },
  { id: 46, level: 'CM2', shapeKey: 'triangle',  sides: [10.5, 9.5, 8.5],      answer: 28.5, unit: 'cm' },
  { id: 47, level: 'CM2', shapeKey: 'pentagon',  sides: [7.5, 7.5, 7.5, 7.5, 7.5], answer: 37.5, unit: 'cm' },
];

// ─── Parallèle ou perpendiculaire ? ──────────────────────────────────────────
// Les coordonnées sont dans un viewBox 300x200.
// Droites parallèles : même pente.
// Droites perpendiculaires : pentes opposées (produit = -1).
// Ni l'un ni l'autre : pentes différentes dont le produit ≠ -1 et ≠ égales.
export const PARALLEL_DATABASE: ParallelTask[] = [
  // ── CE1 : parallel et perpendicular uniquement ──
  { id: 0,  level: 'CE1', lineA: { x1: 20, y1: 60,  x2: 280, y2: 60  }, lineB: { x1: 20, y1: 140, x2: 280, y2: 140 }, answer: 'parallel'      },
  { id: 1,  level: 'CE1', lineA: { x1: 150, y1: 10, x2: 150, y2: 190 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 100 }, answer: 'perpendicular'  },
  { id: 2,  level: 'CE1', lineA: { x1: 20, y1: 80,  x2: 280, y2: 80  }, lineB: { x1: 20, y1: 160, x2: 280, y2: 160 }, answer: 'parallel'      },
  { id: 3,  level: 'CE1', lineA: { x1: 80,  y1: 10, x2: 80,  y2: 190 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 100 }, answer: 'perpendicular'  },
  { id: 4,  level: 'CE1', lineA: { x1: 20, y1: 50,  x2: 280, y2: 50  }, lineB: { x1: 20, y1: 150, x2: 280, y2: 150 }, answer: 'parallel'      },
  { id: 5,  level: 'CE1', lineA: { x1: 200, y1: 10, x2: 200, y2: 190 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 100 }, answer: 'perpendicular'  },
  { id: 6,  level: 'CE1', lineA: { x1: 20, y1: 70,  x2: 280, y2: 70  }, lineB: { x1: 20, y1: 130, x2: 280, y2: 130 }, answer: 'parallel'      },
  { id: 7,  level: 'CE1', lineA: { x1: 100, y1: 10, x2: 100, y2: 190 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 100 }, answer: 'perpendicular'  },
  { id: 8,  level: 'CE1', lineA: { x1: 20, y1: 90,  x2: 280, y2: 90  }, lineB: { x1: 20, y1: 170, x2: 280, y2: 170 }, answer: 'parallel'      },
  { id: 9,  level: 'CE1', lineA: { x1: 120, y1: 10, x2: 120, y2: 190 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 100 }, answer: 'perpendicular'  },

  // ── CE2 : + neither ──
  { id: 10, level: 'CE2', lineA: { x1: 20, y1: 60,  x2: 280, y2: 60  }, lineB: { x1: 20, y1: 140, x2: 280, y2: 140 }, answer: 'parallel'      },
  { id: 11, level: 'CE2', lineA: { x1: 150, y1: 10, x2: 150, y2: 190 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 100 }, answer: 'perpendicular'  },
  { id: 12, level: 'CE2', lineA: { x1: 20, y1: 40,  x2: 280, y2: 100 }, lineB: { x1: 20, y1: 120, x2: 280, y2: 180 }, answer: 'parallel'      },
  { id: 13, level: 'CE2', lineA: { x1: 20, y1: 20,  x2: 280, y2: 180 }, lineB: { x1: 20, y1: 180, x2: 280, y2: 20  }, answer: 'perpendicular'  },
  { id: 14, level: 'CE2', lineA: { x1: 20, y1: 30,  x2: 280, y2: 90  }, lineB: { x1: 20, y1: 100, x2: 280, y2: 190 }, answer: 'neither'       },
  { id: 15, level: 'CE2', lineA: { x1: 20, y1: 80,  x2: 280, y2: 80  }, lineB: { x1: 20, y1: 160, x2: 280, y2: 160 }, answer: 'parallel'      },
  { id: 16, level: 'CE2', lineA: { x1: 80,  y1: 10, x2: 80,  y2: 190 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 100 }, answer: 'perpendicular'  },
  { id: 17, level: 'CE2', lineA: { x1: 20, y1: 50,  x2: 200, y2: 150 }, lineB: { x1: 20, y1: 120, x2: 280, y2: 80  }, answer: 'neither'       },
  { id: 18, level: 'CE2', lineA: { x1: 20, y1: 60,  x2: 280, y2: 120 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 160 }, answer: 'parallel'      },
  { id: 19, level: 'CE2', lineA: { x1: 20, y1: 170, x2: 180, y2: 10  }, lineB: { x1: 20, y1: 60,  x2: 280, y2: 180 }, answer: 'neither'       },

  // ── CM1 : angles variés ──
  { id: 20, level: 'CM1', lineA: { x1: 20, y1: 50,  x2: 280, y2: 130 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 180 }, answer: 'parallel'      },
  { id: 21, level: 'CM1', lineA: { x1: 20, y1: 20,  x2: 180, y2: 180 }, lineB: { x1: 20, y1: 180, x2: 180, y2: 20  }, answer: 'perpendicular'  },
  { id: 22, level: 'CM1', lineA: { x1: 20, y1: 40,  x2: 280, y2: 160 }, lineB: { x1: 20, y1: 80,  x2: 280, y2: 130 }, answer: 'neither'       },
  { id: 23, level: 'CM1', lineA: { x1: 20, y1: 70,  x2: 280, y2: 70  }, lineB: { x1: 20, y1: 140, x2: 280, y2: 140 }, answer: 'parallel'      },
  { id: 24, level: 'CM1', lineA: { x1: 60,  y1: 10, x2: 60,  y2: 190 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 100 }, answer: 'perpendicular'  },
  { id: 25, level: 'CM1', lineA: { x1: 20, y1: 30,  x2: 280, y2: 170 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 60  }, answer: 'neither'       },
  { id: 26, level: 'CM1', lineA: { x1: 20, y1: 60,  x2: 280, y2: 100 }, lineB: { x1: 20, y1: 120, x2: 280, y2: 160 }, answer: 'parallel'      },
  { id: 27, level: 'CM1', lineA: { x1: 20, y1: 30,  x2: 140, y2: 170 }, lineB: { x1: 60, y1: 170, x2: 200, y2: 30  }, answer: 'perpendicular'  },
  { id: 28, level: 'CM1', lineA: { x1: 20, y1: 150, x2: 280, y2: 50  }, lineB: { x1: 20, y1: 120, x2: 280, y2: 80  }, answer: 'neither'       },
  { id: 29, level: 'CM1', lineA: { x1: 20, y1: 80,  x2: 280, y2: 140 }, lineB: { x1: 20, y1: 40,  x2: 280, y2: 100 }, answer: 'parallel'      },

  // ── CM2 : orientations moins évidentes ──
  { id: 30, level: 'CM2', lineA: { x1: 20, y1: 45,  x2: 280, y2: 115 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 170 }, answer: 'parallel'      },
  { id: 31, level: 'CM2', lineA: { x1: 30, y1: 20,  x2: 100, y2: 180 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 140 }, answer: 'neither'       },
  { id: 32, level: 'CM2', lineA: { x1: 20, y1: 30,  x2: 160, y2: 170 }, lineB: { x1: 60, y1: 170, x2: 200, y2: 30  }, answer: 'perpendicular'  },
  { id: 33, level: 'CM2', lineA: { x1: 20, y1: 60,  x2: 280, y2: 140 }, lineB: { x1: 20, y1: 80,  x2: 280, y2: 100 }, answer: 'neither'       },
  { id: 34, level: 'CM2', lineA: { x1: 20, y1: 55,  x2: 280, y2: 125 }, lineB: { x1: 20, y1: 105, x2: 280, y2: 175 }, answer: 'parallel'      },
  { id: 35, level: 'CM2', lineA: { x1: 20, y1: 170, x2: 180, y2: 30  }, lineB: { x1: 80, y1: 20,  x2: 220, y2: 180 }, answer: 'perpendicular'  },
  { id: 36, level: 'CM2', lineA: { x1: 20, y1: 40,  x2: 280, y2: 160 }, lineB: { x1: 20, y1: 90,  x2: 280, y2: 130 }, answer: 'neither'       },
  { id: 37, level: 'CM2', lineA: { x1: 20, y1: 70,  x2: 280, y2: 130 }, lineB: { x1: 20, y1: 110, x2: 280, y2: 170 }, answer: 'parallel'      },
  { id: 38, level: 'CM2', lineA: { x1: 20, y1: 25,  x2: 120, y2: 175 }, lineB: { x1: 20, y1: 175, x2: 280, y2: 105 }, answer: 'neither'       },
  { id: 39, level: 'CM2', lineA: { x1: 40, y1: 10,  x2: 40,  y2: 190 }, lineB: { x1: 20, y1: 100, x2: 280, y2: 100 }, answer: 'perpendicular'  },
];
```

- [ ] **Step 2 : Vérifier le build**

```
npm run build
```
Attendu : `✓ built in XXXms` sans erreur TypeScript.

- [ ] **Step 3 : Commit**

```
git add database/geometry.ts
git commit -m "feat(geometry): add geometry database (shapes, perimeters, parallel lines)"
```

---

### Task 3 : Fonctions de génération dans `data.ts`

**Files:**
- Modify: `data.ts`

**Interfaces:**
- Consumes: `ShapeIdTask`, `PerimeterTask`, `ParallelTask`, `Level` depuis `./types` ; `SHAPE_ID_DATABASE`, `PERIMETER_DATABASE`, `PARALLEL_DATABASE` depuis `./database/geometry`
- Produces:
  - `getShapeIdQuestions(level: Level, limit: number): ShapeIdTask[]`
  - `getPerimeterQuestions(level: Level, limit: number): PerimeterTask[]`
  - `getParallelQuestions(level: Level, limit: number): ParallelTask[]`

- [ ] **Step 1 : Ajouter l'import et les 3 fonctions dans `data.ts`**

En tête du fichier, ajouter dans l'import depuis `./types` :
```ts
import { ..., ShapeIdTask, PerimeterTask, ParallelTask } from './types';
```

Ajouter à la fin du fichier, après `getNumberLineQuestions` :

```ts
import { SHAPE_ID_DATABASE, PERIMETER_DATABASE, PARALLEL_DATABASE } from './database/geometry';

export const getShapeIdQuestions = (level: Level, limit: number): ShapeIdTask[] =>
  SHAPE_ID_DATABASE.filter(q => q.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getPerimeterQuestions = (level: Level, limit: number): PerimeterTask[] =>
  PERIMETER_DATABASE.filter(q => q.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getParallelQuestions = (level: Level, limit: number): ParallelTask[] =>
  PARALLEL_DATABASE.filter(q => q.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);
```

- [ ] **Step 2 : Vérifier le build**

```
npm run build
```
Attendu : `✓ built in XXXms` sans erreur TypeScript.

- [ ] **Step 3 : Commit**

```
git add data.ts
git commit -m "feat(geometry): export getShapeIdQuestions, getPerimeterQuestions, getParallelQuestions"
```

---

### Task 4 : Composant `GeometryExercise.tsx`

**Files:**
- Create: `components/GeometryExercise.tsx`

**Interfaces:**
- Consumes: `ShapeIdTask`, `PerimeterTask`, `ParallelTask` depuis `../types`
- Produces:
  - `ShapeIdExercise: React.FC<{ task: ShapeIdTask; onValidate: (c: boolean, v?: string) => void }>`
  - `PerimeterExercise: React.FC<{ task: PerimeterTask; onValidate: (c: boolean, v?: string) => void }>`
  - `ParallelExercise: React.FC<{ task: ParallelTask; onValidate: (c: boolean, v?: string) => void }>`

- [ ] **Step 1 : Créer `components/GeometryExercise.tsx`**

```tsx
import React, { useState, useEffect } from 'react';
import { ShapeIdTask, PerimeterTask, ParallelTask } from '../types';

// ─── SVG Shapes ──────────────────────────────────────────────────────────────
// Toutes les formes sont dans un viewBox "0 0 100 100" pour usage dans ShapeId.
// Pour PerimeterExercise elles sont dans "0 0 220 220".

const SHAPE_PATHS: Record<string, React.FC<{ size?: number; color?: string; strokeColor?: string }>> = {
  square: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="10" y="10" width="80" height="80" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  rectangle: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="5" y="25" width="90" height="50" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  triangle: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="50,8 95,92 5,92" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  circle: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="50" r="42" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  rhombus: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="50,8 92,50 50,92 8,50" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  trapezoid: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="20,80 80,80 65,20 35,20" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  parallelogram: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="25,80 90,80 75,20 10,20" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  pentagon: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="50,8 95,38 78,88 22,88 5,38" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  hexagon: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="50,5 93,27 93,73 50,95 7,73 7,27" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  octagon: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="35,5 65,5 95,35 95,65 65,95 35,95 5,65 5,35" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
};

// ─── Formes pour PerimeterExercise (viewBox 220x220) avec annotations de côtés ──
// Les points de chaque côté sont calculés pour que le texte des cotes soit centré.
type SideAnnotation = { x: number; y: number; anchor: 'start' | 'middle' | 'end' };

function getPerimeterShapeData(shapeKey: string, sides: number[], unit: string): {
  points: string;
  isCircle: boolean;
  sideAnnotations: Array<{ label: string; pos: SideAnnotation }>;
} {
  const fmt = (n: number) => Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.', ',');
  const label = (i: number) => `${fmt(sides[i])} ${unit}`;

  if (shapeKey === 'square') {
    // points : top-left, top-right, bottom-right, bottom-left
    const pts = '30,30 190,30 190,190 30,190';
    return { points: pts, isCircle: false, sideAnnotations: [
      { label: label(0), pos: { x: 110, y: 20,  anchor: 'middle' } },
      { label: label(1), pos: { x: 205, y: 115, anchor: 'start'  } },
      { label: label(2), pos: { x: 110, y: 207, anchor: 'middle' } },
      { label: label(3), pos: { x: 15,  y: 115, anchor: 'end'    } },
    ]};
  }
  if (shapeKey === 'rectangle') {
    const pts = '20,60 200,60 200,160 20,160';
    return { points: pts, isCircle: false, sideAnnotations: [
      { label: label(0), pos: { x: 110, y: 50,  anchor: 'middle' } },
      { label: label(1), pos: { x: 213, y: 115, anchor: 'start'  } },
      { label: label(2), pos: { x: 110, y: 177, anchor: 'middle' } },
      { label: label(3), pos: { x: 7,   y: 115, anchor: 'end'    } },
    ]};
  }
  if (shapeKey === 'triangle') {
    const pts = '110,20 200,180 20,180';
    return { points: pts, isCircle: false, sideAnnotations: [
      { label: label(0), pos: { x: 163, y: 90,  anchor: 'start'  } },
      { label: label(1), pos: { x: 110, y: 196, anchor: 'middle' } },
      { label: label(2), pos: { x: 55,  y: 90,  anchor: 'end'    } },
    ]};
  }
  if (shapeKey === 'pentagon') {
    const pts = '110,15 200,75 170,185 50,185 20,75';
    return { points: pts, isCircle: false, sideAnnotations: [
      { label: label(0), pos: { x: 163, y: 38,  anchor: 'start'  } },
      { label: label(1), pos: { x: 195, y: 140, anchor: 'start'  } },
      { label: label(2), pos: { x: 115, y: 202, anchor: 'middle' } },
      { label: label(3), pos: { x: 25,  y: 140, anchor: 'end'    } },
      { label: label(4), pos: { x: 55,  y: 38,  anchor: 'end'    } },
    ]};
  }
  // fallback : carré
  return { points: '30,30 190,30 190,190 30,190', isCircle: false, sideAnnotations: [] };
}

// ─── ShapeIdExercise ──────────────────────────────────────────────────────────

export const ShapeIdExercise: React.FC<{
  task: ShapeIdTask;
  onValidate: (c: boolean, v?: string) => void;
}> = ({ task, onValidate }) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { setSelected(null); }, [task]);

  const handleClick = (choice: { shapeKey: string; label: string; isCorrect: boolean }) => {
    if (selected !== null) return;
    setSelected(choice.shapeKey);
    onValidate(choice.isCorrect, choice.label);
  };

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-10 w-full">
      <h3 className="text-lg sm:text-2xl font-bold text-indigo-400 uppercase tracking-widest">
        Qui est-ce ? 🔷
      </h3>
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-2 font-medium">Clique sur la bonne forme :</p>
        <div className="text-4xl sm:text-6xl font-title text-indigo-900 bg-amber-50 px-8 py-4 rounded-2xl border-4 border-dashed border-amber-200 inline-block">
          {task.targetShape}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md">
        {task.choices.map(choice => {
          const ShapeComponent = SHAPE_PATHS[choice.shapeKey];
          const isSelected = selected === choice.shapeKey;
          return (
            <button
              key={choice.shapeKey}
              onClick={() => handleClick(choice)}
              disabled={selected !== null}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-4 transition-all shadow-md
                ${selected === null ? 'hover:border-amber-400 hover:bg-amber-50 border-indigo-100 bg-white cursor-pointer' : ''}
                ${isSelected && choice.isCorrect ? 'border-green-400 bg-green-50' : ''}
                ${isSelected && !choice.isCorrect ? 'border-red-400 bg-red-50' : ''}
                ${!isSelected && selected !== null ? 'border-indigo-100 bg-white opacity-60' : ''}
              `}
            >
              {ShapeComponent ? <ShapeComponent size={80} /> : <div className="w-20 h-20 bg-indigo-100 rounded" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── PerimeterExercise ────────────────────────────────────────────────────────

export const PerimeterExercise: React.FC<{
  task: PerimeterTask;
  onValidate: (c: boolean, v?: string) => void;
}> = ({ task, onValidate }) => {
  const [value, setValue] = useState('');

  useEffect(() => { setValue(''); }, [task]);

  const check = () => {
    const normalized = value.trim().replace(',', '.');
    const num = parseFloat(normalized);
    if (isNaN(num)) return;
    onValidate(Math.abs(num - task.answer) < 0.01, value.trim());
  };

  const { points, isCircle, sideAnnotations } = getPerimeterShapeData(task.shapeKey, task.sides, task.unit);

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
      <h3 className="text-lg sm:text-2xl font-bold text-indigo-400 uppercase tracking-widest">
        Calcule le périmètre 📐
      </h3>
      <div className="bg-white rounded-2xl border-2 border-indigo-100 p-4 shadow-md">
        <svg viewBox="0 0 220 220" width="220" height="220">
          {!isCircle && (
            <polygon points={points} fill="#e0e7ff" stroke="#6366f1" strokeWidth="3" />
          )}
          {sideAnnotations.map((ann, i) => (
            <text
              key={i}
              x={ann.pos.x}
              y={ann.pos.y}
              textAnchor={ann.pos.anchor}
              fontSize="13"
              fontWeight="bold"
              fill="#4338ca"
            >
              {ann.label}
            </text>
          ))}
        </svg>
      </div>
      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        <p className="text-gray-500 text-sm">Périmètre = ?</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && check()}
            placeholder="?"
            className="text-3xl sm:text-4xl p-4 border-4 rounded-2xl w-36 text-center font-title border-indigo-100 focus:border-indigo-400 outline-none"
          />
          <span className="text-xl font-bold text-indigo-700">{task.unit}</span>
        </div>
        <button
          onClick={check}
          disabled={!value.trim()}
          className={`w-full px-10 py-4 rounded-2xl text-xl font-bold shadow-xl transition-all ${
            value.trim()
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Valider 🎯
        </button>
      </div>
    </div>
  );
};

// ─── ParallelExercise ─────────────────────────────────────────────────────────

const PARALLEL_LABELS: Record<'parallel' | 'perpendicular' | 'neither', string> = {
  parallel: 'Parallèles',
  perpendicular: 'Perpendiculaires',
  neither: 'Ni l\'un ni l\'autre',
};

export const ParallelExercise: React.FC<{
  task: ParallelTask;
  onValidate: (c: boolean, v?: string) => void;
}> = ({ task, onValidate }) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { setSelected(null); }, [task]);

  const options: Array<'parallel' | 'perpendicular' | 'neither'> =
    task.level === 'CE1'
      ? ['parallel', 'perpendicular']
      : ['parallel', 'perpendicular', 'neither'];

  const handleChoice = (choice: 'parallel' | 'perpendicular' | 'neither') => {
    if (selected !== null) return;
    setSelected(choice);
    onValidate(choice === task.answer, PARALLEL_LABELS[choice]);
  };

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
      <h3 className="text-lg sm:text-2xl font-bold text-indigo-400 uppercase tracking-widest">
        Parallèle ou perpendiculaire ? 📏
      </h3>
      <p className="text-gray-400 text-sm">Ces deux droites sont…</p>
      <div className="bg-white rounded-2xl border-2 border-indigo-100 p-4 shadow-md">
        <svg viewBox="0 0 300 200" width="300" height="200">
          <line
            x1={task.lineA.x1} y1={task.lineA.y1}
            x2={task.lineA.x2} y2={task.lineA.y2}
            stroke="#6366f1" strokeWidth="3" strokeLinecap="round"
          />
          <line
            x1={task.lineB.x1} y1={task.lineB.y1}
            x2={task.lineB.x2} y2={task.lineB.y2}
            stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"
          />
        </svg>
      </div>
      <div className={`grid gap-3 w-full max-w-sm ${options.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {options.map(opt => {
          const isSelected = selected === opt;
          const isCorrect = opt === task.answer;
          return (
            <button
              key={opt}
              onClick={() => handleChoice(opt)}
              disabled={selected !== null}
              className={`py-3 px-2 rounded-2xl font-bold text-sm sm:text-base border-4 transition-all shadow
                ${selected === null ? 'border-indigo-100 bg-white hover:border-amber-400 hover:bg-amber-50 cursor-pointer' : ''}
                ${isSelected && isCorrect  ? 'border-green-400 bg-green-50 text-green-700' : ''}
                ${isSelected && !isCorrect ? 'border-red-400 bg-red-50 text-red-700' : ''}
                ${!isSelected && selected !== null ? 'border-indigo-100 bg-white opacity-60' : 'text-indigo-700'}
              `}
            >
              {PARALLEL_LABELS[opt]}
            </button>
          );
        })}
      </div>
    </div>
  );
};
```

- [ ] **Step 2 : Vérifier le build**

```
npm run build
```
Attendu : `✓ built in XXXms` sans erreur TypeScript.

- [ ] **Step 3 : Commit**

```
git add components/GeometryExercise.tsx
git commit -m "feat(geometry): add ShapeIdExercise, PerimeterExercise, ParallelExercise components"
```

---

### Task 5 : Wiring dans `ExerciseRunner.tsx`

**Files:**
- Modify: `components/ExerciseRunner.tsx`

**Interfaces:**
- Consumes:
  - `ShapeIdTask`, `PerimeterTask`, `ParallelTask` depuis `../types`
  - `getShapeIdQuestions`, `getPerimeterQuestions`, `getParallelQuestions` depuis `../data`
  - `ShapeIdExercise`, `PerimeterExercise`, `ParallelExercise` depuis `./GeometryExercise`

- [ ] **Step 1 : Ajouter les imports**

En haut du fichier `components/ExerciseRunner.tsx`, ligne 1 (import types) ajouter `ShapeIdTask, PerimeterTask, ParallelTask` :
```ts
import { ..., ShapeIdTask, PerimeterTask, ParallelTask } from '../types';
```

Ligne 2 (import data) ajouter `getShapeIdQuestions, getPerimeterQuestions, getParallelQuestions` :
```ts
import { ..., getShapeIdQuestions, getPerimeterQuestions, getParallelQuestions } from '../data';
```

Après les imports existants, ajouter :
```ts
import { ShapeIdExercise, PerimeterExercise, ParallelExercise } from './GeometryExercise';
```

- [ ] **Step 2 : Ajouter la génération des questions dans le `useEffect`**

Dans le bloc `else` du `useEffect` de génération (autour de la ligne 83), ajouter avant `else q = getMathQuestions(...)` :
```ts
if (type === 'shape-id') q = getShapeIdQuestions(level, totalQuestions);
else if (type === 'perimeter') q = getPerimeterQuestions(level, totalQuestions);
else if (type === 'parallel') q = getParallelQuestions(level, totalQuestions);
else if (type === 'numberline') q = getNumberLineQuestions(level, totalQuestions);
else q = getMathQuestions(level, type, selectedTables, additionMax, totalQuestions);
```

- [ ] **Step 3 : Ajouter le routing de rendu**

Dans le bloc de rendu (autour de la ligne 321), après les lignes `numberline` :
```tsx
{type === 'shape-id' && (
  <ShapeIdExercise task={current as ShapeIdTask} onValidate={handleValidation} />
)}
{type === 'perimeter' && (
  <PerimeterExercise task={current as PerimeterTask} onValidate={handleValidation} />
)}
{type === 'parallel' && (
  <ParallelExercise task={current as ParallelTask} onValidate={handleValidation} />
)}
{subject === 'maths' && type === 'numberline' && (
  <NumberLineExercise task={current as NumberLineTask} onValidate={handleValidation} />
)}
{subject === 'maths' && type !== 'numberline' && type !== 'shape-id' && type !== 'perimeter' && type !== 'parallel' && (
  <MathDisplay ... />
)}
```

- [ ] **Step 4 : Vérifier le build**

```
npm run build
```
Attendu : `✓ built in XXXms` sans erreur TypeScript.

- [ ] **Step 5 : Commit**

```
git add components/ExerciseRunner.tsx
git commit -m "feat(geometry): wire shape-id, perimeter, parallel into ExerciseRunner"
```

---

### Task 6 : Navigation dans `App.tsx`

**Files:**
- Modify: `App.tsx`

**Interfaces:**
- Consumes: état `gameState` de type `GameState`, fonction `startExercise`, fonction `setGameState`

- [ ] **Step 1 : Ajouter `'geometrieMenu'` au type `GameState`**

Ligne 5 de `App.tsx`, ajouter `'geometrieMenu'` à l'union :
```ts
type GameState = 'intro' | ... | 'adverbesMenu' | 'geometrieMenu' | 'playing' | 'summary';
```

- [ ] **Step 2 : Ajouter la route history pour `geometrieMenu`**

Dans la fonction `getHistoryPath`, ajouter :
```ts
if (gs === 'geometrieMenu') return `${BASE}/maths/geometrie`;
```

- [ ] **Step 3 : Ajouter le bouton "Géométrie" dans la section Maths**

Dans la section Maths (après le bouton "Droite graduée" autour de la ligne 959), ajouter :
```tsx
<button
  onClick={() => setGameState('geometrieMenu')}
  className="p-6 sm:p-10 rounded-3xl bg-amber-50 border-4 border-amber-100 hover:border-amber-400 hover:bg-amber-100 transition-all text-left group shadow-lg flex flex-col justify-between min-h-[100px] sm:min-h-[140px] w-full"
>
  <div className="flex justify-between items-start">
    <h3 className="font-bold text-amber-700 text-xl sm:text-2xl">Géométrie</h3>
    <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">📐</span>
  </div>
  <p className="text-sm sm:text-lg text-amber-600/70 font-medium">Formes, périmètres, droites</p>
</button>
```

- [ ] **Step 4 : Ajouter le rendu du sous-menu `geometrieMenu`**

Dans le grand `if/else` de rendu de `App.tsx` (chercher le pattern `gameState === 'adverbesMenu'`), ajouter un bloc similaire pour `geometrieMenu` :

```tsx
} else if (gameState === 'geometrieMenu') {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setGameState('intro')}
            className="text-amber-600 hover:text-amber-800 font-bold text-lg"
          >
            ← Retour
          </button>
          <h1 className="text-3xl sm:text-4xl font-title text-gray-800">Géométrie 📐</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <button
            onClick={() => startExercise('maths', 'shape-id')}
            className="p-6 sm:p-10 rounded-3xl bg-amber-50 border-4 border-amber-100 hover:border-amber-400 hover:bg-amber-100 transition-all text-left group shadow-lg flex flex-col justify-between min-h-[120px]"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-amber-700 text-xl sm:text-2xl">Qui est-ce ?</h3>
              <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">🔷</span>
            </div>
            <p className="text-sm sm:text-lg text-amber-600/70 font-medium">Reconnais la forme géométrique</p>
          </button>
          <button
            onClick={() => startExercise('maths', 'perimeter')}
            className="p-6 sm:p-10 rounded-3xl bg-amber-50 border-4 border-amber-100 hover:border-amber-400 hover:bg-amber-100 transition-all text-left group shadow-lg flex flex-col justify-between min-h-[120px]"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-amber-700 text-xl sm:text-2xl">Calcule un périmètre</h3>
              <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">📏</span>
            </div>
            <p className="text-sm sm:text-lg text-amber-600/70 font-medium">Dimensions affichées sur la forme</p>
          </button>
          <button
            onClick={() => startExercise('maths', 'parallel')}
            className="p-6 sm:p-10 rounded-3xl bg-amber-50 border-4 border-amber-100 hover:border-amber-400 hover:bg-amber-100 transition-all text-left group shadow-lg flex flex-col justify-between min-h-[120px]"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-amber-700 text-xl sm:text-2xl">Parallèle ou perpendiculaire ?</h3>
              <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">✏️</span>
            </div>
            <p className="text-sm sm:text-lg text-amber-600/70 font-medium">Identifie la relation entre deux droites</p>
          </button>
        </div>
      </div>
    </div>
  );
```

- [ ] **Step 5 : Vérifier le build**

```
npm run build
```
Attendu : `✓ built in XXXms` sans erreur TypeScript.

- [ ] **Step 6 : Commit final**

```
git add App.tsx
git commit -m "feat(geometry): add geometrieMenu with shape-id, perimeter, parallel navigation"
```
