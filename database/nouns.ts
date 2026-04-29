import { NounSortTask, NounIdentifyTask, NounPluralTask, NounGenderTask } from '../types';

export const NOUN_SORT_DATABASE: NounSortTask[] = [
  // CE1
  { id: 1, word: 'chat', isProper: false, level: 'CE1' },
  { id: 2, word: 'Paris', isProper: true, level: 'CE1' },
  { id: 3, word: 'maison', isProper: false, level: 'CE1' },
  { id: 4, word: 'Marie', isProper: true, level: 'CE1' },
  { id: 5, word: 'soleil', isProper: false, level: 'CE1' },
  { id: 6, word: 'France', isProper: true, level: 'CE1' },
  { id: 7, word: 'fleur', isProper: false, level: 'CE1' },
  { id: 8, word: 'Tom', isProper: true, level: 'CE1' },
  { id: 9, word: 'école', isProper: false, level: 'CE1' },
  { id: 10, word: 'Lyon', isProper: true, level: 'CE1' },
  // CE2
  { id: 11, word: 'forêt', isProper: false, level: 'CE2' },
  { id: 12, word: 'Bretagne', isProper: true, level: 'CE2' },
  { id: 13, word: 'rivière', isProper: false, level: 'CE2' },
  { id: 14, word: 'Pierre', isProper: true, level: 'CE2' },
  { id: 15, word: 'médecin', isProper: false, level: 'CE2' },
  { id: 16, word: 'Loire', isProper: true, level: 'CE2' },
  { id: 17, word: 'château', isProper: false, level: 'CE2' },
  { id: 18, word: 'Alice', isProper: true, level: 'CE2' },
  { id: 19, word: 'saison', isProper: false, level: 'CE2' },
  { id: 20, word: 'Espagne', isProper: true, level: 'CE2' },
  // CM1
  { id: 21, word: 'courage', isProper: false, level: 'CM1' },
  { id: 22, word: 'Napoléon', isProper: true, level: 'CM1' },
  { id: 23, word: 'liberté', isProper: false, level: 'CM1' },
  { id: 24, word: 'Méditerranée', isProper: true, level: 'CM1' },
  { id: 25, word: 'explorateur', isProper: false, level: 'CM1' },
  { id: 26, word: 'Victor Hugo', isProper: true, level: 'CM1' },
  { id: 27, word: 'harmonie', isProper: false, level: 'CM1' },
  { id: 28, word: 'Alpes', isProper: true, level: 'CM1' },
  { id: 29, word: 'académie', isProper: false, level: 'CM1' },
  { id: 30, word: 'Charlemagne', isProper: true, level: 'CM1' },
  // CM2
  { id: 31, word: 'révolution', isProper: false, level: 'CM2' },
  { id: 32, word: 'Voltaire', isProper: true, level: 'CM2' },
  { id: 33, word: 'philosophie', isProper: false, level: 'CM2' },
  { id: 34, word: 'Seine', isProper: true, level: 'CM2' },
  { id: 35, word: 'géographie', isProper: false, level: 'CM2' },
  { id: 36, word: 'Renaissance', isProper: true, level: 'CM2' },
  { id: 37, word: 'équilibre', isProper: false, level: 'CM2' },
  { id: 38, word: 'Molière', isProper: true, level: 'CM2' },
  { id: 39, word: 'gouvernement', isProper: false, level: 'CM2' },
  { id: 40, word: 'Afrique', isProper: true, level: 'CM2' },
];

export const NOUN_IDENTIFY_DATABASE: NounIdentifyTask[] = [
  // CE1
  {
    id: 1, level: 'CE1',
    words: [
      { text: 'le', isNoun: false }, { text: 'chat', isNoun: true }, { text: 'dort', isNoun: false },
      { text: 'gros', isNoun: false }, { text: 'livre', isNoun: true }, { text: 'mange', isNoun: false }, { text: 'belle', isNoun: false },
    ],
  },
  {
    id: 2, level: 'CE1',
    words: [
      { text: 'maison', isNoun: true }, { text: 'courir', isNoun: false }, { text: 'la', isNoun: false },
      { text: 'rouge', isNoun: false }, { text: 'fleur', isNoun: true }, { text: 'petit', isNoun: false }, { text: 'chanter', isNoun: false },
    ],
  },
  {
    id: 3, level: 'CE1',
    words: [
      { text: 'un', isNoun: false }, { text: 'sauter', isNoun: false }, { text: 'chien', isNoun: true },
      { text: 'bleu', isNoun: false }, { text: 'table', isNoun: true }, { text: 'très', isNoun: false },
    ],
  },
  {
    id: 4, level: 'CE1',
    words: [
      { text: 'soleil', isNoun: true }, { text: 'briller', isNoun: false }, { text: 'les', isNoun: false },
      { text: 'oiseau', isNoun: true }, { text: 'chaud', isNoun: false }, { text: 'voler', isNoun: false }, { text: 'grand', isNoun: false },
    ],
  },
  {
    id: 5, level: 'CE1',
    words: [
      { text: 'une', isNoun: false }, { text: 'pomme', isNoun: true }, { text: 'manger', isNoun: false },
      { text: 'verte', isNoun: false }, { text: 'école', isNoun: true }, { text: 'aller', isNoun: false },
    ],
  },
  // CE2
  {
    id: 6, level: 'CE2',
    words: [
      { text: 'forêt', isNoun: true }, { text: 'sombre', isNoun: false }, { text: 'traverser', isNoun: false },
      { text: 'médecin', isNoun: true }, { text: 'les', isNoun: false }, { text: 'rapide', isNoun: false }, { text: 'château', isNoun: true },
    ],
  },
  {
    id: 7, level: 'CE2',
    words: [
      { text: 'rivière', isNoun: true }, { text: 'couler', isNoun: false }, { text: 'douce', isNoun: false },
      { text: 'un', isNoun: false }, { text: 'bateau', isNoun: true }, { text: 'naviguer', isNoun: false }, { text: 'large', isNoun: false },
    ],
  },
  {
    id: 8, level: 'CE2',
    words: [
      { text: 'jardinier', isNoun: true }, { text: 'planter', isNoun: false }, { text: 'une', isNoun: false },
      { text: 'tomate', isNoun: true }, { text: 'rouge', isNoun: false }, { text: 'cueillir', isNoun: false }, { text: 'feuille', isNoun: true },
    ],
  },
  {
    id: 9, level: 'CE2',
    words: [
      { text: 'musicien', isNoun: true }, { text: 'jouer', isNoun: false }, { text: 'belle', isNoun: false },
      { text: 'mélodie', isNoun: true }, { text: 'des', isNoun: false }, { text: 'entendre', isNoun: false }, { text: 'guitare', isNoun: true },
    ],
  },
  {
    id: 10, level: 'CE2',
    words: [
      { text: 'montagne', isNoun: true }, { text: 'escalader', isNoun: false }, { text: 'enneigée', isNoun: false },
      { text: 'la', isNoun: false }, { text: 'glacier', isNoun: true }, { text: 'froid', isNoun: false }, { text: 'marcher', isNoun: false },
    ],
  },
  // CM1
  {
    id: 11, level: 'CM1',
    words: [
      { text: 'astronome', isNoun: true }, { text: 'observer', isNoun: false }, { text: 'attentivement', isNoun: false },
      { text: 'planète', isNoun: true }, { text: 'lointaine', isNoun: false }, { text: 'des', isNoun: false }, { text: 'télescope', isNoun: true },
    ],
  },
  {
    id: 12, level: 'CM1',
    words: [
      { text: 'archéologue', isNoun: true }, { text: 'découvrir', isNoun: false }, { text: 'précieux', isNoun: false },
      { text: 'les', isNoun: false }, { text: 'fouille', isNoun: true }, { text: 'patiemment', isNoun: false }, { text: 'artefact', isNoun: true },
    ],
  },
  {
    id: 13, level: 'CM1',
    words: [
      { text: 'expérience', isNoun: true }, { text: 'réaliser', isNoun: false }, { text: 'complexe', isNoun: false },
      { text: 'un', isNoun: false }, { text: 'résultat', isNoun: true }, { text: 'démontrer', isNoun: false }, { text: 'laboratoire', isNoun: true },
    ],
  },
  {
    id: 14, level: 'CM1',
    words: [
      { text: 'capitaine', isNoun: true }, { text: 'naviguer', isNoun: false }, { text: 'son', isNoun: false },
      { text: 'intrépide', isNoun: false }, { text: 'navire', isNoun: true }, { text: 'franchir', isNoun: false }, { text: 'tempête', isNoun: true },
    ],
  },
  {
    id: 15, level: 'CM1',
    words: [
      { text: 'bibliothèque', isNoun: true }, { text: 'proposer', isNoun: false }, { text: 'passionnant', isNoun: false },
      { text: 'des', isNoun: false }, { text: 'ouvrage', isNoun: true }, { text: 'consulter', isNoun: false }, { text: 'manuscrit', isNoun: true },
    ],
  },
  // CM2
  {
    id: 16, level: 'CM2',
    words: [
      { text: 'révolution', isNoun: true }, { text: 'bouleverser', isNoun: false }, { text: 'nos', isNoun: false },
      { text: 'numérique', isNoun: false }, { text: 'habitude', isNoun: true }, { text: 'quotidiennement', isNoun: false }, { text: 'technologie', isNoun: true },
    ],
  },
  {
    id: 17, level: 'CM2',
    words: [
      { text: 'conséquence', isNoun: true }, { text: 'préoccuper', isNoun: false }, { text: 'écologique', isNoun: false },
      { text: 'les', isNoun: false }, { text: 'scientifique', isNoun: true }, { text: 'gravement', isNoun: false }, { text: 'environnement', isNoun: true },
    ],
  },
  {
    id: 18, level: 'CM2',
    words: [
      { text: 'intelligence', isNoun: true }, { text: 'offrir', isNoun: false }, { text: 'artificielle', isNoun: false },
      { text: 'perspective', isNoun: true }, { text: 'incroyable', isNoun: false }, { text: 'développer', isNoun: false }, { text: 'programme', isNoun: true },
    ],
  },
  {
    id: 19, level: 'CM2',
    words: [
      { text: 'patrimoine', isNoun: true }, { text: 'préserver', isNoun: false }, { text: 'culturel', isNoun: false },
      { text: 'la', isNoun: false }, { text: 'génération', isNoun: true }, { text: 'transmettre', isNoun: false }, { text: 'mémoire', isNoun: true },
    ],
  },
  {
    id: 20, level: 'CM2',
    words: [
      { text: 'gouvernement', isNoun: true }, { text: 'proposer', isNoun: false }, { text: 'ambitieux', isNoun: false },
      { text: 'une', isNoun: false }, { text: 'réforme', isNoun: true }, { text: 'adopter', isNoun: false }, { text: 'loi', isNoun: true },
    ],
  },
];

export const NOUN_PLURAL_DATABASE: NounPluralTask[] = [
  // classique
  { id: 1, singular: 'chat', plural: 'chats', rule: 'classique', level: 'CE1' },
  { id: 2, singular: 'maison', plural: 'maisons', rule: 'classique', level: 'CE1' },
  { id: 3, singular: 'livre', plural: 'livres', rule: 'classique', level: 'CE1' },
  { id: 4, singular: 'fleur', plural: 'fleurs', rule: 'classique', level: 'CE1' },
  { id: 5, singular: 'arbre', plural: 'arbres', rule: 'classique', level: 'CE1' },
  { id: 6, singular: 'sac', plural: 'sacs', rule: 'classique', level: 'CE2' },
  { id: 7, singular: 'table', plural: 'tables', rule: 'classique', level: 'CE2' },
  { id: 8, singular: 'porte', plural: 'portes', rule: 'classique', level: 'CE2' },
  { id: 9, singular: 'chien', plural: 'chiens', rule: 'classique', level: 'CE2' },
  { id: 10, singular: 'ami', plural: 'amis', rule: 'classique', level: 'CE2' },
  { id: 11, singular: 'jardin', plural: 'jardins', rule: 'classique', level: 'CM1' },
  { id: 12, singular: 'enfant', plural: 'enfants', rule: 'classique', level: 'CM1' },
  { id: 13, singular: 'vent', plural: 'vents', rule: 'classique', level: 'CM1' },
  { id: 14, singular: 'élève', plural: 'élèves', rule: 'classique', level: 'CM1' },
  { id: 15, singular: 'boulanger', plural: 'boulangers', rule: 'classique', level: 'CM2' },
  { id: 16, singular: 'rivière', plural: 'rivières', rule: 'classique', level: 'CM2' },
  { id: 17, singular: 'document', plural: 'documents', rule: 'classique', level: 'CM2' },
  { id: 18, singular: 'monument', plural: 'monuments', rule: 'classique', level: 'CM2' },
  // eau-au
  { id: 19, singular: 'gâteau', plural: 'gâteaux', rule: 'eau-au', level: 'CE1' },
  { id: 20, singular: 'oiseau', plural: 'oiseaux', rule: 'eau-au', level: 'CE1' },
  { id: 21, singular: 'bateau', plural: 'bateaux', rule: 'eau-au', level: 'CE1' },
  { id: 22, singular: 'chapeau', plural: 'chapeaux', rule: 'eau-au', level: 'CE2' },
  { id: 23, singular: 'rideau', plural: 'rideaux', rule: 'eau-au', level: 'CE2' },
  { id: 24, singular: 'couteau', plural: 'couteaux', rule: 'eau-au', level: 'CE2' },
  { id: 25, singular: 'tableau', plural: 'tableaux', rule: 'eau-au', level: 'CM1' },
  { id: 26, singular: 'noyau', plural: 'noyaux', rule: 'eau-au', level: 'CM1' },
  { id: 27, singular: 'tuyau', plural: 'tuyaux', rule: 'eau-au', level: 'CM1' },
  { id: 28, singular: 'manteau', plural: 'manteaux', rule: 'eau-au', level: 'CM2' },
  { id: 29, singular: 'rameau', plural: 'rameaux', rule: 'eau-au', level: 'CM2' },
  { id: 30, singular: 'flambeau', plural: 'flambeaux', rule: 'eau-au', level: 'CM2' },
  // ou
  { id: 31, singular: 'bijou', plural: 'bijoux', rule: 'ou', level: 'CE1' },
  { id: 32, singular: 'caillou', plural: 'cailloux', rule: 'ou', level: 'CE1' },
  { id: 33, singular: 'chou', plural: 'choux', rule: 'ou', level: 'CE2' },
  { id: 34, singular: 'genou', plural: 'genoux', rule: 'ou', level: 'CE2' },
  { id: 35, singular: 'hibou', plural: 'hiboux', rule: 'ou', level: 'CE2' },
  { id: 36, singular: 'joujou', plural: 'joujoux', rule: 'ou', level: 'CM1' },
  { id: 37, singular: 'pou', plural: 'poux', rule: 'ou', level: 'CM1' },
  { id: 38, singular: 'trou', plural: 'trous', rule: 'ou', level: 'CM1' },
  { id: 39, singular: 'sou', plural: 'sous', rule: 'ou', level: 'CM2' },
  { id: 40, singular: 'verrou', plural: 'verrous', rule: 'ou', level: 'CM2' },
  // ail
  { id: 41, singular: 'travail', plural: 'travaux', rule: 'ail', level: 'CE2' },
  { id: 42, singular: 'vitrail', plural: 'vitraux', rule: 'ail', level: 'CE2' },
  { id: 43, singular: 'corail', plural: 'coraux', rule: 'ail', level: 'CM1' },
  { id: 44, singular: 'bail', plural: 'baux', rule: 'ail', level: 'CM1' },
  { id: 45, singular: 'rail', plural: 'rails', rule: 'ail', level: 'CM1' },
  { id: 46, singular: 'émail', plural: 'émaux', rule: 'ail', level: 'CM2' },
  { id: 47, singular: 'détail', plural: 'détails', rule: 'ail', level: 'CM2' },
  { id: 48, singular: 'portail', plural: 'portails', rule: 'ail', level: 'CM2' },
];

export const NOUN_GENDER_DATABASE: NounGenderTask[] = [
  // ien → ienne
  { id: 1, masculine: 'musicien', feminine: 'musicienne', rule: 'ien', level: 'CE2' },
  { id: 2, masculine: 'pharmacien', feminine: 'pharmacienne', rule: 'ien', level: 'CE2' },
  { id: 3, masculine: 'gardien', feminine: 'gardienne', rule: 'ien', level: 'CE2' },
  { id: 4, masculine: 'chirurgien', feminine: 'chirurgienne', rule: 'ien', level: 'CM1' },
  { id: 5, masculine: 'mécanicien', feminine: 'mécanicienne', rule: 'ien', level: 'CM1' },
  { id: 6, masculine: 'électricien', feminine: 'électricienne', rule: 'ien', level: 'CM1' },
  { id: 7, masculine: 'comédien', feminine: 'comédienne', rule: 'ien', level: 'CM2' },
  { id: 8, masculine: 'technicien', feminine: 'technicienne', rule: 'ien', level: 'CM2' },
  { id: 9, masculine: 'informaticien', feminine: 'informaticienne', rule: 'ien', level: 'CM2' },
  { id: 10, masculine: 'opticien', feminine: 'opticienne', rule: 'ien', level: 'CM2' },
  // eur → euse
  { id: 11, masculine: 'chanteur', feminine: 'chanteuse', rule: 'eur', level: 'CE2' },
  { id: 12, masculine: 'danseur', feminine: 'danseuse', rule: 'eur', level: 'CE2' },
  { id: 13, masculine: 'nageur', feminine: 'nageuse', rule: 'eur', level: 'CE2' },
  { id: 14, masculine: 'menteur', feminine: 'menteuse', rule: 'eur', level: 'CM1' },
  { id: 15, masculine: 'vendeur', feminine: 'vendeuse', rule: 'eur', level: 'CM1' },
  { id: 16, masculine: 'coiffeur', feminine: 'coiffeuse', rule: 'eur', level: 'CM1' },
  { id: 17, masculine: 'joueur', feminine: 'joueuse', rule: 'eur', level: 'CM2' },
  { id: 18, masculine: 'chercheur', feminine: 'chercheuse', rule: 'eur', level: 'CM2' },
  { id: 19, masculine: 'voleur', feminine: 'voleuse', rule: 'eur', level: 'CM2' },
  { id: 20, masculine: 'rêveur', feminine: 'rêveuse', rule: 'eur', level: 'CM2' },
  // ier → ière
  { id: 21, masculine: 'pompier', feminine: 'pompière', rule: 'ier', level: 'CE2' },
  { id: 22, masculine: 'épicier', feminine: 'épicière', rule: 'ier', level: 'CE2' },
  { id: 23, masculine: 'pâtissier', feminine: 'pâtissière', rule: 'ier', level: 'CM1' },
  { id: 24, masculine: 'policier', feminine: 'policière', rule: 'ier', level: 'CM1' },
  { id: 25, masculine: 'cuisinier', feminine: 'cuisinière', rule: 'ier', level: 'CM1' },
  { id: 26, masculine: 'cavalier', feminine: 'cavalière', rule: 'ier', level: 'CM2' },
  { id: 27, masculine: 'infirmier', feminine: 'infirmière', rule: 'ier', level: 'CM2' },
  { id: 28, masculine: 'fermier', feminine: 'fermière', rule: 'ier', level: 'CM2' },
  // ion/on → ionne/onne
  { id: 29, masculine: 'champion', feminine: 'championne', rule: 'ion', level: 'CE2' },
  { id: 30, masculine: 'lion', feminine: 'lionne', rule: 'ion', level: 'CE2' },
  { id: 31, masculine: 'espion', feminine: 'espionne', rule: 'ion', level: 'CM1' },
  { id: 32, masculine: 'patron', feminine: 'patronne', rule: 'ion', level: 'CM1' },
  { id: 33, masculine: 'breton', feminine: 'bretonne', rule: 'ion', level: 'CM1' },
  { id: 34, masculine: 'fanfaron', feminine: 'fanfaronne', rule: 'ion', level: 'CM2' },
  { id: 35, masculine: 'baron', feminine: 'baronne', rule: 'ion', level: 'CM2' },
  { id: 36, masculine: 'pion', feminine: 'pionne', rule: 'ion', level: 'CM2' },
  // ain → aine
  { id: 37, masculine: 'humain', feminine: 'humaine', rule: 'ain', level: 'CE2' },
  { id: 38, masculine: 'châtelain', feminine: 'châtelaine', rule: 'ain', level: 'CE2' },
  { id: 39, masculine: 'américain', feminine: 'américaine', rule: 'ain', level: 'CM1' },
  { id: 40, masculine: 'souverain', feminine: 'souveraine', rule: 'ain', level: 'CM1' },
  { id: 41, masculine: 'vilain', feminine: 'vilaine', rule: 'ain', level: 'CM1' },
  { id: 42, masculine: 'riverain', feminine: 'riveraine', rule: 'ain', level: 'CM2' },
  { id: 43, masculine: 'africain', feminine: 'africaine', rule: 'ain', level: 'CM2' },
  // e simple
  { id: 44, masculine: 'ami', feminine: 'amie', rule: 'e', level: 'CE1' },
  { id: 45, masculine: 'apprenti', feminine: 'apprentie', rule: 'e', level: 'CE2' },
  { id: 46, masculine: 'cousin', feminine: 'cousine', rule: 'e', level: 'CE2' },
  { id: 47, masculine: 'voisin', feminine: 'voisine', rule: 'e', level: 'CE2' },
  { id: 48, masculine: 'blond', feminine: 'blonde', rule: 'e', level: 'CM1' },
  { id: 49, masculine: 'idiot', feminine: 'idiote', rule: 'e', level: 'CM1' },
  { id: 50, masculine: 'absent', feminine: 'absente', rule: 'e', level: 'CM1' },
  { id: 51, masculine: 'adolescent', feminine: 'adolescente', rule: 'e', level: 'CM2' },
  { id: 52, masculine: 'ennemi', feminine: 'ennemie', rule: 'e', level: 'CM2' },
  { id: 53, masculine: 'orphelin', feminine: 'orpheline', rule: 'e', level: 'CM2' },
];
