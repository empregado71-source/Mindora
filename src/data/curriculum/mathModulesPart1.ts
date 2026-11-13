import { CurriculumModule } from '../../types';

export const MATH_MODULES_PART1: CurriculumModule[] = [
  {
    id: "mat-mod-1",
    moduleNumber: 1,
    title: "Fundamentos da Matemática",
    description: "Simbologia fundamental, axiomas lógicos, conjuntos numéricos e operações básicas que sustentam todo o raciocínio matemático moderno.",
    targetLevel: "Iniciante",
    estimatedHours: 12,
    units: [
      {
        id: "mat-u1-1",
        unitNumber: 1,
        title: "A Linguagem e Símbolos da Matemática",
        description: "Compreensão de quantificadores (∀, ∃), pertinência (∈, ∉), inclusão (⊂, ⊆) e proposições fundamentais.",
        lessons: [
          {
            id: "mat-l-1-1-1",
            title: "Simbologia, Proposições e Conectivos",
            durationMinutes: 45,
            explanation: "A matemática é uma linguagem universal regida por regras de dedução precisas. Uma proposição matemática é uma sentença declarativa à qual se pode atribuir um e apenas um valor de verdade: Verdadeiro (V) ou Falso (F). A negação de uma proposição P (representada por ¬P ou ~P) inverte o seu valor lógico. Os conectivos de conjunção ('e', ∧) e disjunção ('ou', ∨) combinam proposições simples em afirmações compostas rigorosas.",
            fundamentalConcepts: [
              "Proposição simples e composta",
              "Tabela de verdade e quantificadores universal (∀) e existencial (∃)",
              "Princípio do terceiro excluído e da não-contradição"
            ],
            practicalExamples: [
              "Se P: '7 é um número primo' (V) e Q: '7 é par' (F), então a conjunção P ∧ Q é Falsa, mas a disjunção P ∨ Q é Verdadeira.",
              "A negação de 'Todos os triângulos têm 3 lados' (∀x: T(x)) é 'Existe pelo menos um triângulo que não tem 3 lados' (∃x: ¬T(x))."
            ],
            realWorldApplications: [
              "Programação e arquitetura de computadores: circuitos lógicos booleanos usam exatamente estas regras para executar instruções de CPU.",
              "Contratos jurídicos e algoritmos de inteligência artificial dependem de regras lógicas sem ambiguidades."
            ],
            stepByStepExercises: [
              {
                problem: "Determina o valor de verdade da proposição composta: (5 > 2) ∧ (3² = 9).",
                steps: [
                  "Passo 1: Avaliar a primeira proposição elementar P: '5 > 2'. Como 5 é maior que 2, P = Verdadeiro.",
                  "Passo 2: Avaliar a segunda proposição elementar Q: '3² = 9'. Como 3 × 3 = 9, Q = Verdadeiro.",
                  "Passo 3: Aplicar a tabela de verdade da conjunção (∧): Verdadeiro ∧ Verdadeiro = Verdadeiro."
                ],
                finalAnswer: "A proposição composta é Verdadeira."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é a negação lógica da afirmação: 'Todos os alunos foram aprovados'?",
                options: [
                  "Nenhum aluno foi aprovado.",
                  "Pelo menos um aluno não foi aprovado.",
                  "Todos os alunos foram reprovados.",
                  "Alguns alunos foram aprovados."
                ],
                correct: 1,
                hint: "A negação de 'para todo' (∀) é 'existe pelo menos um que não' (∃¬).",
                explanation: "Para contradizer que 'todos foram aprovados', basta encontrar um único aluno que não tenha sido aprovado."
              }
            ],
            summary: "A lógica proposicional e a notação simbólica impedem interpretações dúbias e formam a fundação de todas as demonstrações matemáticas.",
            reviewQuestions: [
              {
                q: "O que representa o símbolo quantificador universal '∀'?",
                options: ["Existe pelo menos um", "Para todo / Qualquer que seja", "Pertence a", "Não está contido"],
                correct: 1,
                hint: "Vem da inicial da palavra alemã 'Alle' invertida.",
                explanation: "∀ lê-se 'para todo' ou 'qualquer que seja'."
              }
            ]
          },
          {
            id: "mat-l-1-1-2",
            title: "Teoria Elementar dos Conjuntos",
            durationMinutes: 40,
            explanation: "Um conjunto é uma coleção bem definida de objetos chamados elementos. As relações básicas incluem pertinência (um elemento pertence ao conjunto, x ∈ A) e inclusão (um conjunto é subconjunto de outro, A ⊆ B). As principais operações entre conjuntos são: União (A ∪ B, elementos que estão em A ou B), Interseção (A ∩ B, elementos simultaneamente em A e B) e Diferença (A \\ B, elementos exclusivos de A).",
            fundamentalConcepts: [
              "Conjunto vazio (∅) e Conjunto Universo (U)",
              "Diagramas de Venn-Euler e produto cartesiano (A × B)",
              "Conjunto das partes P(A) e cardinalidade |A|"
            ],
            practicalExamples: [
              "Se A = {2, 4, 6} e B = {4, 6, 8}, então A ∩ B = {4, 6} e A ∪ B = {2, 4, 6, 8}.",
              "O número de subconjuntos de um conjunto com n elementos é dado pela fórmula 2ⁿ. Logo, para A com 3 elementos, há 2³ = 8 subconjuntos."
            ],
            realWorldApplications: [
              "Consultas em bases de dados relacionais (SQL): comandos INNER JOIN e UNION correspondem diretamente à interseção e união da teoria dos conjuntos.",
              "Filtros de pesquisa em lojas online e sistemas de recomendação."
            ],
            stepByStepExercises: [
              {
                problem: "Dados A = {1, 2, 3, 4} e B = {3, 4, 5, 6}, calcula A \\ B e o seu cardinal.",
                steps: [
                  "Passo 1: Identificar os elementos que pertencem exclusivamente a A e não pertencem a B.",
                  "Passo 2: Os elementos comuns são 3 e 4. Retirando-os de A, sobram os elementos 1 e 2.",
                  "Passo 3: A \\ B = {1, 2}. O cardinal (número de elementos) é 2."
                ],
                finalAnswer: "A \\ B = {1, 2} com cardinalidade 2."
              }
            ],
            practiceExercises: [
              {
                q: "Se um conjunto tem 4 elementos, quantos subconjuntos possui no seu conjunto das partes?",
                options: ["8", "12", "16", "24"],
                correct: 2,
                hint: "Aplica a fórmula 2ⁿ onde n é a quantidade de elementos.",
                explanation: "2⁴ = 2 × 2 × 2 × 2 = 16 subconjuntos."
              }
            ],
            summary: "A teoria dos conjuntos fornece a linguagem para classificar dados e construir todos os sistemas numéricos.",
            reviewQuestions: [
              {
                q: "Qual operação entre os conjuntos A e B reúne apenas os elementos presentes em ambos simultaneamente?",
                options: ["União (∪)", "Interseção (∩)", "Diferença (\\)", "Complementar"],
                correct: 1,
                hint: "Pensa na parte partilhada do diagrama de Venn.",
                explanation: "A interseção (A ∩ B) seleciona apenas elementos comuns a ambos os conjuntos."
              }
            ]
          }
        ]
      },
      {
        id: "mat-u1-2",
        unitNumber: 2,
        title: "Axiomas da Aritmética e Ordem de Operações",
        description: "Propriedades algébricas universais: comutativa, associativa, distributiva e a convenção PEMDAS.",
        lessons: [
          {
            id: "mat-l-1-2-1",
            title: "Propriedades das Operações e a Regra PEMDAS",
            durationMinutes: 50,
            explanation: "Para calcular expressões aritméticas sem ambiguidades, a convenção universal PEMDAS estabelece a ordem estrita de precedência: 1º Parênteses, 2º Expoentes/Raízes, 3º Multiplicações e Divisões (da esquerda para a direita), 4º Adições e Subtrações (da esquerda para a direita). As operações fundamentais obedecem a propriedades como a distributiva: a(b + c) = ab + ac.",
            fundamentalConcepts: [
              "Elemento neutro da adição (0) e da multiplicação (1)",
              "Propriedade distributiva da multiplicação sobre a adição",
              "Precedência obrigatória de operadores e parênteses aninhados"
            ],
            practicalExamples: [
              "Calcular 8 + 2 × 5: faz-se primeiro a multiplicação (2 × 5 = 10) e depois a soma (8 + 10 = 18). Fazer 8 + 2 primeiro daria o valor errado de 50.",
              "Expressão com parênteses: 3 × (4 + 6) / 5 = 3 × 10 / 5 = 30 / 5 = 6."
            ],
            realWorldApplications: [
              "Cálculo de folhas de pagamento com impostos percentuais e subsídios.",
              "Compiladores de software: os analisadores sintáticos avaliam equações segundo árvores de precedência matemática exatas."
            ],
            stepByStepExercises: [
              {
                problem: "Resolve a expressão numérica: 12 + 4 × (7 - 2) - 18 / 3².",
                steps: [
                  "Passo 1: Resolver o interior dos parênteses: (7 - 2) = 5. A expressão fica: 12 + 4 × 5 - 18 / 3².",
                  "Passo 2: Resolver a potência: 3² = 9. A expressão fica: 12 + 4 × 5 - 18 / 9.",
                  "Passo 3: Resolver multiplicações e divisões da esquerda para a direita: 4 × 5 = 20 e 18 / 9 = 2. A expressão fica: 12 + 20 - 2.",
                  "Passo 4: Resolver adições e subtrações: 12 + 20 = 32; 32 - 2 = 30."
                ],
                finalAnswer: "30"
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o resultado correto da expressão: 20 - 2 × 3 + 4?",
                options: ["18", "58", "10", "14"],
                correct: 0,
                hint: "Multiplicação tem prioridade sobre adição e subtração.",
                explanation: "2 × 3 = 6. Depois: 20 - 6 + 4 = 14 + 4 = 18."
              }
            ],
            summary: "Respeitar a hierarquia operacional garante que qualquer pessoa ou máquina chegue ao mesmo resultado exato.",
            reviewQuestions: [
              {
                q: "Qual operação deve ser efetuada em primeiro lugar numa expressão mista?",
                options: ["Soma", "Subtração", "Operações dentro de parênteses", "Multiplicação"],
                correct: 2,
                hint: "É a primeira letra da mnemónica PEMDAS.",
                explanation: "Os parênteses têm prioridade absoluta sobre todas as outras operações."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 1 — Fundamentos da Matemática",
      instructions: "Responde às questões com rigor para demonstrar domínio dos conceitos axiomáticos e lógicos.",
      passingScorePercentage: 70,
      questions: [
        {
          q: "Se A = {x ∈ ℕ : x < 5} e B = {x ∈ ℕ : 2 ≤ x ≤ 6}, qual é o conjunto A ∩ B?",
          options: ["{2, 3, 4}", "{1, 2, 3, 4, 5, 6}", "{0, 1, 2}", "{2, 3, 4, 5}"],
          correct: 0,
          hint: "Interseção reúne números que satisfazem ambas as condições simultaneamente.",
          explanation: "A = {0, 1, 2, 3, 4} e B = {2, 3, 4, 5, 6}. Os elementos comuns são 2, 3 e 4."
        },
        {
          q: "Qual é o resultado de: 5 + 3 × (2³ - 4)?",
          options: ["32", "17", "29", "12"],
          correct: 1,
          hint: "2³ = 8; 8 - 4 = 4; depois multiplica e soma.",
          explanation: "2³ - 4 = 8 - 4 = 4. Seguidamente: 3 × 4 = 12. Finalmente: 5 + 12 = 17."
        }
      ]
    }
  },
  {
    id: "mat-mod-2",
    moduleNumber: 2,
    title: "Números Naturais e Inteiros",
    description: "Conjuntos ℕ e ℤ, reta orientada, valor absoluto, simétricos, regras de sinais e algoritmos de divisibilidade.",
    targetLevel: "Iniciante",
    estimatedHours: 14,
    units: [
      {
        id: "mat-u2-1",
        unitNumber: 1,
        title: "O Conjunto dos Números Inteiros (ℤ) e Reta Numérica",
        description: "Representação geométrica, números negativos, módulo e operações de soma e subtração com sinais.",
        lessons: [
          {
            id: "mat-l-2-1-1",
            title: "Reta Orientada, Módulo e Opostos",
            durationMinutes: 45,
            explanation: "O conjunto dos números inteiros (ℤ) expande os números naturais adicionando os números negativos e o zero: ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}. O valor absoluto ou módulo de um número x, denotado por |x|, mede a sua distância geométrica à origem (zero) na reta numérica, sendo sempre não-negativo (|x| ≥ 0). Dois números com o mesmo módulo mas sinais contrários dizem-se opostos ou simétricos (ex: -7 e +7).",
            fundamentalConcepts: [
              "Definição de valor absoluto: |x| = x se x ≥ 0 e |x| = -x se x < 0",
              "Posicionamento relativo: na reta orientada, qualquer número à direita é maior que o número à esquerda",
              "Zero como elemento neutro aditivo"
            ],
            practicalExamples: [
              "Variações de temperatura: se o termómetro sobe de -5°C para +8°C, a amplitude térmica foi de |+8 - (-5)| = 13°C.",
              "Saldo bancário: ter um saldo de -150€ e depositar 200€ resulta em: -150 + 200 = +50€."
            ],
            realWorldApplications: [
              "Contabilidade financeira: crédito (+) e débito (-).",
              "Sistemas de navegação e altimetria: altitudes acima do nível do mar (+) e depressões submarinas (-)."
            ],
            stepByStepExercises: [
              {
                problem: "Calcula o valor da expressão: |-15| - |+7| + |-3|.",
                steps: [
                  "Passo 1: Determinar o módulo de cada termo.",
                  "|-15| = 15",
                  "|+7| = 7",
                  "|-3| = 3",
                  "Passo 2: Substituir os valores na expressão: 15 - 7 + 3.",
                  "Passo 3: Efetuar as operações: 15 - 7 = 8; 8 + 3 = 11."
                ],
                finalAnswer: "11"
              }
            ],
            practiceExercises: [
              {
                q: "Qual número é estritamente menor que -8?",
                options: ["-5", "-7", "0", "-12"],
                correct: 3,
                hint: "Nos números negativos, quanto maior o valor absoluto, mais à esquerda fica na reta e menor é o número.",
                explanation: "-12 está mais à esquerda na reta numérica do que -8, portanto -12 < -8."
              }
            ],
            summary: "A reta numérica permite visualizar a ordem e distância entre números inteiros positivos e negativos com total clareza.",
            reviewQuestions: [
              {
                q: "Qual é o valor de |-42|?",
                options: ["-42", "42", "0", "1/42"],
                correct: 1,
                hint: "O módulo é sempre positivo ou zero.",
                explanation: "O valor absoluto de qualquer número real representa a distância ao zero e é sempre não-negativo."
              }
            ]
          },
          {
            id: "mat-l-2-1-2",
            title: "Multiplicação, Divisão e Regra dos Sinais",
            durationMinutes: 50,
            explanation: "Ao multiplicar ou dividir dois números inteiros: sinais iguais resultam em número positivo (+ com + = +, - com - = +); sinais diferentes resultam em número negativo (+ com - = -, - com + = -). Esta regra decorre da propriedade distributiva da multiplicação sobre a adição.",
            fundamentalConcepts: [
              "Regra dos sinais na multiplicação e divisão de números relativos",
              "Produto de múltiplos fatores negativos: se a quantidade de negativos for ímpar, o resultado é negativo; se for par, é positivo",
              "Divisão inteira: dividendo = divisor × quociente + resto"
            ],
            practicalExamples: [
              "(-4) × (-6) = +24 (sinais iguais, resultado positivo).",
              "(-30) ÷ (+5) = -6 (sinais diferentes, resultado negativo).",
              "(-2) × (-3) × (-4) = (+6) × (-4) = -24 (3 fatores negativos geram resultado negativo)."
            ],
            realWorldApplications: [
              "Física: cálculo de desaceleração ou forças em sentidos opostos ao movimento.",
              "Economia: amortização contínua de dívidas ao longo de trimestres."
            ],
            stepByStepExercises: [
              {
                problem: "Resolve a expressão: (-8) × (+3) - (-24) / (-4).",
                steps: [
                  "Passo 1: Resolver a multiplicação: (-8) × (+3) = -24 (sinais opostos).",
                  "Passo 2: Resolver a divisão: (-24) / (-4) = +6 (sinais iguais).",
                  "Passo 3: Substituir na expressão: (-24) - (+6) = -24 - 6 = -30."
                ],
                finalAnswer: "-30"
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o resultado de (-2)⁵?",
                options: ["+32", "-32", "+10", "-10"],
                correct: 1,
                hint: "Expoente ímpar com base negativa preserva o sinal negativo.",
                explanation: "(-2) × (-2) × (-2) × (-2) × (-2) = -32."
              }
            ],
            summary: "A regra de sinais deve ser aplicada com consistência mecânica tanto em cálculos numéricos quanto no desenvolvimento algébrico.",
            reviewQuestions: [
              {
                q: "Qual é o resultado do produto de 4 números negativos?",
                options: ["Positivo", "Negativo", "Zero", "Indeterminado"],
                correct: 0,
                hint: "4 é um número par de fatores negativos.",
                explanation: "Dois negativos formam positivo; quatro negativos formam positivo."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 2 — Números Inteiros e Operações",
      instructions: "Resolve as questões prestando atenção minuciosa aos sinais e parênteses.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é o resultado da expressão: -15 + (-4) × (-5) - 10?",
          options: ["-5", "-25", "15", "-1"],
          correct: 0,
          hint: "Faz a multiplicação primeiro: (-4) × (-5) = +20.",
          explanation: "-15 + 20 - 10 = +5 - 10 = -5."
        }
      ]
    }
  },
  {
    id: "mat-mod-3",
    moduleNumber: 3,
    title: "Frações e Números Decimais",
    description: "Números racionais (ℚ), equivalência de frações, simplificação irredutível, operações com denominadores diferentes e dízimas periódicas.",
    targetLevel: "Iniciante",
    estimatedHours: 15,
    units: [
      {
        id: "mat-u3-1",
        unitNumber: 1,
        title: "Aritmética com Frações Ordinárias",
        description: "Mínimo Múltiplo Comum (MMC), adição, subtração, multiplicação e inverso multiplicativo.",
        lessons: [
          {
            id: "mat-l-3-1-1",
            title: "Soma, Subtração e o Uso do MMC",
            durationMinutes: 55,
            explanation: "Para somar ou subtrair frações com denominadores distintos, é imperativo converter as frações para um denominador comum equivalente através do Mínimo Múltiplo Comum (MMC). A fração representa uma divisão de partes iguais pelo todo (numerador/denominador). Multiplicar ou dividir o numerador e o denominador pelo mesmo número não nulo preserva o valor da fração (frações equivalentes).",
            fundamentalConcepts: [
              "Numerador e Denominador",
              "Frações equivalentes e forma irredutível",
              "Mínimo Múltiplo Comum (MMC) entre denominadores"
            ],
            practicalExamples: [
              "Calcular 1/4 + 2/3: O MMC(4, 3) = 12. Convertendo: 1/4 = 3/12 e 2/3 = 8/12. Somando: 3/12 + 8/12 = 11/12.",
              "Numa receita culinária: 1/2 chávena de açúcar + 1/4 chávena = 2/4 + 1/4 = 3/4 de chávena."
            ],
            realWorldApplications: [
              "Engenharia e arquitetura: medição de polegadas fracionárias e escalas arquitetónicas (1:50, 1:100).",
              "Divisão de património societário entre acionistas em percentagens fracionárias."
            ],
            stepByStepExercises: [
              {
                problem: "Calcula a subtração e simplifica: 5/6 - 3/8.",
                steps: [
                  "Passo 1: Encontrar o MMC entre 6 e 8. Múltiplos de 6: 6, 12, 18, 24... Múltiplos de 8: 8, 16, 24... MMC = 24.",
                  "Passo 2: Adaptar as frações para o denominador 24: (5 × 4)/(6 × 4) = 20/24 e (3 × 3)/(8 × 3) = 9/24.",
                  "Passo 3: Subtrair os numeradores mantendo o denominador: (20 - 9)/24 = 11/24.",
                  "Passo 4: Verificar se é irredutível. 11 é primo e não divide 24. A resposta final é 11/24."
                ],
                finalAnswer: "11/24"
              }
            ],
            practiceExercises: [
              {
                q: "Qual é a forma irredutível da soma: 2/5 + 1/10?",
                options: ["3/15", "5/10", "1/2", "3/10"],
                correct: 2,
                hint: "MMC(5, 10) = 10. 2/5 vira 4/10.",
                explanation: "4/10 + 1/10 = 5/10. Simplificando por 5 no numerador e denominador obtemos 1/2."
              }
            ],
            summary: "O domínio das frações é a chave para a transição bem-sucedida da aritmética elementar para a álgebra simbólica.",
            reviewQuestions: [
              {
                q: "O que acontece ao valor de uma fração quando multiplicamos o numerador e o denominador pelo mesmo número não nulo?",
                options: ["Aumenta", "Diminui", "Permanece exatamente o mesmo (equivalente)", "Fica negativa"],
                correct: 2,
                hint: "É a propriedade fundamental das frações.",
                explanation: "Gera uma fração equivalente que representa exatamente a mesma proporção numérica."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 3 — Frações e Decimais",
      instructions: "Apresenta todas as frações na sua forma irredutível.",
      passingScorePercentage: 70,
      questions: [
        {
          q: "Qual é o valor de (3/4) × (8/9)?",
          options: ["24/36", "2/3", "11/13", "1/2"],
          correct: 1,
          hint: "Multiplica numeradores e denominadores, ou simplifica em cruz antes de multiplicar.",
          explanation: "(3 × 8)/(4 × 9) = 24/36 = 2/3 após dividir ambos por 12."
        }
      ]
    }
  }
];
