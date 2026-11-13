import { CurriculumModule, FinalSubjectAssessment } from '../../types';
import { MATH_MODULES_PART1 } from './mathModulesPart1';
import { MATH_MODULES_PART2 } from './mathModulesPart2';
import { MATH_MODULES_PART3 } from './mathModulesPart3';
import { MATH_MODULES_PART4 } from './mathModulesPart4';
import { MATH_MODULES_PART5 } from './mathModulesPart5';
import { MATH_MODULES_PART6 } from './mathModulesPart6';
import { MATH_MODULES_PART7 } from './mathModulesPart7';
import { MATH_MODULES_PART8 } from './mathModulesPart8';

export const ALL_MATH_MODULES: CurriculumModule[] = [
  ...MATH_MODULES_PART1, // Mod 1, 2, 3
  ...MATH_MODULES_PART2, // Mod 4, 5, 6
  ...MATH_MODULES_PART3, // Mod 7, 8, 9
  ...MATH_MODULES_PART4, // Mod 10, 11, 12
  ...MATH_MODULES_PART5, // Mod 13, 14, 15
  ...MATH_MODULES_PART6, // Mod 16, 17, 18
  ...MATH_MODULES_PART7, // Mod 19, 20, 21
  ...MATH_MODULES_PART8  // Mod 22, 23, 24, 25
];

export const MATH_FINAL_ASSESSMENTS: FinalSubjectAssessment[] = [
  {
    level: "Iniciante",
    title: "Exame Final de Nível Iniciante — Fundamentos e Aritmética",
    certificateBadgeId: "badge_math_iniciante",
    questions: [
      {
        q: "Qual é o valor numérico de (15 - 3 × 4) + 2³?",
        options: ["11", "56", "19", "3"],
        correct: 0,
        hint: "Primeiro multiplica: 3 × 4 = 12. Depois a potência: 2³ = 8. (15 - 12) + 8 = 3 + 8 = 11.",
        explanation: "Respeitando a ordem das operações (PEMDAS): (15 - 12) + 8 = 3 + 8 = 11."
      },
      {
        q: "Se 4 camisolas custam 60€, quanto custarão 7 camisolas idênticas?",
        options: ["105€", "120€", "95€", "110€"],
        correct: 0,
        hint: "Preço unitário = 60 / 4 = 15€. 15 × 7 = 105€.",
        explanation: "Proporcionalidade direta: 4/60 = 7/x ➔ x = (7 × 60)/4 = 105€."
      }
    ]
  },
  {
    level: "Intermédio",
    title: "Exame Final de Nível Intermédio — Álgebra, Geometria e Funções",
    certificateBadgeId: "badge_math_intermedio",
    questions: [
      {
        q: "Quais são as raízes da equação quadrática x² - 7x + 10 = 0?",
        options: ["x = 2 e x = 5", "x = -2 e x = -5", "x = 1 e x = 10", "x = 3 e x = 4"],
        correct: 0,
        hint: "A soma das raízes é -b/a = 7 e o produto é c/a = 10. 2 + 5 = 7 e 2 × 5 = 10.",
        explanation: "Fórmula resolvente: x = (7 ± √(49 - 40))/2 = (7 ± 3)/2 ➔ x₁ = 5, x₂ = 2."
      },
      {
        q: "Num triângulo retângulo com catetos de 9 cm e 12 cm, qual é a medida da hipotenusa?",
        options: ["15 cm", "21 cm", "18 cm", "13 cm"],
        correct: 0,
        hint: "Teorema de Pitágoras: a² = 9² + 12² = 81 + 144 = 225.",
        explanation: "a = √225 = 15 cm."
      }
    ]
  },
  {
    level: "Avançado",
    title: "Exame Final de Nível Avançado — Cálculo Infinitesimal e Álgebra Superior",
    certificateBadgeId: "badge_math_avancado",
    questions: [
      {
        q: "Qual é a derivada da função f(x) = 3x⁴ - 5x² + 2x no ponto x = 1?",
        options: ["4", "12", "2", "6"],
        correct: 0,
        hint: "f'(x) = 12x³ - 10x + 2. Substitui x = 1: 12(1) - 10(1) + 2 = 12 - 10 + 2 = 4.",
        explanation: "f'(1) = 12 - 10 + 2 = 4."
      },
      {
        q: "Qual é o valor do integral definido ∫[0 até 1] (4x³ + 2x) dx?",
        options: ["2", "4", "1", "6"],
        correct: 0,
        hint: "Primitiva: x⁴ + x². Avalia de 0 a 1: (1⁴ + 1²) - (0) = 1 + 1 = 2.",
        explanation: "[x⁴ + x²] de 0 até 1 = 1 + 1 - 0 = 2."
      }
    ]
  }
];
