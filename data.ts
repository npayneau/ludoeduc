
import { GrammarSentence, ConjugationTask, MathTask, Level, Tense, DictationTask, TimeTask } from './types';
import { SENTENCE_DATABASE } from './database/sentences';
import { VERB_DATABASE } from './database/verbs';
import { MATH_DATABASE } from './database/math';
import { DICTATION_DATABASE } from './database/dictations';

/**
 * Sélectionne X phrases au hasard pour un niveau donné (Grammaire).
 */
export const getGrammarQuestions = (level: Level, limit: number = 5): GrammarSentence[] => {
  return SENTENCE_DATABASE
    .filter(s => s.level === level)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

/**
 * Génère X exercices de conjugaison basés sur les 30 verbes de référence.
 */
export const getConjugationQuestions = (level: Level, limit: number = 5): ConjugationTask[] => {
  const tenses: Tense[] = ["présent", "futur", "imparfait", "passé composé"];
  const persons = ["Je", "Tu", "Il", "Nous", "Vous", "Ils"];

  const shuffledVerbs = [...VERB_DATABASE].sort(() => 0.5 - Math.random()).slice(0, limit);

  return shuffledVerbs.map((v, idx) => {
    const tense = tenses[Math.floor(Math.random() * tenses.length)];
    const person = persons[Math.floor(Math.random() * persons.length)];
    return {
      id: idx,
      verb: v.verb,
      tense,
      person,
      answer: v.conjugations[tense][person],
      level
    };
  });
};

/**
 * Sélectionne X phrases de dictée statiques par niveau.
 */
export const getDictationQuestions = (level: Level, limit: number = 5): DictationTask[] => {
  return DICTATION_DATABASE
    .filter(d => d.level === level)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

/**
 * Génère X exercices sur l'heure.
 */
export const getTimeQuestions = (level: Level, limit: number = 5): TimeTask[] => {
  const questions: TimeTask[] = [];
  const isAdvanced = level === 'CM1' || level === 'CM2';

  for (let i = 0; i < limit; i++) {
    const type = Math.random() > 0.5 ? 'read_time' : 'set_time';
    let hour = Math.floor(Math.random() * 24);
    let minute = 0;

    if (isAdvanced) {
      minute = Math.floor(Math.random() * 60);
    } else {
      // CE1/CE2: 00, 15, 30, 45
      const quarters = [0, 15, 30, 45];
      minute = quarters[Math.floor(Math.random() * quarters.length)];
    }

    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    questions.push({
      id: i,
      type,
      time: timeStr,
      question: type === 'read_time' ? "Quelle heure est-il ?" : `Règle l'horloge sur ${timeStr.replace(':', 'h')}`,
      level
    });
  }

  return questions;
};

/**
 * Sélectionne X exercices de mathématiques par catégorie.
 */
export const getMathQuestions = (level: Level, type: string, selectedTables?: number[], additionMax?: number, limit: number = 5): MathTask[] => {
  if (type === 'problem') {
    return MATH_DATABASE
      .filter(m => m.type === 'problem' && m.level === level)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
  }

  let filtered = MATH_DATABASE.filter(m => m.type === type);

  if (type === 'multiplication' && selectedTables && selectedTables.length > 0) {
    filtered = filtered.filter(m => {
      const matches = m.question.match(/(\d+) x (\d+)/);
      if (matches) {
        const a = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        return selectedTables.includes(a) || selectedTables.includes(b);
      }
      return false;
    });
  }

  if (type === 'addition' && additionMax) {
    filtered = filtered.filter(m => {
      const matches = m.question.match(/(\d+) \+ (\d+)/);
      if (matches) {
        const a = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        return a <= additionMax && b <= additionMax;
      }
      return false;
    });
  }

  if (type === 'ordering' || type === 'logic' || type === 'decomposition') {
    filtered = filtered.filter(m => m.level === level);
  }

  if (filtered.length === 0) {
    filtered = MATH_DATABASE.filter(m => m.type === type);
  }

  return filtered
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

export const GRAMMAR_BANK = SENTENCE_DATABASE;
export const MATH_BANK = MATH_DATABASE;
