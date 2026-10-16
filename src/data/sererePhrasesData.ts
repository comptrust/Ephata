import { SererePhrase } from '../types';

export const SERERE_PHRASES: SererePhrase[] = [
  // 1. Salutations & Présentations (Sine, Saloum, Baol)
  {
    id: 's-01',
    french: 'Bonjour / Comment ça va ?',
    serere: 'Mba mbadio ?',
    phonetic: 'Mba mba-dyo ?',
    dialectContext: 'Commun',
    category: 'Salutations',
    culturalNote: 'Salutation quotidienne fondamentale en pays sérère, équivalent de "Na nga def" en wolof.'
  },
  {
    id: 's-02',
    french: 'Ça va très bien / En paix',
    serere: 'Jam som / Jam rek',
    phonetic: 'Djam some',
    dialectContext: 'Commun',
    category: 'Salutations',
    culturalNote: 'Réponse indiquant la tranquillité et la bénédiction.'
  },
  {
    id: 's-03',
    french: 'As-tu passé une bonne nuit ?',
    serere: 'Mba xoolano ?',
    phonetic: 'Mba khol-ano ?',
    dialectContext: 'Sine',
    category: 'Salutations',
    culturalNote: 'Formule matinale employée auprès des aînés dans le Sine.'
  },
  {
    id: 's-04',
    french: 'J’ai bien dormi, grâce à Dieu',
    serere: 'Xoolame a jam',
    phonetic: 'Khol-amé a djam',
    dialectContext: 'Sine',
    category: 'Salutations'
  },
  {
    id: 's-05',
    french: 'As-tu passé une bonne journée ?',
    serere: 'Mba fegano ?',
    phonetic: 'Mba fé-ganno ?',
    dialectContext: 'Saloum',
    category: 'Salutations'
  },
  {
    id: 's-06',
    french: 'Comment s’appelle ton père ?',
    serere: 'Nox faam a xaye ?',
    phonetic: 'Nokh fa-am a khayé ?',
    dialectContext: 'Commun',
    category: 'Salutations'
  },
  {
    id: 's-07',
    french: 'Comment t’appelles-tu ?',
    serere: 'An we refu ? / Noox we refu ?',
    phonetic: 'Ann wé réfou ?',
    dialectContext: 'Commun',
    category: 'Salutations'
  },
  {
    id: 's-08',
    french: 'Je m’appelle Moussa',
    serere: 'Moussa rek refame',
    phonetic: 'Moussa rék ré-famm',
    dialectContext: 'Commun',
    category: 'Salutations'
  },
  {
    id: 's-09',
    french: 'D’où viens-tu ?',
    serere: 'Mbe garo ?',
    phonetic: 'Mbé garro ?',
    dialectContext: 'Baol',
    category: 'Salutations'
  },
  {
    id: 's-10',
    french: 'Je viens de Fatick',
    serere: 'Fatick garame',
    phonetic: 'Fatick garamm',
    dialectContext: 'Sine',
    category: 'Salutations'
  },
  {
    id: 's-11',
    french: 'Bienvenue chez nous',
    serere: 'Bissimilay / O mbissim',
    phonetic: 'O bissime',
    dialectContext: 'Commun',
    category: 'Salutations',
    culturalNote: 'Hospitalité sérère ("Teranga") légendaire.'
  },
  {
    id: 's-12',
    french: 'Au revoir / À bientôt',
    serere: 'O kene a jam',
    phonetic: 'O kéné a djam',
    dialectContext: 'Commun',
    category: 'Salutations'
  },
  {
    id: 's-13',
    french: 'À demain',
    serere: 'Baa baalo',
    phonetic: 'Ba ba-alo',
    dialectContext: 'Sine',
    category: 'Salutations'
  },
  {
    id: 's-14',
    french: 'Passe le bonjour aux gens de la maison',
    serere: 'Ndox a fog ale a jam',
    phonetic: 'Ndokhe a fogue alé a djam',
    dialectContext: 'Saloum',
    category: 'Salutations'
  },
  {
    id: 's-15',
    french: 'Que la paix soit sur vous',
    serere: 'Jam a ngenu',
    phonetic: 'Djam a nguénou',
    dialectContext: 'Commun',
    category: 'Salutations'
  },

  // 2. Chiffres & Compter (Essentiel commerce)
  {
    id: 's-16',
    french: 'Un (1)',
    serere: 'Leno',
    phonetic: 'Lé-no',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-17',
    french: 'Deux (2)',
    serere: 'Dik',
    phonetic: 'Dikke',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-18',
    french: 'Trois (3)',
    serere: 'Tadak',
    phonetic: 'Ta-dakke',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-19',
    french: 'Quatre (4)',
    serere: 'Nahiik',
    phonetic: 'Na-hi-ik',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-20',
    french: 'Cinq (5)',
    serere: 'Petiik',
    phonetic: 'Pé-tikke',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-21',
    french: 'Six (6)',
    serere: 'Peto leno',
    phonetic: 'Péto-léno (5+1)',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-22',
    french: 'Sept (7)',
    serere: 'Peto dik',
    phonetic: 'Péto-dikke (5+2)',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-23',
    french: 'Huit (8)',
    serere: 'Peto tadak',
    phonetic: 'Péto-tadakke (5+3)',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-24',
    french: 'Neuf (9)',
    serere: 'Peto nahiik',
    phonetic: 'Péto-nahik (5+4)',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-25',
    french: 'Dix (10)',
    serere: 'Kharfakh',
    phonetic: 'Khar-fakh',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-26',
    french: 'Cent (100)',
    serere: 'Temer',
    phonetic: 'Té-mérr',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-27',
    french: 'Mille (1 000)',
    serere: 'Junee',
    phonetic: 'Djou-né',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },

  // 3. Au Marché & Négociation
  {
    id: 's-28',
    french: 'Combien coûte ceci ?',
    serere: 'Taxa refu xaye ? / Xeex taxa ?',
    phonetic: 'Ta-kha réfou khayé ?',
    dialectContext: 'Sine',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-29',
    french: 'C’est trop cher !',
    serere: 'A seru fo a dol !',
    phonetic: 'A sérou fo a dole !',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-30',
    french: 'Baisse un peu le prix s’il te plaît',
    serere: 'Waaño maye a teeb',
    phonetic: 'Waa-nyo ma-yé a téb',
    dialectContext: 'Saloum',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-31',
    french: 'Je vais acheter',
    serere: 'Sooxame',
    phonetic: 'Sokh-ammé',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-32',
    french: 'Prends ton argent',
    serere: 'Jalu xaalis of',
    phonetic: 'Djalou kha-liss of',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-33',
    french: 'Donne-moi ma monnaie',
    serere: 'Ndoxe mi xaalis am',
    phonetic: 'Ndokhé mi khalis amm',
    dialectContext: 'Sine',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-34',
    french: 'Je veux du poisson frais',
    serere: 'A lool oxu a yec a mbogam',
    phonetic: 'A loll o-khou a yétch a mboggamm',
    dialectContext: 'Saloum',
    category: 'Au Marché & Chiffres',
    culturalNote: 'Dans les îles du Saloum (Foundiougne, Mar Lodj), le poisson frais est au cœur de la cuisine.'
  },
  {
    id: 's-35',
    french: 'Ce légume est très frais',
    serere: 'Xaye a yec a lool',
    phonetic: 'Khayé a yétch a lole',
    dialectContext: 'Commun',
    category: 'Au Marché & Chiffres'
  },
  {
    id: 's-36',
    french: 'As-tu du mil ?',
    serere: 'Mbe o ngaw ?',
    phonetic: 'Mbé o ngg-aw ?',
    dialectContext: 'Baol',
    category: 'Au Marché & Chiffres',
    culturalNote: 'Le mil (ngaw) est l’aliment de base traditionnel du pays sérère.'
  },

  // 4. Expressions Courantes & Politesse
  {
    id: 's-37',
    french: 'Merci beaucoup',
    serere: 'Jerejef / Nyo xarit / A jega jalaat',
    phonetic: 'Djiéré-djiéf / Nyo kharit',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-38',
    french: 'S’il te plaît',
    serere: 'A ndokhaange',
    phonetic: 'A ndokh-aan-gué',
    dialectContext: 'Sine',
    category: 'Expressions Courantes'
  },
  {
    id: 's-39',
    french: 'Pardonne-moi / Excuse-moi',
    serere: 'Baalame / Yoobno maye',
    phonetic: 'Baal-ammé / Yob-no ma-yé',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-40',
    french: 'Oui',
    serere: 'Iyo / Eey',
    phonetic: 'Ee-yo',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-41',
    french: 'Non',
    serere: 'Dee / Aaye',
    phonetic: 'Déé / A-ayé',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-42',
    french: 'Je comprends',
    serere: 'Nandame',
    phonetic: 'Nand-ammé',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-43',
    french: 'Je ne comprends pas le sérère',
    serere: 'Nandiram o Seereer ole',
    phonetic: 'Nand-i-rame o Sé-ré-rr olé',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-44',
    french: 'Répète encore une fois',
    serere: 'Jalaatel fa leung',
    phonetic: 'Djalaatél fa leunge',
    dialectContext: 'Saloum',
    category: 'Expressions Courantes'
  },
  {
    id: 's-45',
    french: 'Parle doucement',
    serere: 'Fii fo teeb',
    phonetic: 'Fi fo tébe',
    dialectContext: 'Sine',
    category: 'Expressions Courantes'
  },
  {
    id: 's-46',
    french: 'Qu’est-ce que c’est ?',
    serere: 'Xeex refu xaye ?',
    phonetic: 'Khé-ékh réfou khayé ?',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-47',
    french: 'Où vas-tu ?',
    serere: 'Mbe gayo ? / Mbe lado ?',
    phonetic: 'Mbé gay-yo ?',
    dialectContext: 'Commun',
    category: 'Orientation & Voyage'
  },
  {
    id: 's-48',
    french: 'Je vais au champ',
    serere: 'Mbagam o qool ole',
    phonetic: 'Mba-gamm o krole olé',
    dialectContext: 'Sine',
    category: 'Orientation & Voyage'
  },
  {
    id: 's-49',
    french: 'Je vais au village',
    serere: 'Mbagam ka mbind',
    phonetic: 'Mba-gamm ka mbinde',
    dialectContext: 'Saloum',
    category: 'Orientation & Voyage'
  },
  {
    id: 's-50',
    french: 'Donne-moi de l’eau à boire',
    serere: 'Ndoxe mi mbilam a mboñ',
    phonetic: 'Ndokhé mi mbillam a mbony',
    dialectContext: 'Commun',
    category: 'Expressions Courantes',
    culturalNote: 'Offrir de l’eau est le premier devoir d’hospitalité à tout voyageur.'
  },
  {
    id: 's-51',
    french: 'J’ai faim',
    serere: 'Wegame',
    phonetic: 'Wég-ammé',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-52',
    french: 'J’ai soif',
    serere: 'Mbilam maram',
    phonetic: 'Mbille-amm maramm',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-53',
    french: 'Le repas est prêt',
    serere: 'Ñaam ole a ñofu',
    phonetic: 'Nyaam olé a nyo-fou',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-54',
    french: 'Viens manger avec nous',
    serere: 'Gar no ñaam',
    phonetic: 'Garr no nyaam',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },
  {
    id: 's-55',
    french: 'Je suis rassasié, merci',
    serere: 'Haarame, jerejef',
    phonetic: 'Khaarr-ammé, djiérédjiéf',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  },

  // 5. Famille & Respect
  {
    id: 's-56',
    french: 'Mon père',
    serere: 'Faam / Baaba am',
    phonetic: 'Fa-amm / Ba-ba am',
    dialectContext: 'Commun',
    category: 'Famille & Respect'
  },
  {
    id: 's-57',
    french: 'Ma mère',
    serere: 'Yaam / Ndeey am',
    phonetic: 'Ya-amm / Ndey am',
    dialectContext: 'Commun',
    category: 'Famille & Respect'
  },
  {
    id: 's-58',
    french: 'Mon grand-père',
    serere: 'Mame oxu kor oxu',
    phonetic: 'Mame o-khou korr',
    dialectContext: 'Sine',
    category: 'Famille & Respect'
  },
  {
    id: 's-59',
    french: 'Ma grand-mère',
    serere: 'Mame oxu tew oxu',
    phonetic: 'Mame o-khou téw',
    dialectContext: 'Sine',
    category: 'Famille & Respect'
  },
  {
    id: 's-60',
    french: 'Mon enfant / Mon fils / Ma fille',
    serere: 'Bi am',
    phonetic: 'Bi amm',
    dialectContext: 'Commun',
    category: 'Famille & Respect'
  },
  {
    id: 's-61',
    french: 'Mon frère / Ma sœur',
    serere: 'Ndaan am',
    phonetic: 'Nda-ann amm',
    dialectContext: 'Saloum',
    category: 'Famille & Respect'
  },
  {
    id: 's-62',
    french: 'Mon ami(e)',
    serere: 'Kharit am / O tew am',
    phonetic: 'Kharite amm',
    dialectContext: 'Commun',
    category: 'Famille & Respect'
  },
  {
    id: 's-63',
    french: 'La maison / Le foyer',
    serere: 'Mbind ne',
    phonetic: 'Mbinde né',
    dialectContext: 'Commun',
    category: 'Famille & Respect'
  },
  {
    id: 's-64',
    french: 'Que Dieu vous bénisse',
    serere: 'Roog a barkele',
    phonetic: 'Rog a barké-lé',
    dialectContext: 'Commun',
    category: 'Famille & Respect',
    culturalNote: '"Roog" est le Créateur suprême dans la cosmologie traditionnelle sérère.'
  },
  {
    id: 's-65',
    french: 'Que Dieu apporte la paix dans la famille',
    serere: 'Roog a deba jam no mbind ne',
    phonetic: 'Rog a déba djam no mbind né',
    dialectContext: 'Sine',
    category: 'Famille & Respect'
  },

  // 6. Proverbes et Sagesse Sérère
  {
    id: 's-66',
    french: 'L’union fait la force',
    serere: 'O teb oleng a daawul famban',
    phonetic: 'O téb oléng a da-woul fambane',
    dialectContext: 'Sine',
    category: 'Expressions Courantes',
    culturalNote: 'Proverbe traditionnel rappelant la solidarité communautaire.'
  },
  {
    id: 's-67',
    french: 'La patience porte toujours ses fruits',
    serere: 'Muny a jega jegaat',
    phonetic: 'Mougny a djéga djégaat',
    dialectContext: 'Saloum',
    category: 'Expressions Courantes'
  },
  {
    id: 's-68',
    french: 'Le travail ennoblit l’homme',
    serere: 'Ligey refu ngor',
    phonetic: 'Li-guèye ré-fou ngorr',
    dialectContext: 'Baol',
    category: 'Expressions Courantes'
  },
  {
    id: 's-69',
    french: 'L’eau douce abreuve la terre généreuse',
    serere: 'Mbilam a yif qool ole',
    phonetic: 'Mbille-am a yif krol olé',
    dialectContext: 'Saloum',
    category: 'Expressions Courantes'
  },
  {
    id: 's-70',
    french: 'Celui qui écoute apprendra beaucoup',
    serere: 'Oxu nandanga a jalaat a jang',
    phonetic: 'O-khou nandanga a djalaat a djang',
    dialectContext: 'Commun',
    category: 'Expressions Courantes'
  }
];
