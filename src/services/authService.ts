import { UserState, UserRole } from '../types';
import { isFirebaseConfigured } from './firebase';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
}

const USERS_DB_KEY = 'MINDORA_REGISTERED_USERS_V2';
const CURRENT_SESSION_KEY = 'MINDORA_ACTIVE_SESSION_V2';

export const getRegisteredUsers = (): AuthUser[] => {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveRegisteredUsers = (users: AuthUser[]) => {
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users', e);
  }
};

export const getActiveSession = (): string | null => {
  try {
    return localStorage.getItem(CURRENT_SESSION_KEY);
  } catch {
    return null;
  }
};

export const setActiveSession = (userId: string | null) => {
  try {
    if (userId) {
      localStorage.setItem(CURRENT_SESSION_KEY, userId);
    } else {
      localStorage.removeItem(CURRENT_SESSION_KEY);
    }
  } catch (e) {
    console.error('Error updating active session', e);
  }
};

// Simple cryptographic hash simulation for passwords
export const simpleHash = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `hash_${Math.abs(hash)}_${text.length}`;
};

export const createDefaultUserData = (user: {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  isDemo?: boolean;
}): UserState => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'estudante',
    interest: 'Programação e IA',
    goal: '30',
    avatarEmoji: user.role === 'professor' ? '👨‍🏫' : user.role === 'administrador' ? '🛡️' : '🎓',
    xp: user.isDemo ? 140 : 0,
    activitiesCompleted: user.isDemo ? 4 : 0,
    streak: user.isDemo ? 3 : 1,
    studyTimeMinutes: user.isDemo ? 45 : 0,
    enrolledCourseIds: user.isDemo ? ['c-web', 'c-ing'] : [],
    enrolledTeacherCourseIds: user.isDemo ? ['tc_fisica_moderna'] : [],
    completedLessonIds: user.isDemo ? ['c-web-1', 'c-ing-1'] : [],
    completedModuleIds: user.isDemo ? ['m-web-intro'] : [],
    completedExercises: user.isDemo ? ['subject-mat', 'subject-prog'] : [],
    moduleExamResults: {},
    projects: user.isDemo
      ? [
          {
            id: 'proj-1',
            title: 'Plataforma Web Pessoal & Portfólio',
            description: 'Desenvolver um website moderno e responsivo para apresentar projetos de aprendizagem e competências em tecnologia.',
            category: 'Programação',
            priority: 'alta',
            status: 'em_andamento',
            deadline: '2026-11-25',
            progressPercentage: 66,
            notes: 'Utilizar HTML semântico, Tailwind CSS e micro-interações elegantes.',
            ideas: ['Adicionar modo escuro com alternador', 'Criar secção interativa com as minhas medalhas'],
            tasks: [
              { id: 't-1', title: 'Estruturar cabeçalho e navegação acessível', completed: true, priority: 'alta' },
              { id: 't-2', title: 'Desenvolver grelha de projetos com filtros', completed: true, priority: 'media' },
              { id: 't-3', title: 'Otimizar performance e imagens', completed: false, priority: 'urgente', dueDate: '2026-11-20' }
            ],
            createdAt: '2026-11-01',
            updatedAt: '2026-11-09'
          },
          {
            id: 'proj-2',
            title: 'Caderno de Ilustração & Anatomia Artística',
            description: 'Série de 10 estudos práticos de proporções faciais, gestual e perspetiva tridimensional.',
            category: 'Arte',
            priority: 'media',
            status: 'em_andamento',
            deadline: '2026-12-05',
            progressPercentage: 50,
            notes: 'Focar na linha de ação e nos planos de luz e sombra.',
            ideas: ['Experimentar aguarela no acabamento'],
            tasks: [
              { id: 't-4', title: 'Praticar o método de Loomis para a cabeça humana', completed: true },
              { id: 't-5', title: 'Desenhar mãos e expressões em perspetiva de 2 pontos', completed: false, dueDate: '2026-11-22' }
            ],
            createdAt: '2026-11-03',
            updatedAt: '2026-11-08'
          }
        ]
      : [],
    quizHistory: user.isDemo
      ? [
          {
            id: 'qh-1',
            theme: 'Matemática',
            difficulty: 'Iniciante',
            score: 4,
            totalQuestions: 4,
            dateFormatted: 'Hoje',
            xpEarned: 60
          }
        ]
      : [],
    unlockedBadges: user.isDemo ? ['b1', 'b2'] : ['b1'],
    weeklyActivity: [
      { day: 'Seg', xp: 20, minutes: 15 },
      { day: 'Ter', xp: 35, minutes: 25 },
      { day: 'Qua', xp: 50, minutes: 30 },
      { day: 'Qui', xp: 15, minutes: 10 },
      { day: 'Sex', xp: 40, minutes: 20 },
      { day: 'Sáb', xp: 60, minutes: 35 },
      { day: 'Dom', xp: 25, minutes: 15 }
    ],
    weeklyGoals: {
      targetStudyMinutes: 120,
      targetLessons: 6,
      targetExercises: 12
    },
    recentActivity: user.isDemo
      ? [
          {
            id: 'act-1',
            title: 'Lição Concluída: Primeiros Passos & Saudações em Inglês',
            category: 'Idiomas',
            timestamp: 'Há 25 minutos',
            xp: 25,
            icon: '🌍'
          },
          {
            id: 'act-2',
            title: 'Quiz de Matemática: Álgebra e Geometria',
            category: 'Exatas',
            timestamp: 'Hoje às 10:15',
            xp: 60,
            icon: '📐'
          },
          {
            id: 'act-3',
            title: 'Tarefa Concluída no Projeto: Estruturar cabeçalho',
            category: 'Projetos',
            timestamp: 'Ontem',
            xp: 15,
            icon: '🚀'
          }
        ]
      : [],
    highScores: {
      calc: user.isDemo ? 40 : 0,
      memory: user.isDemo ? 12 : 0,
      flash: user.isDemo ? 4 : 0,
      vocab: user.isDemo ? 5 : 0,
      words: user.isDemo ? 4 : 0,
      truefalse: user.isDemo ? 5 : 0,
      chemistry: user.isDemo ? 3 : 0,
      geography: user.isDemo ? 4 : 0,
      history: user.isDemo ? 3 : 0,
      logic: user.isDemo ? 4 : 0
    },
    isAuthenticated: true,
    isDemoUser: Boolean(user.isDemo),
    isTeacherApproved: user.role === 'professor'
  };
};

export const getUserStorageKey = (userId: string) => `MINDORA_USER_DATA_${userId}`;
