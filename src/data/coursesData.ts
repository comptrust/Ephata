import { Course } from '../types';
import { NEW_COURSES } from './newCurriculaData';
import {
  courseOngManagement,
  courseLeadershipTeam,
  courseEntrepreneurship,
  courseFinancialEducation,
  courseSerereDelta,
  directorAvatar,
} from '../assets/images';

export const COURSES: Course[] = [
  ...NEW_COURSES,
  {
    id: 'management-ong',
    title: 'Management des ONGs',
    subtitle: 'Formation en ligne certifiante : Maîtrisez la gouvernance, le cadre juridique, la gestion stratégique et le financement des organisations non gouvernementales.',
    badge: 'Formation en Ligne Certifiante',
    category: 'management',
    categoryLabel: 'Management des ONGs',
    price: 50000,
    originalPrice: 85000,
    durationWeeks: '6 semaines',
    totalHours: '35h d\'apprentissage',
    videoCount: 28,
    pdfCount: 15,
    bonusTitle: 'Pack Gouvernance & Statuts d\'ONG inclus',
    bonuses: [
      'Accès illimité 24h/24 et 7j/7 aux modules',
      'Vidéos explicatives haute définition avec cas pratiques',
      'Supports de cours téléchargeables (PDF, canevas statutaires, modèles de budget bailleurs)',
      'Attestation officielle de formation signée par Ephata Consulting Group',
      'Accès au réseau des dirigeants et gestionnaires d\'ONG partenaires'
    ],
    keyFeatures: [
      'Formation par module 100% en ligne',
      'Apprenez à votre rythme depuis chez vous',
      'Conforme aux législations OHADA et aux exigences des bailleurs internationaux (USAID, UE, AFD, PNUD)',
      'Accompagnement et corrections des travaux d\'évaluation'
    ],
    description: 'Une formation complète et opérationnelle spécialement conçue pour les fondateurs, directeurs exécutifs, chefs de projet et administrateurs d\'ONG en Afrique subsaharienne. Vous apprendrez à structurer votre organisation, sécuriser vos statuts, optimiser votre fiscalité et mobiliser des financements institutionnels durables.',
    targetAudience: [
      'Fondateurs et dirigeants d\'associations et d\'ONG',
      'Chefs de projet et coordinateurs de programmes humanitaires ou de développement',
      'Membres de Conseils d\'Administration',
      'Professionnels en reconversion vers le secteur non-lucratif'
    ],
    prerequisites: 'Aucun prérequis spécifique. Motivation et intérêt pour le secteur du développement et de la solidarité.',
    imageUrl: courseOngManagement,
    contactPhone: '+221 77 507 91 84',
    instructor: {
      name: 'Alouise Emmanuel Diouf',
      title: 'Directeur de la Formation · Ephata Consulting Group',
      bio: 'Plus de 15 années d\'expertise terrain dans la gouvernance institutionnelle des ONG, la gestion des compétences de vie et la formation professionnelle au Sénégal.',
      avatarUrl: directorAvatar,
      email: 'adonaywaly5@gmail.com'
    },
    modules: [
      {
        id: 'ong-m1',
        number: 1,
        title: 'Procédure de mise en place des ONG',
        description: 'Cadre légal de constitution, statuts, règlement intérieur, agrément étatique et reconnaissance d\'utilité publique au Sénégal et dans l\'espace UEMOA.',
        duration: '4h 30m',
        lessons: [
          {
            id: 'ong-m1-l1',
            title: 'Distinguer association, fondation et ONG agréée',
            duration: '22 min',
            type: 'video',
            summary: 'Comprendre les typologies juridiques et le statut spécifique accordé aux ONG opérant au Sénégal selon le décret 2015-145.',
            videoDuration: 1320,
            videoSlides: [
              {
                timestamp: 0,
                title: 'Introduction au statut d\'ONG',
                bulletPoints: ['Différence fondamentale avec les simples associations Loi 1901', 'Critères d’éligibilité pour l’agrément au Ministère de l’Intérieur', 'Avantages douaniers et fiscaux attachés au statut']
              },
              {
                timestamp: 420,
                title: 'Constitution du dossier officiel',
                bulletPoints: ['Statuts notariés ou sous seing privé', 'Procès-verbal de l’Assemblée Générale constitutive', 'Programme d’actions prévisionnel sur 3 ans']
              },
              {
                timestamp: 900,
                title: 'Les étapes administratives clés',
                bulletPoints: ['Enquête de moralité et avis des ministères techniques', 'Signature du protocole d’accord avec l’État', 'Publication au Journal Officiel']
              }
            ],
            textContent: [
              'La mise en place d\'une Organisation Non Gouvernementale obéit à une réglementation rigoureuse destinée à garantir l\'intérêt public et la transparence des interventions humanitaires et sociales.',
              'Au Sénégal, l\'agrément en qualité d\'ONG confère un cadre d\'action privilégié avec des exonérations douanières partielles sur le matériel d\'intervention et une reconnaissance officielle pour postuler aux appels d\'offres des bailleurs internationaux.',
              'Il est capital de veiller à ce que l\'objet social soit formulé de manière claire, sans confusion avec une activité commerciale ou politique.'
            ],
            keyTakeaways: [
              'L’agrément d’ONG est délivré par décret présidentiel ou arrêté ministériel après avis du comité consultatif.',
              'Le programme triennal d’activités est la pièce maîtresse du dossier d’agrément.',
              'Une ONG doit renouveler périodiquement ses engagements conventionnels avec l’État.'
            ],
            downloadableResource: {
              name: 'Modele-Statuts-Reglement-Interieur-ONG.pdf',
              fileSize: '1.4 Mo',
              fileType: 'PDF',
              description: 'Canevas juridique complet et annoté des Statuts et du Règlement Intérieur pour ONG.'
            }
          },
          {
            id: 'ong-m1-l2',
            title: 'Formalités administratives et inscription au registre',
            duration: '28 min',
            type: 'reading',
            summary: 'Guide pas à pas des démarches auprès de la Direction des Affaires Générales et de l’Administration Territoriale (DAGAT).',
            textContent: [
              'Le dépôt du dossier d’agrément requiert la transmission de sept (7) exemplaires physiques comprenant les casiers judiciaires des membres du bureau exécutif.',
              'Durant l’instruction, les ministères sectoriels (Santé, Éducation, Environnement, selon votre champ) émettent un avis technique sur l’utilité et la faisabilité de vos projets.',
              'Une fois le protocole d’accord signé, l’ONG doit s’immatriculer au NINEA (Numéro d’Identification Nationale des Entreprises et Associations) et ouvrir un compte bancaire institutionnel.'
            ],
            keyTakeaways: [
              'Anticiper un délai moyen d’instruction de 3 à 6 mois.',
              'Toujours désigner un représentant légal résidant dans le pays d’implantation.'
            ]
          }
        ],
        quiz: {
          title: 'Quiz Module 1 : Procédure de mise en place des ONG',
          questions: [
            {
              id: 'ong-q1-1',
              question: 'Quel document constitue la feuille de route stratégique exigée lors du dépôt de dossier d\'agrément d\'une ONG ?',
              options: [
                'Un extrait de compte personnel du président',
                'Le programme triennal d\'activités chiffré',
                'Un simple contrat de bail commercial',
                'Un bon de commande de fournitures'
              ],
              correctAnswer: 1,
              explanation: 'Le programme prévisionnel d\'activités sur 3 ans démontre la viabilité, l\'utilité publique et la méthodologie d\'intervention de l\'organisation.'
            },
            {
              id: 'ong-q1-2',
              question: 'Quelle est la principale différence juridique entre une association simple et une ONG agréée ?',
              options: [
                'L\'association peut distribuer des bénéfices',
                'L\'ONG bénéficie d\'une convention de partenariat étatique et de facilités douanières pour ses projets d\'intérêt général',
                'L\'ONG n\'a pas besoin de statuts',
                'L\'association doit payer la TVA sur les dons'
              ],
              correctAnswer: 1,
              explanation: 'L\'agrément en qualité d\'ONG confère un cadre conventionnel avec le gouvernement hôte, ouvrant droit à des partenariats officiels et des exonérations fiscales ciblées.'
            }
          ]
        }
      },
      {
        id: 'ong-m2',
        number: 2,
        title: 'La boussole des ONG (valeur, vision, mission)',
        description: 'Construire une identité institutionnelle forte, définir la théorie du changement et fédérer les parties prenantes autour d\'une vision inspirante.',
        duration: '4h 00m',
        lessons: [
          {
            id: 'ong-m2-l1',
            title: 'Formuler la Vision, Mission et Valeurs cardinales',
            duration: '25 min',
            type: 'video',
            summary: 'Comment articuler la raison d’être de l’ONG pour mobiliser les équipes et convaincre les donateurs internationaux.',
            videoDuration: 1500,
            videoSlides: [
              {
                timestamp: 0,
                title: 'La triade fondatrice',
                bulletPoints: ['La Vision : Le monde tel qu’on aspire à le transformer', 'La Mission : Notre contribution spécifique et concrète', 'Les Valeurs : Les principes non négociables qui guident nos actes']
              },
              {
                timestamp: 500,
                title: 'Théorie du changement',
                bulletPoints: ['Identifier le problème racine', 'Définir la trajectoire d’impact', 'Hypothèses critiques et leviers de durabilité']
              }
            ],
            textContent: [
              'Sans une boussole claire, une ONG risque de courir après les financements au détriment de sa vocation originelle (syndrome du "donor-driven").',
              'La vision doit être ambitieuse et inspirante, tandis que la mission doit spécifier clairement : pour qui, avec quoi et comment nous agissons.'
            ],
            keyTakeaways: [
              'Une mission claire prévient la dérive de mission (mission drift).',
              'Les valeurs partagées renforcent l’éthique et la cohésion des équipes.'
            ]
          }
        ],
        quiz: {
          title: 'Quiz Module 2 : La boussole des ONG',
          questions: [
            {
              id: 'ong-q2-1',
              question: 'Qu\'appelle-t-on la "dérive de mission" (mission drift) dans une ONG ?',
              options: [
                'Le changement de locaux administratifs',
                'Le fait de modifier ses priorités uniquement pour capter des financements disponibles hors de sa vocation',
                'L\'augmentation du nombre de bénévoles',
                'Le départ à la retraite du fondateur'
              ],
              correctAnswer: 1,
              explanation: 'La dérive de mission survient lorsqu\'une ONG court après n\'importe quel appel à projets pour survivre, perdant ainsi sa spécialité et sa légitimité.'
            }
          ]
        }
      },
      {
        id: 'ong-m3',
        number: 3,
        title: 'La planification, suivi et évaluation (P&SE)',
        description: 'Maîtrise de la gestion axée sur les résultats (GAR), matrice du cadre logique (MCL), indicateurs SMART et tableaux de bord d\'impact.',
        duration: '6h 00m',
        lessons: [
          {
            id: 'ong-m3-l1',
            title: 'Concevoir un Cadre Logique irréprochable',
            duration: '35 min',
            type: 'video',
            summary: 'Élaboration pas-à-pas de la matrice de cadre logique : objectifs généraux, spécifiques, résultats attendus, activités et sources de vérification.',
            videoDuration: 2100,
            textContent: [
              'Le cadre logique demeure l\'outil universel exigé par l\'Union Européenne, l\'USAID, la BAD et la Banque Mondiale.',
              'Chaque résultat doit être associé à des indicateurs objectivement vérifiables (IOV), tant quantitatifs que qualitatifs.'
            ],
            keyTakeaways: [
              'Les hypothèses et risques doivent être monitorés mensuellement.',
              'Un bon indicateur est Spécifique, Mesurable, Atteignable, Réaliste et Temporellement défini.'
            ],
            downloadableResource: {
              name: 'Matrice-Cadre-Logique-Excel-Automatise.xlsx',
              fileSize: '850 Ko',
              fileType: 'XLSX',
              description: 'Matrice de Cadre Logique prête à l’emploi avec calcul automatisé des indicateurs.'
            }
          }
        ]
      },
      {
        id: 'ong-m4',
        number: 4,
        title: 'Rôle du conseil d\'administration',
        description: 'Gouvernance démocratique, séparation des pouvoirs entre gouvernance et exécutif, comités d\'audit et redevabilité aux membres.',
        duration: '4h 30m',
        lessons: [
          {
            id: 'ong-m4-l1',
            title: 'Séparation du rôle de Président du CA et du Directeur Exécutif',
            duration: '30 min',
            type: 'reading',
            summary: 'Éviter les conflits d\'intérêt et assurer la transparence institutionnelle requise par les auditeurs.',
            textContent: [
              'Le Conseil d’Administration définit les orientations stratégiques, vote le budget et supervise la direction générale.',
              'L’équipe exécutive, sous la conduite du Directeur Exécutif ou Coordonnateur, met en œuvre les projets sur le terrain.'
            ]
          }
        ]
      },
      {
        id: 'ong-m5',
        number: 5,
        title: 'La gestion juridique',
        description: 'Droit du travail appliqué aux ONG (expatriés, volontaires, salariés locaux), contrats de prestation et gestion des risques de litiges.',
        duration: '5h 00m',
        lessons: [
          {
            id: 'ong-m5-l1',
            title: 'Statuts des personnels d’ONG : salariés, consultants et bénévoles',
            duration: '27 min',
            type: 'video',
            summary: 'Sécuriser les contrats de travail à terme précis liés au financement d’un projet particulier (contrat de projet).',
            videoDuration: 1620,
            textContent: [
              'Le Code du travail s\'applique intégralement aux ONG pour leur personnel salarié.',
              'Le recours au "contrat de projet" permet de lier la durée du contrat de travail à celle de la subvention accordée par le bailleur.'
            ]
          }
        ]
      },
      {
        id: 'ong-m6',
        number: 6,
        title: 'La gestion fiscale',
        description: 'Régime d’exonération de TVA, retenues à la source (BRS), déclarations IPRES et Caisse de Sécurité Sociale (CSS), contrôle fiscal des ONG.',
        duration: '5h 30m',
        lessons: [
          {
            id: 'ong-m6-l1',
            title: 'Les obligations fiscales d\'une ONG au Sénégal',
            duration: '32 min',
            type: 'video',
            summary: 'Guide pratique pour éviter les redressements fiscaux et maîtriser la retenue à la source (VRS) et l’impôt sur le revenu des salariés.',
            videoDuration: 1920,
            textContent: [
              'Même si une ONG ne paie pas d\'impôt sur les sociétés sur ses subventions, elle est redevable de la retenue à la source sur les prestations de services et les salaires.',
              'Les attestations de visa d\'exonération de TVA doivent être instruites avec rigueur auprès de la Direction Générale des Impôts et Domaines (DGID).'
            ]
          }
        ]
      },
      {
        id: 'ong-m7',
        number: 7,
        title: 'Les sources de financement des ONG',
        description: 'Mobilisation de fonds (Fundraising), réponse aux appels à propositions, mécénat d’entreprise, crowdfunding et partenariats public-privé.',
        duration: '5h 30m',
        lessons: [
          {
            id: 'ong-m7-l1',
            title: 'Rédiger une proposition de financement gagnante',
            duration: '38 min',
            type: 'video',
            summary: 'Techniques d’écriture persuasive pour séduire les comités de sélection de projets des ambassades et fondations.',
            videoDuration: 2280,
            textContent: [
              'Comprendre les critères d\'évaluation des bailleurs : pertinence, efficacité, efficience, impact et durabilité.',
              'Bâtir un budget réaliste avec prise en compte des coûts indirects de fonctionnement (overheads).'
            ],
            downloadableResource: {
              name: 'Guide-Fundraising-Bailleurs-Afrique.pdf',
              fileSize: '2.1 Mo',
              fileType: 'PDF',
              description: 'Annuaire des 50 principaux bailleurs de fonds finançant des ONG en Afrique de l\'Ouest.'
            }
          }
        ]
      }
    ]
  },

  {
    id: 'management-relationnel',
    title: 'Management Relationnel et Professionnel',
    subtitle: 'Formation en ligne certifiante : Devenez un meilleur leader, développez votre potentiel relationnel, la cohésion d\'équipe et le leadership.',
    badge: 'Formation en Ligne Certifiante',
    category: 'leadership',
    categoryLabel: 'Management Relationnel & RH',
    price: 50000,
    originalPrice: 90000,
    durationWeeks: '8 semaines',
    totalHours: '48h de formation pratique',
    videoCount: 36,
    pdfCount: 24,
    bonusTitle: 'Boîte à outils du Manager & Coach relationnel',
    bonuses: [
      'Attestation certifiée délivrée à la fin de la formation',
      'Des outils concrets et immédiatement applicables en entreprise',
      'Une approche simple, bienveillante et hautement efficace',
      'Des compétences transférables dans la vie professionnelle et personnelle',
      'Un accompagnement de qualité avec feedback individualisé'
    ],
    keyFeatures: [
      '12 modules complets couvrant l’ensemble du spectre managérial',
      'Apprenez à votre rythme où que vous soyez (PC, tablette ou smartphone)',
      'Études de cas réels d’entreprises et d’équipes multiculturelles',
      'Mises en situation vidéo et grilles d’auto-évaluation'
    ],
    description: 'Le programme de référence d’Ephata Consulting pour transformer votre posture managériale. Vous apprendrez à inspirer vos collaborateurs, désamorcer les tensions relationnelles, orchestrer les talents, piloter la performance collective et conduire le changement avec aisance et impact.',
    targetAudience: [
      'Managers d’équipes, directeurs de départements et chefs de service',
      'Entrepreneurs cherchant à structurer et fidéliser leurs équipes',
      'Chefs de projet gérant des équipes transversales',
      'Professionnels souhaitant accéder à des fonctions d’encadrement'
    ],
    prerequisites: 'Ouvert à tout professionnel ou porteur de projet souhaitant accroître son leadership et son intelligence émotionnelle.',
    imageUrl: courseLeadershipTeam,
    contactPhone: '+221 77 507 91 84',
    instructor: {
      name: 'Dr. Ephata & Pôle Leadership',
      title: 'Experts en Psychologie du Travail & Développement Organisationnel',
      bio: 'Des formateurs passionnés cumulant des décennies de pratique en coaching de cadres dirigeants, médiation en entreprise et conduite du changement.',
      avatarUrl: directorAvatar
    },
    modules: [
      {
        id: 'mr-m1',
        number: 1,
        title: 'Comprendre, anticiper et préparer',
        description: 'Diagnostic de l’environnement, posture d’écoute active, cartographie des attentes et anticipation des résistances.',
        duration: '3h 45m',
        lessons: [
          {
            id: 'mr-m1-l1',
            title: 'L’art du diagnostic relationnel en milieu professionnel',
            duration: '24 min',
            type: 'video',
            summary: 'Identifier les non-dits, décrypter les dynamiques de pouvoir informelles et instaurer la confiance.',
            videoDuration: 1440,
            textContent: [
              'Le manager d’excellence n’attend pas la crise : il cultive une attention périphérique constante pour capter les signaux faibles.',
              'Comprendre les motivations intrinsèques de chacun avant d’assigner des responsabilités.'
            ]
          }
        ]
      },
      {
        id: 'mr-m2',
        number: 2,
        title: 'Soigner ses relations et élargir son réseau',
        description: 'Networking stratégique, capital relationnel, entretien du lien avec bienveillance et diplomatie professionnelle.',
        duration: '4h 00m',
        lessons: [
          {
            id: 'mr-m2-l1',
            title: 'Transformer son réseau en levier de croissance mutuelle',
            duration: '26 min',
            type: 'video',
            summary: 'Comment créer des alliances durables sans opportunisme et entretenir la relation dans le temps.',
            videoDuration: 1560,
            textContent: [
              'Le réseau ne s’active pas uniquement lorsqu’on a besoin d’un service : il s’arrose continuellement par des attentions régulières et du partage de valeur.'
            ]
          }
        ]
      },
      {
        id: 'mr-m3',
        number: 3,
        title: 'Fixer et atteindre les objectifs',
        description: 'Méthode SMART et OKR, engagement contractuel réciproque, suivi des jalons intermédiaires et responsabilisation.',
        duration: '4h 15m',
        lessons: [
          {
            id: 'mr-m3-l1',
            title: 'De l’objectif flou à la performance mesurable',
            duration: '28 min',
            type: 'reading',
            summary: 'Techniques de co-construction des objectifs pour susciter l’adhésion plutôt que la soumission passive.',
            textContent: [
              'Un collaborateur engagé est un collaborateur qui a participé à la définition des moyens et à la clarté du résultat attendu.'
            ]
          }
        ]
      },
      {
        id: 'mr-m4',
        number: 4,
        title: 'Satisfaire les clients',
        description: 'Culture de l’orientation client interne et externe, gestion des réclamations, dépassement des attentes (Customer Delight).',
        duration: '3h 30m',
        lessons: [
          {
            id: 'mr-m4-l1',
            title: 'L’excellence du service client comme avantage concurrentiel',
            duration: '22 min',
            type: 'video',
            summary: 'Mécanismes pour transformer un client mécontent en ambassadeur fidèle de votre marque.',
            videoDuration: 1320,
            textContent: [
              'Dans un marché compétitif, le relationnel et le soin apporté au client font toute la différence.'
            ]
          }
        ]
      },
      {
        id: 'mr-m5',
        number: 5,
        title: 'Recruter, engager et coacher avec succès',
        description: 'Entretiens d’embauche ciblés, intégration réussie (onboarding), posture de manager-coach et développement des talents.',
        duration: '4h 45m',
        lessons: [
          {
            id: 'mr-m5-l1',
            title: 'La posture du manager-coach : poser les bonnes questions',
            duration: '30 min',
            type: 'video',
            summary: 'Plutôt que donner des ordres directs, aider le collaborateur à trouver ses propres solutions.',
            videoDuration: 1800,
            textContent: [
              'Le manager-coach responsabilise son équipe et développe l’autonomie opérationnelle.'
            ]
          }
        ]
      },
      {
        id: 'mr-m6',
        number: 6,
        title: 'Gérer les conflits ou les éviter',
        description: 'Communication non violente (CNV), médiation des différends, désamorçage des tensions et retour au dialogue constructif.',
        duration: '4h 30m',
        lessons: [
          {
            id: 'mr-m6-l1',
            title: 'La méthode DESC pour désamorcer les conflits professionnels',
            duration: '25 min',
            type: 'video',
            summary: 'Décrire les faits, Exprimer ses sentiments, Spécifier des solutions, Conséquences positives.',
            videoDuration: 1500,
            textContent: [
              'Le conflit est naturel ; c’est son refoulement qui est destructeur pour la dynamique d’équipe.'
            ]
          }
        ]
      },
      {
        id: 'mr-m7',
        number: 7,
        title: 'Communiquer pour gagner',
        description: 'Prise de parole en public, assertivité, communication non-verbale, animation de réunions productives et courtes.',
        duration: '4h 00m',
        lessons: [
          {
            id: 'mr-m7-l1',
            title: 'L’impact de la parole et de la présence corporelle',
            duration: '27 min',
            type: 'video',
            summary: 'Capter l’attention, structurer son message en trois points percutants et inspirer confiance.',
            videoDuration: 1620,
            textContent: [
              'La clarté d’un message dépend de l’alignement entre le regard, la posture, le ton de la voix et le choix des mots.'
            ]
          }
        ]
      },
      {
        id: 'mr-m8',
        number: 8,
        title: 'Gérer les informations, les priorités et le temps',
        description: 'Matrice d’Eisenhower, méthode Pomodoro adaptée, gestion des flux d’e-mails et de messages WhatsApp en entreprise.',
        duration: '3h 30m',
        lessons: [
          {
            id: 'mr-m8-l1',
            title: 'Prioriser l’important avant l’urgent',
            duration: '22 min',
            type: 'reading',
            summary: 'Sortir de la tyrannie de l’urgence pour sanctuariser le temps de réflexion stratégique.',
            textContent: [
              'Savoir dire un "non" diplomatique pour préserver la qualité de ses engagements prioritaires.'
            ]
          }
        ]
      },
      {
        id: 'mr-m9',
        number: 9,
        title: 'Dynamique de groupe : faire travailler les personnes ensemble',
        description: 'Cohésion d’équipe, modèle de Tuckman (Forming, Storming, Norming, Performing), synergie des compétences complémentaires.',
        duration: '4h 00m',
        lessons: [
          {
            id: 'mr-m9-l1',
            title: 'Créer un sentiment d’appartenance et de fierté collective',
            duration: '25 min',
            type: 'video',
            summary: 'Célébrer les victoires, valoriser chaque maillon de la chaîne et forger un esprit d’équipe invincible.',
            videoDuration: 1500,
            textContent: [
              'Le succès d’une équipe dépend de la sécurité psychologique instaurée par son leader.'
            ]
          }
        ]
      },
      {
        id: 'mr-m10',
        number: 10,
        title: 'Innover',
        description: 'Méthodes de créativité appliquée, Design Thinking, droit à l’erreur intelligente et culture de l’amélioration continue.',
        duration: '3h 45m',
        lessons: [
          {
            id: 'mr-m10-l1',
            title: 'Libérer le potentiel créatif de ses collaborateurs',
            duration: '24 min',
            type: 'reading',
            summary: 'Mettre en place des ateliers d’idéation sans censure préalable pour faire émerger de nouveaux produits et services.',
            textContent: [
              'Innover ne requiert pas des millions : souvent, c’est une simplification radicale d’une étape fastidieuse pour le client.'
            ]
          }
        ]
      },
      {
        id: 'mr-m11',
        number: 11,
        title: 'Adapter l’organisation',
        description: 'Accompagnement du changement, agilité organisationnelle, résilience face aux imprévus et digitalisation des processus.',
        duration: '4h 00m',
        lessons: [
          {
            id: 'mr-m11-l1',
            title: 'Guider les équipes dans les transitions managériales',
            duration: '26 min',
            type: 'video',
            summary: 'La courbe du deuil organisationnel et les leviers d’embarquement dans les nouveaux outils.',
            videoDuration: 1560,
            textContent: [
              'Toute résistance au changement exprime une peur légitime : le leader doit rassurer et former avant d’exiger.'
            ]
          }
        ]
      },
      {
        id: 'mr-m12',
        number: 12,
        title: 'Assurer la croissance',
        description: 'Pérennité des résultats, montée en compétences des successeurs, pilotage par indicateurs clés et célébration du chemin parcouru.',
        duration: '4h 30m',
        lessons: [
          {
            id: 'mr-m12-l1',
            title: 'Bâtir une croissance saine, humaine et pérenne',
            duration: '30 min',
            type: 'video',
            summary: 'Consolider les acquis, préserver la santé mentale de ses collaborateurs et préparer la relève.',
            videoDuration: 1800,
            textContent: [
              'La véritable marque d’un grand leader n’est pas d’avoir beaucoup de suiveurs, mais d’avoir formé d’autres leaders autonomes.'
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'pack-entrepreneuriat',
    title: 'Pack Entrepreneuriat',
    subtitle: 'Vendu sous forme de PDF à 10 000 FCFA : Ouvrage complet & 30 Business Plans prêts à l’emploi. (Ce n’est pas une formation en ligne).',
    badge: 'Pack PDF · 10 000 FCFA',
    category: 'entrepreneurship',
    categoryLabel: 'Pack PDF (Non formation)',
    price: 10000,
    priceEur: 15,
    originalPrice: 35000,
    isPdfOnly: true,
    pdfDeliveryNotice: 'Ce pack est vendu exclusivement sous forme d\'ouvrage et documents au format PDF (non dispensé sous forme de formation vidéo en ligne). Réception immédiate du fichier PDF après règlement de 10 000 FCFA.',
    durationWeeks: 'Téléchargement direct',
    totalHours: 'Ouvrage PDF complet',
    videoCount: 0,
    pdfCount: 35,
    bonusTitle: 'Contenu du Pack PDF (10 000 FCFA)',
    bonuses: [
      'Document PDF complet : Guide pratique pour réussir en entrepreneuriat au Sénégal et en Afrique',
      '30 Business Plans complets en PDF (Agrobusiness, Restauration, E-commerce, Élevage, Services, etc.)',
      'Modèles de calculs financiers et canevas budgétaires prêts à l’emploi',
      'Fiches pratiques pour les démarches administratives (NINEA, RCCM, DER/FJ)',
      'Envoi immédiat du fichier PDF par WhatsApp (+221 77 507 91 84) ou par e-mail'
    ],
    keyFeatures: [
      'Vendu sous forme de PDF (Pas une formation en ligne)',
      'Tarif unique : 10 000 FCFA (15 €)',
      '30 plans d’affaires complets rédigés et chiffrés',
      'Envoi immédiat sur WhatsApp ou e-mail'
    ],
    description: 'Ce pack est vendu sous forme d\'ouvrage complet au format PDF (10 000 FCFA). Ce n\'est pas une formation vidéo en ligne. Il regroupe l\'ouvrage de référence pour lancer et rentabiliser votre activité au Sénégal et en Afrique de l\'Ouest, ainsi que 30 business plans rédigés et chiffrés pour démarrer sereinement sans commettre d\'erreurs coûteuses.',
    targetAudience: [
      'Porteurs de projets et futurs créateurs d’entreprises',
      'Commerçants et artisans souhaitant se formaliser et grandir',
      'Membres de la diaspora préparant un retour ou un investissement au pays',
      'Jeunes diplômés aspirant à l’auto-emploi'
    ],
    prerequisites: 'Aucun diplôme requis. Accessible à tout porteur de projet.',
    imageUrl: courseEntrepreneurship,
    contactPhone: '+221 77 507 91 84',
    instructor: {
      name: 'Dr. Ephata & Incubateur PME',
      title: 'Pôle Incubation & Développement des Entreprises',
      bio: 'Cabinet spécialisé dans la structuration des PME/PMI sénégalaises, l\'élaboration de business plans bancables et la levée de financements auprès des organismes institutionnels.',
      avatarUrl: directorAvatar
    },
    hasBusinessPlans: true,
    modules: [
      {
        id: 'ent-m1',
        number: 1,
        title: 'Réussir l’entrepreneuriat au Sénégal et en Afrique',
        description: 'Panorama des opportunités économiques en Afrique de l’Ouest, analyse des besoins non satisfaits et validation terrain de votre idée.',
        duration: '3h 30m',
        lessons: [
          {
            id: 'ent-m1-l1',
            title: 'Identifier une opportunité rentable dans le contexte local',
            duration: '25 min',
            type: 'video',
            summary: 'Comment détecter les vrais problèmes du quotidien des populations et les transformer en solutions payantes.',
            videoDuration: 1500,
            textContent: [
              'En Afrique, les meilleures opportunités ne nécessitent pas des technologies complexes : elles répondent aux besoins essentiels (nourriture, santé, logement, mobilité, formation, logistique).',
              'Valider la demande réelle avant d’investir ses économies grâce à la méthode du prototype minimum viable (MVP).'
            ]
          }
        ]
      },
      {
        id: 'ent-m2',
        number: 2,
        title: 'La réussite à long terme en entrepreneuriat',
        description: 'Discipline financière du chef d’entreprise, séparation absolue de l’argent personnel et de la caisse, gestion de la trésorerie.',
        duration: '3h 45m',
        lessons: [
          {
            id: 'ent-m2-l1',
            title: 'La règle d’or : Ne jamais confondre chiffre d’affaires et bénéfice',
            duration: '28 min',
            type: 'video',
            summary: 'Mettre en place un livre de caisse quotidien et se verser un salaire fixe au lieu de piocher dans les recettes.',
            videoDuration: 1680,
            textContent: [
              'La principale cause de faillite des jeunes entreprises au Sénégal est la confusion entre l’argent de la boutique et les dépenses familiales imprévues.',
              'Tenir un tableau de bord hebdomadaire des entrées et sorties réelles de trésorerie.'
            ]
          }
        ]
      },
      {
        id: 'ent-m3',
        number: 3,
        title: 'Le financement de votre entreprise',
        description: 'Levée de fonds d’amorçage, Love Money, banques et microfinance (PAMECAS, CMS), guichets publics (DER/FJ, FONGIP, 3FPT) et tontines d’investissement.',
        duration: '4h 00m',
        lessons: [
          {
            id: 'ent-m3-l1',
            title: 'Monter un dossier de financement convaincant',
            duration: '32 min',
            type: 'video',
            summary: 'Ce que regardent vraiment les comités de crédit des institutions financières au Sénégal.',
            videoDuration: 1920,
            textContent: [
              'Un banquier ne finance pas seulement une idée, il finance la personne du promoteur et sa capacité à apporter une garantie ou un apport personnel crédible.',
              'Mobiliser les dispositifs publics comme la Délégation générale à l\'Entreprenariat Rapide (DER/FJ) et le FONGIP.'
            ]
          }
        ]
      },
      {
        id: 'ent-m4',
        number: 4,
        title: 'Le marketing et la stratégie de vente',
        description: 'Vendre vite et bien : réseaux sociaux (WhatsApp Business, TikTok, Facebook Ads), négociation commerciale locale et fidélisation client.',
        duration: '4h 15m',
        lessons: [
          {
            id: 'ent-m4-l1',
            title: 'Dominer la vente par WhatsApp Business et les canaux de proximité',
            duration: '30 min',
            type: 'video',
            summary: 'Structurer son catalogue, automatiser ses messages d’accueil et convertir ses statuts WhatsApp en machine à cash.',
            videoDuration: 1800,
            textContent: [
              'WhatsApp est l’outil de conversion numéro 1 en Afrique de l’Ouest francophone.',
              'Construire une relation de confiance et offrir des garanties concrètes (satisfait ou remboursé, paiement à la livraison).'
            ]
          }
        ]
      },
      {
        id: 'ent-m5',
        number: 5,
        title: 'Les aspects juridiques et réglementaires',
        description: 'Création d’entreprise au Sénégal (APIX), choix du statut juridique (Entreprise Individuelle, SARL, SUARL, GIE), obtention du NINEA et RCCM.',
        duration: '3h 30m',
        lessons: [
          {
            id: 'ent-m5-l1',
            title: 'Formaliser sa société en 24h à l’APIX',
            duration: '26 min',
            type: 'reading',
            summary: 'Toutes les pièces à fournir et le choix judicieux de la forme juridique selon votre capital de départ.',
            textContent: [
              'La SUARL (Société Unipersonnelle à Responsabilité Limitée) permet de protéger son patrimoine personnel avec un capital minimum de 100 000 FCFA.',
              'Le GIE (Groupement d’Intérêt Économique) est idéal pour les regroupements de producteurs ou d’artisans.'
            ]
          }
        ]
      },
      {
        id: 'ent-m6',
        number: 6,
        title: 'Les erreurs courantes à éviter',
        description: 'Recrutement précipité d’amis ou de proches, surinvestissement dans le local avant les premières ventes, négligence du contrat écrit.',
        duration: '3h 00m',
        lessons: [
          {
            id: 'ent-m6-l1',
            title: 'Les 10 pièges mortels de l’entrepreneur débutant',
            duration: '25 min',
            type: 'video',
            summary: 'Retour d’expérience sur plus de 100 entreprises accompagnées par Ephata Consulting Group.',
            videoDuration: 1500,
            textContent: [
              'Piège 1 : Dépenser tout son budget dans la décoration du magasin sans garder de fonds de roulement.',
              'Piège 2 : Embaucher des membres de la famille sans contrat ni obligation de résultats.'
            ]
          }
        ]
      },
      {
        id: 'ent-m7',
        number: 7,
        title: 'L’importance du réseautage',
        description: 'Intégrer les chambres consulaires, clubs d’affaires (CNP, UNACOIS, MEDS), alliances stratégiques et recommandations de bouche-à-oreille.',
        duration: '3h 00m',
        lessons: [
          {
            id: 'ent-m7-l1',
            title: 'Faire du réseau votre plus grand apporteur d’affaires',
            duration: '24 min',
            type: 'video',
            summary: 'Comment être recommandé naturellement par vos pairs et partenaires industriels.',
            videoDuration: 1440,
            textContent: [
              'En Afrique, la réputation et le réseau ouvrent plus de portes que n’importe quel budget publicitaire.'
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'education-financiere',
    title: 'Pack sur l\'Éducation Financière',
    subtitle: 'Vendu sous forme de PDF à 10 000 FCFA : Livre complet & Guide pratique d\'assainissement budgétaire et d\'investissement. (Ce n’est pas une formation en ligne).',
    badge: 'Pack PDF · 10 000 FCFA',
    category: 'finance',
    categoryLabel: 'Pack PDF (Non formation)',
    price: 10000,
    priceEur: 15,
    originalPrice: 30000,
    isPdfOnly: true,
    pdfDeliveryNotice: 'Cet ouvrage est vendu exclusivement sous forme de livre et guide au format PDF (non dispensé sous forme de formation vidéo en ligne). Réception immédiate du fichier PDF après règlement de 10 000 FCFA.',
    durationWeeks: 'Téléchargement direct',
    totalHours: 'Livre PDF complet',
    videoCount: 0,
    pdfCount: 1,
    bonusTitle: 'Contenu du Livre PDF (10 000 FCFA)',
    bonuses: [
      'Livre numérique complet en PDF : "L\'Éducation Financière - Bien gérer aujourd\'hui pour être libre demain"',
      'Méthode pas à pas pour stopper les fuites d’argent et épargner au moins 10% de chaque revenu',
      'Modèles de tableaux de bord financiers et canevas d’audit budgétaire familial',
      'Stratégies pratiques pour solder les dettes toxiques et investir dans des actifs productifs',
      'Envoi immédiat du fichier PDF par WhatsApp (+221 77 507 91 84) ou par e-mail'
    ],
    keyFeatures: [
      'Vendu sous forme de livre PDF (Pas une formation en ligne)',
      'Tarif unique : 10 000 FCFA (15 €)',
      'Méthode pragmatique adaptée aux réalités africaines',
      'Envoi immédiat sur WhatsApp ou e-mail'
    ],
    description: 'Ce pack est un livre pratique de référence vendu sous forme de PDF téléchargeable (10 000 FCFA). Ce n\'est pas une formation vidéo en ligne. Vous découvrirez comment reprendre le contrôle de votre argent, assainir vos finances personnelles face aux pesanteurs sociales et bâtir un patrimoine solide et durable.',
    targetAudience: [
      'Salariés, fonctionnaires et indépendants voulant reprendre le contrôle de leurs finances',
      'Jeunes couples préparant l’acquisition de leur résidence principale',
      'Toute personne endettée cherchant une issue pragmatique et durable',
      'Membres de la diaspora envoyant de l’argent au pays sans constitution d’épargne propre'
    ],
    prerequisites: 'Aucune notion préalable en comptabilité. Accessible à tous.',
    imageUrl: courseFinancialEducation,
    contactPhone: '+221 77 507 91 84',
    instructor: {
      name: 'Dr. Ephata & Conseillers Patrimoine',
      title: 'Pôle Éducation Financière & Patrimoine',
      bio: 'Conseillers patrimoniaux experts dans la gestion budgétaire en contexte africain et la vulgarisation des mécanismes d’investissement rentables et sécurisés.',
      avatarUrl: directorAvatar
    },
    hasFinancialCalculator: true,
    modules: [
      {
        id: 'fin-m1',
        number: 1,
        title: 'Commencer à remplir votre bourse',
        description: 'La règle universelle de payer d’abord sa propre personne : épargner au moins 10% de chaque revenu avant toute autre dépense.',
        duration: '2h 45m',
        lessons: [
          {
            id: 'fin-m1-l1',
            title: 'La première loi de la prospérité financière',
            duration: '22 min',
            type: 'video',
            summary: 'Pourquoi attendre la fin du mois pour épargner ne fonctionne jamais et comment automatiser son épargne dès réception du salaire.',
            videoDuration: 1320,
            textContent: [
              'Chaque mois, vous payez le propriétaire, la boutique, l’opérateur télécom, la Senelec, la Sen’Eau... Mais vous oubliez la personne qui a travaillé 30 jours pour cet argent : vous-même !',
              'La règle d’or : mettre de côté immédiatement au moins 10% de vos gains sur un compte bloqué ou un portefeuille d’épargne dédié.'
            ]
          }
        ]
      },
      {
        id: 'fin-m2',
        number: 2,
        title: 'Contrôlez vos dépenses',
        description: 'Distinguer les besoins fondamentaux des désirs superflus. Appliquer la formule 50/30/20 adaptée au coût de la vie en Afrique de l’Ouest.',
        duration: '3h 15m',
        lessons: [
          {
            id: 'fin-m2-l1',
            title: 'Traquer les dépenses fantômes et résister à la pression sociale',
            duration: '26 min',
            type: 'video',
            summary: 'Gérer avec sagesse les sollicitations familiales, les dépenses cérémoniales (baptêmes, mariages) sans compromettre sa sécurité financière.',
            videoDuration: 1560,
            textContent: [
              'Un budget n’est pas une prison, c’est une boussole qui vous dit où doit aller votre argent plutôt que de vous demander où il s’est envolé.',
              'Fixer une enveloppe mensuelle stricte pour les contributions sociales et familiales afin de préserver votre équilibre.'
            ]
          }
        ]
      },
      {
        id: 'fin-m3',
        number: 3,
        title: 'Fructifiez vos économies',
        description: 'Faire travailler l’argent pour soi. Introduction aux intérêts composés, comptes rémunérés, parts de SCPI, obligations du Trésor UEMOA et BRVM.',
        duration: '3h 30m',
        lessons: [
          {
            id: 'fin-m3-l1',
            title: 'Sortir de l’épargne morte sous le matelas pour passer à l’investissement',
            duration: '28 min',
            type: 'video',
            summary: 'L’impact dévastateur de l’inflation sur l’argent liquide et les véhicules simples pour faire fructifier son capital.',
            videoDuration: 1680,
            textContent: [
              'Laisser son argent stagner sur un compte courant sans intérêt revient à perdre chaque année 5% à 8% de pouvoir d’achat à cause de l’inflation.',
              'Découvrir les obligations du Trésor public émises par les États de l’UEMOA avec des rendements nets de 6% à 7% par an.'
            ]
          }
        ]
      },
      {
        id: 'fin-m4',
        number: 4,
        title: 'Protégez vos trésors contre la perte',
        description: 'La constitution d’un fonds d’urgence de 3 à 6 mois de dépenses, détection des arnaques de Ponzi et placements mirobolants, gestion des risques.',
        duration: '2h 45m',
        lessons: [
          {
            id: 'fin-m4-l1',
            title: 'Bâtir sa forteresse d’urgence et éviter les fausses promesses',
            duration: '24 min',
            type: 'reading',
            summary: 'Si une opportunité vous promet des rendements irréalistes sans effort, c’est une arnaque garantie.',
            textContent: [
              'La première règle de tout investissement réussi est : ne jamais perdre son capital de base.',
              'Le fonds d’urgence vous évite de contracter des crédits usuraires en cas de maladie ou d’imprévu.'
            ]
          }
        ]
      },
      {
        id: 'fin-m5',
        number: 5,
        title: 'Possédez votre propre maison',
        description: 'Stratégies concrètes d’accès au foncier et à l’immobilier au Sénégal : coopératives d’habitat, bail emphytéotique, titre foncier (TF) et construction progressive.',
        duration: '3h 30m',
        lessons: [
          {
            id: 'fin-m5-l1',
            title: 'Sécuriser l’achat d’une parcelle sans se faire escroquer',
            duration: '30 min',
            type: 'video',
            summary: 'Vérifications notariales indispensables, bornage contradictoire et certificat d’appartenance au Livre Foncier.',
            videoDuration: 1800,
            textContent: [
              'Devenir propriétaire libère des loyers à vie et procure une paix d’esprit incomparable pour votre famille.',
              'Privilégier la construction par tranches maîtrisées sans surendettement.'
            ]
          }
        ]
      },
      {
        id: 'fin-m6',
        number: 6,
        title: 'Augmentez toujours vos connaissances',
        description: 'Votre meilleur investissement, c’est vous-même ! Développer des compétences rares, monétisables et recherchées sur le marché.',
        duration: '2h 30m',
        lessons: [
          {
            id: 'fin-m6-l1',
            title: 'Le capital humain comme multiplicateur de richesse',
            duration: '20 min',
            type: 'reading',
            summary: 'Consacrer chaque année une part de son budget à l’acquisition de nouvelles compétences professionnelles et numériques.',
            textContent: [
              'Une compétence mise à jour vous permet de négocier des augmentations de salaire ou de lancer une activité secondaire rentable.'
            ]
          }
        ]
      },
      {
        id: 'fin-m7',
        number: 7,
        title: 'Les 5 lois de votre indépendance financière',
        description: 'Synthèse magistrale et plan d’action sur 12 mois pour transformer radicalement sa situation patrimoniale.',
        duration: '3h 00m',
        lessons: [
          {
            id: 'fin-m7-l1',
            title: 'Le plan de route vers la liberté totale',
            duration: '25 min',
            type: 'video',
            summary: 'Récapitulatif des 5 lois immuables et signature de votre contrat d’engagement personnel.',
            videoDuration: 1500,
            textContent: [
              'Loi 1 : L’or vient volontiers à celui qui met de côté au moins un dixième de ses gains.',
              'Loi 2 : L’or travaille avec diligence pour le propriétaire avisé qui lui trouve un emploi profitable.',
              'Loi 3 : L’or s’attache à la protection du propriétaire prudent qui l’investit selon les conseils d’hommes sages.',
              'Loi 4 : L’or échappe à l’homme qui l’investit dans des entreprises qu’il ne comprend pas.',
              'Loi 5 : L’or fuit l’homme qui le force à des gains impossibles ou écoute les séductions des charlatans.'
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'langue-serere',
    title: 'Pack Apprendre le Sérère Sine-Saloum en 30 jours',
    subtitle: 'Guide complet PDF & Audios studio immersifs pour maîtriser le sérère authentique du Sine-Saloum en 30 jours.',
    badge: 'Pack Audio & PDF · 5 000 FCFA',
    category: 'langue',
    categoryLabel: 'Pack Langue & Audio',
    price: 5000,
    originalPrice: 15000,
    durationWeeks: '30 jours intensifs',
    totalHours: '15h de vidéos & audio',
    videoCount: 20,
    pdfCount: 30,
    bonusTitle: 'Pack Immersion Audio & Lexique Inclus',
    bonuses: [
      '20 vidéos pratiques immersives tournées en contexte réel',
      '30 fiches PDF de cours complet avec exercices corrigés',
      '100 expressions courantes indispensables avec phonétique et audio',
      'Lexique comparatif des variantes dialectales (Sine, Saloum, Baol)',
      'Guide des traditions, parenté à plaisanterie et us et coutumes sérères'
    ],
    keyFeatures: [
      'Méthode progressive accessible aux grands débutants',
      'Studio de prononciation audio interactive inclus dans la plateforme',
      'Mises en situation au marché, dans la famille et en voyage',
      'Paiement sécurisé Wave, Orange Money, Ria, Western Union'
    ],
    description: 'Vous souhaitez renouer avec vos racines, communiquer avec vos beaux-parents, vos aînés au village ou voyager sereinement dans les magnifiques régions de Fatick, Foundiougne, Kaolack ou Diourbel ? Cette formation unique vous permet de comprendre et parler le sérère avec assurance en seulement 30 jours !',
    targetAudience: [
      'Descendants sérères urbains ou de la diaspora désireux de parler leur langue maternelle',
      'Conjoint(e)s de personnes sérères voulant dialoguer avec leur belle-famille',
      'Professionnels de santé, ONG ou enseignants affectés dans les régions de Fatick, Kaolack et Thiès',
      'Passionnés de culture et de langues traditionnelles sénégalaises'
    ],
    prerequisites: 'Aucune notion requise. Ce cours démarre des salutations élémentaires.',
    imageUrl: courseSerereDelta,
    contactPhone: '+221 77 507 91 84',
    instructor: {
      name: 'Dr. Ephata & Maîtres de Langues',
      title: 'Pôle Valorisation Linguistique & Patrimoine Culturel',
      bio: 'Enseignants et linguistes spécialistes des langues nationales sénégalaises, passionnés par la transmission vivante du parler sérère du Sine, du Saloum et du Baol.',
      avatarUrl: directorAvatar
    },
    hasAudioPractice: true,
    modules: [
      {
        id: 'ser-m1',
        number: 1,
        title: 'Les Salutations et Présentations Fondamentales',
        description: 'Les codes de politesse, saluer le matin et le soir selon l’âge et le statut, demander des nouvelles de la famille.',
        duration: '2h 30m',
        lessons: [
          {
            id: 'ser-m1-l1',
            title: 'Mba mbadio ? Les salutations quotidiennes',
            duration: '20 min',
            type: 'video',
            summary: 'Maîtriser les formules clés : Mba mbadio (Bonjour), Jam som (En paix), Mba xoolano (As-tu bien dormi ?).',
            videoDuration: 1200,
            textContent: [
              'En pays sérère, la salutation est un rituel sacré qui établit la bienveillance et le respect mutuel.',
              'On commence toujours par s’enquérir de la paix (Jam) avant d’aborder tout sujet.'
            ]
          }
        ]
      },
      {
        id: 'ser-m2',
        number: 2,
        title: 'Les Nombres, Compter et Faire le Marché',
        description: 'Compter de 1 à 1000 en sérère, négocier les prix au marché (louma), demander la monnaie et désigner les aliments.',
        duration: '3h 00m',
        lessons: [
          {
            id: 'ser-m2-l1',
            title: 'Compter en sérère et négocier au marché',
            duration: '25 min',
            type: 'video',
            summary: 'Leno (1), Dik (2), Tadak (3)... et la formule indispensable : Taxa refu xaye ? (Combien coûte ceci ?).',
            videoDuration: 1500,
            textContent: [
              'Le système numérique sérère repose sur une base quinaire très intuitive (5+1 = 6, 5+2 = 7).',
              'Au marché, utiliser la formule polie "Waaño maye a teeb" pour solliciter un rabais sympathique.'
            ]
          }
        ]
      },
      {
        id: 'ser-m3',
        number: 3,
        title: 'La Famille, la Maison et le Respect des Aînés',
        description: 'Vocabulaire de la parenté (père, mère, frères, sœurs, grands-parents) et expressions de déférence dans la concession.',
        duration: '2h 45m',
        lessons: [
          {
            id: 'ser-m3-l1',
            title: 'Désigner ses proches avec respect',
            duration: '22 min',
            type: 'reading',
            summary: 'Baaba am (mon père), Yaam (ma mère), Bi am (mon enfant) et les proverbes sur la cohésion familiale.',
            textContent: [
              'Les liens de sang et la solidarité clanique occupent une place centrale dans la culture sérère.'
            ]
          }
        ]
      },
      {
        id: 'ser-m4',
        number: 4,
        title: 'Voyager et s’orienter dans le Sine, Saloum et Baol',
        description: 'Demander son chemin, prendre le transport en commun ou la pirogue, désigner les lieux de culte et points d’eau.',
        duration: '3h 15m',
        lessons: [
          {
            id: 'ser-m4-l1',
            title: 'Mbe gayo ? S’orienter facilement au village',
            duration: '24 min',
            type: 'video',
            summary: 'Comprendre les indications géographiques et les repères naturels du terroir.',
            videoDuration: 1440,
            textContent: [
              'Dans les îles du Saloum ou dans les villages du Sine, savoir demander son chemin en sérère ouvre immédiatement toutes les portes.'
            ]
          }
        ]
      }
    ]
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return COURSES.find(c => c.id === id);
};
