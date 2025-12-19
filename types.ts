
export type Level = 'CE1' | 'CE2' | 'CM1' | 'CM2';

export type Category = 'verbe' | 'nom' | 'determinant' | 'adjectif' | 'none';

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
