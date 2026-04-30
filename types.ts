export type Level = 'CE1' | 'CE2' | 'CM1' | 'CM2';

export type Category = 'verbe' | 'nom' | 'determinant' | 'adjectif' | 'pronom' | 'adverbe' | 'none';

export interface WordPart {
  text: string;
  category: Category;
}

export interface GrammarSentence {
  id: number;
  parts: WordPart[];
  level: Level;
}

export type Tense = 'présent' | 'futur' | 'passé composé' | 'imparfait';

export interface ConjugationTask {
  id: number;
  verb: string;
  tense: Tense;
  person: string;
  answer: string;
  level: Level;
}

export interface DictationTask {
  id: number;
  sentence: string;
  level: Level;
}

export interface HoleyDictationTask {
  id: number;
  textLeft: string;
  textRight: string;
  missingWord: string;
  level: Level;
}

export type MathType = 'multiplication' | 'addition' | 'ordering' | 'logic' | 'problem' | 'decomposition';

export interface MathTask {
  id: number;
  type: MathType;
  question: string;
  options?: string[] | number[];
  correctAnswer: string | number | number[];
  level: Level;
}

export interface UserState {
  level: Level | null;
  score: number;
  streak: number;
}

export interface TimeTask {
  id: number;
  type: 'read_time' | 'set_time';
  time: string; // "14:30"
  question: string;
  level: Level;
}

// Exercices sur les noms
export interface NounSortTask {
  id: number;
  word: string;
  isProper: boolean; // true = nom propre, false = nom commun
  level: Level;
}

export interface NounIdentifyWord {
  text: string;
  isNoun: boolean;
}

export interface NounIdentifyTask {
  id: number;
  words: NounIdentifyWord[];
  level: Level;
}

export type PluralRule = 'classique' | 'eau-au' | 'ou' | 'ail';

export interface NounPluralTask {
  id: number;
  singular: string;
  plural: string;
  rule: PluralRule;
  level: Level;
}

export type GenderRule = 'ien' | 'eur' | 'ier' | 'ion' | 'ain' | 'e';

export interface NounGenderTask {
  id: number;
  masculine: string;
  feminine: string;
  rule: GenderRule;
  level: Level;
}

// Exercices sur les verbes
export interface VerbIdentifyTask {
  id: number;
  words: { text: string; isVerb: boolean }[];
  level: Level;
}

export interface VerbConjugatedTask {
  id: number;
  verbForm: string;
  isConjugated: boolean;
  level: Level;
}

export interface VerbInfinitiveTask {
  id: number;
  conjugatedForm: string;
  infinitive: string;
  context?: string;
  level: Level;
}

export type VerbTense = 'passé' | 'présent' | 'futur';

export interface VerbTenseTask {
  id: number;
  sentence: string;
  tense: VerbTense;
  level: Level;
}

export interface VerbConjugateExTask {
  id: number;
  infinitive: string;
  subject: string;
  grammaticalPerson: string;
  tense: Tense;
  answer: string;
  level: Level;
}

// Exercices sur les déterminants
export interface DetIdentifyWord {
  text: string;
  isDeterminer: boolean;
}
export interface DetIdentifyTask {
  id: number;
  words: DetIdentifyWord[];
  level: Level;
}
export interface DetGenderTask {
  id: number;
  phrase: string;
  gender: 'masculin' | 'féminin';
  level: Level;
}
export interface DetNumberTask {
  id: number;
  phrase: string;
  number: 'singulier' | 'pluriel';
  level: Level;
}
export interface DetWriteTask {
  id: number;
  noun: string;
  hint: string;
  accepted: string[];
  level: Level;
}
export interface DetChooseTask {
  id: number;
  noun: string;
  options: string[];
  correct: string[];
  level: Level;
}
export interface DetArticleSortTask {
  id: number;
  article: string;
  type: 'défini' | 'indéfini';
  level: Level;
}

// Exercices d'orthographe
export interface SilentLetterTask {
  id: number;
  hint: string;        // mot de la famille, ex: "un arbre fruitier"
  partialWord: string; // mot à compléter, ex: "frui…"
  answer: string;      // lettre muette, ex: "t"
  options: string[];   // 4 lettres dont la bonne, ex: ["t", "s", "d", "x"]
  level: Level;
}

export interface SpellingChoiceTask {
  id: number;
  textBefore: string;  // avant le "..."
  textAfter: string;   // après le "..." (peut être vide si le blanc est en fin de mot)
  answer: string;      // la bonne réponse parmi les options
  options: [string, string]; // exactement 2 choix
  rule: 'ortho-s-ss' | 'ortho-n-m' | 'ortho-c-cedilla' | 'ortho-g-ge' | 'ortho-g-gu';
  level: Level;
}

// Exercices de vocabulaire
export interface VocabAlphaTask {
  id: number;
  items: string[];   // lettres ou mots dans l'ordre mélangé
  sorted: string[];  // ordre alphabétique correct
  level: Level;
}

export interface VocabSynonymTask {
  id: number;
  word: string;
  options: string[];   // mélange de synonymes et non-synonymes (6-8 mots)
  synonyms: string[];  // sous-ensemble correct des options
  level: Level;
}

export interface VocabIntrusTask {
  id: number;
  word: string;
  options: string[];  // liste dont un seul n'est PAS synonyme
  intrus: string;     // le mot intrus
  level: Level;
}

export interface VocabContraireTask {
  id: number;
  word: string;
  options: string[];  // 4 choix dont 1 seul est le contraire
  answer: string;
  level: Level;
}

export interface VocabFamilyWord {
  text: string;
  isSameFamily: boolean;
}

export interface VocabFamilyTask {
  id: number;
  baseWord: string;
  words: VocabFamilyWord[];  // mix famille + hors famille (8-10 mots)
  level: Level;
}

// Exercices sur la phrase
export interface PhraseTypeTask {
  id: number;
  sentence: string;
  type: 'déclarative' | 'impérative' | 'interrogative';
  level: Level;
}

export interface PhrasePunctuationTask {
  id: number;
  sentence: string;
  answer: '.' | '?' | '!';
  level: Level;
}

export interface PhraseOrderTask {
  id: number;
  words: string[];
  level: Level;
}

export interface PhraseValidTask {
  id: number;
  sentence: string;
  isValid: boolean;
  reason: string;
  level: Level;
}

// Défis Adverbes
export interface AdverbIdentifyTask {
  id: number;
  words: { word: string; isAdverb: boolean }[];
  level: Level;
}

export interface AdjAdvTransformTask {
  id: number;
  from: string;
  to: string;
  hint?: string;
  level: Level;
}
