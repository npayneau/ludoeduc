
import { Tense } from '../types';

export interface VerbData {
  verb: string;
  conjugations: Record<Tense, Record<string, string>>;
}

export const VERB_DATABASE: VerbData[] = [
  {
    verb: "être",
    conjugations: {
      "présent": { "Je": "suis", "Tu": "es", "Il": "est", "Nous": "sommes", "Vous": "êtes", "Ils": "sont" },
      "futur": { "Je": "serai", "Tu": "seras", "Il": "sera", "Nous": "serons", "Vous": "serez", "Ils": "seront" },
      "imparfait": { "Je": "étais", "Tu": "étais", "Il": "était", "Nous": "étions", "Vous": "étiez", "Ils": "étaient" },
      "passé composé": { "Je": "ai été", "Tu": "as été", "Il": "a été", "Nous": "avons été", "Vous": "avez été", "Ils": "ont été" }
    }
  },
  {
    verb: "avoir",
    conjugations: {
      "présent": { "Je": "ai", "Tu": "as", "Il": "a", "Nous": "avons", "Vous": "avez", "Ils": "ont" },
      "futur": { "Je": "aurai", "Tu": "auras", "Il": "aura", "Nous": "aurons", "Vous": "aurez", "Ils": "auront" },
      "imparfait": { "Je": "avais", "Tu": "avais", "Il": "avait", "Nous": "avions", "Vous": "aviez", "Ils": "avaient" },
      "passé composé": { "Je": "ai eu", "Tu": "as eu", "Il": "a eu", "Nous": "avons eu", "Vous": "avez eu", "Ils": "ont eu" }
    }
  },
  {
    verb: "manger",
    conjugations: {
      "présent": { "Je": "mange", "Tu": "manges", "Il": "mange", "Nous": "mangeons", "Vous": "mangez", "Ils": "mangent" },
      "futur": { "Je": "mangerai", "Tu": "mangeras", "Il": "mangera", "Nous": "mangerons", "Vous": "mangerez", "Ils": "mangeront" },
      "imparfait": { "Je": "mangeais", "Tu": "mangeais", "Il": "mangeait", "Nous": "mangions", "Vous": "mangiez", "Ils": "mangeaient" },
      "passé composé": { "Je": "ai mangé", "Tu": "as mangé", "Il": "a mangé", "Nous": "avons mangé", "Vous": "avez mangé", "Ils": "ont mangé" }
    }
  },
  {
    verb: "finir",
    conjugations: {
      "présent": { "Je": "finis", "Tu": "finis", "Il": "finit", "Nous": "finissons", "Vous": "finissez", "Ils": "finissent" },
      "futur": { "Je": "finirai", "Tu": "finiras", "Il": "finira", "Nous": "finirons", "Vous": "finirez", "Ils": "finiront" },
      "imparfait": { "Je": "finissais", "Tu": "finissais", "Il": "finissait", "Nous": "finissions", "Vous": "finissiez", "Ils": "finissaient" },
      "passé composé": { "Je": "ai fini", "Tu": "as fini", "Il": "a fini", "Nous": "avons fini", "Vous": "avez fini", "Ils": "ont fini" }
    }
  },
  {
    verb: "aller",
    conjugations: {
      "présent": { "Je": "vais", "Tu": "vas", "Il": "va", "Nous": "allons", "Vous": "allez", "Ils": "vont" },
      "futur": { "Je": "irai", "Tu": "iras", "Il": "ira", "Nous": "irons", "Vous": "irez", "Ils": "iront" },
      "imparfait": { "Je": "allais", "Tu": "allais", "Il": "allait", "Nous": "allions", "Vous": "alliez", "Ils": "allaient" },
      "passé composé": { "Je": "suis allé", "Tu": "es allé", "Il": "est allé", "Nous": "sommes allés", "Vous": "êtes allés", "Ils": "sont allés" }
    }
  },
  {
    verb: "faire",
    conjugations: {
      "présent": { "Je": "fais", "Tu": "fais", "Il": "fait", "Nous": "faisons", "Vous": "faites", "Ils": "font" },
      "futur": { "Je": "ferai", "Tu": "feras", "Il": "fera", "Nous": "ferons", "Vous": "ferez", "Ils": "feront" },
      "imparfait": { "Je": "faisais", "Tu": "faisais", "Il": "faisait", "Nous": "faisions", "Vous": "faisiez", "Ils": "faisaient" },
      "passé composé": { "Je": "ai fait", "Tu": "as fait", "Il": "a fait", "Nous": "avons fait", "Vous": "avez fait", "Ils": "ont fait" }
    }
  },
  {
    verb: "dire",
    conjugations: {
      "présent": { "Je": "dis", "Tu": "dis", "Il": "dit", "Nous": "disons", "Vous": "dites", "Ils": "disent" },
      "futur": { "Je": "dirai", "Tu": "diras", "Il": "dira", "Nous": "dirons", "Vous": "direz", "Ils": "diront" },
      "imparfait": { "Je": "disais", "Tu": "disais", "Il": "disait", "Nous": "disions", "Vous": "disiez", "Ils": "disaient" },
      "passé composé": { "Je": "ai dit", "Tu": "as dit", "Il": "a dit", "Nous": "avons dit", "Vous": "avez dit", "Ils": "ont dit" }
    }
  },
  {
    verb: "venir",
    conjugations: {
      "présent": { "Je": "viens", "Tu": "viens", "Il": "vient", "Nous": "venons", "Vous": "venez", "Ils": "viennent" },
      "futur": { "Je": "viendrai", "Tu": "viendras", "Il": "viendra", "Nous": "viendrons", "Vous": "viendrez", "Ils": "viendront" },
      "imparfait": { "Je": "venais", "Tu": "venais", "Il": "venait", "Nous": "venions", "Vous": "veniez", "Ils": "venaient" },
      "passé composé": { "Je": "suis venu", "Tu": "es venu", "Il": "est venu", "Nous": "sommes venus", "Vous": "êtes venus", "Ils": "sont venus" }
    }
  },
  {
    verb: "pouvoir",
    conjugations: {
      "présent": { "Je": "peux", "Tu": "peux", "Il": "peut", "Nous": "pouvons", "Vous": "pouvez", "Ils": "peuvent" },
      "futur": { "Je": "pourrai", "Tu": "pourras", "Il": "pourra", "Nous": "pourrons", "Vous": "pourrez", "Ils": "pourront" },
      "imparfait": { "Je": "pouvais", "Tu": "pouvais", "Il": "pouvait", "Nous": "pouvions", "Vous": "pouviez", "Ils": "pouvaient" },
      "passé composé": { "Je": "ai pu", "Tu": "as pu", "Il": "a pu", "Nous": "avons pu", "Vous": "avez pu", "Ils": "ont pu" }
    }
  },
  {
    verb: "voir",
    conjugations: {
      "présent": { "Je": "vois", "Tu": "vois", "Il": "voit", "Nous": "voyons", "Vous": "voyez", "Ils": "voient" },
      "futur": { "Je": "verrai", "Tu": "verras", "Il": "verra", "Nous": "verrons", "Vous": "verrez", "Ils": "verront" },
      "imparfait": { "Je": "voyais", "Tu": "voyais", "Il": "voyait", "Nous": "voyions", "Vous": "voyiez", "Ils": "voyaient" },
      "passé composé": { "Je": "ai vu", "Tu": "as vu", "Il": "a vu", "Nous": "avons vu", "Vous": "avez vu", "Ils": "ont vu" }
    }
  },
  {
    verb: "vouloir",
    conjugations: {
      "présent": { "Je": "veux", "Tu": "veux", "Il": "veut", "Nous": "voulons", "Vous": "voulez", "Ils": "veulent" },
      "futur": { "Je": "voudrai", "Tu": "voudras", "Il": "voudra", "Nous": "voudrons", "Vous": "voudrez", "Ils": "voudront" },
      "imparfait": { "Je": "voulais", "Tu": "voulais", "Il": "voulait", "Nous": "voulions", "Vous": "vouliez", "Ils": "voulaient" },
      "passé composé": { "Je": "ai voulu", "Tu": "as voulu", "Il": "a voulu", "Nous": "avons voulu", "Vous": "avez voulu", "Ils": "ont voulu" }
    }
  },
  {
    verb: "prendre",
    conjugations: {
      "présent": { "Je": "prends", "Tu": "prends", "Il": "prend", "Nous": "prenons", "Vous": "prenez", "Ils": "prennent" },
      "futur": { "Je": "prendrai", "Tu": "prendras", "Il": "prendra", "Nous": "prendrons", "Vous": "prendrez", "Ils": "prendront" },
      "imparfait": { "Je": "prenais", "Tu": "prenais", "Il": "prenait", "Nous": "prenions", "Vous": "preniez", "Ils": "prenaient" },
      "passé composé": { "Je": "ai pris", "Tu": "as pris", "Il": "a pris", "Nous": "avons pris", "Vous": "avez pris", "Ils": "ont pris" }
    }
  },
  {
    verb: "écrire",
    conjugations: {
      "présent": { "Je": "écris", "Tu": "écris", "Il": "écrit", "Nous": "écrivons", "Vous": "écrivez", "Ils": "écrivent" },
      "futur": { "Je": "écrirai", "Tu": "écriras", "Il": "écrira", "Nous": "écrirons", "Vous": "écrirez", "Ils": "écriront" },
      "imparfait": { "Je": "écrivais", "Tu": "écrivais", "Il": "écrivait", "Nous": "écrivions", "Vous": "écriviez", "Ils": "écrivaient" },
      "passé composé": { "Je": "ai écrit", "Tu": "as écrit", "Il": "a écrit", "Nous": "avons écrit", "Vous": "avez écrit", "Ils": "ont écrit" }
    }
  },
  {
    verb: "aimer",
    conjugations: {
      "présent": { "Je": "aime", "Tu": "aimes", "Il": "aime", "Nous": "aimons", "Vous": "aimez", "Ils": "aiment" },
      "futur": { "Je": "aimerai", "Tu": "aimeras", "Il": "aimera", "Nous": "aimerons", "Vous": "aimerez", "Ils": "aimeront" },
      "imparfait": { "Je": "aimais", "Tu": "aimais", "Il": "aimait", "Nous": "aimions", "Vous": "aimiez", "Ils": "aimaient" },
      "passé composé": { "Je": "ai aimé", "Tu": "as aimé", "Il": "a aimé", "Nous": "avons aimé", "Vous": "avez aimé", "Ils": "ont aimé" }
    }
  },
  {
    verb: "apprendre",
    conjugations: {
      "présent": { "Je": "apprends", "Tu": "apprends", "Il": "apprend", "Nous": "apprenons", "Vous": "apprenez", "Ils": "apprennent" },
      "futur": { "Je": "apprendrai", "Tu": "apprendras", "Il": "apprendra", "Nous": "apprendrons", "Vous": "apprendrez", "Ils": "apprendront" },
      "imparfait": { "Je": "apprenais", "Tu": "apprenais", "Il": "apprenait", "Nous": "apprenions", "Vous": "appreniez", "Ils": "apprenaient" },
      "passé composé": { "Je": "ai appris", "Tu": "as appris", "Il": "a appris", "Nous": "avons appris", "Vous": "avez appris", "Ils": "ont appris" }
    }
  },
  {
    verb: "devoir",
    conjugations: {
      "présent": { "Je": "dois", "Tu": "dois", "Il": "doit", "Nous": "devons", "Vous": "devez", "Ils": "doivent" },
      "futur": { "Je": "devrai", "Tu": "devras", "Il": "devra", "Nous": "devrons", "Vous": "devrez", "Ils": "devront" },
      "imparfait": { "Je": "devais", "Tu": "devais", "Il": "devait", "Nous": "devions", "Vous": "deviez", "Ils": "devaient" },
      "passé composé": { "Je": "ai dû", "Tu": "as dû", "Il": "a dû", "Nous": "avons dû", "Vous": "avez dû", "Ils": "ont dû" }
    }
  },
  {
    verb: "parler",
    conjugations: {
      "présent": { "Je": "parle", "Tu": "parles", "Il": "parle", "Nous": "parlons", "Vous": "parlez", "Ils": "parlent" },
      "futur": { "Je": "parlerai", "Tu": "parleras", "Il": "parlera", "Nous": "parlerons", "Vous": "parlerez", "Ils": "parleront" },
      "imparfait": { "Je": "parlais", "Tu": "parlais", "Il": "parlait", "Nous": "parlions", "Vous": "parliez", "Ils": "parlaient" },
      "passé composé": { "Je": "ai parlé", "Tu": "as parlé", "Il": "a parlé", "Nous": "avons parlé", "Vous": "avez parlé", "Ils": "ont parlé" }
    }
  },
  {
    verb: "mettre",
    conjugations: {
      "présent": { "Je": "mets", "Tu": "mets", "Il": "met", "Nous": "mettons", "Vous": "mettez", "Ils": "mettent" },
      "futur": { "Je": "mettrai", "Tu": "mettras", "Il": "mettra", "Nous": "mettrons", "Vous": "mettrez", "Ils": "mettront" },
      "imparfait": { "Je": "mettais", "Tu": "mettais", "Il": "mettait", "Nous": "mettions", "Vous": "mettiez", "Ils": "mettaient" },
      "passé composé": { "Je": "ai mis", "Tu": "as mis", "Il": "a mis", "Nous": "avons mis", "Vous": "avez mis", "Ils": "ont mis" }
    }
  },
  {
    verb: "partir",
    conjugations: {
      "présent": { "Je": "pars", "Tu": "pars", "Il": "part", "Nous": "partons", "Vous": "partez", "Ils": "partent" },
      "futur": { "Je": "partirai", "Tu": "partiras", "Il": "partira", "Nous": "partirons", "Vous": "partirez", "Ils": "partiront" },
      "imparfait": { "Je": "partais", "Tu": "partais", "Il": "partait", "Nous": "partions", "Vous": "partiez", "Ils": "partaient" },
      "passé composé": { "Je": "suis parti", "Tu": "es parti", "Il": "est parti", "Nous": "sommes partis", "Vous": "êtes partis", "Ils": "sont partis" }
    }
  },
  {
    verb: "dire",
    conjugations: {
      "présent": { "Je": "dis", "Tu": "dis", "Il": "dit", "Nous": "disons", "Vous": "dites", "Ils": "disent" },
      "futur": { "Je": "dirai", "Tu": "diras", "Il": "dira", "Nous": "dirons", "Vous": "direz", "Ils": "diront" },
      "imparfait": { "Je": "disais", "Tu": "disais", "Il": "disait", "Nous": "disions", "Vous": "disiez", "Ils": "disaient" },
      "passé composé": { "Je": "ai dit", "Tu": "as dit", "Il": "a dit", "Nous": "avons dit", "Vous": "avez dit", "Ils": "ont dit" }
    }
  },
  {
    verb: "croire",
    conjugations: {
      "présent": { "Je": "crois", "Tu": "crois", "Il": "croit", "Nous": "croyons", "Vous": "croyez", "Ils": "croient" },
      "futur": { "Je": "croirai", "Tu": "croiras", "Il": "croira", "Nous": "croirons", "Vous": "croirez", "Ils": "croiront" },
      "imparfait": { "Je": "croyais", "Tu": "croyais", "Il": "croyait", "Nous": "croyions", "Vous": "croyiez", "Ils": "croyaient" },
      "passé composé": { "Je": "ai cru", "Tu": "as cru", "Il": "a cru", "Nous": "avons cru", "Vous": "avez cru", "Ils": "ont cru" }
    }
  },
  {
    verb: "tenir",
    conjugations: {
      "présent": { "Je": "tiens", "Tu": "tiens", "Il": "tient", "Nous": "tenons", "Vous": "tenez", "Ils": "tiennent" },
      "futur": { "Je": "tiendrai", "Tu": "tiendras", "Il": "tiendra", "Nous": "tiendrons", "Vous": "tiendrez", "Ils": "tiendront" },
      "imparfait": { "Je": "tenais", "Tu": "tenais", "Il": "tenait", "Nous": "tenions", "Vous": "teniez", "Ils": "tenaient" },
      "passé composé": { "Je": "ai tenu", "Tu": "as tenu", "Il": "a tenu", "Nous": "avons tenu", "Vous": "avez tenu", "Ils": "ont tenu" }
    }
  },
  {
    verb: "comprendre",
    conjugations: {
      "présent": { "Je": "comprends", "Tu": "comprends", "Il": "comprend", "Nous": "comprenons", "Vous": "comprenez", "Ils": "comprennent" },
      "futur": { "Je": "comprendrai", "Tu": "comprendras", "Il": "comprendra", "Nous": "comprendrons", "Vous": "comprendrez", "Ils": "comprendront" },
      "imparfait": { "Je": "comprenais", "Tu": "comprenais", "Il": "comprenait", "Nous": "comprenions", "Vous": "compreniez", "Ils": "comprenaient" },
      "passé composé": { "Je": "ai compris", "Tu": "as compris", "Il": "a compris", "Nous": "avons compris", "Vous": "avez compris", "Ils": "ont compris" }
    }
  },
  {
    verb: "répondre",
    conjugations: {
      "présent": { "Je": "réponds", "Tu": "réponds", "Il": "répond", "Nous": "répondons", "Vous": "répondez", "Ils": "répondent" },
      "futur": { "Je": "répondrai", "Tu": "répondras", "Il": "répondra", "Nous": "répondrons", "Vous": "répondrez", "Ils": "répondront" },
      "imparfait": { "Je": "répondais", "Tu": "répondais", "Il": "répondait", "Nous": "répondions", "Vous": "répondiez", "Ils": "répondaient" },
      "passé composé": { "Je": "ai répondu", "Tu": "as répondu", "Il": "a répondu", "Nous": "avons répondu", "Vous": "avez répondu", "Ils": "ont répondu" }
    }
  },
  {
    verb: "attendre",
    conjugations: {
      "présent": { "Je": "attends", "Tu": "attends", "Il": "attend", "Nous": "attendons", "Vous": "attendez", "Ils": "attendent" },
      "futur": { "Je": "attendrai", "Tu": "attendras", "Il": "attendra", "Nous": "attendrons", "Vous": "attendrez", "Ils": "attendront" },
      "imparfait": { "Je": "attendais", "Tu": "attendais", "Il": "attendait", "Nous": "attendions", "Vous": "attendiez", "Ils": "attendaient" },
      "passé composé": { "Je": "ai attendu", "Tu": "as attendu", "Il": "a attendu", "Nous": "avons attendu", "Vous": "avez attendu", "Ils": "ont attendu" }
    }
  },
  {
    verb: "connaître",
    conjugations: {
      "présent": { "Je": "connais", "Tu": "connais", "Il": "connaît", "Nous": "connaissons", "Vous": "connaissez", "Ils": "connaissent" },
      "futur": { "Je": "connaîtrai", "Tu": "connaîtras", "Il": "connaîtra", "Nous": "connaîtrons", "Vous": "connaîtrez", "Ils": "connaîtront" },
      "imparfait": { "Je": "connaissais", "Tu": "connaissais", "Il": "connaissait", "Nous": "connaissions", "Vous": "connaissiez", "Ils": "connaissaient" },
      "passé composé": { "Je": "ai connu", "Tu": "as connu", "Il": "a connu", "Nous": "avons connu", "Vous": "avez connu", "Ils": "ont connu" }
    }
  },
  {
    verb: "ouvrir",
    conjugations: {
      "présent": { "Je": "ouvre", "Tu": "ouvres", "Il": "ouvre", "Nous": "ouvrons", "Vous": "ouvrez", "Ils": "ouvrent" },
      "futur": { "Je": "ouvrirai", "Tu": "ouvriras", "Il": "ouvrira", "Nous": "ouvrirons", "Vous": "ouvrirez", "Ils": "ouvriront" },
      "imparfait": { "Je": "ouvrais", "Tu": "ouvrais", "Il": "ouvrait", "Nous": "ouvrions", "Vous": "ouvriez", "Ils": "ouvraient" },
      "passé composé": { "Je": "ai ouvert", "Tu": "as ouvert", "Il": "a ouvert", "Nous": "avons ouvert", "Vous": "avez ouvert", "Ils": "ont ouvert" }
    }
  },
  {
    verb: "recevoir",
    conjugations: {
      "présent": { "Je": "reçois", "Tu": "reçois", "Il": "reçoit", "Nous": "recevons", "Vous": "recevez", "Ils": "reçoivent" },
      "futur": { "Je": "recevrai", "Tu": "recevras", "Il": "recevra", "Nous": "recevrons", "Vous": "recevrez", "Ils": "recevront" },
      "imparfait": { "Je": "recevais", "Tu": "recevais", "Il": "recevait", "Nous": "recevions", "Vous": "receviez", "Ils": "recevaient" },
      "passé composé": { "Je": "ai reçu", "Tu": "as reçu", "Il": "a reçu", "Nous": "avons reçu", "Vous": "avez reçu", "Ils": "ont reçu" }
    }
  },
  {
    verb: "savoir",
    conjugations: {
      "présent": { "Je": "sais", "Tu": "sais", "Il": "sait", "Nous": "savons", "Vous": "savez", "Ils": "savent" },
      "futur": { "Je": "saurai", "Tu": "sauras", "Il": "saura", "Nous": "saurons", "Vous": "saurez", "Ils": "sauront" },
      "imparfait": { "Je": "savais", "Tu": "savais", "Il": "savait", "Nous": "savions", "Vous": "saviez", "Ils": "savaient" },
      "passé composé": { "Je": "ai su", "Tu": "as su", "Il": "a su", "Nous": "avons su", "Vous": "avez su", "Ils": "ont su" }
    }
  },
  {
    verb: "vivre",
    conjugations: {
      "présent": { "Je": "vis", "Tu": "vis", "Il": "vit", "Nous": "vivons", "Vous": "vivez", "Ils": "vivent" },
      "futur": { "Je": "vivrai", "Tu": "vivras", "Il": "vivra", "Nous": "vivrons", "Vous": "vivrez", "Ils": "vivront" },
      "imparfait": { "Je": "vivais", "Tu": "vivais", "Il": "vivait", "Nous": "vivions", "Vous": "viviez", "Ils": "vivaient" },
      "passé composé": { "Je": "ai vécu", "Tu": "as vécu", "Il": "a vécu", "Nous": "avons vécu", "Vous": "avez vécu", "Ils": "ont vécu" }
    }
  }
];
