import { Course } from '../types';
import {
  courseOngFinance,
  courseReussirEntrepreneuriat,
  directorAvatar,
} from '../assets/images';

export const NEW_COURSES: Course[] = [
  {
    id: "gestion-financiere-ong",
    title: "Gestion Financière et Comptabilité des ONGs",
    subtitle: "Formation en ligne certifiante : Maîtrisez la comptabilité des projets non lucratifs, les budgets bailleurs (UE, USAID, AFD), la gestion de trésorerie et les audits.",
    badge: "Formation en Ligne Certifiante",
    category: "finance",
    categoryLabel: "Gestion Financière des ONGs",
    price: 100000,
    priceEur: 155,
    originalPrice: 160000,
    durationWeeks: "6 semaines",
    totalHours: "35h d'apprentissage certifiant",
    videoCount: 24,
    pdfCount: 18,
    bonusTitle: "Pack Outils Comptables & Canevas Bailleurs Inclus",
    bonuses: [
      "Accès complet 24h/24 et 7j/7 aux modules et vidéos explicatives",
      "Matrice Excel de comptabilité et plan comptable SYSCOHADA entités à but non lucratif",
      "Modèles officiels de budget et rapports financiers bailleurs (UE, USAID, AFD, PNUD)",
      "Guide pratique de préparation aux audits financiers et conformité fiscale au Sénégal",
      "Certificat de formation certifiante délivré et signé par Ephata Consulting Group"
    ],
    imageUrl: courseOngFinance,
    keyFeatures: [
      "Formation par module 100% en ligne certifiante",
      "Tarif officiel : 100 000 FCFA (155 €)",
      "Études de cas réels sur budgets de subvention et clôtures comptables",
      "Accompagnement par des experts comptables et auditeurs d'ONG"
    ],
    audienceTarget: ["entreprises", "personnel", "etudiants"],
    modalities: ["online", "presentiel"],
    formats: ["individuel", "groupe"],
    description: "Une formation certifiante de haut niveau conçue pour les directeurs financiers, comptables de projets, chefs de mission et gestionnaires administratifs des ONGs et associations en Afrique. Vous maîtriserez la comptabilisation des subventions, le suivi budgétaire multi-bailleurs, la justification des dépenses éligibles et la gestion des contrôles fiscaux et audits externes.",
    targetAudience: [
      "Comptables, gestionnaires administratifs et financiers (RAF) d'ONG et associations",
      "Chefs de projet et coordinateurs gérant des budgets de bailleurs internationaux",
      "Auditeurs internes et commissaires aux comptes intervenant dans le secteur associatif",
      "Diplômés en comptabilité et finance souhaitant se spécialiser dans les ONGs"
    ],
    prerequisites: "Bases en gestion ou comptabilité générale souhaitées. Motivation pour le secteur non-lucratif.",
    contactPhone: "+221 77 507 91 84",
    contactEmail: "adonaywaly5@gmail.com",
    instructor: {
      name: "Alouise Emmanuel Diouf",
      title: "Directeur de la Formation · Ephata Consulting Group",
      bio: "Expert en gouvernance financière, audit de projets internationaux et accompagnement institutionnel des ONG au Sénégal et en Afrique de l'Ouest.",
      avatarUrl: directorAvatar,
      email: "adonaywaly5@gmail.com"
    },
    modules: [
      {
        id: "gfc-m1",
        number: 1,
        title: "Cadre comptable spécifique aux ONG et SYSCOHADA révisé",
        description: "Principes généraux de la comptabilité des entités à but non lucratif (EBNL), plan des comptes adapté et traitement des subventions.",
        duration: "5h 00m",
        lessons: [
          {
            id: "gfc-m1-l1",
            title: "Spécificités comptables du secteur non lucratif en zone OHADA",
            duration: "25 min",
            type: "video",
            summary: "Comprendre les particularités du système comptable SYSCOHADA pour les associations, fondations et ONG.",
            videoDuration: 1500,
            videoSlides: [
              {
                timestamp: 0,
                title: "Introduction au SYSCOHADA entités à but non lucratif",
                bulletPoints: ["Absence de capital social : la notion de fonds associatifs", "Distinction entre charges d'exploitation et coûts directs de projets", "Obligation de traçabilité par convention de financement"]
              },
              {
                timestamp: 500,
                title: "Comptabilisation des subventions et conventions",
                bulletPoints: ["Subventions de fonctionnement vs subventions d'équipement", "Traitement des fonds reportés et non consommés", "Principe de rattachement des produits aux charges"]
              },
              {
                timestamp: 1000,
                title: "Plan de comptes sectoriel ONG",
                bulletPoints: ["Classes de comptes dédiées aux projets", "Codification analytique par bailleur, composante et activité", "Tenue de la comptabilité en multi-devises (FCFA, EUR, USD)"]
              }
            ],
            textContent: [
              "La gestion comptable des ONG obéit à une double exigence : respecter les normes comptables SYSCOHADA en vigueur dans l'espace OHADA, et satisfaire aux exigences contractuelles strictes des bailleurs de fonds.",
              "Chaque fonds reçu doit faire l'objet d'une traçabilité analytique rigoureuse : un franc reçu pour une activité de santé ne peut en aucun cas être affecté à une activité éducative sans accord formel écrit du bailleur.",
              "Le traitement comptable des subventions non encore consommées en fin d'exercice nécessite la constitution de produits constatés d'avance ou de fonds reportés afin de ne pas fausser le résultat de l'organisation."
            ],
            keyTakeaways: [
              "Le plan comptable d'une ONG doit intégrer une comptabilité analytique multi-bailleurs dès l'origine.",
              "Les subventions reçues sont comptabilisées en fonction de l'avancement réel des dépenses éligibles.",
              "La séparation stricte des fonds entre différents projets est une règle d'or incontournable."
            ],
            downloadableResource: {
              name: "Plan-Comptable-SYSCOHADA-ONG-Excel.xlsx",
              fileSize: "1.2 Mo",
              fileType: "Excel",
              description: "Modèle de plan de comptes annoté pour ONG avec matrice analytique par projet."
            }
          },
          {
            id: "gfc-m1-l2",
            title: "Tenue des journaux et pièces comptables d'une ONG",
            duration: "30 min",
            type: "reading",
            summary: "Organisation pratique du classement, validation des bons de commande, ordres de paiement et tenue du journal de caisse.",
            textContent: [
              "Une écriture comptable sans pièce justificative probante est systématiquement rejetée lors des audits de bailleurs.",
              "Toute dépense doit suivre un circuit de validation strict : bon de commande, bon de livraison, facture originale acquittée et bon à payer signé par le Directeur de projet.",
              "La gestion de la caisse menue monnaie doit faire l'objet d'un plafonnement strict et d'arrêtés contradictoires réguliers."
            ],
            keyTakeaways: [
              "Toujours conserver les originaux des factures avec cachet 'Payé par subvention [Nom Bailleur]'.",
              "Tout décaissement supérieur au seuil défini dans le manuel de procédures doit s'effectuer par virement ou chèque bancaire."
            ]
          }
        ],
        quiz: {
          title: "Quiz Module 1 : Cadre comptable des ONG",
          questions: [
            {
              id: "gfc-q1-1",
              question: "Comment traite-t-on comptablement une subvention reçue pour un projet mais non encore dépensée en fin d'exercice ?",
              options: [
                "On la comptabilise en bénéfice net distribuable",
                "On la comptabilise en fonds dédiés / produits constatés d'avance pour l'exercice suivant",
                "On la restitue automatiquement sans préavis",
                "On l'ignore dans le bilan"
              ],
              correctAnswer: 1,
              explanation: "La subvention non consommée constitue un engagement envers le bailleur et doit être reportée au bilan sous forme de produits constatés d'avance ou fonds dédiés."
            },
            {
              id: "gfc-q1-2",
              question: "Quelle est la pièce maîtresse indispensable pour valider une dépense de mission terrain ?",
              options: [
                "Un simple accord verbal du comptable",
                "L'ordre de mission visé, les factures originales d'hôtel/transport et le rapport de mission",
                "Une promesse d'achat",
                "Un reçu manuscrit non numéroté"
              ],
              correctAnswer: 1,
              explanation: "L'ordre de mission visé avec factures d'hébergement et rapport d'activité constitue le dossier justificatif exigé par tous les bailleurs institutionnels."
            }
          ]
        }
      },
      {
        id: "gfc-m2",
        number: 2,
        title: "Élaboration budgétaire et planification financière des projets",
        description: "Construction de budgets bailleurs (lignes directes, coûts partagés, imprévus) et suivi budgétaire temps réel.",
        duration: "5h 30m",
        lessons: [
          {
            id: "gfc-m2-l1",
            title: "Méthodologie de construction d'un budget de subvention",
            duration: "28 min",
            type: "video",
            summary: "Construire un budget détaillé respectant les canevas types UE, USAID et AFD.",
            videoDuration: 1680,
            textContent: [
              "Le budget est la traduction financière du cadre logique du projet. Chaque activité prévue doit correspondre à une ligne budgétaire claire avec unité de mesure, quantité et coût unitaire.",
              "Les coûts indirects ou frais généraux de l'ONG (loyer du siège, direction générale) doivent être négociés dans la limite du taux plafond autorisé par le bailleur (généralement 7% à 10%).",
              "Le suivi budgétaire mensuel compare les dépenses réelles engagées avec le budget prévisionnel pour détecter immédiatement les écarts et surcoûts."
            ],
            keyTakeaways: [
              "Ne jamais sous-estimer les coûts d'audit, de transport et d'évaluation finale dans le budget initial.",
              "Un écart budgétaire supérieur à 10% par ligne requiert généralement une demande d'avenant préalable au bailleur."
            ],
            downloadableResource: {
              name: "Matrice-Budget-Projet-Multi-Bailleurs.xlsx",
              fileSize: "850 Ko",
              fileType: "Excel",
              description: "Feuille de calcul dynamique pour concevoir et suivre un budget de projet humanitaire ou de développement."
            }
          }
        ]
      },
      {
        id: "gfc-m3",
        number: 3,
        title: "Procédures de décaissement, trésorerie et gestion des avances",
        description: "Appels de fonds, gestion des comptes bancaires de projet, avances de fonctionnement et rapprochements bancaires.",
        duration: "4h 30m",
        lessons: [
          {
            id: "gfc-m3-l1",
            title: "Planification de trésorerie et demandes d'avances de fonds",
            duration: "24 min",
            type: "video",
            summary: "Rédiger des prévisions de trésorerie trimestrielles fiables pour éviter les ruptures de caisse sur le terrain.",
            videoDuration: 1440,
            textContent: [
              "Les bailleurs de fonds libèrent les tranches de financement sur la base de justificatifs des dépenses passées et de plans prévisionnels de trésorerie pour le trimestre à venir.",
              "La maîtrise du calendrier des appels de fonds garantit la continuité des activités sur le terrain sans dépendre de découverts bancaires souvent interdits.",
              "Les états de rapprochement bancaire mensuels doivent être systématiquement visés par le Responsable Administratif et Financier et le Directeur Exécutif."
            ],
            keyTakeaways: [
              "Effectuer le rapprochement bancaire dans les 5 premiers jours de chaque mois.",
              "Toute avance de frais octroyée à un agent de terrain doit être justifiée sous 7 jours ouvrés avant tout nouveau décaissement."
            ]
          }
        ]
      },
      {
        id: "gfc-m4",
        number: 4,
        title: "Passation des marchés, contrôle interne et prévention de la fraude",
        description: "Seuils d'achat, demandes de cotations (proformas), comités de sélection et cartographie des risques financiers.",
        duration: "5h 00m",
        lessons: [
          {
            id: "gfc-m4-l1",
            title: "Règles de mise en concurrence et procédures d'achat éligibles",
            duration: "26 min",
            type: "reading",
            summary: "Mettre en place des règles strictes de devis comparatifs et fiches d'analyse d'offres pour garantir l'éligibilité.",
            textContent: [
              "Le non-respect des règles de passation des marchés est la première cause de dépenses rejetées (dépenses inéligibles remboursables) lors des audits.",
              "Pour tout achat supérieur aux seuils conventionnés (ex: 500 000 FCFA ou 2 000 €), au moins trois factures proforma concurrentes et indépendantes sont obligatoires.",
              "La séparation des fonctions entre l'ordonnateur de la dépense, l'acheteur, le réceptionnaire du matériel et le payeur constitue le rempart principal contre les conflits d'intérêts."
            ],
            keyTakeaways: [
              "Rédiger systématiquement un procès-verbal de dépouillement et de choix du fournisseur.",
              "Conserver la preuve de solvabilité et d'enregistrement légal de chaque prestataire (NINEA, registre de commerce)."
            ]
          }
        ]
      },
      {
        id: "gfc-m5",
        number: 5,
        title: "Rapports financiers périodiques et clôture des projets",
        description: "Élaboration des rapports financiers intermédiaires et finaux, gestion des reliquats et inventaire des actifs de projet.",
        duration: "5h 00m",
        lessons: [
          {
            id: "gfc-m5-l1",
            title: "Montage du rapport financier officiel pour le bailleur",
            duration: "30 min",
            type: "video",
            summary: "Concilier grand livre comptable, rapport narratif d'activités et format de restitution financière contractuel.",
            videoDuration: 1800,
            textContent: [
              "Le rapport financier doit être en parfaite concordance avec le rapport narratif : chaque activité rapportée doit avoir son pendant chiffré dans les dépenses.",
              "La réconciliation entre les fonds reçus, les dépenses réelles certifiées et le solde de trésorerie disponible est obligatoire.",
              "En fin de projet, le plan de transfert ou de dévolution des actifs (véhicules, ordinateurs, équipements) aux communautés ou partenaires doit être approuvé par le bailleur."
            ],
            keyTakeaways: [
              "Soumettre les rapports financiers dans les délais stricts contractuels (souvent 30 à 60 jours après clôture de période).",
              "Tenir un registre d'immobilisations rigoureusement à jour avec numéros d'inventaire physiques."
            ]
          }
        ]
      },
      {
        id: "gfc-m6",
        number: 6,
        title: "Fiscalité des ONG et gestion des audits financiers externes",
        description: "Exonérations fiscales au Sénégal, TVA, retenues à la source (BRS/VRS), préparation du dossier d'audit et plan d'action.",
        duration: "5h 00m",
        lessons: [
          {
            id: "gfc-m6-l1",
            title: "Régime fiscal des ONG au Sénégal et conformité DGID",
            duration: "25 min",
            type: "reading",
            summary: "Connaître les impôts applicables, les exonérations prévues par le protocole d'accord et les déclarations sociales IPRES/CSS.",
            textContent: [
              "Bien que les ONG soient à but non lucratif, elles ont des obligations fiscales précises au Sénégal : retenues d'impôt sur les salaires (IR), retenues à la source sur prestations (BRS 5%), et cotisations sociales.",
              "L'exonération de TVA requiert des attestations de franchise en règle délivrées par les services fiscaux sous couvert du protocole d'accord d'ONG.",
              "Lors d'un audit externe ou commissariat aux comptes, une boîte d'audit méthodique contenant toutes les pièces classées par ligne budgétaire garantit un rapport sans réserve."
            ],
            keyTakeaways: [
              "L'absence de but lucratif n'exonère pas des déclarations fiscales mensuelles obligatoires.",
              "Préparer en amont la balance générale, le grand livre, les états de rapprochement et le tableau de concordance devises."
            ],
            downloadableResource: {
              name: "Guide-Preparation-Audit-Financier-ONG.pdf",
              fileSize: "1.5 Mo",
              fileType: "PDF",
              description: "Checklist exhaustive pour réussir l'audit financier d'un projet sans aucune dépense inéligible."
            }
          }
        ],
        quiz: {
          title: "Quiz Module 6 : Fiscalité et Audit des ONG",
          questions: [
            {
              id: "gfc-q6-1",
              question: "Quelle démarche permet à une ONG agréée de bénéficier de l'exonération de TVA sur un achat local de matériel ?",
              options: [
                "Déclarer verbalement au vendeur qu'on est une ONG",
                "Présenter une attestation de franchise de TVA officielle visée par la Direction Générale des Impôts et Domaines (DGID)",
                "Payer en espèces pour éviter la TVA",
                "Refuser la facture du commerçant"
              ],
              correctAnswer: 1,
              explanation: "L'exonération légale de TVA nécessite la délivrance formelle d'une attestation de franchise par la DGID liée au programme d'activités de l'ONG."
            },
            {
              id: "gfc-q6-2",
              question: "Que risque une ONG en cas de dépense déclarée 'inéligible' par l'auditeur d'un bailleur ?",
              options: [
                "Une simple lettre de félicitations",
                "Le remboursement obligatoire des sommes engagées sur les fonds propres de l'ONG",
                "L'effacement automatique de la dette par la banque",
                "L'attribution immédiate d'une subvention supplémentaire"
              ],
              correctAnswer: 1,
              explanation: "Toute dépense inéligible rejetée par l'audit doit être intégralement remboursée au bailleur de fonds par l'organisation."
            }
          ]
        }
      }
    ]
  },

  {
    id: 'comment-reussir-entrepreneuriat-20h',
    title: 'Comment Réussir en Entrepreneuriat en Afrique',
    subtitle: 'Formation en ligne certifiante : De l’idée à l’expansion, maîtrisez l’éthique, le financement local, le droit des affaires et le marketing en Afrique.',
    badge: 'Formation en Ligne Certifiante',
    category: 'entrepreneurship',
    categoryLabel: 'Entrepreneuriat & Création d\'Entreprise',
    price: 50000,
    priceEur: 75,
    originalPrice: 100000,
    durationWeeks: '20H intensives ou 4 semaines',
    totalHours: '20h de formation certifiante',
    videoCount: 28,
    pdfCount: 25,
    bonusTitle: 'Certificat Officiel & Banque de Financements Inclus',
    bonuses: [
      'Formation au choix : 20H EN LIGNE ou EN PRÉSENTIEL (Sicap liberté 5A, Dakar Sénégal)',
      'Modalités : En individuel ou en groupe de porteurs de projets',
      'Accompagnement pour l’obtention de financements (DER/FJ, FONGIP, microcrédit)',
      'Modèles complets de statuts juridiques (SA, SARL, Entreprise Individuelle)',
      'Certificat officiel délivré à la fin des 14 modules, signé par Alouise Emmanuel Diouf'
    ],
    imageUrl: courseReussirEntrepreneuriat,
    keyFeatures: [
      '14 modules ultra-complets ancrés dans l’économie africaine',
      'Tarif officiel certifiant : 50 000 FCFA (75 €)',
      'Formats adaptés aux créateurs d’entreprises, repreneurs et cadres PME',
      'Délivrance d’un Certificat officiel reconnu à l’issue de la formation'
    ],
    audienceTarget: ['entreprises', 'personnel', 'etudiants'],
    modalities: ['online', 'presentiel'],
    formats: ['individuel', 'groupe'],
    description: 'Le programme de référence d’Ephata Consulting Group pour réussir l’aventure entrepreneuriale au Sénégal et en Afrique de l’Ouest. Dispense 20 heures d’expertise pointue couvrant la durabilité, la gestion des RH et des risques, les leviers de financement locaux, le cadre réglementaire (OHADA, APIX, fiscalité), l’étude de marché et les stratégies d’expansion.',
    targetAudience: [
      'Porteurs de projets cherchant à formaliser et lancer leur activité au Sénégal',
      'Chefs d’entreprise et dirigeants de PME en phase d’expansion ou de restructuration',
      'Étudiants et jeunes diplômés aspirant à créer leur propre emploi',
      'Femmes entrepreneures souhaitant surmonter les freins d’accès au capital'
    ],
    prerequisites: 'Motivation et volonté d’entreprendre. Aucun diplôme universitaire obligatoire.',
    contactPhone: '+221 77 507 91 84',
    contactEmail: 'adonaywaly5@gmail.com',
    instructor: {
      name: 'Alouise Emmanuel Diouf',
      title: 'Directeur de la Formation · Ephata Consulting Group',
      bio: 'Consultant sénior chevronné en gouvernance d’entreprise, structuration de plans d’affaires bancables et accompagnement d’entrepreneurs au Sénégal.',
      avatarUrl: directorAvatar,
      email: 'adonaywaly5@gmail.com'
    },
    hasBusinessPlans: true,
    modules: [
      {
        id: 'cre-m0',
        number: 0,
        title: 'Module Bienvenue : Présentation d’Ephata Consulting & Approche',
        description: '0.1 Bienvenue aux cours. 0.2 À propos du cours, contenu et études de cas réels. 0.3 Présentation des participants et des projets.',
        duration: '1h 15m',
        lessons: [
          {
            id: 'cre-m0-l1',
            title: '0.1 Vidéo de bienvenue par le Directeur Alouise Emmanuel Diouf',
            duration: '20 min',
            type: 'video',
            summary: 'Vision de l’entrepreneuriat durable au Sénégal et méthode des études de cas terrain.',
            textContent: [
              'Bienvenue dans le programme officiel "Comment Réussir en Entrepreneuriat" d’Ephata Consulting Group.',
              'Au Sénégal et en Afrique de l’Ouest, entreprendre est à la fois un formidable défi et une opportunité historique de créer de l’emploi et de la richesse partagée.',
              'Ce cours de 20 heures vous apporte les compétences concrètes dont vous avez besoin pour pérenniser votre affaire.'
            ]
          }
        ]
      },
      {
        id: 'cre-m1',
        number: 1,
        title: 'La durabilité et l’éthique des affaires au Sénégal',
        description: 'Intégration de pratiques durables dans votre entreprise, prise en compte de l’impact social et environnemental, intégrité et transparence dans les affaires.',
        duration: '1h 30m',
        lessons: [
          {
            id: 'cre-m1-l1',
            title: 'L’éthique comme avantage concurrentiel durable',
            duration: '25 min',
            type: 'video',
            summary: 'Pourquoi l’intégrité et la réputation sont vos actifs les plus précieux sur le marché sénégalais.',
            textContent: [
              'Une entreprise qui néglige l’éthique ou qui promet sans délivrer se condamne à brève échéance.',
              'Intégrer la responsabilité sociétale dès la création consolide la fidélité de vos clients et partenaires.'
            ]
          }
        ]
      },
      {
        id: 'cre-m2',
        number: 2,
        title: 'La gestion des ressources humaines',
        description: 'Définir clairement les besoins, recruter et former une équipe talentueuse, bâtir une culture d’entreprise forte, fidéliser son personnel et souscrire une police d’assurance.',
        duration: '1h 45m',
        lessons: [
          {
            id: 'cre-m2-l1',
            title: 'Recruter pour les compétences et engager pour les valeurs',
            duration: '28 min',
            type: 'video',
            summary: 'Comment attirer et retenir les meilleurs talents sans budget pharaonique.',
            textContent: [
              'Vos collaborateurs sont le visage de votre entreprise face aux clients.',
              'Formaliser les fiches de poste et assurer une couverture assurantielle adéquate pour protéger les équipes.'
            ]
          }
        ]
      },
      {
        id: 'cre-m3',
        number: 3,
        title: 'La gestion des risques et des crises',
        description: 'Identifier les risques potentiels, anticiper les tensions financières et opérationnelles, et élaborer un plan de gestion de crise réactif.',
        duration: '1h 30m',
        lessons: [
          {
            id: 'cre-m3-l1',
            title: 'Cartographie des risques et plan de continuité d’activité',
            duration: '24 min',
            type: 'reading',
            summary: 'Comment réagir sereinement face aux impayés, ruptures d’approvisionnement et aléas économiques.',
            textContent: [
              'Un bon entrepreneur n’est pas celui qui n’a jamais de crises, c’est celui qui a anticipé les scénarios de repli.'
            ]
          }
        ]
      },
      {
        id: 'cre-m4',
        number: 4,
        title: 'La réussite à long terme en entrepreneuriat',
        description: 'Les traits et habitudes des entrepreneurs à succès, la persévérance, la vision à long terme et l’impact positif sur la société.',
        duration: '1h 30m',
        lessons: [
          {
            id: 'cre-m4-l1',
            title: 'Cultiver la persévérance et la vision stratégique',
            duration: '22 min',
            type: 'video',
            summary: 'Les rituels quotidiens des dirigeants performants en Afrique subsaharienne.',
            textContent: [
              'La réussite n’est pas un coup d’éclat d’un jour : elle se construit par la répétition disciplinée de bonnes habitudes de gestion.'
            ]
          }
        ]
      },
      {
        id: 'cre-m5',
        number: 5,
        title: 'Les sources de financement disponibles au Sénégal',
        description: 'Microcrédits, fonds d’investissement locaux, financement participatif (crowdfunding), préparation d’une demande de crédit et critères des bailleurs.',
        duration: '2h 00m',
        lessons: [
          {
            id: 'cre-m5-l1',
            title: 'Mobiliser les financements publics et privés au Sénégal',
            duration: '32 min',
            type: 'video',
            summary: 'Critères d’éligibilité de la DER/FJ, du FONGIP, des institutions de microfinance (CMS, PAMECAS, ACEP).',
            textContent: [
              'Un dossier de financement bancable met en valeur la rentabilité prévisionnelle, l’apport personnel et la capacité de remboursement.'
            ]
          }
        ]
      },
      {
        id: 'cre-m6',
        number: 6,
        title: 'Le marketing et la stratégie de vente',
        description: 'Comprendre en profondeur le marché sénégalais, élaborer une stratégie de vente percutante, maîtriser la qualité de contenu et les canaux de distribution.',
        duration: '1h 45m',
        lessons: [
          {
            id: 'cre-m6-l1',
            title: 'Vendre avec force : canaux digitaux et réseaux de distribution physiques',
            duration: '28 min',
            type: 'video',
            summary: 'WhatsApp Business, prospection terrain, points de vente et partenariats de distribution.',
            textContent: [
              'Votre produit peut être le meilleur du monde : sans un marketing agressif et bienveillant, personne ne saura qu’il existe.'
            ]
          }
        ]
      },
      {
        id: 'cre-m7',
        number: 7,
        title: 'L’entrepreneuriat féminin au Sénégal',
        description: 'Défis spécifiques rencontrés par les entrepreneures sénégalaises, accès facilité au financement, réseaux d’entraide et valorisation du leadership féminin.',
        duration: '1h 30m',
        lessons: [
          {
            id: 'cre-m7-l1',
            title: 'Lever les barrières et financer les entreprises portées par des femmes',
            duration: '24 min',
            type: 'video',
            summary: 'Lignes de crédit dédiées, programmes d’accélération et associations de femmes d’affaires.',
            textContent: [
              'Les femmes représentent le moteur du commerce informel au Sénégal : leur passage à l’entrepreneuriat formel est le plus grand levier de croissance du pays.'
            ]
          }
        ]
      },
      {
        id: 'cre-m8',
        number: 8,
        title: 'L’entrepreneuriat social et responsable',
        description: 'Initiatives d’entrepreneuriat social au Sénégal, création de valeur partagée et impact direct sur la communauté locale.',
        duration: '1h 30m',
        lessons: [
          {
            id: 'cre-m8-l1',
            title: 'Résoudre un problème communautaire tout en dégageant des profits',
            duration: '22 min',
            type: 'reading',
            summary: 'Modèles hybrides d’entreprises sociales durables.',
            textContent: [
              'L’entrepreneur social crée des emplois inclusifs tout en répondant aux défis de l’accès à l’eau, à la santé ou à l’éducation.'
            ]
          }
        ]
      },
      {
        id: 'cre-m9',
        number: 9,
        title: 'Les aspects juridiques et réglementaires au Sénégal',
        description: 'Choix de la forme juridique (SA, SARL, Entreprise Individuelle, GIE), démarches APIX, législation sur l’emploi, fiscalité et propriété intellectuelle (OAPI).',
        duration: '2h 00m',
        lessons: [
          {
            id: 'cre-m9-l1',
            title: 'Enregistrer sa société et respecter ses obligations fiscales',
            duration: '30 min',
            type: 'video',
            summary: 'NINEA, RCCM, déclarations DGID et protection de la marque à l’OAPI.',
            textContent: [
              'Choisir la bonne structure juridique protège votre patrimoine familial et crédibilise vos relations avec les banques.'
            ]
          }
        ]
      },
      {
        id: 'cre-m10',
        number: 10,
        title: 'Les erreurs courantes à éviter',
        description: 'Les pièges fréquents, le manque de business plan, l’ignorance des aspects fiscaux, le défaut de collecte des pièces comptables et l’arrogance.',
        duration: '1h 30m',
        lessons: [
          {
            id: 'cre-m10-l1',
            title: 'Les 10 écueils qui font couler les entreprises débutantes',
            duration: '25 min',
            type: 'video',
            summary: 'Comment apprendre des échecs d’autrui pour préserver son capital.',
            textContent: [
              'L’absence de séparation entre la caisse de l’entreprise et les finances personnelles est la première cause de fermeture prématurée.'
            ]
          }
        ]
      },
      {
        id: 'cre-m11',
        number: 11,
        title: 'Les idées de projet et l’étude de marché',
        description: 'Idéation, formulation de la mission, vision et valeurs, réalisation d’une étude de marché terrain et rédaction d’un plan d’affaires solide.',
        duration: '1h 45m',
        lessons: [
          {
            id: 'cre-m11-l1',
            title: 'Valider son idée face aux vrais clients sur le terrain',
            duration: '26 min',
            type: 'video',
            summary: 'Questionner le marché avant de fabriquer le produit.',
            textContent: [
              'L’étude de marché ne se fait pas sur Google : elle se fait en allant interroger les futurs acheteurs dans leurs boutiques et leurs bureaux.'
            ]
          }
        ]
      },
      {
        id: 'cre-m12',
        number: 12,
        title: 'L’expansion et la croissance de l’entreprise',
        description: 'Stratégie pour étendre ses activités, diversification des offres, ouverture de nouveaux points de vente, budget détaillé et indicateurs de performance (KPI).',
        duration: '1h 45m',
        lessons: [
          {
            id: 'cre-m12-l1',
            title: 'Piloter la rentabilité lors de la phase de passage à l’échelle',
            duration: '26 min',
            type: 'reading',
            summary: 'Maîtriser son besoin en fonds de roulement (BFR) en pleine croissance.',
            textContent: [
              'Une entreprise peut mourir de ne pas vendre assez, mais elle peut aussi mourir de vendre trop sans trésorerie suffisante.'
            ]
          }
        ]
      },
      {
        id: 'cre-m13',
        number: 13,
        title: 'L’importance du réseautage professionnel',
        description: 'Construire un carnet d’adresses stratégique au Sénégal, intégrer les clubs d’affaires et convertir son réseau en opportunités de contrats.',
        duration: '1h 30m',
        lessons: [
          {
            id: 'cre-m13-l1',
            title: 'Bâtir son écosystème d’alliances d’affaires',
            duration: '24 min',
            type: 'video',
            summary: 'La force des partenariats et des recommandations professionnelles.',
            textContent: [
              'Votre réseau est votre véritable valeur nette (Your network is your net worth).'
            ]
          }
        ]
      },
      {
        id: 'cre-m14',
        number: 14,
        title: 'Planification stratégique future & Délivrance du Certificat Officiel',
        description: 'Restitution écrite des acquis, élaboration de la feuille de route opérationnelle et remise officielle du Certificat délivré à la fin des 14 modules.',
        duration: '1h 30m',
        lessons: [
          {
            id: 'cre-m14-l1',
            title: 'Validation finale et délivrance du Certificat d’Entrepreneuriat',
            duration: '25 min',
            type: 'exercise',
            summary: 'Validation par Alouise Emmanuel Diouf, Directeur de la Formation Ephata Consulting Group.',
            textContent: [
              'Un certificat officiel attestant de l’achèvement et de la compréhension des 14 modules vous est délivré.',
              'Ce parchemin certifié par Ephata Consulting Group valorise votre dossier auprès des investisseurs, des banques et de vos partenaires.'
            ]
          }
        ]
      }
    ]
  }
];
