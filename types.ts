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
