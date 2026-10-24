import { Course } from '../types';
import {
  courseDevPersonnel,
  courseOngManagement,
  courseOngFinance,
  courseSerereDelta,
  posterCompetencesVie,
  posterOcbOng,
  posterRapprochementsBancaires,
  posterWolof90Jours,
  directorAvatar,
} from '../assets/images';

export const OFFICIAL_FLYER_COURSES: Course[] = [
  // 1. COMPÉTENCES DE VIE (Formation de 20 HEURES) - 150 000 FCFA (230 €)
  {
    id: 'competences-de-vie',
    title: 'Compétences de Vie (Life Skills)',
    subtitle: 'Formation certifiante de 20 HEURES en ligne ou en présentiel : Maîtrisez la gestion des émotions, la responsabilité, l\'écoute active, l\'attitude positive, les objectifs et la confiance en soi.',
    badge: 'Formation Certifiante 20H · 150 000 FCFA',
    category: 'personnel',
    categoryLabel: 'Compétences de Vie & Soft Skills',
    price: 150000,
    priceEur: 230,
    originalPrice: 220000,
    durationWeeks: '20 heures intensives (ou 4 semaines)',
    totalHours: '20h de formation certifiante',
    videoCount: 22,
    pdfCount: 18,
    imageUrl: courseDevPersonnel,
    posterUrl: posterCompetencesVie,
    modalities: ['online', 'presentiel'],
    formats: ['individuel', 'groupe'],
    audienceTarget: ['personnel', 'entreprises', 'etudiants'],
    contactPhone: '+221 77 507 91 84',
    contactEmail: 'adonaywaly5@gmail.com',
    paymentMethods: ['Wave', 'Orange Money', 'Ria', 'Western Union'],
    bonusTitle: 'Pack Épanouissement & Tests Psychométriques Inclus',
    bonuses: [
      'Accès illimité 24h/24 et 7j/7 aux 9 modules et vidéos explicatives',
      'Supports de cours téléchargeables (PDF, fiches d\'exercices d\'introspection)',
      'Attestation officielle de formation signée par Ephata Consulting Group',
      'Accompagnement et coaching personnalisé avec Alouise Emmanuel Diouf',
      'Séances pratiques d\'affirmation de soi et prise de parole en public'
    ],
    keyFeatures: [
      'Formation de 20 HEURES dispensée en ligne ou en présentiel',
      'Tarif officiel : 150 000 FCFA (soit 230 €)',
      'Les 9 modules cardinaux du savoir-être et du leadership individuel',
      'Paiement sécurisé Wave, Orange Money, Ria, Western Union'
    ],
    description: 'Une formation transformationnelle de 20 heures dispensée par Ephata Consulting Group pour révéler votre plein potentiel. Que ce soit pour exceller en entreprise, réussir vos projets ou assainir vos relations humaines, vous développerez les compétences comportementales indispensables : gestion du stress et des émotions, écoute active, attitude constructive, fixation d\'objectifs ambitieux et confiance en soi inébranlable.',
    targetAudience: [
      'Cadres, employés et managers souhaitant maîtriser leur intelligence émotionnelle',
      'Jeunes diplômés et étudiants préparant leur insertion professionnelle',
      'Entrepreneurs et chefs d\'équipe désirant inspirer confiance et leadership',
      'Toute personne engagée dans une démarche de croissance personnelle durable'
    ],
    prerequisites: 'Aucun prérequis. Ouvert à toute personne désireuse d\'accroître son impact personnel et relationnel.',
    instructor: {
      name: 'Alouise Emmanuel Diouf',
      title: 'Directeur de la Formation · Ephata Consulting Group',
      bio: 'Plus de 15 années d\'expertise terrain dans la gouvernance institutionnelle, le coaching comportemental et le renforcement des compétences de vie au Sénégal.',
      avatarUrl: directorAvatar,
      email: 'adonaywaly5@gmail.com'
    },
    modules: [
      {
        id: 'cdv-m1',
        number: 1,
        title: 'Gérer les émotions fortes',
        description: 'Intelligence émotionnelle appliquée, décodage de la colère, de la peur et de la frustration, mécanismes de désamorçage du stress aigu.',
        duration: '2h 15m',
        lessons: [
          {
            id: 'cdv-m1-l1',
            title: 'Comprendre et apprivoiser ses déclencheurs émotionnels',
            duration: '25 min',
            type: 'video',
            summary: 'L\'émotion comme signal physiologique d\'alarme et non comme fatalité incontrôlable.',
            videoDuration: 1500,
            textContent: [
              'Les émotions fortes (colère, anxiété, déception) ne doivent être ni refoulées ni subies : elles doivent être identifiées avec précision.',
              'La méthode STOP : S\'arrêter, Temporiser, Observer sa respiration, Procéder avec calme et lucidité.'
            ],
            keyTakeaways: [
              'Une réaction impulsive détruit des mois de travail relationnel en 10 secondes.',
              'Nommer l\'émotion diminue immédiatement son intensité neuronale.'
            ]
          },
          {
            id: 'cdv-m1-l2',
            title: 'Transformer l\'énergie négative en action constructive',
            duration: '20 min',
            type: 'reading',
            summary: 'Canaliser la pression pour trouver des solutions plutôt que d\'accuser son environnement.',
            textContent: [
              'Dans les moments de haute tension professionnelle, le leader lucide garde la maîtrise de son langage corporel et de son débit verbal.'
            ]
          }
        ]
      },
      {
        id: 'cdv-m2',
        number: 2,
        title: 'Faire preuve de responsabilité',
        description: 'La posture proactive, abandon du victimisme, acceptation de ses erreurs et sens élevé du devoir professionnel et moral.',
        duration: '2h 00m',
        lessons: [
          {
            id: 'cdv-m2-l1',
            title: 'Le cercle d\'influence contre le cercle de préoccupation',
            duration: '22 min',
            type: 'video',
            summary: 'Concentrer 100% de son énergie sur ce qui dépend directement de soi.',
            videoDuration: 1320,
            textContent: [
              'Se plaindre de la météo ou de la conjoncture ne produit aucun résultat. La responsabilité commence dès que vous vous demandez : que puis-je faire, ici et maintenant ?'
            ]
          }
        ]
      },
      {
        id: 'cdv-m3',
        number: 3,
        title: 'Savoir écouter',
        description: 'L\'écoute active, le silence fécond, le recueil du non-dit et la reformulation bienveillante sans interrompre.',
        duration: '2h 30m',
        lessons: [
          {
            id: 'cdv-m3-l1',
            title: 'Les 4 niveaux d\'écoute et la reformulation empathique',
            duration: '24 min',
            type: 'video',
            summary: 'Écouter pour comprendre au lieu d\'écouter pour répliquer.',
            videoDuration: 1440,
            textContent: [
              'La plupart des gens n\'écoutent pas avec l\'intention de comprendre, ils écoutent avec l\'intention de répondre.',
              'La reformulation permet de valider le sentiment de l\'autre avant de poser sa propre analyse.'
            ]
          }
        ]
      },
      {
        id: 'cdv-m4',
        number: 4,
        title: 'Le pouvoir de l\'attitude positive',
        description: 'L\'optimisme réaliste, résilience face aux obstacles, reprogrammation des pensées limitantes et contagion émotionnelle positive.',
        duration: '2h 15m',
        lessons: [
          {
            id: 'cdv-m4-l1',
            title: 'Forger un mental d\'acier face aux revers',
            duration: '26 min',
            type: 'video',
            summary: 'L\'attitude positive n\'est pas l\'ignorance des difficultés, mais la conviction inaltérable qu\'une issue honorable existe.',
            videoDuration: 1560,
            textContent: [
              'Ce qui vous arrive ne compte que pour 10% ; les 90% restants sont déterminés par votre réaction face à l\'événement.'
            ]
          }
        ]
      },
      {
        id: 'cdv-m5',
        number: 5,
        title: 'Les valeurs personnelles',
        description: 'Définir sa boussole morale, aligner ses choix quotidiens avec ses convictions profondes et préserver son intégrité.',
        duration: '2h 00m',
        lessons: [
          {
            id: 'cdv-m5-l1',
            title: 'Identifier ses valeurs non négociables',
            duration: '20 min',
            type: 'reading',
            summary: 'Clarifier ses piliers : honnêteté, famille, travail bien fait, justice, dépassement de soi.',
            textContent: [
              'Une décision prise en conformité avec ses valeurs fondamentales n\'engendre jamais de regrets amers.'
            ]
          }
        ]
      },
      {
        id: 'cdv-m6',
        number: 6,
        title: 'Se fixer des objectifs et les réaliser',
        description: 'Méthodologie SMART, découpage en jalons hebdomadaires, suivi d\'exécution et discipline de fer sans procrastination.',
        duration: '2h 30m',
        lessons: [
          {
            id: 'cdv-m6-l1',
            title: 'Passer du vœu pieux au plan d\'action chirurgical',
            duration: '28 min',
            type: 'video',
            summary: 'Spécifique, Mesurable, Atteignable, Réaliste et Temporellement défini.',
            videoDuration: 1680,
            textContent: [
              'Un objectif sans calendrier écrit n\'est qu\'une illusion. Vous apprendrez à établir votre feuille de route sur 90 jours.'
            ]
          }
        ]
      },
      {
        id: 'cdv-m7',
        number: 7,
        title: 'Soigner son image',
        description: 'Cohérence entre discours et apparence, posture corporelle, hygiène de vie, respect des codes vestimentaires et dignité personnelle.',
        duration: '2h 00m',
        lessons: [
          {
            id: 'cdv-m7-l1',
            title: 'Le vêtement comme message et respect de son interlocuteur',
            duration: '20 min',
            type: 'video',
            summary: 'Votre tenue parle avant même que vous n\'ouvriez la bouche.',
            videoDuration: 1200,
            textContent: [
              'Dans le milieu professionnel sénégalais et international, soigner son allure témoigne de la rigueur que vous mettrez dans votre travail.'
            ]
          }
        ]
      },
      {
        id: 'cdv-m8',
        number: 8,
        title: 'Donner une première impression positive',
        description: 'Les 30 premières secondes décisives, le contact visuel franc, la salutation chaleureuse et la formule d\'accroche captivante.',
        duration: '2h 15m',
        lessons: [
          {
            id: 'cdv-m8-l1',
            title: 'Maîtriser les 30 premières secondes d\'une rencontre',
            duration: '22 min',
            type: 'video',
            summary: 'Le sourire sincère, l\'ancrage au sol et l\'aisance relationnelle immédiate.',
            videoDuration: 1320,
            textContent: [
              'Vous n\'aurez jamais une deuxième chance de faire une bonne première impression.'
            ]
          }
        ]
      },
      {
        id: 'cdv-m9',
        number: 9,
        title: 'Développer la confiance en soi',
        description: 'Vaincre le syndrome de l\'imposteur, s\'affirmer sans arrogance, célébrer ses victoires et oser prendre la parole devant un auditoire.',
        duration: '2h 45m',
        lessons: [
          {
            id: 'cdv-m9-l1',
            title: 'Construire une estime de soi inébranlable',
            duration: '30 min',
            type: 'video',
            summary: 'L\'audace de s\'exprimer avec assurance et conviction.',
            videoDuration: 1800,
            textContent: [
              'La confiance en soi n\'est pas innée : elle se muscle par de petites victoires quotidiennes et l\'acceptation sereine de sa vulnérabilité.'
            ]
          }
        ],
        quiz: {
          title: 'Quiz Final : Validation des 9 Compétences de Vie',
          questions: [
            {
              id: 'cdv-q1',
              question: 'Quelle est la première étape de la gestion d\'une émotion vive telle que la colère ?',
              options: [
                'Crier immédiatement pour évacuer la tension',
                'Prendre un temps d\'arrêt (STOP), respirer et nommer l\'émotion avec lucidité',
                'Accuser son interlocuteur',
                'Ignorer totalement l\'émotion'
              ],
              correctAnswer: 1,
              explanation: 'La temporisation et la verbalisation calme permettent au cortex préfrontal de reprendre le dessus sur l\'amygdale cérébrale.'
            },
            {
              id: 'cdv-q2',
              question: 'Dans la méthode de fixation d\'objectifs SMART, que signifie la lettre R ?',
              options: [
                'Rapide',
                'Réaliste (ou Pertinent au regard de vos ressources)',
                'Répétitif',
                'Rare'
              ],
              correctAnswer: 1,
              explanation: 'L\'objectif doit être Réaliste et atteignable tout en offrant un défi stimulant pour maintenir la motivation intacte.'
            }
          ]
        }
      }
    ]
  },

  // 2. FORMATION DES ORGANISATIONS COMMUNAUTAIRES DE BASE (OCB) ET ONG LOCALES - 500 000 FCFA (763 €)
  {
    id: 'formation-ocb-ong-locales',
    title: 'Formation des Organisations Communautaires de Base (OCB) et ONG Locales',
    subtitle: 'Programme d\'excellence en présentiel ou en ligne : Évaluation des capacités, procédures administratives, organes statutaires, gestion de la banque/caisse et rédaction du manuel de procédures.',
    badge: 'Programme Spécialisé OCB / ONG · 500 000 FCFA',
    category: 'management',
    categoryLabel: 'Management des OCBs & ONGs Locales',
    price: 500000,
    priceEur: 763,
    originalPrice: 750000,
    durationWeeks: 'Programme intensif (en ligne ou présentiel)',
    totalHours: '40h de formation & accompagnement',
    videoCount: 26,
    pdfCount: 22,
    imageUrl: courseOngManagement,
    posterUrl: posterOcbOng,
    modalities: ['online', 'presentiel'],
    formats: ['individuel', 'groupe'],
    audienceTarget: ['entreprises', 'personnel'],
    contactPhone: '+221 77 507 91 84',
    contactEmail: 'adonaywaly5@gmail.com',
    paymentMethods: ['Wave', 'Orange Money', 'Ria', 'Western Union'],
    bonusTitle: 'Canevas du Manuel de Procédures & Outils de Gestion Inclus',
    bonuses: [
      'Modèle complet et éditable du Manuel de Procédures administratives, financières et comptables (Word/PDF)',
      'Outil standardisé d\'Évaluation des Capacités des OCB (Grille d\'audit OCAT)',
      'Fichiers automatisés Excel pour la gestion conjointe de la Banque et de la Caisse',
      'Modèles officiels de statuts, règlement intérieur et procès-verbaux d\'AG',
      'Attestation officielle et certification délivrée à l\'organisation par Ephata Consulting Group'
    ],
    keyFeatures: [
      'Formation dispensée en présentiel (dans vos locaux ou chez Ephata) ou 100% en ligne',
      'Tarif officiel du programme : 500 000 FCFA (soit 763 €)',
      'Les 7 modules d\'ingénierie institutionnelle essentiels pour convaincre les bailleurs',
      'Moyens de paiement acceptés : Wave, Orange Money, Ria, Western Union'
    ],
    description: 'Une formation de haut niveau conçue pour professionnaliser les OCB, groupements d\'intérêt économique (GIE) communautaires et ONG locales au Sénégal. Dispensée par les consultants d\'Ephata Consulting Group, elle permet de structurer votre gouvernance, fiabiliser la gestion de vos fonds et rédiger votre propre manuel de procédures pour capter les financements des bailleurs de fonds internationaux (UE, USAID, BAD, Agences de l\'ONU, Coopération bilatérale).',
    targetAudience: [
      'Présidents, secrétaires généraux et trésoriers d\'OCBs et associations villageoises',
      'Coordonnateurs de projets et directeurs exécutifs d\'ONGs nationales et locales',
      'Responsables administratifs et financiers (RAF) du tiers-secteur',
      'Partenaires techniques et financiers souhaitant renforcer leurs organisations relais'
    ],
    prerequisites: 'Ouvert à toute équipe dirigeante d\'OCB ou d\'ONG locale motivée par la transparence et la bonne gouvernance.',
    instructor: {
      name: 'Alouise Emmanuel Diouf',
      title: 'Directeur de la Formation · Ephata Consulting Group',
      bio: 'Auditeur chevronné et spécialiste de l\'accompagnement organisationnel et de la structuration des organisations communautaires de base en Afrique de l\'Ouest.',
      avatarUrl: directorAvatar,
      email: 'adonaywaly5@gmail.com'
    },
    modules: [
      {
        id: 'ocb-m1',
        number: 1,
        title: 'Évaluation des capacités des OCBs',
        description: 'Diagnostic institutionnel, gouvernance démocratique, compétences des membres, cartographie des risques organisationnels et plan de renforcement.',
        duration: '5h 00m',
        lessons: [
          {
            id: 'ocb-m1-l1',
            title: 'Méthodologie d\'auto-évaluation des capacités d\'une OCB',
            duration: '30 min',
            type: 'video',
            summary: 'Utiliser la grille d\'audit organisationnel pour identifier les faiblesses avant les audits bailleurs.',
            videoDuration: 1800,
            textContent: [
              'L\'évaluation des capacités permet de mesurer le degré de maturité de l\'OCB sur 5 piliers : gouvernance, administration, gestion financière, gestion des programmes et redevabilité communautaire.'
            ]
          }
        ]
      },
      {
        id: 'ocb-m2',
        number: 2,
        title: 'Les procédures de Gestion Administratives',
        description: 'Circuits de validation des décisions, gestion du courrier entrant/sortant, tenue des registres, archivage physique et numérique des pièces.',
        duration: '5h 30m',
        lessons: [
          {
            id: 'ocb-m2-l1',
            title: 'Organisation du secrétariat et traçabilité des courriers officiels',
            duration: '28 min',
            type: 'reading',
            summary: 'Mettre en place un classeur chrono et un registre de transmission pour éviter la déperdition des correspondances.',
            textContent: [
              'Toute lettre ou convention avec l\'État ou les bailleurs doit être enregistrée avec date, numéro d\'ordre et visa du responsable.'
            ]
          }
        ]
      },
      {
        id: 'ocb-m3',
        number: 3,
        title: 'Les organes de l\'OCB : composition et attribution',
        description: 'Assemblée Générale, Conseil d\'Administration, Bureau Exécutif, Comité de surveillance : rôles, pouvoirs et prévention des conflits d\'intérêts.',
        duration: '6h 00m',
        lessons: [
          {
            id: 'ocb-m3-l1',
            title: 'Clarifier les prérogatives du Bureau Exécutif et du CA',
            duration: '32 min',
            type: 'video',
            summary: 'Éviter la concentration excessive des pouvoirs chez une seule personne pour garantir la pérennité de l\'OCB.',
            videoDuration: 1920,
            textContent: [
              'Le Président impulse et représente légalement la structure, mais ne peut engager des dépenses hors budget sans validation des instances délibérantes.'
            ]
          }
        ]
      },
      {
        id: 'ocb-m4',
        number: 4,
        title: 'Les documents administratifs',
        description: 'Statuts, règlement intérieur, procès-verbaux, récépissé de déclaration, NINEA, contrats de travail et conventions de partenariat.',
        duration: '5h 00m',
        lessons: [
          {
            id: 'ocb-m4-l1',
            title: 'Constituer et sécuriser le dossier juridique permanent de l\'OCB',
            duration: '26 min',
            type: 'reading',
            summary: 'L\'inventaire des pièces maîtresses que tout bailleur exige avant la signature d\'une convention de subvention.',
            textContent: [
              'Conserver toujours 3 copies certifiées conformes du récépissé préfectoral et des statuts signés.'
            ]
          }
        ]
      },
      {
        id: 'ocb-m5',
        number: 5,
        title: 'La gestion de la banque',
        description: 'Ouverture et fonctionnement du compte bancaire, principe de la double signature obligatoire, états de rapprochement et suivi des flux.',
        duration: '6h 00m',
        lessons: [
          {
            id: 'ocb-m5-l1',
            title: 'Sécuriser les opérations bancaires d\'une organisation communautaire',
            duration: '30 min',
            type: 'video',
            summary: 'La règle inviolable de la double signature (Président + Trésorier) pour tout tirage de chèque ou virement.',
            videoDuration: 1800,
            textContent: [
              'Aucun retrait bancaire ne doit s\'effectuer sur simple signature unilatérale dans une organisation communautaire transparente.'
            ]
          }
        ]
      },
      {
        id: 'ocb-m6',
        number: 6,
        title: 'La gestion de la caisse',
        description: 'Tenue du livre de caisse menue monnaie, bons de sortie de caisse, justificatifs originaux, arrêté contradictoire et inventaire physique.',
        duration: '6h 00m',
        lessons: [
          {
            id: 'ocb-m6-l1',
            title: 'Tenue quotidienne rigoureuse du journal de caisse',
            duration: '28 min',
            type: 'reading',
            summary: 'Zéro tolérance pour les dépenses sans reçu : comment documenter les achats de proximité avec des fiches d\'achat valides.',
            textContent: [
              'Le solde comptable de la caisse doit être strictement égal au montant des espèces physiques comptées dans le coffre chaque soir.'
            ]
          }
        ]
      },
      {
        id: 'ocb-m7',
        number: 7,
        title: 'Rédaction du manuel de procédure de gestion financière, administrative et comptable des OCBs',
        description: 'Structure type du manuel, rédaction des fiches de postes, seuils de délégation, circuits d\'achat, adoption formelle et mise en œuvre.',
        duration: '6h 30m',
        lessons: [
          {
            id: 'ocb-m7-l1',
            title: 'Rédiger et faire approuver votre Manuel de Procédures officiel',
            duration: '35 min',
            type: 'video',
            summary: 'Le document de référence indispensable qui rassure les bailleurs de fonds et protège les gestionnaires.',
            videoDuration: 2100,
            textContent: [
              'Le manuel de procédures est la constitution interne de l\'OCB. Il définit qui fait quoi, avec quelle autorisation, et comment l\'opération est contrôlée.',
              'Grâce aux trames fournies par Ephata Consulting Group, votre organisation repart avec un manuel entièrement rédigé et opérationnel.'
            ],
            downloadableResource: {
              name: 'Modele-Complet-Manuel-Procedures-OCB-Ephata.docx',
              fileSize: '2.8 Mo',
              fileType: 'Word / PDF',
              description: 'Canevas intégral et modèle annoté de Manuel de Procédures pour OCB et ONG locales.'
            }
          }
        ],
        quiz: {
          title: 'Quiz de Certification : Gestion des OCBs et ONG Locales',
          questions: [
            {
              id: 'ocb-q1',
              question: 'Quelle est la règle de sécurité financière fondamentale pour les retraits ou virements bancaires d\'une OCB ?',
              options: [
                'La signature unique du trésorier sans contrôle',
                'La double signature conjointe (ex: Président et Trésorier général)',
                'Le retrait verbal au guichet',
                'La délégation à un membre sans mandat'
              ],
              correctAnswer: 1,
              explanation: 'La double signature conjointe est exigée par tous les bailleurs pour garantir la transparence et empêcher tout détournement.'
            },
            {
              id: 'ocb-q2',
              question: 'À quoi sert le Manuel de Procédures d\'une OCB ?',
              options: [
                'À faire de la publicité commerciale',
                'À formaliser les règles administratives, comptables et financières pour assurer la transparence et la régularité',
                'À remplacer les statuts de l\'organisation',
                'À définir les prix de vente sur les marchés'
              ],
              correctAnswer: 1,
              explanation: 'Le manuel de procédures codifie l\'ensemble des opérations internes pour garantir l\'équité, la traçabilité et la conformité aux normes internationales.'
            }
          ]
        }
      }
    ]
  },

  // 3. EXTERNALISER VOS RAPPROCHEMENTS BANCAIRES - 25 000 FCFA (38 €) · Prestation Express 48H
  {
    id: 'service-rapprochements-bancaires',
    title: 'Externaliser vos Rapprochements Bancaires',
    subtitle: 'Sécurisez votre contrôle interne et gagnez du temps grâce à notre prestation d\'expertise comptable express sous 48H. Pointer, Identifier les écarts et Passer les OD.',
    badge: 'Prestation Express 48H · 25 000 FCFA',
    category: 'service',
    categoryLabel: 'Prestation Technique & Contrôle Interne',
    price: 25000,
    priceEur: 38,
    originalPrice: 45000,
    durationWeeks: 'Délai d\'exécution garanti : 48 Heures',
    totalHours: 'Prestation technique sous 48H',
    videoCount: 3,
    pdfCount: 5,
    isService: true,
    executionTime: '48 H',
    imageUrl: courseOngFinance,
    posterUrl: posterRapprochementsBancaires,
    modalities: ['online', 'presentiel'],
    formats: ['individuel'],
    audienceTarget: ['entreprises'],
    contactPhone: '+221 77 507 91 84',
    contactEmail: 'adonaywaly5@gmail.com',
    paymentMethods: ['Wave', 'Orange Money', 'Ria', 'Western Union'],
    bonusTitle: 'Livrables Certifiés Inclus dans la Prestation',
    bonuses: [
      'État de rapprochement bancaire certifié conforme sur Excel et PDF',
      'Tableau synthétique des écarts détectés (agios excessifs, chèques non pointés, doublons)',
      'Fiche d\'opérations diverses (OD) de régularisation comptable prête à saisir',
      'Note de synthèse sur la qualité de votre contrôle interne de trésorerie',
      'Restitution garantie sous 48 heures ouvrées après réception des 3 documents'
    ],
    keyFeatures: [
      'Prestation technique rapide sous 48H chrono',
      'Tarif officiel et transparent : 25 000 FCFA (soit 38 €) par compte bancaire',
      'Processus éprouvé en 3 étapes : 1. Pointer · 2. Identifier les écarts · 3. Passer les OD',
      'Documents simples à transmettre via WhatsApp (+221 77 507 91 84) ou par e-mail'
    ],
    description: 'Vous n\'avez pas le temps ou les ressources comptables en interne pour apurer vos relevés bancaires ? Confiez vos états de rapprochement à l\'équipe d\'experts comptables d\'Ephata Consulting Group. En 48 heures, nous pointons méticuleusement vos écritures, décelons les frais bancaires non justifiés et les erreurs de saisie, et vous livrons un état de rapprochement bancaire impeccable conforme au SYSCOHADA.',
    targetAudience: [
      'Dirigeants de PME/PMI et gérants de commerces souhaitant surveiller leur trésorerie',
      'Responsables administratifs et comptables débordés par la clôture mensuelle',
      'Trésoriers et directeurs d\'ONG devant justifier leurs soldes auprès des bailleurs',
      'Professions libérales (médecins, avocats, consultants, architectes)'
    ],
    prerequisites: 'Fournir les 3 documents nécessaires : 1. Dernier rapprochement bancaire · 2. Transactions comptables du mois · 3. Original du relevé bancaire du mois.',
    instructor: {
      name: 'Pôle Expertise Comptable & Trésorerie',
      title: 'Ephata Consulting Group',
      bio: 'Équipe d\'experts en comptabilité générale et contrôle interne, supervisée par Alouise Emmanuel Diouf.',
      avatarUrl: directorAvatar,
      email: 'adonaywaly5@gmail.com'
    },
    modules: [
      {
        id: 'srb-m1',
        number: 1,
        title: 'Documents à envoyer & Prise en charge sous 48H',
        description: 'Transmission sécurisée de vos pièces comptables pour lancer immédiatement la prestation technique.',
        duration: 'Étape préalable',
        lessons: [
          {
            id: 'srb-m1-l1',
            title: 'Les 3 documents indispensables à transmettre',
            duration: '15 min',
            type: 'reading',
            summary: 'Transmettre par WhatsApp ou e-mail les 3 pièces maîtresses requises.',
            textContent: [
              '1. Votre dernier état de rapprochement bancaire validé (le mois N-1).',
              '2. Le grand-livre ou journal des transactions du compte 521 de votre comptabilité pour le mois en cours.',
              '3. L\'original du relevé bancaire fourni par votre banque pour le mois concerné.',
              'Dès réception, l\'équipe d\'Ephata Consulting accuse réception et démarre le traitement sous 48H.'
            ]
          }
        ]
      },
      {
        id: 'srb-m2',
        number: 2,
        title: 'Le processus en 3 étapes : 1. Pointer · 2. Identifier les écarts · 3. Passer les OD',
        description: 'La rigueur méthodique appliquée par les consultants d\'Ephata Consulting Group.',
        duration: 'Méthodologie',
        lessons: [
          {
            id: 'srb-m2-l1',
            title: 'Étape 1 : Le pointage croisé systématique',
            duration: '20 min',
            type: 'reading',
            summary: 'Rapprochement réciproque des débits comptables avec les crédits bancaires et inversement.',
            textContent: [
              'Nous comparons chaque ligne d\'écriture : montants, dates de valeur, libellés et numéros de chèques pour repérer les correspondances exactes.'
            ]
          },
          {
            id: 'srb-m2-l2',
            title: 'Étape 2 : L\'analyse fine des écarts et anomalies',
            duration: '20 min',
            type: 'reading',
            summary: 'Détection des frais d\'agios abusifs, commissions non comptabilisées et chèques en circulation.',
            textContent: [
              'Les écarts proviennent souvent d\'opérations initiées par la banque sans avis de débit immédiat, ou de chèques émis par l\'entreprise mais non encore encaissés par les bénéficiaires.'
            ]
          },
          {
            id: 'srb-m2-l3',
            title: 'Étape 3 : Passation des OD de régularisation et délivrance de l\'état certifié',
            duration: '20 min',
            type: 'reading',
            summary: 'Livraison de la fiche d\'imputation comptable et de l\'état final de concordance.',
            textContent: [
              'Nous rédigeons les opérations diverses d\'ajustement (frais bancaires, intérêts créditeurs, régularisations) à intégrer dans votre journal d\'OD pour équilibrer parfaitement vos comptes.'
            ]
          }
        ]
      },
      {
        id: 'srb-m3',
        number: 3,
        title: 'Sécuriser durablement son contrôle interne',
        description: 'Conseils pratiques pour prévenir les fraudes sur chèques et optimiser vos relations avec les banques sénégalaises.',
        duration: 'Recommandations',
        lessons: [
          {
            id: 'srb-m3-l1',
            title: 'Les bonnes pratiques de gestion des moyens de paiement',
            duration: '18 min',
            type: 'reading',
            summary: 'Mettre en place un calendrier strict d\'émission des chèques et de consultation des relevés en ligne.',
            textContent: [
              'Le rapprochement bancaire n\'est pas une corvée administrative : c\'est le premier verrou de sécurité contre la fraude et les détournements de fonds en entreprise.'
            ]
          }
        ]
      }
    ]
  },

  // 4. APPRENDRE ET PARLER LE WOLOF EN 90 JOURS - 3 500 FCFA
  {
    id: 'pack-langue-wolof-90-jours',
    title: 'Apprendre et Parler le Wolof en 90 Jours',
    subtitle: 'Méthode accélérée et pratique : 500 expressions utiles du quotidien, 10 expressions indispensables et accompagnement personnalisé.',
    badge: 'Pack Wolof 90 Jours · 3 500 FCFA',
    category: 'langue',
    categoryLabel: 'Pack Langue Wolof & Audio',
    price: 3500,
    priceEur: 6,
    originalPrice: 10000,
    durationWeeks: '90 jours progressifs',
    totalHours: 'Formation 90 jours (en ligne ou présentiel)',
    videoCount: 15,
    pdfCount: 20,
    hasAudioPractice: true,
    imageUrl: courseSerereDelta,
    posterUrl: posterWolof90Jours,
    modalities: ['online', 'presentiel'],
    formats: ['individuel', 'groupe'],
    audienceTarget: ['personnel', 'etudiants'],
    contactPhone: '+221 77 507 91 84',
    contactEmail: 'adonaywaly5@gmail.com',
    paymentMethods: ['Wave', 'Orange Money', 'Ria', 'Western Union'],
    bonusTitle: 'Supports Pratiques & Mémos Audio Inclus',
    bonuses: [
      '500 expressions en wolof avec traduction française et contexte d\'utilisation',
      'Les 10 expressions courantes indispensables pour la politesse et la vie sociale',
      'Supports pratiques téléchargeables (Fiches de cours PDF et mémos de poche)',
      'Accompagnement personnalisé et conseils de prononciation',
      'Formation disponible en ligne ou en présentiel avec accès illimité 24h/24 et 7j/7'
    ],
    keyFeatures: [
      'Pack complet accessible à seulement 3 500 FCFA',
      'Formation de 90 jours adaptée aux grands débutants',
      'Méthode simple, orale et pratique pour progresser à votre rythme',
      'Paiement immédiat Wave, Orange Money, Ria, Western Union'
    ],
    description: 'Parlez enfin le wolof couramment au Sénégal ! Vous vivez à Dakar ou en région, vous êtes issu de la diaspora en vacances au pays, professionnel en mission humanitaire ou conjoint(e) d\'un(e) Sénégalais(e) ? Ce programme immersif de 90 jours a été conçu pour vous permettre de tenir des conversations vivantes, faire vos achats, négocier et tisser des liens chaleureux dans le respect des valeurs de la Teranga.',
    targetAudience: [
      'Membres de la diaspora sénégalaise souhaitant parler la langue de leurs parents',
      'Expatriés, coopérants, diplomates et membres d\'ONG en poste au Sénégal',
      'Conjoint(e)s de Sénégalais(e)s désireux de dialoguer naturellement avec leur belle-famille',
      'Touristes et voyageurs préparant un séjour immersif'
    ],
    prerequisites: 'Aucune notion préalable en wolof. La méthode commence dès les salutations de base.',
    instructor: {
      name: 'Pôle Langues Nationales & Culture',
      title: 'Ephata Consulting Group',
      bio: 'Linguistes et pédagogues spécialistes de la transmission vivante du wolof contemporain.',
      avatarUrl: directorAvatar,
      email: 'adonaywaly5@gmail.com'
    },
    modules: [
      {
        id: 'wolof-m1',
        number: 1,
        title: 'Les 10 expressions courantes indispensables',
        description: 'Les salutations sacrées, politesse, codes sociaux, demander des nouvelles de la famille et répondre dans la paix.',
        duration: '1h 30m',
        lessons: [
          {
            id: 'wolof-m1-l1',
            title: 'Saluer et s\'enquérir de la paix : Na nga def ? Jam rek !',
            duration: '20 min',
            type: 'video',
            summary: 'Maîtriser les civilités : Nanga def (Comment vas-tu ?), Mangi fi rek (Je suis là en paix), Jërëjëf (Merci), Ba beneen yoon (À la prochaine).',
            videoDuration: 1200,
            textContent: [
              'Au Sénégal, saluer est un art social indispensable qui précède toute conversation.',
              'Les formules clés : "Na nga def ?" (Comment vas-tu ?), réponse : "Mangi fi rek" (Je vais bien).',
              '"Naka sa waakër ?" (Comment va la famille ?), réponse : "Ñu ngi fi ci jam" (Ils sont là dans la paix).'
            ]
          }
        ]
      },
      {
        id: 'wolof-m2',
        number: 2,
        title: 'Les 500 expressions utiles du quotidien',
        description: 'Prendre le taxi, négocier au marché Sandaga ou Kermel, commander un plat de Ceebu jën, demander son chemin et exprimer ses besoins.',
        duration: '3h 00m',
        lessons: [
          {
            id: 'wolof-m2-l1',
            title: 'Négocier et faire ses achats : Ñaata la ? Wàññi ko !',
            duration: '25 min',
            type: 'video',
            summary: 'Le vocabulaire des prix, compter en wolof et marchander avec humour et respect.',
            videoDuration: 1500,
            textContent: [
              '"Ñaata la ?" (Combien ça coûte ?), "Dafa seer lool" (C\'est trop cher !), "Wàññi ko tuuti" (Baisse un peu s\'il te plaît).',
              'Savoir compter en wolof : Benn (1), Ñaar (2), Ñett (3), Ñent (4), Juróom (5), Fukki (10).'
            ]
          },
          {
            id: 'wolof-m2-l2',
            title: 'Se déplacer en taxi et car rapide : Fii laay wàcce !',
            duration: '22 min',
            type: 'video',
            summary: 'Indiquer sa destination, négocier la course et demander l\'arrêt.',
            videoDuration: 1320,
            textContent: [
              '"Yóbb ma Plateau" (Emmène-moi au Plateau), "Fii laay wàcce" (Je descends ici), "May ma sama weccit" (Donne-moi ma monnaie).'
            ]
          }
        ]
      },
      {
        id: 'wolof-m3',
        number: 3,
        title: 'Apprendre la langue wolof : progresser sur 90 jours',
        description: 'La structure des phrases simples, les pronoms, conjugaison intuitive du présent et passé, et immersion pratique.',
        duration: '3h 30m',
        lessons: [
          {
            id: 'wolof-m3-l1',
            title: 'Construire ses premières phrases autonomes en wolof',
            duration: '28 min',
            type: 'video',
            summary: 'Mécanismes simples pour exprimer ses envies : Dama bëgg... (Je veux...), Xawma... (Je ne sais pas...).',
            videoDuration: 1680,
            textContent: [
              'Le wolof est une langue très logique et rythmée sans genre grammatical complexe (pas de masculin/féminin compliqué).',
              'En pratiquant 15 minutes par jour pendant 90 jours, vous serez capable de converser avec n\'importe quel interlocuteur sénégalais.'
            ],
            downloadableResource: {
              name: 'Guide-500-Expressions-Wolof-Ephata.pdf',
              fileSize: '1.9 Mo',
              fileType: 'PDF',
              description: 'Livret pratique des 500 expressions usuelles en wolof avec phonétique et lexique thématique.'
            }
          }
        ],
        quiz: {
          title: 'Quiz de Wolof : Les Expressions Indispensables',
          questions: [
            {
              id: 'wolof-q1',
              question: 'Que signifie l\'expression sénégalaise universelle "Jërëjëf" ?',
              options: [
                'Au revoir',
                'Merci',
                'Pardon',
                'S\'il vous plaît'
              ],
              correctAnswer: 1,
              explanation: '"Jërëjëf" est le mot wolof pour remercier chaleureusement son interlocuteur.'
            },
            {
              id: 'wolof-q2',
              question: 'Comment demande-t-on poliment le prix d\'un article au marché en wolof ?',
              options: [
                'Fan nga jëm ?',
                'Ñaata la ?',
                'Lu xew ?',
                'Ban waxtu la ?'
              ],
              correctAnswer: 1,
              explanation: '"Ñaata la ?" signifie "Combien ça coûte ?".'
            }
          ]
        }
      }
    ]
  }
];
