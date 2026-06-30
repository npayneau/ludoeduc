import { NumberLineTask, Level } from '../types';

/**
 * Configuration d'une droite graduée.
 * - min / max        : bornes de la droite
 * - graduationStep   : pas des grandes graduations (affichées avec leur valeur)
 * - intermediateStep : pas des petits tirets intermédiaires (null = aucun)
 * - snapStep         : précision de placement de l'élève
 *
 * Règle pédagogique par niveau :
 *  CE1  – 0-100 avec intermédiaires (pas 5) ou 0-20 pas à pas
 *  CE2  – 0-100 SANS intermédiaires, multiples de 5 ou entiers
 *  CM1  – 0-1000 ou 0-100 sans aide intermédiaire
 *  CM2  – droites avec décimales (0.5 ou 0.1)
 */
type LineConfig = {
  min: number;
  max: number;
  graduationStep: number;
  intermediateStep: number | null;
  intermediateMarker: 'line' | 'dot';
  snapStep: number;
};

const CONFIGS: Record<Level, LineConfig[]> = {
  CE1: [
    // 0-100, intermédiaires tous les 5, placement au 5
    { min: 0,  max: 100, graduationStep: 10, intermediateStep: 5, intermediateMarker: 'line', snapStep: 5  },
    // 0-20 pas à pas avec tirets à chaque entier
    { min: 0,  max: 20,  graduationStep: 2,  intermediateStep: 1, intermediateMarker: 'line', snapStep: 1  },
    // 0-50, intermédiaires tous les 5
    { min: 0,  max: 50,  graduationStep: 10, intermediateStep: 5, intermediateMarker: 'line', snapStep: 5  },
    // 0-30 pas à pas
    { min: 0,  max: 30,  graduationStep: 5,  intermediateStep: 1, intermediateMarker: 'line', snapStep: 1  },
    // 10-60 (droite décalée) intermédiaires tous les 5
    { min: 10, max: 60,  graduationStep: 10, intermediateStep: 5, intermediateMarker: 'line', snapStep: 5  },
    // 20-80 intermédiaires tous les 5
    { min: 20, max: 80,  graduationStep: 10, intermediateStep: 5, intermediateMarker: 'line', snapStep: 5  },
        // 0-100 SANS intermédiaires, multiples de 5
        { min: 0,   max: 100, graduationStep: 10, intermediateStep: null, intermediateMarker: 'line', snapStep: 5 },
        // 0-100 SANS intermédiaires, précision à l'unité
        { min: 0,   max: 100, graduationStep: 10, intermediateStep: null, intermediateMarker: 'line', snapStep: 1 },
        // 0-200 grandes graduations 20, multiples de 10
        { min: 0,   max: 200, graduationStep: 20, intermediateStep: null, intermediateMarker: 'line', snapStep: 10 },
        // 0-500 grandes graduations 100, multiples de 50
        { min: 0,   max: 500, graduationStep: 100, intermediateStep: null, intermediateMarker: 'line', snapStep: 50 },
        // 50-150 grandes graduations 10, multiples de 5
        { min: 50,  max: 150, graduationStep: 10, intermediateStep: null, intermediateMarker: 'line', snapStep: 5  },
        // 100-200 grandes graduations 10, précision unité
        { min: 100, max: 200, graduationStep: 10, intermediateStep: null, intermediateMarker: 'line', snapStep: 1  },
  ],
  CE2: [
    // 0-100 SANS intermédiaires, multiples de 5
    { min: 0,   max: 100, graduationStep: 10, intermediateStep: null, intermediateMarker: 'line', snapStep: 5 },
    // 0-100 SANS intermédiaires, précision à l'unité
    { min: 0,   max: 100, graduationStep: 10, intermediateStep: null, intermediateMarker: 'line', snapStep: 1 },
    // 0-200 grandes graduations 20, multiples de 10
    { min: 0,   max: 200, graduationStep: 20, intermediateStep: null, intermediateMarker: 'line', snapStep: 10 },
    // 0-500 grandes graduations 100, multiples de 50
    { min: 0,   max: 500, graduationStep: 100, intermediateStep: null, intermediateMarker: 'line', snapStep: 50 },
    // 50-150 grandes graduations 10, multiples de 5
    { min: 50,  max: 150, graduationStep: 10, intermediateStep: null, intermediateMarker: 'line', snapStep: 5  },
    // 100-200 grandes graduations 10, précision unité
    { min: 100, max: 200, graduationStep: 10, intermediateStep: null, intermediateMarker: 'line', snapStep: 1  },
        // 0-100, intermédiaires tous les 5, placement au 5
        { min: 0,  max: 100, graduationStep: 10, intermediateStep: 5, intermediateMarker: 'line', snapStep: 5  },
        // 0-20 pas à pas avec tirets à chaque entier
        { min: 0,  max: 20,  graduationStep: 2,  intermediateStep: 1, intermediateMarker: 'line', snapStep: 1  },
        // 0-50, intermédiaires tous les 5
        { min: 0,  max: 50,  graduationStep: 10, intermediateStep: 5, intermediateMarker: 'line', snapStep: 5  },
        // 0-30 pas à pas
        { min: 0,  max: 30,  graduationStep: 5,  intermediateStep: 1, intermediateMarker: 'line', snapStep: 1  },
        // 10-60 (droite décalée) intermédiaires tous les 5
        { min: 10, max: 60,  graduationStep: 10, intermediateStep: 5, intermediateMarker: 'line', snapStep: 5  },
        // 20-80 intermédiaires tous les 5
        { min: 20, max: 80,  graduationStep: 10, intermediateStep: 5, intermediateMarker: 'line', snapStep: 5  },
  ],
  CM1: [
    // 0-1000, intermédiaires à 50, placement au 10
    { min: 0,    max: 1000, graduationStep: 100, intermediateStep: 50,  intermediateMarker: 'line', snapStep: 10  },
    // 0-100 sans intermédiaires, précision unité
    { min: 0,    max: 100,  graduationStep: 10,  intermediateStep: null, intermediateMarker: 'line', snapStep: 1   },
    // 0-10000, grandes graduations 1000, placement au 100
    { min: 0,    max: 10000, graduationStep: 1000, intermediateStep: 500, intermediateMarker: 'line', snapStep: 100 },
    // 0-500, grandes graduations 50, placement au 10
    { min: 0,    max: 500,  graduationStep: 50,  intermediateStep: null, intermediateMarker: 'line', snapStep: 10  },
    // 500-1500 grandes graduations 100, placement au 50
    { min: 500,  max: 1500, graduationStep: 100, intermediateStep: 50,  intermediateMarker: 'line', snapStep: 50  },
    // 0-1000 sans intermédiaires, placement au 100
    { min: 0,    max: 1000, graduationStep: 100, intermediateStep: null, intermediateMarker: 'line', snapStep: 100 },
    // 200-800 grandes graduations 100, intermédiaires à 50
    { min: 200,  max: 800,  graduationStep: 100, intermediateStep: 50,  intermediateMarker: 'line', snapStep: 10  },
        // 0-10, intermédiaires à 0.5, placement au 0.5
        { min: 0, max: 10,  graduationStep: 1, intermediateStep: 0.5, intermediateMarker: 'dot', snapStep: 0.5 },
        // 0-5, intermédiaires à 0.1, placement au 0.1
        { min: 0, max: 5,   graduationStep: 1, intermediateStep: 0.1, intermediateMarker: 'dot', snapStep: 0.1 },
        // 0-3, intermédiaires à 0.1, placement au 0.1
        { min: 0, max: 3,   graduationStep: 1, intermediateStep: 0.1, intermediateMarker: 'dot', snapStep: 0.1 },
        // 0-20, intermédiaires à 0.5, placement au 0.5
        { min: 0, max: 20,  graduationStep: 2, intermediateStep: 0.5, intermediateMarker: 'dot', snapStep: 0.5 },
        // 0-10, intermédiaires à 0.1, placement au 0.1 (plus difficile)
        { min: 0, max: 10,  graduationStep: 1, intermediateStep: 0.1, intermediateMarker: 'dot', snapStep: 0.1 },
        // 2-8, intermédiaires à 0.5, placement au 0.5 (droite décalée)
        { min: 2, max: 8,   graduationStep: 1, intermediateStep: 0.5, intermediateMarker: 'dot', snapStep: 0.5 },
        // 1-6, intermédiaires à 0.1, placement au 0.1
        { min: 1, max: 6,   graduationStep: 1, intermediateStep: 0.1, intermediateMarker: 'dot', snapStep: 0.1 },
  ],
  CM2: [
        // 0-1000, intermédiaires à 50, placement au 10
        { min: 0,    max: 1000, graduationStep: 100, intermediateStep: 50,  intermediateMarker: 'line', snapStep: 10  },
        // 0-100 sans intermédiaires, précision unité
        { min: 0,    max: 100,  graduationStep: 10,  intermediateStep: null, intermediateMarker: 'line', snapStep: 1   },
        // 0-10000, grandes graduations 1000, placement au 100
        { min: 0,    max: 10000, graduationStep: 1000, intermediateStep: 500, intermediateMarker: 'line', snapStep: 100 },
        // 0-500, grandes graduations 50, placement au 10
        { min: 0,    max: 500,  graduationStep: 50,  intermediateStep: null, intermediateMarker: 'line', snapStep: 10  },
        // 500-1500 grandes graduations 100, placement au 50
        { min: 500,  max: 1500, graduationStep: 100, intermediateStep: 50,  intermediateMarker: 'line', snapStep: 50  },
        // 0-1000 sans intermédiaires, placement au 100
        { min: 0,    max: 1000, graduationStep: 100, intermediateStep: null, intermediateMarker: 'line', snapStep: 100 },
        // 200-800 grandes graduations 100, intermédiaires à 50
        { min: 200,  max: 800,  graduationStep: 100, intermediateStep: 50,  intermediateMarker: 'line', snapStep: 10  },
    // 0-10, intermédiaires à 0.5, placement au 0.5
    { min: 0, max: 10,  graduationStep: 1, intermediateStep: 0.5, intermediateMarker: 'dot', snapStep: 0.5 },
    // 0-5, intermédiaires à 0.1, placement au 0.1
    { min: 0, max: 5,   graduationStep: 1, intermediateStep: 0.1, intermediateMarker: 'dot', snapStep: 0.1 },
    // 0-3, intermédiaires à 0.1, placement au 0.1
    { min: 0, max: 3,   graduationStep: 1, intermediateStep: 0.1, intermediateMarker: 'dot', snapStep: 0.1 },
    // 0-20, intermédiaires à 0.5, placement au 0.5
    { min: 0, max: 20,  graduationStep: 2, intermediateStep: 0.5, intermediateMarker: 'dot', snapStep: 0.5 },
    // 0-10, intermédiaires à 0.1, placement au 0.1 (plus difficile)
    { min: 0, max: 10,  graduationStep: 1, intermediateStep: 0.1, intermediateMarker: 'dot', snapStep: 0.1 },
    // 2-8, intermédiaires à 0.5, placement au 0.5 (droite décalée)
    { min: 2, max: 8,   graduationStep: 1, intermediateStep: 0.5, intermediateMarker: 'dot', snapStep: 0.5 },
    // 1-6, intermédiaires à 0.1, placement au 0.1
    { min: 1, max: 6,   graduationStep: 1, intermediateStep: 0.1, intermediateMarker: 'dot', snapStep: 0.1 },
  ],
};

/**
 * Génère `limit` questions de droite graduée pour un niveau donné.
 * Les cibles sont tirées au sort parmi les valeurs possibles selon le snapStep,
 * en excluant les bornes min et max.
 */
export const generateNumberLineQuestions = (level: Level, limit: number): NumberLineTask[] => {
  const configs = CONFIGS[level];
  const questions: NumberLineTask[] = [];
  const used = new Set<string>();

  for (let attempt = 0; questions.length < limit && attempt < 400; attempt++) {
    const config = configs[Math.floor(Math.random() * configs.length)];
    const range = config.max - config.min;
    const totalSteps = Math.round(range / config.snapStep);

    // On exclut les bornes (index 0 et totalSteps) pour que l'exercice soit intéressant
    const stepIndex = 1 + Math.floor(Math.random() * (totalSteps - 1));
    const rawTarget = config.min + stepIndex * config.snapStep;

    // Arrondi pour éviter les imprécisions flottantes (ex: 0.30000000000000004)
    const decimals = config.snapStep < 1 ? String(config.snapStep).split('.')[1]?.length ?? 1 : 0;
    const target = parseFloat(rawTarget.toFixed(decimals));

    const key = `${config.min}-${config.max}-${config.snapStep}-${target}`;
    if (used.has(key)) continue;
    used.add(key);

    questions.push({
      id: questions.length,
      min: config.min,
      max: config.max,
      target,
      graduationStep: config.graduationStep,
      intermediateStep: config.intermediateStep,
      intermediateMarker: config.intermediateMarker,
      snapStep: config.snapStep,
      level,
    });
  }

  return questions;
};
