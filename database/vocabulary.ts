import { Level, VocabAlphaTask, VocabSynonymTask, VocabIntrusTask, VocabContraireTask, VocabFamilyTask } from '../types';

// ---- 1. LETTRES (alpha) — 15 entrées ----
export const VOCAB_ALPHA_LETTERS_DATABASE: VocabAlphaTask[] = [
  { id: 1, items: ["f", "a", "d", "b", "e"], sorted: ["a", "b", "d", "e", "f"], level: "CE1" },
  { id: 2, items: ["m", "h", "k", "i", "j"], sorted: ["h", "i", "j", "k", "m"], level: "CE1" },
  { id: 3, items: ["z", "v", "x", "w", "y"], sorted: ["v", "w", "x", "y", "z"], level: "CE1" },
  { id: 4, items: ["c", "a", "f", "b", "e", "d"], sorted: ["a", "b", "c", "d", "e", "f"], level: "CE1" },
  { id: 5, items: ["n", "l", "p", "o", "m"], sorted: ["l", "m", "n", "o", "p"], level: "CE1" },
  { id: 6, items: ["t", "q", "s", "r", "u"], sorted: ["q", "r", "s", "t", "u"], level: "CE1" },
  { id: 7, items: ["g", "e", "h", "f", "i", "j"], sorted: ["e", "f", "g", "h", "i", "j"], level: "CE2" },
  { id: 8, items: ["b", "a", "e", "c", "d"], sorted: ["a", "b", "c", "d", "e"], level: "CE1" },
  { id: 9, items: ["k", "g", "j", "h", "i"], sorted: ["g", "h", "i", "j", "k"], level: "CE2" },
  { id: 10, items: ["p", "l", "o", "m", "n"], sorted: ["l", "m", "n", "o", "p"], level: "CE1" },
  { id: 11, items: ["u", "r", "t", "s", "v"], sorted: ["r", "s", "t", "u", "v"], level: "CE2" },
  { id: 12, items: ["z", "w", "x", "v", "y"], sorted: ["v", "w", "x", "y", "z"], level: "CE2" },
  { id: 13, items: ["d", "a", "c", "b"], sorted: ["a", "b", "c", "d"], level: "CE1" },
  { id: 14, items: ["i", "f", "h", "g"], sorted: ["f", "g", "h", "i"], level: "CE1" },
  { id: 15, items: ["n", "k", "m", "l"], sorted: ["k", "l", "m", "n"], level: "CE2" },
];

// ---- 2. MOTS (alpha) — 15 entrées ----
export const VOCAB_ALPHA_WORDS_DATABASE: VocabAlphaTask[] = [
  { id: 1, items: ["chat", "arbre", "bus", "dent"], sorted: ["arbre", "bus", "chat", "dent"], level: "CE1" },
  { id: 2, items: ["soleil", "pomme", "route", "table"], sorted: ["pomme", "route", "soleil", "table"], level: "CE1" },
  { id: 3, items: ["vélo", "maison", "nuit", "ours"], sorted: ["maison", "nuit", "ours", "vélo"], level: "CE1" },
  { id: 4, items: ["forêt", "eau", "glace", "hibou"], sorted: ["eau", "forêt", "glace", "hibou"], level: "CE1" },
  { id: 5, items: ["lavande", "jardin", "kiwi", "monde"], sorted: ["jardin", "kiwi", "lavande", "monde"], level: "CE2" },
  { id: 6, items: ["pluie", "nuage", "orage", "vent"], sorted: ["nuage", "orage", "pluie", "vent"], level: "CE1" },
  { id: 7, items: ["zèbre", "yeux", "xylophone", "wagon"], sorted: ["wagon", "xylophone", "yeux", "zèbre"], level: "CE2" },
  { id: 8, items: ["balle", "cerf", "agneau", "drapeau"], sorted: ["agneau", "balle", "cerf", "drapeau"], level: "CE1" },
  { id: 9, items: ["sapin", "rose", "tulipe", "primevère"], sorted: ["primevère", "rose", "sapin", "tulipe"], level: "CE2" },
  { id: 10, items: ["tigre", "serpent", "renard", "oiseau"], sorted: ["oiseau", "renard", "serpent", "tigre"], level: "CE1" },
  { id: 11, items: ["carotte", "brocoli", "aubergine", "courgette"], sorted: ["aubergine", "brocoli", "carotte", "courgette"], level: "CE2" },
  { id: 12, items: ["lundi", "jeudi", "mardi", "mercredi"], sorted: ["jeudi", "lundi", "mardi", "mercredi"], level: "CE1" },
  { id: 13, items: ["printemps", "automne", "été", "hiver"], sorted: ["automne", "été", "hiver", "printemps"], level: "CE2" },
  { id: 14, items: ["chapeau", "bonnet", "casquette", "écharpe"], sorted: ["bonnet", "casquette", "chapeau", "écharpe"], level: "CE2" },
  { id: 15, items: ["avion", "bateau", "camion", "train"], sorted: ["avion", "bateau", "camion", "train"], level: "CE1" },
];

// ---- 3. SYNONYMES — 15 entrées ----
export const VOCAB_SYNONYM_DATABASE: VocabSynonymTask[] = [
  { id: 1, word: "content", options: ["joyeux", "triste", "heureux", "ravi", "malheureux", "enchanté"], synonyms: ["joyeux", "heureux", "ravi", "enchanté"], level: "CE1" },
  { id: 2, word: "rapide", options: ["vite", "lent", "prompt", "véloce", "agile", "pesant"], synonyms: ["vite", "prompt", "véloce", "agile"], level: "CE1" },
  { id: 3, word: "maison", options: ["demeure", "route", "logis", "habitation", "forêt", "foyer"], synonyms: ["demeure", "logis", "habitation", "foyer"], level: "CE2" },
  { id: 4, word: "manger", options: ["dévorer", "courir", "avaler", "grignoter", "voler", "sauter"], synonyms: ["dévorer", "avaler", "grignoter"], level: "CE1" },
  { id: 5, word: "beau", options: ["joli", "laid", "magnifique", "superbe", "horrible", "splendide"], synonyms: ["joli", "magnifique", "superbe", "splendide"], level: "CE1" },
  { id: 6, word: "peur", options: ["crainte", "joie", "frayeur", "terreur", "courage", "effroi"], synonyms: ["crainte", "frayeur", "terreur", "effroi"], level: "CE2" },
  { id: 7, word: "commencer", options: ["finir", "débuter", "entamer", "terminer", "amorcer", "cesser"], synonyms: ["débuter", "entamer", "amorcer"], level: "CE2" },
  { id: 8, word: "difficile", options: ["ardu", "facile", "compliqué", "simple", "pénible", "aisé"], synonyms: ["ardu", "compliqué", "pénible"], level: "CE2" },
  { id: 9, word: "ami", options: ["camarade", "ennemi", "copain", "rival", "compagnon", "adversaire"], synonyms: ["camarade", "copain", "compagnon"], level: "CE1" },
  { id: 10, word: "parler", options: ["discuter", "écouter", "bavarder", "rire", "causer", "crier"], synonyms: ["discuter", "bavarder", "causer"], level: "CE1" },
  { id: 11, word: "vieux", options: ["ancien", "neuf", "âgé", "jeune", "suranné", "moderne"], synonyms: ["ancien", "âgé", "suranné"], level: "CE2" },
  { id: 12, word: "courageux", options: ["brave", "lâche", "vaillant", "timide", "hardi", "peureux"], synonyms: ["brave", "vaillant", "hardi"], level: "CE2" },
  { id: 13, word: "triste", options: ["mélancolique", "joyeux", "chagrin", "gai", "morne", "content"], synonyms: ["mélancolique", "chagrin", "morne"], level: "CE2" },
  { id: 14, word: "grande", options: ["haute", "petite", "immense", "basse", "vaste", "minuscule"], synonyms: ["haute", "immense", "vaste"], level: "CE1" },
  { id: 15, word: "petit", options: ["minuscule", "grand", "menu", "gros", "lilliputien", "énorme"], synonyms: ["minuscule", "menu", "lilliputien"], level: "CE2" },
];

// ---- 4. INTRUS — 15 entrées ----
export const VOCAB_INTRUS_DATABASE: VocabIntrusTask[] = [
  { id: 1, word: "rapide", options: ["vite", "lent", "prompt", "véloce"], intrus: "lent", level: "CE1" },
  { id: 2, word: "content", options: ["heureux", "triste", "joyeux", "ravi"], intrus: "triste", level: "CE1" },
  { id: 3, word: "grand", options: ["immense", "vaste", "haut", "petit"], intrus: "petit", level: "CE1" },
  { id: 4, word: "beau", options: ["joli", "laid", "superbe", "magnifique"], intrus: "laid", level: "CE1" },
  { id: 5, word: "manger", options: ["avaler", "grignoter", "courir", "dévorer"], intrus: "courir", level: "CE1" },
  { id: 6, word: "peur", options: ["crainte", "frayeur", "joie", "effroi"], intrus: "joie", level: "CE2" },
  { id: 7, word: "vieux", options: ["ancien", "âgé", "neuf", "suranné"], intrus: "neuf", level: "CE2" },
  { id: 8, word: "ami", options: ["camarade", "copain", "ennemi", "compagnon"], intrus: "ennemi", level: "CE1" },
  { id: 9, word: "courageux", options: ["brave", "lâche", "vaillant", "hardi"], intrus: "lâche", level: "CE2" },
  { id: 10, word: "triste", options: ["mélancolique", "chagrin", "gai", "morne"], intrus: "gai", level: "CE2" },
  { id: 11, word: "commencer", options: ["débuter", "entamer", "finir", "amorcer"], intrus: "finir", level: "CE2" },
  { id: 12, word: "parler", options: ["bavarder", "écouter", "discuter", "causer"], intrus: "écouter", level: "CE1" },
  { id: 13, word: "difficile", options: ["ardu", "facile", "compliqué", "pénible"], intrus: "facile", level: "CE2" },
  { id: 14, word: "maison", options: ["demeure", "route", "logis", "foyer"], intrus: "route", level: "CE2" },
  { id: 15, word: "petit", options: ["minuscule", "énorme", "menu", "lilliputien"], intrus: "énorme", level: "CE2" },
];

// ---- 5. CONTRAIRES — 15 entrées ----
export const VOCAB_CONTRAIRE_DATABASE: VocabContraireTask[] = [
  { id: 1, word: "grand", options: ["petit", "haut", "gros", "court"], answer: "petit", level: "CE1" },
  { id: 2, word: "chaud", options: ["tiède", "froid", "doux", "frais"], answer: "froid", level: "CE1" },
  { id: 3, word: "beau", options: ["joli", "moche", "laid", "bizarre"], answer: "laid", level: "CE1" },
  { id: 4, word: "rapide", options: ["agile", "lent", "prompt", "fort"], answer: "lent", level: "CE1" },
  { id: 5, word: "content", options: ["triste", "calme", "sage", "gai"], answer: "triste", level: "CE1" },
  { id: 6, word: "allumer", options: ["briller", "éclairer", "éteindre", "chauffer"], answer: "éteindre", level: "CE1" },
  { id: 7, word: "commencer", options: ["continuer", "finir", "reprendre", "repartir"], answer: "finir", level: "CE1" },
  { id: 8, word: "monter", options: ["grimper", "sauter", "descendre", "marcher"], answer: "descendre", level: "CE1" },
  { id: 9, word: "propre", options: ["net", "sale", "frais", "lisse"], answer: "sale", level: "CE1" },
  { id: 10, word: "fort", options: ["brave", "solide", "faible", "dur"], answer: "faible", level: "CE2" },
  { id: 11, word: "courageux", options: ["brave", "lâche", "vaillant", "hardi"], answer: "lâche", level: "CE2" },
  { id: 12, word: "vrai", options: ["réel", "faux", "exact", "juste"], answer: "faux", level: "CE2" },
  { id: 13, word: "ouvrir", options: ["entrer", "fermer", "passer", "bloquer"], answer: "fermer", level: "CE1" },
  { id: 14, word: "ancien", options: ["vieux", "âgé", "moderne", "suranné"], answer: "moderne", level: "CE2" },
  { id: 15, word: "jour", options: ["soir", "nuit", "matin", "midi"], answer: "nuit", level: "CE1" },
];

// ---- 6. FAMILLE DE MOTS — 15 entrées ----
export const VOCAB_FAMILY_DATABASE: VocabFamilyTask[] = [
  { id: 1, baseWord: "jardin", words: [
    { text: "jardiner", isSameFamily: true }, { text: "jardinier", isSameFamily: true },
    { text: "jardinage", isSameFamily: true }, { text: "fleur", isSameFamily: false },
    { text: "plante", isSameFamily: false }, { text: "jardinière", isSameFamily: true },
    { text: "arbre", isSameFamily: false }, { text: "désherber", isSameFamily: false }
  ], level: "CE1" },
  { id: 2, baseWord: "soleil", words: [
    { text: "ensoleillé", isSameFamily: true }, { text: "solaire", isSameFamily: true },
    { text: "lune", isSameFamily: false }, { text: "ensoleillement", isSameFamily: true },
    { text: "étoile", isSameFamily: false }, { text: "lumineux", isSameFamily: false },
    { text: "parasoleil", isSameFamily: true }, { text: "chaleur", isSameFamily: false }
  ], level: "CE1" },
  { id: 3, baseWord: "neige", words: [
    { text: "neiger", isSameFamily: true }, { text: "enneigé", isSameFamily: true },
    { text: "glace", isSameFamily: false }, { text: "neigeux", isSameFamily: true },
    { text: "froid", isSameFamily: false }, { text: "bonhomme de neige", isSameFamily: true },
    { text: "hiver", isSameFamily: false }, { text: "flocon", isSameFamily: false }
  ], level: "CE1" },
  { id: 4, baseWord: "mer", words: [
    { text: "marin", isSameFamily: true }, { text: "rivière", isSameFamily: false },
    { text: "maritime", isSameFamily: true }, { text: "marée", isSameFamily: true },
    { text: "lac", isSameFamily: false }, { text: "sous-marin", isSameFamily: true },
    { text: "eau", isSameFamily: false }, { text: "plage", isSameFamily: false }
  ], level: "CE1" },
  { id: 5, baseWord: "livre", words: [
    { text: "librairie", isSameFamily: true }, { text: "libraire", isSameFamily: true },
    { text: "lecture", isSameFamily: false }, { text: "livret", isSameFamily: true },
    { text: "page", isSameFamily: false }, { text: "livraison", isSameFamily: false },
    { text: "livrable", isSameFamily: false }, { text: "livreuse", isSameFamily: true }
  ], level: "CE2" },
  { id: 6, baseWord: "pain", words: [
    { text: "boulanger", isSameFamily: false }, { text: "painier", isSameFamily: false },
    { text: "pain au chocolat", isSameFamily: true }, { text: "panier", isSameFamily: false },
    { text: "biscuit", isSameFamily: false }, { text: "painière", isSameFamily: true },
    { text: "empan", isSameFamily: false }, { text: "panade", isSameFamily: true }
  ], level: "CE2" },
  { id: 7, baseWord: "eau", words: [
    { text: "aquatique", isSameFamily: false }, { text: "arrosoir", isSameFamily: false },
    { text: "eaux", isSameFamily: true }, { text: "eau-de-vie", isSameFamily: true },
    { text: "mouiller", isSameFamily: false }, { text: "riverain", isSameFamily: false },
    { text: "eau-forte", isSameFamily: true }, { text: "robinet", isSameFamily: false }
  ], level: "CE1" },
  { id: 8, baseWord: "chant", words: [
    { text: "chanter", isSameFamily: true }, { text: "chanteur", isSameFamily: true },
    { text: "chantonner", isSameFamily: true }, { text: "musique", isSameFamily: false },
    { text: "mélodie", isSameFamily: false }, { text: "chanson", isSameFamily: true },
    { text: "concert", isSameFamily: false }, { text: "chantant", isSameFamily: true }
  ], level: "CE1" },
  { id: 9, baseWord: "maison", words: [
    { text: "maisonnette", isSameFamily: true }, { text: "maisonnée", isSameFamily: true },
    { text: "appartement", isSameFamily: false }, { text: "immeuble", isSameFamily: false },
    { text: "maisonnier", isSameFamily: false }, { text: "logis", isSameFamily: false },
    { text: "maisonnage", isSameFamily: true }, { text: "villa", isSameFamily: false }
  ], level: "CE2" },
  { id: 10, baseWord: "port", words: [
    { text: "porter", isSameFamily: true }, { text: "porteur", isSameFamily: true },
    { text: "bateau", isSameFamily: false }, { text: "portail", isSameFamily: true },
    { text: "transport", isSameFamily: true }, { text: "ancre", isSameFamily: false },
    { text: "portable", isSameFamily: true }, { text: "navire", isSameFamily: false }
  ], level: "CE2" },
  { id: 11, baseWord: "fleur", words: [
    { text: "fleurir", isSameFamily: true }, { text: "fleuri", isSameFamily: true },
    { text: "fleuriste", isSameFamily: true }, { text: "pétale", isSameFamily: false },
    { text: "jardiner", isSameFamily: false }, { text: "effleurer", isSameFamily: true },
    { text: "bouquet", isSameFamily: false }, { text: "fleuron", isSameFamily: true }
  ], level: "CE2" },
  { id: 12, baseWord: "feu", words: [
    { text: "feuille", isSameFamily: false }, { text: "enflammer", isSameFamily: false },
    { text: "feux", isSameFamily: true }, { text: "feu d'artifice", isSameFamily: true },
    { text: "fumée", isSameFamily: false }, { text: "feutrer", isSameFamily: false },
    { text: "feue", isSameFamily: true }, { text: "chaleur", isSameFamily: false }
  ], level: "CE1" },
  { id: 13, baseWord: "terre", words: [
    { text: "terrestre", isSameFamily: true }, { text: "terrain", isSameFamily: true },
    { text: "ciel", isSameFamily: false }, { text: "territoire", isSameFamily: true },
    { text: "sol", isSameFamily: false }, { text: "terreau", isSameFamily: true },
    { text: "rocher", isSameFamily: false }, { text: "enterrer", isSameFamily: true }
  ], level: "CE2" },
  { id: 14, baseWord: "bois", words: [
    { text: "boisé", isSameFamily: true }, { text: "boiserie", isSameFamily: true },
    { text: "forêt", isSameFamily: false }, { text: "reboiser", isSameFamily: true },
    { text: "arbre", isSameFamily: false }, { text: "déboisement", isSameFamily: true },
    { text: "planche", isSameFamily: false }, { text: "boisillon", isSameFamily: false }
  ], level: "CE2" },
  { id: 15, baseWord: "pied", words: [
    { text: "piéton", isSameFamily: true }, { text: "piedestal", isSameFamily: true },
    { text: "main", isSameFamily: false }, { text: "pied-de-biche", isSameFamily: true },
    { text: "jambe", isSameFamily: false }, { text: "bipède", isSameFamily: true },
    { text: "chaussure", isSameFamily: false }, { text: "piédestal", isSameFamily: true }
  ], level: "CE2" },
];
