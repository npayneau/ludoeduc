import { GrammarSentence, ConjugationTask, MathTask, Level, Tense, DictationTask, HoleyDictationTask, TimeTask, NounSortTask, NounIdentifyTask, NounPluralTask, NounGenderTask, VerbIdentifyTask, VerbConjugatedTask, VerbInfinitiveTask, VerbTenseTask, VerbConjugateExTask, DetIdentifyTask, DetGenderTask, DetNumberTask, DetWriteTask, DetChooseTask, DetArticleSortTask, SilentLetterTask, SpellingChoiceTask, VocabAlphaTask, VocabSynonymTask, VocabIntrusTask, VocabContraireTask, VocabFamilyTask, AdverbIdentifyTask, AdjAdvTransformTask } from './types';
import { SENTENCE_DATABASE } from './database/sentences';
import { VERB_DATABASE } from './database/verbs';
import { MATH_DATABASE } from './database/math';
import { DICTATION_DATABASE, HOLEY_DICTATION_DATABASE } from './database/dictations';
import { NOUN_SORT_DATABASE, NOUN_IDENTIFY_DATABASE, NOUN_PLURAL_DATABASE, NOUN_GENDER_DATABASE } from './database/nouns';
import { VERB_IDENTIFY_DATABASE, VERB_CONJUGATED_DATABASE, VERB_INFINITIVE_DATABASE, VERB_TENSE_DATABASE } from './database/verb-exercises';
import { DET_IDENTIFY_DATABASE, DET_GENDER_DATABASE, DET_NUMBER_DATABASE, DET_WRITE_DATABASE, DET_CHOOSE_DATABASE, DET_ARTICLE_DATABASE } from './database/determiners';
import { SILENT_LETTER_DATABASE, SPELLING_CHOICE_DATABASE } from './database/spelling';
import { VOCAB_ALPHA_LETTERS_DATABASE, VOCAB_ALPHA_WORDS_DATABASE, VOCAB_SYNONYM_DATABASE, VOCAB_INTRUS_DATABASE, VOCAB_CONTRAIRE_DATABASE, VOCAB_FAMILY_DATABASE } from './database/vocabulary';
import { PhraseTypeTask, PhrasePunctuationTask, PhraseOrderTask, PhraseValidTask } from './types';
import { PHRASE_TYPE_DATABASE, PHRASE_PUNCTUATION_DATABASE, PHRASE_ORDER_DATABASE, PHRASE_VALID_DATABASE } from './database/phrases';

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

export const getHoleyDictationQuestions = (level: Level, limit: number = 5): HoleyDictationTask[] => {
  return HOLEY_DICTATION_DATABASE
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

export const getNounSortQuestions = (level: Level, limit: number = 5): NounSortTask[] =>
  NOUN_SORT_DATABASE.filter(n => n.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getNounIdentifyQuestions = (level: Level, limit: number = 5): NounIdentifyTask[] =>
  NOUN_IDENTIFY_DATABASE.filter(n => n.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getNounPluralQuestions = (level: Level, rule: string, limit: number = 5): NounPluralTask[] => {
  let filtered = NOUN_PLURAL_DATABASE.filter(n => n.rule === rule && n.level === level);
  if (filtered.length < limit) filtered = NOUN_PLURAL_DATABASE.filter(n => n.rule === rule);
  return filtered.sort(() => 0.5 - Math.random()).slice(0, limit);
};

export const getNounGenderQuestions = (level: Level, rule: string, limit: number = 5): NounGenderTask[] => {
  let filtered = NOUN_GENDER_DATABASE.filter(n => n.rule === rule && n.level === level);
  if (filtered.length < limit) filtered = NOUN_GENDER_DATABASE.filter(n => n.rule === rule);
  return filtered.sort(() => 0.5 - Math.random()).slice(0, limit);
};

export const getVerbIdentifyQuestions = (level: Level, limit: number = 5): VerbIdentifyTask[] =>
  VERB_IDENTIFY_DATABASE.filter(v => v.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getVerbConjugatedQuestions = (level: Level, limit: number = 5): VerbConjugatedTask[] =>
  VERB_CONJUGATED_DATABASE.filter(v => v.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getVerbInfinitiveQuestions = (level: Level, limit: number = 5): VerbInfinitiveTask[] =>
  VERB_INFINITIVE_DATABASE.filter(v => v.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getVerbTenseQuestions = (level: Level, limit: number = 5): VerbTenseTask[] =>
  VERB_TENSE_DATABASE.filter(v => v.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getVerbConjugateExQuestions = (level: Level, limit: number = 5): VerbConjugateExTask[] => {
  const ER_VERBS = ['chanter', 'jouer', 'manger', 'sauter', 'marcher', 'danser', 'dessiner', 'écouter', 'aimer', 'parler', 'travailler', 'donner'];
  const IRREGULAR_CE2 = ['faire', 'aller', 'dire', 'venir', 'pouvoir', 'voir', 'vouloir', 'prendre'];

  const SUBJECTS = [
    { display: 'Je', person: 'Je' },
    { display: 'Tu', person: 'Tu' },
    { display: 'Il', person: 'Il' },
    { display: 'Nous', person: 'Nous' },
    { display: 'Vous', person: 'Vous' },
    { display: 'Ils', person: 'Ils' },
    { display: 'Le chat', person: 'Il' },
    { display: 'La petite fille', person: 'Il' },
    { display: 'Mon frère', person: 'Il' },
    { display: 'Les enfants', person: 'Ils' },
    { display: 'Les oiseaux', person: 'Ils' },
    { display: 'Maman', person: 'Il' },
  ];

  const generateErConjugations = (verb: string): Record<string, Record<string, string>> => {
    const stem = verb.slice(0, -2);
    const stemPres = verb.endsWith('ger') ? stem.slice(0, -1) : stem;
    return {
      'présent': {
        'Je': `${stem}e`, 'Tu': `${stem}es`, 'Il': `${stem}e`,
        'Nous': `${stemPres}ons`, 'Vous': `${stem}ez`, 'Ils': `${stem}ent`
      },
      'imparfait': {
        'Je': `${stem}ais`, 'Tu': `${stem}ais`, 'Il': `${stem}ait`,
        'Nous': `${stem}ions`, 'Vous': `${stem}iez`, 'Ils': `${stem}aient`
      },
      'futur': {
        'Je': `${verb}ai`, 'Tu': `${verb}as`, 'Il': `${verb}a`,
        'Nous': `${verb}ons`, 'Vous': `${verb}ez`, 'Ils': `${verb}ont`
      },
      'passé composé': {
        'Je': `ai ${stem}é`, 'Tu': `as ${stem}é`, 'Il': `a ${stem}é`,
        'Nous': `avons ${stem}é`, 'Vous': `avez ${stem}é`, 'Ils': `ont ${stem}é`
      }
    };
  };

  const availableVerbNames = level === 'CE1'
    ? [...ER_VERBS, 'être', 'avoir']
    : [...ER_VERBS, 'être', 'avoir', ...IRREGULAR_CE2];

  const tenses: Tense[] = ['présent', 'futur', 'imparfait', 'passé composé'];
  const questions: VerbConjugateExTask[] = [];
  const used = new Set<string>();

  for (let attempts = 0; questions.length < limit && attempts < 100; attempts++) {
    const verbName = availableVerbNames[Math.floor(Math.random() * availableVerbNames.length)];
    const tense = tenses[Math.floor(Math.random() * tenses.length)];
    const subjectInfo = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const key = `${verbName}-${tense}-${subjectInfo.person}`;
    if (used.has(key)) continue;
    used.add(key);

    const verbData = VERB_DATABASE.find(v => v.verb === verbName);
    const conjugations = verbData ? verbData.conjugations : generateErConjugations(verbName);
    const answer = conjugations[tense]?.[subjectInfo.person];
    if (!answer) continue;

    questions.push({
      id: questions.length,
      infinitive: verbName,
      subject: subjectInfo.display,
      grammaticalPerson: subjectInfo.person,
      tense,
      answer,
      level
    });
  }

  return questions;
};

export const getDetIdentifyQuestions = (level: Level, limit: number = 5): DetIdentifyTask[] =>
  DET_IDENTIFY_DATABASE.filter(n => n.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getDetGenderQuestions = (level: Level, limit: number = 5): DetGenderTask[] =>
  DET_GENDER_DATABASE.filter(n => n.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getDetNumberQuestions = (level: Level, limit: number = 5): DetNumberTask[] =>
  DET_NUMBER_DATABASE.filter(n => n.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getDetWriteQuestions = (level: Level, limit: number = 5): DetWriteTask[] =>
  DET_WRITE_DATABASE.filter(n => n.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getDetChooseQuestions = (level: Level, limit: number = 5): DetChooseTask[] =>
  DET_CHOOSE_DATABASE.filter(n => n.level === level).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getDetArticleQuestions = (level: Level, limit: number = 5): DetArticleSortTask[] => {
  const filtered = DET_ARTICLE_DATABASE.filter(n => ['CE2', 'CM1', 'CM2'].includes(n.level));
  return filtered.sort(() => 0.5 - Math.random()).slice(0, limit);
};

export const getSilentLetterQuestions = (level: Level, limit: number): SilentLetterTask[] => {
  const levels = level === 'CE1' ? ['CE1'] : ['CE1', 'CE2'];
  return SILENT_LETTER_DATABASE
    .filter(t => levels.includes(t.level))
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

export const getSpellingChoiceQuestions = (rule: string, level: Level, limit: number): SpellingChoiceTask[] => {
  const levels = level === 'CE1' ? ['CE1'] : ['CE1', 'CE2'];
  return SPELLING_CHOICE_DATABASE
    .filter(t => t.rule === rule && levels.includes(t.level))
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

const vocabLevels = (level: Level) => level === 'CE1' ? ['CE1'] : ['CE1', 'CE2'];

export const getVocabAlphaLettersQuestions = (level: Level, limit: number): VocabAlphaTask[] =>
  VOCAB_ALPHA_LETTERS_DATABASE.filter(t => vocabLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getVocabAlphaWordsQuestions = (level: Level, limit: number): VocabAlphaTask[] =>
  VOCAB_ALPHA_WORDS_DATABASE.filter(t => vocabLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getVocabSynonymQuestions = (level: Level, limit: number): VocabSynonymTask[] =>
  VOCAB_SYNONYM_DATABASE.filter(t => vocabLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getVocabIntrusQuestions = (level: Level, limit: number): VocabIntrusTask[] =>
  VOCAB_INTRUS_DATABASE.filter(t => vocabLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getVocabContraireQuestions = (level: Level, limit: number): VocabContraireTask[] =>
  VOCAB_CONTRAIRE_DATABASE.filter(t => vocabLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getVocabFamilyQuestions = (level: Level, limit: number): VocabFamilyTask[] =>
  VOCAB_FAMILY_DATABASE.filter(t => vocabLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);

const phraseLevels = (level: Level): string[] => level === 'CE1' ? ['CE1'] : ['CE1', 'CE2'];

export const getPhraseTypeQuestions = (level: Level, limit: number): PhraseTypeTask[] =>
  PHRASE_TYPE_DATABASE.filter(t => phraseLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getPhrasePunctuationQuestions = (level: Level, limit: number): PhrasePunctuationTask[] =>
  PHRASE_PUNCTUATION_DATABASE.filter(t => phraseLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getPhraseOrderQuestions = (level: Level, limit: number): PhraseOrderTask[] =>
  PHRASE_ORDER_DATABASE.filter(t => phraseLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);

export const getPhraseValidQuestions = (level: Level, limit: number): PhraseValidTask[] =>
  PHRASE_VALID_DATABASE.filter(t => phraseLevels(level).includes(t.level)).sort(() => 0.5 - Math.random()).slice(0, limit);
import { adverbIdentifyDB, adjToAdvDB, advToAdjDB } from './database/adverbs';

const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());

export const getAdverbIdentifyQuestions = (level: Level, limit: number): AdverbIdentifyTask[] => {
  const levels: Level[] = level === 'CM2' ? ['CE2', 'CM1', 'CM2'] : level === 'CM1' ? ['CE2', 'CM1'] : ['CE2'];
  return shuffle(adverbIdentifyDB.filter(q => levels.includes(q.level))).slice(0, limit);
};

export const getAdjToAdvQuestions = (level: Level, limit: number): AdjAdvTransformTask[] => {
  const levels: Level[] = level === 'CM2' ? ['CE2', 'CM1', 'CM2'] : level === 'CM1' ? ['CE2', 'CM1'] : ['CE2'];
  return shuffle(adjToAdvDB.filter(q => levels.includes(q.level))).slice(0, limit);
};

export const getAdvToAdjQuestions = (level: Level, limit: number): AdjAdvTransformTask[] => {
  const levels: Level[] = level === 'CM2' ? ['CE2', 'CM1', 'CM2'] : level === 'CM1' ? ['CE2', 'CM1'] : ['CE2'];
  return shuffle(advToAdjDB.filter(q => levels.includes(q.level))).slice(0, limit);
};
