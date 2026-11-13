import { CurriculumModule } from '../../types';

export const MATH_MODULES_PART2: CurriculumModule[] = [
  {
    id: "mat-mod-4",
    moduleNumber: 4,
    title: "Potências e Raízes",
    description: "Propriedades da potenciação, expoentes fracionários e negativos, simplificação de radicais, racionalização de denominadores e notação científica.",
    targetLevel: "Iniciante",
    estimatedHours: 15,
    units: [
      {
        id: "mat-u4-1",
        unitNumber: 1,
        title: "Regras de Potenciação e Expoentes Racionais",
        description: "Multiplicação e divisão de potências de mesma base, potência de potência e expoente nulo/negativo.",
        lessons: [
          {
            id: "mat-l-4-1-1",
            title: "Propriedades Fundamentais das Potências",
            durationMinutes: 50,
            explanation: "Uma potência aⁿ representa o produto de n fatores iguais à base a. As regras universais são: aᵐ · aⁿ = aᵐ⁺ⁿ; aᵐ / aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; (ab)ⁿ = aⁿbⁿ; e a⁻ⁿ = 1/aⁿ (com a ≠ 0). Qualquer número não nulo elevado a 0 é igual a 1 (a⁰ = 1).",
            fundamentalConcepts: [
              "Multiplicação de potências de mesma base: somam-se os expoentes",
              "Divisão de potências de mesma base: subtraem-se os expoentes",
              "Expoente negativo como inverso multiplicativo: x⁻¹ = 1/x"
            ],
            practicalExamples: [
              "2³ × 2⁴ = 2³⁺⁴ = 2⁷ = 128.",
              "5⁻² = 1 / 5² = 1 / 25 = 0.04.",
              "(3²)³ = 3²ˣ³ = 3⁶ = 729."
            ],
            realWorldApplications: [
              "Ciência da computação: memória e endereçamento binário (2¹⁰ bytes = 1 KB, 2²⁰ bytes = 1 MB).",
              "Notação científica para distâncias astronómicas e tamanho de partículas atómicas."
            ],
            stepByStepExercises: [
              {
                problem: "Simplifica a expressão: (2⁴ × 2⁻² × 2⁵) / (2³)².",
                steps: [
                  "Passo 1: No numerador, somar os expoentes das potências de mesma base 2: 4 + (-2) + 5 = 7. O numerador fica 2⁷.",
                  "Passo 2: No denominador, aplicar a regra de potência de potência (multiplicar expoentes): (2³)² = 2³ˣ² = 2⁶.",
                  "Passo 3: Efetuar a divisão subtraindo o expoente do denominador do expoente do numerador: 2⁷ / 2⁶ = 2⁷⁻⁶ = 2¹ = 2."
                ],
                finalAnswer: "2"
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o valor numérico de (1/2)⁻³?",
                options: ["1/8", "-8", "8", "-1/8"],
                correct: 2,
                hint: "O expoente negativo inverte a fração: (a/b)⁻ⁿ = (b/a)ⁿ.",
                explanation: "(1/2)⁻³ = (2/1)³ = 2³ = 8."
              }
            ],
            summary: "As regras de potências permitem comprimir cálculos complexos e preparar a mente para equações exponenciais e logaritmos.",
            reviewQuestions: [
              {
                q: "Qual é o valor de qualquer número real não nulo elevado a zero (x⁰)?",
                options: ["0", "1", "x", "Infinito"],
                correct: 1,
                hint: "Decorre da divisão xⁿ / xⁿ = xⁿ⁻ⁿ = x⁰ = 1.",
                explanation: "Por definição axiomática, x⁰ = 1 para todo x ≠ 0."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 4 — Potenciação e Radiciação",
      instructions: "Simplifica todos os radicais e expoentes antes de assinalar a resposta.",
      passingScorePercentage: 70,
      questions: [
        {
          q: "Qual é o valor de √72 na forma simplificada?",
          options: ["6√2", "2√6", "3√8", "8√3"],
          correct: 0,
          hint: "Fatora 72 em 36 × 2. A raiz quadrada de 36 é 6.",
          explanation: "√72 = √(36 × 2) = √36 × √2 = 6√2."
        }
      ]
    }
  },
  {
    id: "mat-mod-5",
    moduleNumber: 5,
    title: "Razões, Proporções e Percentagens",
    description: "Propriedade fundamental das proporções, regra de três simples e composta, grandezas direta e inversamente proporcionais, e aumentos/descontos percentuais sucessivos.",
    targetLevel: "Iniciante",
    estimatedHours: 14,
    units: [
      {
        id: "mat-u5-1",
        unitNumber: 1,
        title: "Razão, Proporção e Regra de Três",
        description: "Produto dos meios pelos extremos e modelação de situações reais proporcionais.",
        lessons: [
          {
            id: "mat-l-5-1-1",
            title: "Proporcionalidade Direta e Inversa",
            durationMinutes: 50,
            explanation: "Uma razão é o quociente entre duas grandezas a e b (a/b). Uma proporção é a igualdade entre duas razões: a/b = c/d. A propriedade fundamental dita que o produto dos extremos é igual ao produto dos meios: a · d = b · c. Duas grandezas são diretamente proporcionais quando o aumento de uma acarreta o aumento proporcional da outra (razão constante: y/x = k). São inversamente proporcionais quando o aumento de uma reduz a outra na mesma proporção (produto constante: y · x = k).",
            fundamentalConcepts: [
              "Constante de proporcionalidade (k)",
              "Produto cruzado: a/b = c/d ⇔ ad = bc",
              "Regra de três simples para grandezas diretas e inversas"
            ],
            practicalExamples: [
              "Direta: Se 3 cadernos custam 15€, 7 cadernos custarão x: 3/15 = 7/x ➔ 3x = 105 ➔ x = 35€.",
              "Inversa: Se 4 operários constroem um muro em 6 dias, 8 operários (o dobro) demorarão metade do tempo: 3 dias (4 × 6 = 8 × 3 = 24)."
            ],
            realWorldApplications: [
              "Engenharia civil: cálculo de dosagem de cimento, água e brita no betão.",
              "Farmacologia: dosagem de medicamentos proporcional ao peso corporal do doente."
            ],
            stepByStepExercises: [
              {
                problem: "Um veículo consome 8 litros de combustível para percorrer 120 km. Quantos litros consumirá para percorrer 450 km à mesma velocidade?",
                steps: [
                  "Passo 1: Identificar a relação entre distância e combustível. Quanto maior a distância, mais combustível consome (Diretamente proporcional).",
                  "Passo 2: Montar a proporção: 8 litros / 120 km = x litros / 450 km.",
                  "Passo 3: Aplicar produto dos meios pelos extremos: 120 · x = 8 · 450.",
                  "Passo 4: Calcular: 8 · 450 = 3600. Logo: x = 3600 / 120 = 30 litros."
                ],
                finalAnswer: "30 litros de combustível."
              }
            ],
            practiceExercises: [
              {
                q: "Se 6 impressoras imprimem um lote de documentos em 40 minutos, quanto tempo demorariam 10 impressoras idênticas?",
                options: ["24 minutos", "66 minutos", "30 minutos", "20 minutos"],
                correct: 0,
                hint: "Mais impressoras demoram MENOS tempo (Inversamente proporcional: 6 × 40 = 10 × t).",
                explanation: "6 × 40 = 240. t = 240 / 10 = 24 minutos."
              }
            ],
            summary: "Compreender a diferença entre grandezas diretas e inversas é vital para não inverter proporções em cálculos do dia a dia.",
            reviewQuestions: [
              {
                q: "Numa proporção a/b = c/d, qual é a igualdade que decorre da propriedade fundamental?",
                options: ["a + d = b + c", "a × d = b × c", "a / d = b / c", "a - d = b - c"],
                correct: 1,
                hint: "Produto dos extremos pelos meios.",
                explanation: "O produto cruzado estabelece que a · d = b · c."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 5 — Proporções e Percentagens",
      instructions: "Resolve as questões aplicando o método de proporções.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Um produto que custava 120€ sofreu um desconto de 25%. Qual é o novo preço?",
          options: ["90€", "95€", "80€", "100€"],
          correct: 0,
          hint: "Desconto de 25% significa que pagas 75% do valor original (0.75 × 120).",
          explanation: "25% de 120 = 30€. Novo preço: 120 - 30 = 90€."
        }
      ]
    }
  },
  {
    id: "mat-mod-6",
    moduleNumber: 6,
    title: "Expressões Algébricas e Polinómios Elementares",
    description: "Variáveis, monómios, termos semelhantes, graus de polinómios, produtos notáveis e manipulação algébrica estruturada.",
    targetLevel: "Iniciante",
    estimatedHours: 16,
    units: [
      {
        id: "mat-u6-1",
        unitNumber: 1,
        title: "Monómios e Termos Semelhantes",
        description: "Parte literal e coeficiente, redução de termos semelhantes e valor numérico de expressões.",
        lessons: [
          {
            id: "mat-l-6-1-1",
            title: "Redução de Termos Semelhantes e Produtos Notáveis",
            durationMinutes: 55,
            explanation: "Uma expressão algébrica combina números (coeficientes) e letras (variáveis/parte literal). Termos semelhantes são monómios que partilham exatamente a mesma parte literal com os mesmos expoentes (ex: 3x²y e -5x²y). Apenas termos semelhantes podem ser somados ou subtraídos diretamente. Os produtos notáveis aceleram cálculos algébricos fundamentais: (a + b)² = a² + 2ab + b²; (a - b)² = a² - 2ab + b²; e (a + b)(a - b) = a² - b².",
            fundamentalConcepts: [
              "Coeficiente numérico e parte literal",
              "Grau de um polinómio relativamente a uma variável",
              "Os três produtos notáveis clássicos: quadrado da soma, quadrado da diferença e produto da soma pela diferença"
            ],
            practicalExamples: [
              "Reduzir: 4x² + 3x - 2x² + 7 = (4 - 2)x² + 3x + 7 = 2x² + 3x + 7.",
              "Desenvolver (x + 5)² = x² + 2(x)(5) + 5² = x² + 10x + 25.",
              "Calcular mentalmente 49 × 51 usando (50 - 1)(50 + 1) = 50² - 1² = 2500 - 1 = 2499."
            ],
            realWorldApplications: [
              "Modelos de otimização de lucro e receita em empresas (funções quadráticas de custo e preço).",
              "Física: cálculo de trajetórias parabólicas de projéteis e dispersão de ondas."
            ],
            stepByStepExercises: [
              {
                problem: "Expande e simplifica a expressão: (2x - 3)² - (2x + 1)(2x - 1).",
                steps: [
                  "Passo 1: Expandir o quadrado da diferença (2x - 3)²: (2x)² - 2(2x)(3) + 3² = 4x² - 12x + 9.",
                  "Passo 2: Expandir o produto da soma pela diferença (2x + 1)(2x - 1): (2x)² - 1² = 4x² - 1.",
                  "Passo 3: Subtrair as expressões com parênteses atentos ao sinal: (4x² - 12x + 9) - (4x² - 1) = 4x² - 12x + 9 - 4x² + 1.",
                  "Passo 4: Reduzir termos semelhantes: (4x² - 4x²) - 12x + (9 + 1) = 0 - 12x + 10 = -12x + 10."
                ],
                finalAnswer: "-12x + 10"
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o desenvolvimento correto de (3x - 4)²?",
                options: ["9x² - 16", "9x² - 24x + 16", "9x² + 24x + 16", "9x² - 12x + 16"],
                correct: 1,
                hint: "Aplica a² - 2ab + b² onde a = 3x e b = 4.",
                explanation: "(3x)² - 2(3x)(4) + 4² = 9x² - 24x + 16."
              }
            ],
            summary: "O domínio dos produtos notáveis é essencial para resolver equações de 2º grau e fatorizar expressões sem esforço.",
            reviewQuestions: [
              {
                q: "A que é igual o produto notável (a + b)(a - b)?",
                options: ["a² + b²", "a² - 2ab + b²", "a² - b²", "(a - b)²"],
                correct: 2,
                hint: "Diferença de dois quadrados.",
                explanation: "(a + b)(a - b) cancela os termos médios +ab e -ab, restando a² - b²."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 6 — Expressões Algébricas",
      instructions: "Aplica os produtos notáveis e simplifica as expressões ao máximo.",
      passingScorePercentage: 70,
      questions: [
        {
          q: "Se x = 3 e y = -2, qual é o valor numérico de 2x² - 3y + 4?",
          options: ["28", "16", "22", "14"],
          correct: 0,
          hint: "2(3)² - 3(-2) + 4 = 2(9) + 6 + 4.",
          explanation: "2 × 9 = 18; -3 × (-2) = +6; 18 + 6 + 4 = 28."
        }
      ]
    }
  }
];
