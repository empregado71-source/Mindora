import { CurriculumModule, FinalSubjectAssessment } from '../../types';

export const CHEMISTRY_MODULES: CurriculumModule[] = [
  {
    id: "qui-mod-1",
    moduleNumber: 1,
    title: "Estrutura Atómica e Tabela Periódica",
    description: "Modelos atómicos (Dalton, Thomson, Rutherford, Bohr e modelo quântico orbital), número atómico (Z), número de massa (A), isótopos, distribuição eletrónica de Linus Pauling e propriedades periódicas (raio atómico, energia de ionização e eletronegatividade).",
    targetLevel: "Iniciante",
    estimatedHours: 16,
    units: [
      {
        id: "qui-u1-1",
        unitNumber: 1,
        title: "Partículas Subatómicas e Configuração Eletrónica",
        description: "Protões, neutrões, eletrões, princípio de Aufbau, regra de Hund e diagrama de Pauling.",
        lessons: [
          {
            id: "qui-l-1-1-1",
            title: "O Átomo Quântico, Camadas e Regra do Octeto",
            durationMinutes: 60,
            explanation: "O átomo é composto por um núcleo central extremamente denso contendo protões (carga +1) e neutrões (carga 0), rodeado pela eletrosfera onde os eletrões (carga -1 e massa desprezável) orbitam em níveis e subníveis energéticos (s, p, d, f). O número atómico Z define a identidade do elemento químico (número de protões). O número de massa A é a soma de protões e neutrões (A = Z + N). A distribuição eletrónica de Linus Pauling organiza os eletrões por ordem crescente de energia. A Regra do Octeto estabelece que a maioria dos átomos atinge estabilidade termodinâmica ao completar 8 eletrões na sua camada de valência (configuração de gás nobre).",
            fundamentalConcepts: [
              "Número Atómico (Z) e Número de Massa (A)",
              "Isótopos (mesmo Z, diferente A), Isóbaros (mesmo A) e Isótonos (mesmo N)",
              "Propriedades periódicas: raio atómico, afinidade eletrónica e eletronegatividade de Pauling"
            ],
            practicalExamples: [
              "O átomo de Carbono tem Z = 6. Distribuição eletrónica: 1s² 2s² 2p². Tem 4 eletrões na camada de valência (camada 2), precisando de partilhar mais 4 eletrões (tetravalência) para completar o octeto.",
              "Isótopos do hidrogénio: Prótio (1 protão, 0 neutrões), Deutério (1 protão, 1 neutrão) e Trítio (1 protão, 2 neutrões)."
            ],
            realWorldApplications: [
              "Medicina nuclear e radioterapia: utilização do isótopo Radioiodo-131 para tratamento de cancro da tiroide.",
              "Engenharia de semicondutores: dopagem de silício com fósforo ou boro para criar transístores e chips de computador."
            ],
            stepByStepExercises: [
              {
                problem: "O átomo de Sódio possui número atómico Z = 11 e número de massa A = 23. Determina a sua quantidade de protões, neutrões, eletrões e a distribuição eletrónica.",
                steps: [
                  "Passo 1: O número de protões é igual ao número atómico: Protões = Z = 11.",
                  "Passo 2: Num átomo neutro, o número de eletrões é igual ao número de protões: Eletrões = 11.",
                  "Passo 3: O número de neutrões N é a diferença entre massa e número atómico: N = A - Z = 23 - 11 = 12 neutrões.",
                  "Passo 4: Efetuar a distribuição eletrónica por Linus Pauling para 11 eletrões: 1s² 2s² 2p⁶ 3s¹.",
                  "Passo 5: Concluir: o Sódio tem 1 eletrão na camada de valência (camada 3, subnível 3s¹), pertencendo ao grupo 1 (metais alcalinos)."
                ],
                finalAnswer: "11 protões, 12 neutrões, 11 eletrões e configuração 1s² 2s² 2p⁶ 3s¹."
              }
            ],
            practiceExercises: [
              {
                q: "Qual elemento químico possui a maior eletronegatividade na tabela periódica de acordo com Linus Pauling?",
                options: ["Flúor (F)", "Oxigénio (O)", "Cloro (Cl)", "Frâncio (Fr)"],
                correct: 0,
                hint: "Fica no canto superior direito da tabela periódica (excluindo os gases nobres).",
                explanation: "O Flúor possui a maior atração por eletrões de ligação, com valor de eletronegatividade de 4.0."
              }
            ],
            summary: "A estrutura eletrónica dos átomos dita todas as propriedades químicas, reatividade e formação de moléculas no universo.",
            reviewQuestions: [
              {
                q: "Dois átomos que possuem o mesmo número de protões mas diferente número de massa são chamados de:",
                options: ["Isótopos", "Isóbaros", "Isótonos", "Alótropos"],
                correct: 0,
                hint: "Pensa na letra 'p' de protões.",
                explanation: "Isótopos pertencem ao mesmo elemento químico (mesmo Z) com massas diferentes por terem quantidades distintas de neutrões."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 1 — Estrutura Atómica e Tabela Periódica",
      instructions: "Responde demonstrando domínio das propriedades atómicas.",
      passingScorePercentage: 70,
      questions: [
        {
          q: "Quantos eletrões cabem no máximo no subnível 'p'?",
          options: ["6", "2", "10", "14"],
          correct: 0,
          hint: "O subnível 'p' tem 3 orbitais, cada qual comportando até 2 eletrões com spins opostos.",
          explanation: "3 orbitais × 2 eletrões = 6 eletrões no máximo."
        }
      ]
    }
  }
];

export const BIOLOGY_MODULES: CurriculumModule[] = [
  {
    id: "bio-mod-1",
    moduleNumber: 1,
    title: "Citologia e Bioquímica Celular",
    description: "Teoria Celular, diferenças estruturais entre células procarióticas e eucarióticas (animais e vegetais), organelos citoplasmáticos (mitocôndrias, cloroplastos, retículo endoplasmático, complexo de Golgi, ribossomas), transporte membranar (difusão, osmose, transporte ativo) e bioenergética (respiração celular, fotossíntese e fermentação).",
    targetLevel: "Iniciante",
    estimatedHours: 18,
    units: [
      {
        id: "bio-u1-1",
        unitNumber: 1,
        title: "A Célula como Unidade Fundamental da Vida",
        description: "Membrana plasmática (mosaico fluido), organelos membranosos e respiração celular mitocondrial (ATP).",
        lessons: [
          {
            id: "bio-l-1-1-1",
            title: "Organelos Celulares, Membrana e Respiração Celular",
            durationMinutes: 65,
            explanation: "Todos os seres vivos são constituídos por células, a menor unidade estrutural, funcional e reprodutiva da vida. As células procarióticas (bactérias) não possuem núcleo delimitado por membrana, enquanto as células eucarióticas possuem carioteca e organelos especializados. A membrana plasmática tem estrutura de bicamada fosfolipídica com proteínas inseridas (modelo do mosaico fluido de Singer-Nicholson). As mitocôndrias são as centrais energéticas celulares onde ocorre a respiração aeróbica: Glicólise (no citoplasma) ➔ Ciclo de Krebs (na matriz mitocondrial) ➔ Cadeia Transportadora de Eletrões (nas cristas mitocondriais), sintetizando cerca de 30 a 32 moléculas de ATP por cada molécula de glicose degradada (C₆H₁₂O₆ + 6O₂ ➔ 6CO₂ + 6H₂O + ATP).",
            fundamentalConcepts: [
              "Teoria Celular de Schleiden e Schwann",
              "Mitocôndrias e respiração celular aeróbica (ATP como moeda energética universal)",
              "Cloroplastos e fotossíntese nos vegetais: 6CO₂ + 6H₂O + luz ➔ C₆H₁₂O₆ + 6O₂",
              "Transporte passivo (sem gasto de ATP, a favor do gradiente) vs. transporte ativo (com ATP, ex: bomba de sódio-potássio Na⁺/K⁺)"
            ],
            practicalExamples: [
              "Osmose no dia a dia: colocar sal sobre uma alface desidrata as folhas porque a água sai por osmose do meio menos concentrado (célula) para o mais concentrado (exterior hipertónico).",
              "Cãibras musculares: ocorrem durante esforço físico intenso quando falta oxigénio e as células musculares recorrem à fermentação lática anaeróbica de emergência."
            ],
            realWorldApplications: [
              "Biotecnologia e indústria farmacêutica: produção de insulina humana recombinante através de bactérias transgénicas modificadas geneticamente.",
              "Medicina de transplantes e terapias regenerativas com células-tronco pluripotentes."
            ],
            stepByStepExercises: [
              {
                problem: "Compara o rendimento energético da fermentação alcoólica com a respiração celular aeróbica completa a partir de 1 mol de glicose.",
                steps: [
                  "Passo 1: Analisar a fermentação: processo anaeróbico que realiza apenas a glicólise. Rendimento líquido = 2 ATP por glicose.",
                  "Passo 2: Analisar a respiração aeróbica: processo completo com oxigénio (glicólise + ciclo de Krebs + fosforilação oxidativa). Rendimento líquido = cerca de 30 a 32 ATP.",
                  "Passo 3: Comparar a eficiência: a respiração aeróbica produz cerca de 15 a 16 vezes mais energia por molécula de glicose do que a fermentação."
                ],
                finalAnswer: "A respiração aeróbica gera 30-32 ATP contra apenas 2 ATP na fermentação."
              }
            ],
            practiceExercises: [
              {
                q: "Qual organelo celular é responsável pela síntese de proteínas nas células de todos os seres vivos?",
                options: ["Ribossoma", "Lisossoma", "Complexo de Golgi", "Centríolo"],
                correct: 0,
                hint: "Traduz as instruções do RNA mensageiro em cadeias de aminoácidos.",
                explanation: "Os ribossomas realizam a tradução do código genético, montando as proteínas vitais para a célula."
              }
            ],
            summary: "A célula opera como uma metrópole microscópica perfeitamente sincronizada através de milhares de reações bioquímicas simultâneas.",
            reviewQuestions: [
              {
                q: "Qual é a principal função das mitocôndrias nas células eucarióticas?",
                options: [
                  "Produção de energia celular na forma de ATP através da respiração celular",
                  "Digestão intracelular de toxinas",
                  "Fotossíntese e produção de clorofila",
                  "Armazenamento de água no vacúolo"
                ],
                correct: 0,
                hint: "Centro energético da célula.",
                explanation: "As mitocôndrias produzem ATP através do ciclo de Krebs e da fosforilação oxidativa com oxigénio."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 1 — Citologia e Bioenergética",
      instructions: "Identifica organelos e processos metabólicos celulares.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Numa solução hipertónica, o que acontece a uma célula animal desprovida de parede celular?",
          options: [
            "Perde água por osmose e murcha (crenação)",
            "Absorve água em excesso até rebentar (lise)",
            "Permanece inalterada",
            "Divide-se por mitose"
          ],
          correct: 0,
          hint: "A água move-se sempre para onde a concentração de soluto é maior.",
          explanation: "O meio hipertónico atrai a água de dentro da célula, fazendo-a perder volume e desidratar."
        }
      ]
    }
  }
];
