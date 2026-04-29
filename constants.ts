
import { Category } from './types';

export const CATEGORY_COLORS: Record<Category, string> = {
  verbe: 'bg-red-400 text-white border-red-600',
  nom: 'bg-green-400 text-white border-green-600',
  determinant: 'bg-blue-400 text-white border-blue-600',
  adjectif: 'bg-yellow-400 text-black border-yellow-600',
  pronom: 'bg-purple-400 text-white border-purple-600',
  adverbe: 'bg-orange-400 text-white border-orange-600',
  none: 'bg-gray-100 text-gray-700 border-gray-300'
};

export const CATEGORY_LABELS: Record<Category, string> = {
  verbe: 'Verbe',
  nom: 'Nom',
  determinant: 'Dét.',
  adjectif: 'Adj.',
  pronom: 'Pronom',
  adverbe: 'Adverbe',
  none: 'Autre'
};

export const TIMINGS = {
  FEEDBACK_CORRECT: 1800,
  FEEDBACK_RETRY: 1500,
  FEEDBACK_WRONG_MATH: 3000,
  FEEDBACK_WRONG_FRENCH: 6000,
};
