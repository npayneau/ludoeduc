import { VerbIdentifyTask, VerbConjugatedTask, VerbInfinitiveTask, VerbTenseTask } from '../types';

export const VERB_IDENTIFY_DATABASE: VerbIdentifyTask[] = [
  // CE1 (5 exercices)
  { id: 1, level: "CE1", words: [
    {text:"le",isVerb:false},{text:"chat",isVerb:false},{text:"dort",isVerb:true},{text:"gros",isVerb:false},{text:"livre",isVerb:false},{text:"mange",isVerb:true},{text:"belle",isVerb:false}
  ]},
  { id: 2, level: "CE1", words: [
    {text:"maison",isVerb:false},{text:"courir",isVerb:true},{text:"la",isVerb:false},{text:"rouge",isVerb:false},{text:"fleur",isVerb:false},{text:"pousse",isVerb:true},{text:"petit",isVerb:false}
  ]},
  { id: 3, level: "CE1", words: [
    {text:"un",isVerb:false},{text:"saute",isVerb:true},{text:"chien",isVerb:false},{text:"bleu",isVerb:false},{text:"table",isVerb:false},{text:"jouer",isVerb:true},{text:"grand",isVerb:false}
  ]},
  { id: 4, level: "CE1", words: [
    {text:"soleil",isVerb:false},{text:"brille",isVerb:true},{text:"les",isVerb:false},{text:"oiseau",isVerb:false},{text:"chaud",isVerb:false},{text:"voler",isVerb:true},{text:"grand",isVerb:false}
  ]},
  { id: 5, level: "CE1", words: [
    {text:"une",isVerb:false},{text:"pomme",isVerb:false},{text:"manger",isVerb:true},{text:"verte",isVerb:false},{text:"école",isVerb:false},{text:"est",isVerb:true},{text:"belle",isVerb:false}
  ]},
  // CE2 (5 exercices)
  { id: 6, level: "CE2", words: [
    {text:"forêt",isVerb:false},{text:"traverser",isVerb:true},{text:"sombre",isVerb:false},{text:"médecin",isVerb:false},{text:"réfléchit",isVerb:true},{text:"rapide",isVerb:false},{text:"bâtir",isVerb:true}
  ]},
  { id: 7, level: "CE2", words: [
    {text:"rivière",isVerb:false},{text:"couler",isVerb:true},{text:"douce",isVerb:false},{text:"un",isVerb:false},{text:"bateau",isVerb:false},{text:"naviguer",isVerb:true},{text:"avance",isVerb:true}
  ]},
  { id: 8, level: "CE2", words: [
    {text:"jardinier",isVerb:false},{text:"planter",isVerb:true},{text:"une",isVerb:false},{text:"tomate",isVerb:false},{text:"rouge",isVerb:false},{text:"cueille",isVerb:true},{text:"feuille",isVerb:false}
  ]},
  { id: 9, level: "CE2", words: [
    {text:"musicien",isVerb:false},{text:"jouer",isVerb:true},{text:"belle",isVerb:false},{text:"mélodie",isVerb:false},{text:"des",isVerb:false},{text:"entend",isVerb:true},{text:"guitare",isVerb:false}
  ]},
  { id: 10, level: "CE2", words: [
    {text:"montagne",isVerb:false},{text:"escalader",isVerb:true},{text:"enneigée",isVerb:false},{text:"la",isVerb:false},{text:"glacier",isVerb:false},{text:"fond",isVerb:true},{text:"marcher",isVerb:true}
  ]},
];

export const VERB_CONJUGATED_DATABASE: VerbConjugatedTask[] = [
  // CE1
  {id:1,level:"CE1",verbForm:"manger",isConjugated:false},
  {id:2,level:"CE1",verbForm:"mange",isConjugated:true},
  {id:3,level:"CE1",verbForm:"jouer",isConjugated:false},
  {id:4,level:"CE1",verbForm:"jouons",isConjugated:true},
  {id:5,level:"CE1",verbForm:"être",isConjugated:false},
  {id:6,level:"CE1",verbForm:"est",isConjugated:true},
  {id:7,level:"CE1",verbForm:"avoir",isConjugated:false},
  {id:8,level:"CE1",verbForm:"avons",isConjugated:true},
  {id:9,level:"CE1",verbForm:"chanter",isConjugated:false},
  {id:10,level:"CE1",verbForm:"chantait",isConjugated:true},
  // CE2
  {id:11,level:"CE2",verbForm:"faire",isConjugated:false},
  {id:12,level:"CE2",verbForm:"faisait",isConjugated:true},
  {id:13,level:"CE2",verbForm:"aller",isConjugated:false},
  {id:14,level:"CE2",verbForm:"allons",isConjugated:true},
  {id:15,level:"CE2",verbForm:"vouloir",isConjugated:false},
  {id:16,level:"CE2",verbForm:"veulent",isConjugated:true},
  {id:17,level:"CE2",verbForm:"prendre",isConjugated:false},
  {id:18,level:"CE2",verbForm:"prenait",isConjugated:true},
  {id:19,level:"CE2",verbForm:"voir",isConjugated:false},
  {id:20,level:"CE2",verbForm:"voyait",isConjugated:true},
];

export const VERB_INFINITIVE_DATABASE: VerbInfinitiveTask[] = [
  // CE1
  {id:1,level:"CE1",conjugatedForm:"mangeons",infinitive:"manger",context:"Nous mangeons une pomme."},
  {id:2,level:"CE1",conjugatedForm:"jouait",infinitive:"jouer",context:"Il jouait dans le jardin."},
  {id:3,level:"CE1",conjugatedForm:"ont",infinitive:"avoir",context:"Ils ont un beau livre."},
  {id:4,level:"CE1",conjugatedForm:"est",infinitive:"être",context:"Elle est grande."},
  {id:5,level:"CE1",conjugatedForm:"chantons",infinitive:"chanter",context:"Nous chantons une chanson."},
  {id:6,level:"CE1",conjugatedForm:"sautait",infinitive:"sauter",context:"Le lapin sautait très haut."},
  {id:7,level:"CE1",conjugatedForm:"avait",infinitive:"avoir",context:"Il avait faim."},
  {id:8,level:"CE1",conjugatedForm:"seront",infinitive:"être",context:"Ils seront contents demain."},
  {id:9,level:"CE1",conjugatedForm:"dessinais",infinitive:"dessiner",context:"Je dessinais une maison."},
  {id:10,level:"CE1",conjugatedForm:"marchait",infinitive:"marcher",context:"La petite fille marchait lentement."},
  // CE2
  {id:11,level:"CE2",conjugatedForm:"fait",infinitive:"faire",context:"Il fait beau aujourd'hui."},
  {id:12,level:"CE2",conjugatedForm:"allaient",infinitive:"aller",context:"Ils allaient à l'école."},
  {id:13,level:"CE2",conjugatedForm:"dit",infinitive:"dire",context:"Elle dit la vérité."},
  {id:14,level:"CE2",conjugatedForm:"vient",infinitive:"venir",context:"Il vient me voir."},
  {id:15,level:"CE2",conjugatedForm:"peuvent",infinitive:"pouvoir",context:"Ils peuvent partir."},
  {id:16,level:"CE2",conjugatedForm:"voyait",infinitive:"voir",context:"Elle voyait la mer de loin."},
  {id:17,level:"CE2",conjugatedForm:"voulons",infinitive:"vouloir",context:"Nous voulons jouer dehors."},
  {id:18,level:"CE2",conjugatedForm:"prenez",infinitive:"prendre",context:"Vous prenez le train."},
  {id:19,level:"CE2",conjugatedForm:"faisais",infinitive:"faire",context:"Je faisais mes devoirs."},
  {id:20,level:"CE2",conjugatedForm:"veux",infinitive:"vouloir",context:"Je veux une glace."},
];

export const VERB_TENSE_DATABASE: VerbTenseTask[] = [
  // CE1
  {id:1,level:"CE1",sentence:"Le chat dort sur le canapé.",tense:"présent"},
  {id:2,level:"CE1",sentence:"Les enfants ont joué hier dans le parc.",tense:"passé"},
  {id:3,level:"CE1",sentence:"Demain, il neigera sur les montagnes.",tense:"futur"},
  {id:4,level:"CE1",sentence:"Ma sœur dessinait une belle fleur.",tense:"passé"},
  {id:5,level:"CE1",sentence:"Tu mangeras ta soupe ce soir.",tense:"futur"},
  // CE2
  {id:6,level:"CE2",sentence:"Le boulanger pétrissait la pâte chaque matin.",tense:"passé"},
  {id:7,level:"CE2",sentence:"Les étoiles brillent dans le ciel noir.",tense:"présent"},
  {id:8,level:"CE2",sentence:"Nous partirons en voyage l'année prochaine.",tense:"futur"},
  {id:9,level:"CE2",sentence:"Les enfants ont construit une cabane hier.",tense:"passé"},
  {id:10,level:"CE2",sentence:"Tu viendras nous voir demain matin.",tense:"futur"},
];
