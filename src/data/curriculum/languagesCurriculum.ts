import { CourseCurriculumModule } from '../../types';

export const ENGLISH_A1_C2_CURRICULUM: CourseCurriculumModule[] = [
  {
    id: "eng-mod-a1",
    moduleNumber: 1,
    levelBadge: "Nível A1 (Iniciante)",
    title: "A1: Breakthrough — Primeiros Passos e Sobrevivência Básica",
    description: "Apresentações pessoais, saudações formais e informais, verbo 'to be', artigos, pronomes pessoais, família, números, horas e rotinas com o Present Simple.",
    units: [
      {
        id: "eng-u-a1-1",
        unitNumber: 1,
        title: "Unit 1: Greetings, Introductions & The Verb 'To Be'",
        description: "Formas afirmativas, negativas e interrogativas do verbo To Be, pronomes e vocabulário essencial de boas-vindas.",
        lessons: [
          {
            id: "eng-l-a1-1-1",
            title: "Lesson 1: Self-Introductions & Personal Details",
            duration: "35 min",
            content: `In English, introducing yourself is the foundation of communication.
Key structures:
- "My name is [Name]" or "I am [Name]"
- "Where are you from?" ➔ "I am from Angola / Portugal / Brazil"
- "How old are you?" ➔ "I am 24 years old" (Note: in English we use the verb 'to be', NOT 'to have' for age!)

Grammar Focus — The Verb 'To Be':
- I am (I'm)
- You are (You're)
- He / She / It is (He's / She's / It's)
- We are (We're)
- They are (They're)

Negative: add 'not' ➔ "I am not tired", "She is not here".
Questions: invert verb and subject ➔ "Are you a student?", "Is he a teacher?"`,
            vocabulary: [
              { word: "Nice to meet you", translation: "Prazer em conhecer-te", phonetic: "/naɪs tuː miːt juː/" },
              { word: "Where are you from?", translation: "De onde és?", phonetic: "/weər ɑːr juː frɒm/" },
              { word: "Occupation / Job", translation: "Profissão / Trabalho", phonetic: "/ˌɒkjuˈpeɪʃn/" },
              { word: "Country / Nationality", translation: "País / Nacionalidade", phonetic: "/ˈkʌntri/" }
            ],
            dialogue: [
              { speaker: "David", text: "Hello! My name is David. What's your name?", translation: "Olá! O meu nome é David. Qual é o teu nome?" },
              { speaker: "Sofia", text: "Hi David! I'm Sofia. Nice to meet you. Are you from London?", translation: "Olá David! Sou a Sofia. Prazer em conhecer-te. És de Londres?" },
              { speaker: "David", text: "Yes, I am. And you?", translation: "Sim, sou. E tu?" },
              { speaker: "Sofia", text: "I am from Luanda, Angola. I am an engineer.", translation: "Sou de Luanda, Angola. Sou engenheira." }
            ],
            grammarTip: "Never say 'I have 20 years'. In English, you ARE your age: 'I am 20 years old'.",
            exercise: {
              question: "Complete the sentence: 'She ______ from Portugal and she ______ 22 years old.'",
              options: ["is / is", "are / has", "is / has", "am / is"],
              correct: 0,
              explanation: "For 3rd person singular (She) we use 'is' for nationality and also 'is' for age."
            }
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Assessment A1 — Basic English Fundamentals",
      questions: [
        {
          q: "Choose the grammatically correct question in English:",
          options: ["Are you a doctor?", "You are a doctor?", "Is you a doctor?", "Do you are a doctor?"],
          correct: 0,
          hint: "Verb 'To Be' inverts with the subject in questions.",
          explanation: "'Are you a doctor?' is the standard subject-verb inversion."
        }
      ]
    }
  },
  {
    id: "eng-mod-a2",
    moduleNumber: 2,
    levelBadge: "Nível A2 (Básico)",
    title: "A2: Waystage — Passado Simples, Comparações e Planos Futuros",
    description: "Past Simple (verbos regulares e irregulares), Past Continuous, adjetivos comparativos e superlativos, e planos com 'going to' e 'will'.",
    units: [
      {
        id: "eng-u-a2-1",
        unitNumber: 1,
        title: "Unit 1: The Past Simple — Memories & Life Events",
        description: "Regra do -ed nos verbos regulares e as 50 formas irregulares mais comuns (went, had, saw, made, thought).",
        lessons: [
          {
            id: "eng-l-a2-1-1",
            title: "Lesson 1: Regular and Irregular Past Simple",
            duration: "40 min",
            content: `The Past Simple expresses completed actions in a specific past time.
Key Markers: yesterday, last night, last year, in 2020, two days ago.

Regular verbs: add '-ed' (work ➔ worked, play ➔ played, study ➔ studied).
Irregular verbs (must be memorized):
- go ➔ went
- have ➔ had
- see ➔ saw
- buy ➔ bought
- write ➔ wrote

Negative & Question Auxiliary: DID
In negative and questions, use DID/DIDN'T and return the main verb to the INFINITIVE!
- Affirmative: "I went to school yesterday."
- Negative: "I DIDN'T go to school yesterday." (NOT "didn't went")
- Question: "DID you go to school yesterday?"`,
            vocabulary: [
              { word: "Yesterday", translation: "Ontem", phonetic: "/ˈjestədeɪ/" },
              { word: "Last weekend", translation: "Último fim de semana", phonetic: "/lɑːst ˌwiːkˈend/" },
              { word: "Two years ago", translation: "Há dois anos atrás", phonetic: "/tuː jɪəz əˈɡoʊ/" }
            ],
            dialogue: [
              { speaker: "Lucas", text: "Did you watch the match yesterday?", translation: "Viste o jogo ontem?" },
              { speaker: "Emma", text: "No, I didn't. I studied for my exam all night.", translation: "Não vi. Estudei para o meu exame a noite toda." }
            ],
            grammarTip: "Remember: 'did' carries the past tense. The main verb stays in base form: 'Did you see?' NOT 'Did you saw?'",
            exercise: {
              question: "What is the correct negative form of: 'They bought a new house'?",
              options: ["They didn't buy a new house", "They didn't bought a new house", "They not bought a new house", "They haven't buy a new house"],
              correct: 0,
              explanation: "Use 'didn't' followed by the base infinitive 'buy'."
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-mod-b1",
    moduleNumber: 3,
    levelBadge: "Nível B1 (Intermédio)",
    title: "B1: Threshold — Present Perfect, Condicionais e Voz Passiva",
    description: "Present Perfect Simple vs. Past Simple (experiências de vida), 1ª e 2ª Condicionais (if clauses), voz passiva básica e modais de dedução.",
    units: [
      {
        id: "eng-u-b1-1",
        unitNumber: 1,
        title: "Unit 1: Present Perfect — Connecting Past to Present",
        description: "Have/Has + Past Participle, marcadores 'ever', 'never', 'already', 'yet', 'for' e 'since'.",
        lessons: [
          {
            id: "eng-l-b1-1-1",
            title: "Lesson 1: Present Perfect for Experiences",
            duration: "45 min",
            content: `The Present Perfect connects a past event with the present moment. We use it when the exact time of the action is NOT mentioned or is unimportant, focusing on the result or life experience.
Formula: Subject + have / has + Past Participle (V3).

Examples:
- "I have visited London three times in my life." (Life experience)
- "Have you ever eaten sushi?" ➔ "No, I have never eaten sushi."
- "She has just finished her project." (Recent completion)
- "I have lived in this city FOR five years / SINCE 2019." (Started in past, continues now).`,
            vocabulary: [
              { word: "Ever", translation: "Alguma vez na vida", phonetic: "/ˈevər/" },
              { word: "Never", translation: "Nunca", phonetic: "/ˈnevər/" },
              { word: "Already", translation: "Já (em frases afirmativas)", phonetic: "/ɔːlˈredi/" },
              { word: "Yet", translation: "Ainda (em negativas e perguntas)", phonetic: "/jet/" }
            ],
            dialogue: [
              { speaker: "Carlos", text: "Have you ever traveled to Japan?", translation: "Já viajaste alguma vez para o Japão?" },
              { speaker: "Ana", text: "No, I haven't been there yet, but I have already booked my flight for next year!", translation: "Não, ainda não estive lá, mas já reservei o meu voo para o próximo ano!" }
            ],
            grammarTip: "If you specify WHEN something happened (e.g., 'in 2018', 'yesterday'), use Past Simple: 'I went to Paris in 2018', NOT 'I have gone in 2018'.",
            exercise: {
              question: "Choose the correct sentence:",
              options: [
                "I have worked here since 2021.",
                "I have worked here for 2021.",
                "I work here since 2021.",
                "I worked here since 2021."
              ],
              correct: 0,
              explanation: "'Since' indicates the starting point in time (2021) with Present Perfect."
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-mod-b2",
    moduleNumber: 4,
    levelBadge: "Nível B2 (Intermédio Alto)",
    title: "B2: Vantage — Fluência Argumentativa e Terceira Condicional",
    description: "Third Conditional (arrependimentos hipotéticos), discurso indireto (Reported Speech), Phrasal Verbs avançados e conectores discursivos formais para ensaios.",
    units: [
      {
        id: "eng-u-b2-1",
        unitNumber: 1,
        title: "Unit 1: The Third Conditional & Past Regrets",
        description: "If + had + past participle, would have + past participle.",
        lessons: [
          {
            id: "eng-l-b2-1-1",
            title: "Lesson 1: Hypothetical Past & Unreal Conditions",
            duration: "50 min",
            content: `The Third Conditional talks about an impossible condition in the past and its hypothetical result. Since the event already happened, we are imagining an alternate reality or expressing regret.
Structure:
If + Past Perfect (had + V3), ... would have + Past Participle (would have + V3).

Examples:
- "If I had studied harder, I would have passed the exam." (Reality: I didn't study hard, so I didn't pass).
- "If we had left earlier, we wouldn't have missed the flight."`,
            vocabulary: [
              { word: "Regret", translation: "Arrependimento / Lamentar", phonetic: "/rɪˈɡret/" },
              { word: "In hindsight", translation: "Em retrospetiva", phonetic: "/ɪn ˈhaɪndsaɪt/" }
            ],
            dialogue: [
              { speaker: "Mark", text: "If you had told me about the meeting, I would have prepared the slides.", translation: "Se me tivesses avisado sobre a reunião, eu teria preparado os diapositivos." },
              { speaker: "Sarah", text: "I apologize, my internet connection had completely collapsed.", translation: "Peço desculpa, a minha ligação à internet tinha colapsado completamente." }
            ],
            grammarTip: "Never use 'would have' inside the 'if' clause. Say 'If I had known', NOT 'If I would have known'.",
            exercise: {
              question: "Complete: 'If she ______ the train, she ______ on time.'",
              options: [
                "had caught / would have arrived",
                "caught / would arrive",
                "would have caught / arrived",
                "has caught / will arrive"
              ],
              correct: 0,
              explanation: "Third conditional formula: If + had caught, would have arrived."
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-mod-c1",
    moduleNumber: 5,
    levelBadge: "Nível C1 (Avançado)",
    title: "C1: Effective Operational Proficiency — Inversões e Matizes Estilísticas",
    description: "Inversão enfática com advérbios negativos (Rarely have I seen...), cleft sentences, collocations sofisticadas e registo de debate académico.",
    units: [
      {
        id: "eng-u-c1-1",
        unitNumber: 1,
        title: "Unit 1: Inversion for Emphasis & Rhetoric",
        description: "Estruturas inversas que transformam discursos formais e apresentações executivas.",
        lessons: [
          {
            id: "eng-l-c1-1-1",
            title: "Lesson 1: Negative Adverb Inversion",
            duration: "55 min",
            content: `In formal and literary English, when a sentence begins with a negative or limiting adverb, the auxiliary verb comes BEFORE the subject, just like in a question.
Key Triggers: Seldom, Rarely, Never before, Little, Under no circumstances, Not only... but also.

Examples:
- Standard: "I have rarely witnessed such dedication."
- Inverted (C1): "Rarely HAVE I witnessed such dedication."
- Standard: "She little knew what was going to happen."
- Inverted (C1): "Little DID she know what was going to happen."
- "Under no circumstances SHOULD you disclose the secret key."`,
            vocabulary: [
              { word: "Seldom", translation: "Raras vezes / Raramente", phonetic: "/ˈseldəm/" },
              { word: "Under no circumstances", translation: "Sob circunstância alguma", phonetic: "/ˈʌndər noʊ ˈsɜːrkəmstænsɪz/" }
            ],
            dialogue: [
              { speaker: "Professor", text: "Seldom have I encountered an undergraduate paper with such profound conceptual clarity.", translation: "Raras vezes encontrei um trabalho de licenciatura com tão profunda clareza conceptual." }
            ],
            grammarTip: "Notice the auxiliary verb: in simple present use 'do/does', in simple past use 'did': 'Hardly had we arrived when the lights went out.'",
            exercise: {
              question: "Rewrite using inversion: 'He had never felt so honored.'",
              options: [
                "Never had he felt so honored.",
                "Never he had felt so honored.",
                "Never did he felt so honored.",
                "Had he never felt so honored."
              ],
              correct: 0,
              explanation: "Negative adverb 'Never' triggers inversion: auxiliary 'had' moves before subject 'he'."
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-mod-c2",
    moduleNumber: 6,
    levelBadge: "Nível C2 (Domínio Nativo / Mestria)",
    title: "C2: Mastery — Expressão Idiomática Impecável e Retórica Magistral",
    description: "Expressões idiomáticas raras, ironia sutil, nuances estilísticas, registos poéticos e domínio total de literatura clássica e contemporânea.",
    units: [
      {
        id: "eng-u-c2-1",
        unitNumber: 1,
        title: "Unit 1: Subtlety, Idioms & Sophisticated Register",
        description: "Metáforas elaboradas, nuances de eufemismo e precisão lexical sem falhas.",
        lessons: [
          {
            id: "eng-l-c2-1-1",
            title: "Lesson 1: Mastery of Nuance & High Register",
            duration: "60 min",
            content: `At the C2 Mastery level, you do not merely speak English; you command the emotional resonance, cadence and historic subtleties of the language.
Idiomatic Mastery:
- "To beat around the bush" ➔ To avoid speaking directly.
- "A double-edged sword" ➔ A benefit that simultaneously poses inherent risk.
- "To bite the bullet" ➔ To face an inevitable grim situation with stoic resolve.
- "To play devil's advocate" ➔ To argue an opposing point purely for intellectual scrutiny.`,
            vocabulary: [
              { word: "Quintessential", translation: "O exemplo mais perfeito / Por excelência", phonetic: "/ˌkwɪntɪˈsenʃl/" },
              { word: "Serendipity", translation: "Acaso afortunado / Descoberta feliz", phonetic: "/ˌserənˈdɪpəti/" }
            ],
            dialogue: [
              { speaker: "Diplomat", text: "While I appreciate your candor, we must not let haste compromise our overarching geopolitical strategy.", translation: "Embora aprecie a sua franqueza, não devemos permitir que a pressa comprometa a nossa estratégia geopolítica global." }
            ],
            grammarTip: "C2 mastery involves choosing the exact register suitable for international summits, academic journals, or delicate diplomatic negotiations.",
            exercise: {
              question: "What does the expression 'to bite the bullet' mean?",
              options: [
                "To accept a difficult situation with courage and resolve",
                "To shoot a weapon rapidly",
                "To chew very hard food",
                "To make a sudden financial profit"
              ],
              correct: 0,
              explanation: "'To bite the bullet' is an idiom meaning to stoically confront an unpleasant necessity."
            }
          }
        ]
      }
    ]
  }
];
