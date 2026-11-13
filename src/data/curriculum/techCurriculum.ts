import { CurriculumModule, FinalSubjectAssessment } from '../../types';

export const TECH_MODULES: CurriculumModule[] = [
  {
    id: "inf-mod-1",
    moduleNumber: 1,
    title: "Algoritmos, Lógica de Programação e Estruturas de Dados",
    description: "Pseudocódigo, fluxogramas, tipos primitivos, estruturas condicionais (if/else, switch), laços de repetição (for, while), funções, arrays, matrizes, pilhas, filas e complexidade algorítmica Big-O.",
    targetLevel: "Iniciante",
    estimatedHours: 18,
    units: [
      {
        id: "inf-u1-1",
        unitNumber: 1,
        title: "Fundamentos de Lógica e Controlo de Fluxo",
        description: "Pensamento computacional, variáveis em memória, condicionais e laços iterativos.",
        lessons: [
          {
            id: "inf-l-1-1-1",
            title: "Variáveis, Condicionais e Laços de Repetição",
            durationMinutes: 60,
            explanation: "Um algoritmo é uma sequência finita, ordenada e não ambígua de instruções para solucionar um problema computacional. As variáveis são espaços nomeados na memória RAM do computador que armazenam tipos de dados: inteiros (integer), reais (float), caracteres/texto (string) e booleanos (true/false). O fluxo de execução sequencial pode ser alterado por desvios condicionais (se condição Então ... Senão ...) e laços de repetição (Enquanto condição Faz ..., Para i de 1 até N ...). A eficiência de um algoritmo é medida pela notação Big-O (tempo e espaço em função do tamanho da entrada n).",
            fundamentalConcepts: [
              "Tipos primitivos e alocação de memória",
              "Operadores relacionais (==, !=, >, <) e lógicos (AND, OR, NOT)",
              "Laços determinados (for) vs. indeterminados (while)",
              "Notação Big-O: O(1) constante, O(n) linear, O(n²) quadrático"
            ],
            practicalExamples: [
              "Algoritmo de cálculo de média: se media >= 10 então imprimir 'Aprovado' senão imprimir 'Reprovado'.",
              "Laço para somar números de 1 a 100: soma = 0; Para i = 1 até 100 Faça: soma = soma + i; FimPara; Imprimir soma."
            ],
            realWorldApplications: [
              "Automação de processos industriais, motores de busca e filtros de dados na internet.",
              "Desenvolvimento de aplicações web, inteligência artificial e jogos digitais."
            ],
            stepByStepExercises: [
              {
                problem: "Escreve o algoritmo em pseudocódigo para encontrar o maior número dentro de uma lista de 5 números inteiros: [12, 45, 7, 89, 23].",
                steps: [
                  "Passo 1: Declarar o vetor 'numeros' com os 5 valores.",
                  "Passo 2: Inicializar uma variável 'maior' com o primeiro elemento da lista: maior = numeros[0] (ou seja, 12).",
                  "Passo 3: Criar um laço que percorre os elementos do índice 1 até 4:",
                  "Para i = 1 até 4 Faça:",
                  "  Se numeros[i] > maior Então:",
                  "    maior = numeros[i]",
                  "  FimSe",
                  "FimPara",
                  "Passo 4: Ao final do laço, a variável 'maior' terá percorrido todas as comparações e conterá o valor 89.",
                  "Passo 5: Imprimir a variável 'maior'."
                ],
                finalAnswer: "O algoritmo imprime 'Maior número: 89' após 4 comparações (Complexidade O(n))."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é a complexidade temporal de percorrer uma lista com n elementos através de um laço simples?",
                options: ["O(n) - Tempo linear", "O(1) - Tempo constante", "O(n²) - Tempo quadrático", "O(log n)"],
                correct: 0,
                hint: "Se a lista dobrar de tamanho, o número de iterações do laço dobra.",
                explanation: "O(n) significa que o tempo de execução cresce em proporção direta com o número de elementos da lista."
              }
            ],
            summary: "A lógica de programação e os algoritmos são a base universal de qualquer linguagem de software no mundo moderno.",
            reviewQuestions: [
              {
                q: "Qual estrutura de repetição deve ser escolhida quando sabemos com antecedência o número exato de repetições a realizar?",
                options: ["Laço Para (for)", "Laço Enquanto (while)", "Condicional Se (if)", "Switch case"],
                correct: 0,
                hint: "Tem contador pré-definido com início, fim e passo.",
                explanation: "O laço 'Para' (for) é a estrutura ideal para iterações determinadas com limites conhecidos."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 1 — Algoritmos e Lógica",
      instructions: "Avalia a execução do pseudocódigo e estruturas condicionais.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Se x = 5 e y = 10, qual é o valor booleano da expressão: (x < 10) AND (y == 5)?",
          options: ["Falso (False)", "Verdadeiro (True)", "Indeterminado", "Erro de sintaxe"],
          correct: 0,
          hint: "Para o operador AND ser verdadeiro, AMBAS as condições têm de ser verdadeiras. Como y == 5 é falso, o resultado é Falso.",
          explanation: "True AND False = False."
        }
      ]
    }
  }
];

export const TECH_FINAL_ASSESSMENTS: FinalSubjectAssessment[] = [
  {
    level: "Iniciante",
    title: "Exame Final de Informática e Programação — Lógica e Algoritmos",
    certificateBadgeId: "badge_inf_iniciante",
    questions: [
      {
        q: "Qual estrutura de dados opera no modo LIFO (Last In, First Out — o último a entrar é o primeiro a sair)?",
        options: ["Pilha (Stack)", "Fila (Queue)", "Lista encadeada", "Árvore binária"],
        correct: 0,
        hint: "Como uma pilha de pratos: o último prato colocado em cima é o primeiro a ser retirado.",
        explanation: "A pilha (Stack) funciona rigorosamente segundo o princípio LIFO."
      }
    ]
  }
];
