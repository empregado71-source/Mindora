import { CurriculumModule } from '../../types';

export const MATH_MODULES_PART8: CurriculumModule[] = [
  {
    id: "mat-mod-22",
    moduleNumber: 22,
    title: "Derivadas e Taxas de Variação",
    description: "Definição formal de derivada (limite da razão incremental), interpretação geométrica (declive da reta tangente), regras de derivação (potência, produto, quociente, cadeia), máximos e mínimos, e problemas de otimização.",
    targetLevel: "Avançado",
    estimatedHours: 25,
    units: [
      {
        id: "mat-u22-1",
        unitNumber: 1,
        title: "Regras de Derivação e Reta Tangente",
        description: "f'(x) = lim(h→0) [f(x+h) - f(x)]/h, regra da potência d/dx(xⁿ) = n·xⁿ⁻¹, regra da cadeia e estudo de monotonia.",
        lessons: [
          {
            id: "mat-l-22-1-1",
            title: "Definição de Derivada, Regra da Potência e Otimização",
            durationMinutes: 70,
            explanation: "A derivada f'(x) de uma função f no ponto x mede a taxa instantânea de variação da função, correspondendo geometricamente ao declive da reta tangente à curva no ponto (x, f(x)): f'(x) = lim(h→0) [f(x + h) - f(x)] / h. As regras de diferenciação são: 1) d/dx(c) = 0 para constantes; 2) Regra da potência: d/dx(xⁿ) = n · xⁿ⁻¹; 3) Regra do produto: (fg)' = f'g + fg'; 4) Regra do quociente: (f/g)' = (f'g - fg') / g²; 5) Regra da cadeia para funções compostas: [f(g(x))]' = f'(g(x)) · g'(x). Os pontos críticos onde f'(x) = 0 revelam máximos, mínimos e extremos locais.",
            fundamentalConcepts: [
              "Declive da reta tangente: m_tan = f'(x₀)",
              "Regra da cadeia para derivação de funções compostas",
              "Teste da primeira derivada: f'(x) > 0 (crescente), f'(x) < 0 (decrescente)",
              "Pontos críticos e teste da segunda derivada para concavidade: f''(x) > 0 (mínimo local), f''(x) < 0 (máximo local)"
            ],
            practicalExamples: [
              "Derivar f(x) = 4x³ - 5x² + 7x - 9: f'(x) = 4(3x²) - 5(2x) + 7(1) - 0 = 12x² - 10x + 7.",
              "Equação da reta tangente a y = x² no ponto (2, 4): f'(x) = 2x ➔ declive m = f'(2) = 4. Reta: y - 4 = 4(x - 2) ➔ y = 4x - 4.",
              "Derivada de sen(x): cos(x); derivada de eˣ: eˣ; derivada de ln(x): 1/x."
            ],
            realWorldApplications: [
              "Física: aceleração como a derivada da velocidade no tempo, a(t) = v'(t) = s''(t).",
              "Inteligência Artificial (Backpropagation): o algoritmo de descida de gradiente (Gradient Descent) ajusta os pesos neuronais através das derivadas parciais da função de perda (Loss Function)."
            ],
            stepByStepExercises: [
              {
                problem: "Encontra o ponto de máximo da função de lucro L(x) = -2x² + 40x - 50.",
                steps: [
                  "Passo 1: Determinar a primeira derivada da função lucro L'(x):",
                  "L'(x) = d/dx(-2x² + 40x - 50) = -2(2x) + 40 - 0 = -4x + 40.",
                  "Passo 2: Encontrar os pontos críticos igualando a derivada a zero (L'(x) = 0):",
                  "-4x + 40 = 0 ➔ 4x = 40 ➔ x = 10 unidades.",
                  "Passo 3: Verificar se é um máximo através da segunda derivada: L''(x) = d/dx(-4x + 40) = -4.",
                  "Como L''(10) = -4 < 0, a concavidade é voltada para baixo, confirmando que x = 10 é um ponto de máximo absoluto.",
                  "Passo 4: Calcular o lucro máximo substituindo x = 10: L(10) = -2(10)² + 40(10) - 50 = -200 + 400 - 50 = 150€."
                ],
                finalAnswer: "O lucro máximo é de 150€ quando se produzem x = 10 unidades."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é a derivada da função f(x) = 5x⁴ - 3x² + 8?",
                options: ["20x³ - 6x", "20x⁴ - 6x", "5x³ - 3x", "20x³ - 6x + 8"],
                correct: 0,
                hint: "Aplica a regra da potência: d/dx(xⁿ) = n · xⁿ⁻¹. A derivada da constante 8 é zero.",
                explanation: "5(4x³) - 3(2x) + 0 = 20x³ - 6x."
              }
            ],
            summary: "A derivada permite otimizar qualquer sistema, determinando os pontos de maior eficiência ou menor custo.",
            reviewQuestions: [
              {
                q: "O que representa o valor da derivada f'(a) geometricamente no gráfico de f(x)?",
                options: [
                  "O declive da reta tangente à curva no ponto x = a",
                  "A área sob a curva entre 0 e a",
                  "O valor máximo global da função",
                  "A distância à origem"
                ],
                correct: 0,
                hint: "Inclinação instantânea da curva.",
                explanation: "f'(a) é rigorosamente o declive da reta que tangencia a curva em (a, f(a))."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 22 — Derivadas e Otimização",
      instructions: "Calcula derivadas e resolve problemas de taxas de variação instantânea.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é a derivada da função composta f(x) = (2x + 1)³?",
          options: ["6(2x + 1)²", "3(2x + 1)²", "2(2x + 1)²", "12(2x + 1)"],
          correct: 0,
          hint: "Regra da cadeia: d/dx[u³] = 3u² · u'. Como u = 2x + 1, u' = 2.",
          explanation: "3(2x + 1)² × 2 = 6(2x + 1)²."
        }
      ]
    }
  },
  {
    id: "mat-mod-23",
    moduleNumber: 23,
    title: "Integrais e Teorema Fundamental do Cálculo",
    description: "Primitivas imediatas, integral indefinido, integral definido de Riemann, Teorema Fundamental do Cálculo (TFC), método de substituição, integração por partes e cálculo de áreas sob curvas.",
    targetLevel: "Avançado",
    estimatedHours: 25,
    units: [
      {
        id: "mat-u23-1",
        unitNumber: 1,
        title: "Primitivação e o Teorema Fundamental do Cálculo",
        description: "∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C, Regra de Barrow ∫[a até b] f(x)dx = F(b) - F(a) e áreas planas.",
        lessons: [
          {
            id: "mat-l-23-1-1",
            title: "Integral de Riemann, Primitivas e a Regra de Barrow",
            durationMinutes: 70,
            explanation: "A integração é a operação inversa da diferenciação. Uma primitiva F(x) de f(x) satisfaz F'(x) = f(x), sendo o integral indefinido denotado por ∫ f(x) dx = F(x) + C. O Teorema Fundamental do Cálculo (TFC) unifica o cálculo de declives e de áreas: se f for contínua em [a, b], a área exata sob a curva y = f(x) é dada pelo integral definido segundo a Regra de Barrow: ∫[a até b] f(x) dx = F(b) - F(a). A regra da potência para integração dita que ∫ xⁿ dx = [xⁿ⁺¹ / (n + 1)] + C (para n ≠ -1); e ∫ (1/x) dx = ln|x| + C.",
            fundamentalConcepts: [
              "Constante arbitrária de integração C",
              "Regra da potência de integração: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C",
              "Teorema Fundamental do Cálculo e Regra de Barrow: ∫[a,b] f(x)dx = F(b) - F(a)",
              "Integração por partes: ∫ u dv = uv - ∫ v du"
            ],
            practicalExamples: [
              "Primitiva de f(x) = 3x²: F(x) = 3(x³/3) + C = x³ + C. (Repara que a derivada de x³ é 3x²).",
              "Calcular a área sob a reta y = 2x no intervalo [0, 3]: ∫[0 até 3] 2x dx = [x²] de 0 a 3 = 3² - 0² = 9 unidades de área (coincide com a área geométrica do triângulo de base 3 e altura 6: 3 × 6 / 2 = 9)."
            ],
            realWorldApplications: [
              "Física: cálculo do trabalho mecânico de uma força variável W = ∫ F(x) dx.",
              "Engenharia elétrica: cálculo do valor eficaz (RMS) de sinais elétricos e energia consumida em quilowatts-hora."
            ],
            stepByStepExercises: [
              {
                problem: "Calcula a área exata sob a parábola f(x) = 3x² - 2x no intervalo [1, 3].",
                steps: [
                  "Passo 1: Escrever o integral definido: ∫[1 até 3] (3x² - 2x) dx.",
                  "Passo 2: Encontrar uma primitiva F(x):",
                  "F(x) = 3(x³/3) - 2(x²/2) = x³ - x².",
                  "Passo 3: Aplicar a Regra de Barrow: F(3) - F(1).",
                  "Passo 4: Calcular F(3): F(3) = 3³ - 3² = 27 - 9 = 18.",
                  "Passo 5: Calcular F(1): F(1) = 1³ - 1² = 1 - 1 = 0.",
                  "Passo 6: Subtrair: F(3) - F(1) = 18 - 0 = 18."
                ],
                finalAnswer: "A área sob a curva é de 18 unidades quadradas."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o valor do integral indefinido ∫ (6x² + 4x) dx?",
                options: ["2x³ + 2x² + C", "6x³ + 4x² + C", "12x + 4 + C", "3x³ + 2x² + C"],
                correct: 0,
                hint: "6 × (x³/3) + 4 × (x²/2) + C = 2x³ + 2x² + C.",
                explanation: "Derivando 2x³ + 2x² obtemos 6x² + 4x, o que confirma a primitivação."
              }
            ],
            summary: "O Teorema Fundamental do Cálculo é uma das maiores descobertas intelectuais da humanidade, conectando derivadas e áreas.",
            reviewQuestions: [
              {
                q: "O que diz a Regra de Barrow para calcular o integral definido ∫[a,b] f(x) dx?",
                options: ["F(b) - F(a)", "F(b) + F(a)", "f'(b) - f'(a)", "F(b) / F(a)"],
                correct: 0,
                hint: "Valor da primitiva no limite superior menos o valor no limite inferior.",
                explanation: "∫[a, b] f(x) dx = F(b) - F(a), onde F'(x) = f(x)."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 23 — Integrais",
      instructions: "Calcula primitivas imediatas e integrais definidos.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é o valor do integral definido ∫[0 até 2] 3x² dx?",
          options: ["8", "12", "6", "24"],
          correct: 0,
          hint: "A primitiva de 3x² é x³. Avalia x³ de 0 a 2: 2³ - 0³ = 8.",
          explanation: "[x³] de 0 até 2 = 2³ - 0 = 8."
        }
      ]
    }
  },
  {
    id: "mat-mod-24",
    moduleNumber: 24,
    title: "Matemática Financeira",
    description: "Juros simples (J = C·i·t), juros compostos com fórmula exponencial (M = C·(1+i)ᵗ), taxas nominais e efetivas, equivalência de capitais, valor presente líquido (VPL), taxa interna de rentabilidade (TIR) e sistemas de amortização (Tabela Price e SAC).",
    targetLevel: "Avançado",
    estimatedHours: 20,
    units: [
      {
        id: "mat-u24-1",
        unitNumber: 1,
        title: "Regimes de Capitalização e Juros Compostos",
        description: "Fórmula de capitalização composta, amortização SAC e Tabela Price, e inflação real.",
        lessons: [
          {
            id: "mat-l-24-1-1",
            title: "Juros Simples vs. Juros Compostos e Séries de Pagamento",
            durationMinutes: 60,
            explanation: "No regime de juros simples, a taxa incide exclusivamente sobre o capital inicial ao longo de todos os períodos: J = C · i · t, gerando um crescimento puramente linear: M = C(1 + it). No regime de juros compostos ('juros sobre juros'), o rendimento de cada período é incorporado ao capital para render no período seguinte, gerando um crescimento exponencial: M = C · (1 + i)ᵗ. A taxa i e o tempo t devem estar rigorosamente expressos na mesma unidade temporal (ex: meses ou anos).",
            fundamentalConcepts: [
              "Montante M e Capital C: M = C + J",
              "Fórmula dos juros compostos: M = C(1 + i)ᵗ",
              "Sistemas de amortização: Tabela Price (prestações constantes) e SAC (Sistema de Amortizações Constantes, com prestações decrescentes)"
            ],
            practicalExamples: [
              "Investir 1000€ a 10% ao ano em juros simples durante 3 anos: J = 1000 × 0.10 × 3 = 300€. Montante = 1300€.",
              "Investir 1000€ a 10% ao ano em juros compostos durante 3 anos: M = 1000 × (1 + 0.10)³ = 1000 × 1.331 = 1331€ (31€ a mais devido aos juros sobre juros).",
              "Regra dos 72 para duplicação do capital: tempo aproximado = 72 / taxa anual (ex: a 6% ao ano, dobra em ≈ 72/6 = 12 anos)."
            ],
            realWorldApplications: [
              "Crédito à habitação e empréstimos bancários: compreensão do Custo Efetivo Total (TAEG) e do impacto dos prazos longos.",
              "Planeamento de fundos de reforma e independência financeira através de aportes regulares com reinvestimento de dividendos."
            ],
            stepByStepExercises: [
              {
                problem: "Um investidor aplica 5000€ a uma taxa de juros compostos de 8% ao ano durante 2 anos. Qual será o montante final acumulado?",
                steps: [
                  "Passo 1: Identificar os dados: Capital C = 5000€; Taxa i = 8% = 0.08 ao ano; Tempo t = 2 anos.",
                  "Passo 2: Aplicar a fórmula de juros compostos: M = C(1 + i)ᵗ.",
                  "Passo 3: M = 5000 × (1 + 0.08)² = 5000 × (1.08)².",
                  "Passo 4: Calcular (1.08)² = 1.1664.",
                  "Passo 5: Multiplicar pelo capital: M = 5000 × 1.1664 = 5832€."
                ],
                finalAnswer: "Montante final: 5832€ (Juros acumulados = 832€)."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o montante acumulado por 2000€ aplicados a juros simples a 5% ao mês durante 4 meses?",
                options: ["2400€", "2431€", "2200€", "2500€"],
                correct: 0,
                hint: "J = C · i · t = 2000 × 0.05 × 4 = 400€. Montante = 2000 + 400.",
                explanation: "J = 400€. Montante = 2000€ + 400€ = 2400€."
              }
            ],
            summary: "A compreensão dos juros compostos é a competência financeira mais transformadora para a vida pessoal e empresarial.",
            reviewQuestions: [
              {
                q: "No regime de juros compostos, qual fórmula calcula o montante acumulado?",
                options: ["M = C(1 + i)ᵗ", "M = C(1 + it)", "M = C + it", "M = C / (1 + i)ᵗ"],
                correct: 0,
                hint: "Crescimento exponencial de base (1 + i).",
                explanation: "M = C(1 + i)ᵗ é a fórmula universal da capitalização composta."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 24 — Matemática Financeira",
      instructions: "Calcula juros, montantes e amortizações.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Se uma aplicação a juros compostos rende 100% ao longo de 7 anos, que conceito melhor explica o aumento do ritmo dos rendimentos a cada ano?",
          options: [
            "Efeito bola de neve dos juros sobre juros acumulados",
            "Aumento da taxa nominal pelo banco",
            "Cobrança de juros simples lineares",
            "Depreciação monetária"
          ],
          correct: 0,
          hint: "Os rendimentos anteriores passam a gerar novos rendimentos.",
          explanation: "Os juros compostos reinvestem os ganhos continuamente gerando crescimento exponencial."
        }
      ]
    }
  },
  {
    id: "mat-mod-25",
    moduleNumber: 25,
    title: "Resolução de Problemas Avançados e Modelação Matemática",
    description: "Integração multidisciplinar de todo o currículo matemático: problemas olímpicos, modelação de cenários reais, estratégias heurísticas de George Pólya e demonstrações por indução matemática.",
    targetLevel: "Avançado",
    estimatedHours: 25,
    units: [
      {
        id: "mat-u25-1",
        unitNumber: 1,
        title: "Heurísticas de George Pólya e Indução Matemática",
        description: "As 4 fases de resolução de problemas e o Princípio de Indução Matemática (caso base e passo indutivo).",
        lessons: [
          {
            id: "mat-l-25-1-1",
            title: "Método de Pólya e Demonstração por Indução Finita",
            durationMinutes: 70,
            explanation: "No clássico 'How to Solve It', o matemático George Pólya definiu as 4 etapas universais para solucionar qualquer problema complexo: 1) Compreender o problema (identificar incógnitas, dados e condicionantes); 2) Estabelecer um plano (conectar com problemas análogos já resolvidos); 3) Executar o plano com rigor analítico; 4) Examinar a solução obtida (verificar coerência das unidades e casos limites). O Princípio de Indução Matemática é a técnica de demonstração para propriedades P(n) em ℕ: verifica-se o caso base P(1), assume-se a hipótese indutiva P(k) verdadeira e demonstra-se que a tese P(k+1) é necessariamente verdadeira.",
            fundamentalConcepts: [
              "As 4 etapas de resolução de George Pólya",
              "Demonstração por Indução Matemática (Efeito dominó)",
              "Modelação matemática: simplificação da realidade, formulação analítica, solução e validação empírica"
            ],
            practicalExamples: [
              "Demonstrar por indução que a soma dos n primeiros números ímpares é n²: 1 = 1²; 1 + 3 = 4 = 2²; 1 + 3 + 5 = 9 = 3². O passo indutivo prova a universalidade para todo n natural.",
              "Estratégia de trabalhar de trás para a frente: muito útil em teoria dos jogos e finais de xadrez."
            ],
            realWorldApplications: [
              "Engenharia de sistemas: modelação matemática de fluxos de tráfego urbano em cidades inteligentes.",
              "Epidemiologia computacional: modelos SIR (Suscetíveis-Infetados-Recuperados) baseados em equações diferenciais para prever surtos de doenças."
            ],
            stepByStepExercises: [
              {
                problem: "Aplica o método de Pólya para resolver: Um agricultor tem 100 metros de vedação e quer delimitar um campo retangular encostado a um muro reto de pedra (sem precisar de vedação no lado do muro). Que dimensões deve ter o retângulo para que a área seja máxima?",
                steps: [
                  "Passo 1 (Compreender): Queremos maximizar a área A de um retângulo com 3 lados vedados: 2 larguras x e 1 comprimento y. O perímetro vedado é 2x + y = 100.",
                  "Passo 2 (Plano): Isolar y em função de x: y = 100 - 2x. A área é A(x) = x · y = x(100 - 2x) = -2x² + 100x.",
                  "Passo 3 (Execução): A função de área A(x) é uma parábola com concavidade voltada para baixo (a = -2 < 0). O vértice ocorre em x = -b / (2a):",
                  "x = -100 / (2 × (-2)) = -100 / (-4) = 25 metros.",
                  "O comprimento correspondente é y = 100 - 2(25) = 100 - 50 = 50 metros.",
                  "Passo 4 (Examinar): As dimensões são 25 m por 50 m. A área máxima delimitada é A = 25 × 50 = 1250 m². A soma dos lados é 25 + 50 + 25 = 100 m, verificando perfeitamente os dados."
                ],
                finalAnswer: "Dimensões: 25 metros de largura por 50 metros de comprimento (Área máxima de 1250 m²)."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o primeiro passo obrigatório no método de George Pólya para resolver problemas matemáticos?",
                options: [
                  "Compreender o problema (identificar incógnitas e dados)",
                  "Calcular a derivada",
                  "Executar cálculos imediatamente",
                  "Olhar para trás e conferir a resposta"
                ],
                correct: 0,
                hint: "Antes de tentar resolver, deves saber exatamente o que te é pedido.",
                explanation: "Compreender o enunciado e discernir o que é dado e o que é procurado é a primeira fase indispensável."
              }
            ],
            summary: "A modelação matemática e as heurísticas capacitam o estudante a enfrentar desafios do mundo real sem medo do desconhecido.",
            reviewQuestions: [
              {
                q: "Quais são as duas etapas fundamentais de uma demonstração por Indução Matemática?",
                options: [
                  "Caso base e Passo indutivo",
                  "Derivação e Integração",
                  "Multiplicação e Divisão",
                  "Premissa maior e Conclusão"
                ],
                correct: 0,
                hint: "Provar para n=1 e depois provar que a verdade para 'k' implica a verdade para 'k+1'.",
                explanation: "O caso base prova a afirmação inicial e o passo indutivo propaga a verdade para todos os números naturais."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 25 — Resolução Avançada e Modelação",
      instructions: "Resolve problemas de síntese curricular e modelação.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Num modelo de otimização, se a função objetivo é quadrática côncava A(x) = -x² + 12x, qual valor de x maximiza a função?",
          options: ["6", "12", "0", "36"],
          correct: 0,
          hint: "Vértice: x_v = -b / (2a) = -12 / (2 × -1) = 6.",
          explanation: "No ponto x = 6 a função atinge o seu valor máximo de 36."
        }
      ]
    }
  }
];
