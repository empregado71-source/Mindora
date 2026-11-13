import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserState,
  Badge,
  QuizHistoryItem,
  UserRole,
  TeacherApplication,
  MindoraProject,
  ProjectTask,
  ModuleExamResult,
  ActivityHistoryItem
} from '../types';
import { BADGES_DATABASE } from '../data/learningData';
import {
  getRegisteredUsers,
  saveRegisteredUsers,
  getActiveSession,
  setActiveSession,
  simpleHash,
  createDefaultUserData,
  getUserStorageKey,
  AuthUser
} from '../services/authService';
import { TeacherService } from '../services/teacherService';

interface ToastInfo {
  id: string;
  message: string;
  type: 'xp' | 'badge' | 'info';
}

interface UserContextType {
  state: UserState;
  login: (email: string, pass: string) => { success: boolean; message: string };
  register: (name: string, email: string, pass: string, role?: UserRole) => { success: boolean; message: string };
  logout: () => void;
  loginAsDemo: () => void;
  setUserRole: (role: UserRole) => void;
  applyForTeacher: (appData: Omit<TeacherApplication, 'id' | 'userId' | 'name' | 'email' | 'status' | 'submittedAt'>) => void;
  enrollInTeacherCourse: (courseId: string) => void;
  completeTeacherCourseLesson: (courseId: string, lessonId: string) => void;
  enrollInCourse: (courseId: string) => void;
  recordCompletedModule: (moduleId: string, courseId: string, xpEarned?: number) => void;
  recordModuleExamResult: (result: ModuleExamResult) => void;
  createProject: (projectData: Omit<MindoraProject, 'id' | 'createdAt' | 'updatedAt' | 'progressPercentage'>) => void;
  updateProject: (id: string, updates: Partial<MindoraProject>) => void;
  deleteProject: (id: string) => void;
  toggleProjectTask: (projectId: string, taskId: string) => void;
  addProjectTask: (projectId: string, task: Omit<ProjectTask, 'id'>) => void;
  deleteProjectTask: (projectId: string, taskId: string) => void;
  completeProject: (id: string) => void;
  addActivityItem: (item: Omit<ActivityHistoryItem, 'id' | 'timestamp'>) => void;
  addXP: (amount: number, reason?: string) => void;
  updateProfile: (updates: Partial<UserState>) => void;
  recordCompletedExercise: (exerciseId: string, xpEarned: number) => void;
  recordCompletedLesson: (lessonId: string, courseId: string, xpEarned: number) => void;
  recordQuizResult: (result: Omit<QuizHistoryItem, 'id'>) => void;
  recordGameScore: (gameKey: keyof UserState['highScores'], score: number) => void;
  addStudyMinutes: (minutes: number) => void;
  resetAllData: () => void;
  toasts: ToastInfo[];
  removeToast: (id: string) => void;
  calculateLevel: (xp: number) => { level: number; currentLevelXP: number; percent: number; title: string };
  allBadges: Badge[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserState>(() => {
    const activeUserId = getActiveSession();
    if (activeUserId) {
      const saved = localStorage.getItem(getUserStorageKey(activeUserId));
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            completedModuleIds: parsed.completedModuleIds || [],
            moduleExamResults: parsed.moduleExamResults || {},
            projects: parsed.projects || [],
            weeklyGoals: parsed.weeklyGoals || { targetStudyMinutes: 120, targetLessons: 6, targetExercises: 12 },
            recentActivity: parsed.recentActivity || [],
            enrolledCourseIds: parsed.enrolledCourseIds || []
          };
        } catch {}
      }
    }
    // Default active demo student
    return createDefaultUserData({
      id: 'demo-user-1',
      name: 'Estudante Mindora',
      email: 'aluno@mindora.edu',
      role: 'estudante',
      isDemo: true
    });
  });

  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Keep state synced with localStorage
  useEffect(() => {
    if (currentUser?.id) {
      try {
        localStorage.setItem(getUserStorageKey(currentUser.id), JSON.stringify(currentUser));
      } catch (e) {
        console.error('Failed to save user data', e);
      }
    }
  }, [currentUser]);

  const addToast = (message: string, type: 'xp' | 'badge' | 'info' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = (intense = false) => {
    try {
      if (intense) {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } else {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.85 } });
      }
    } catch {}
  };

  const login = (email: string, pass: string): { success: boolean; message: string } => {
    const users = getRegisteredUsers();
    const cleanEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!existing) {
      return { success: false, message: 'Nenhuma conta encontrada com este email.' };
    }

    if (existing.passwordHash !== simpleHash(pass)) {
      return { success: false, message: 'Palavra-passe incorreta. Tenta novamente.' };
    }

    const savedData = localStorage.getItem(getUserStorageKey(existing.id));
    let userData: UserState;
    if (savedData) {
      try {
        userData = JSON.parse(savedData);
        userData.isAuthenticated = true;
        userData.role = existing.role || userData.role || 'estudante';
      } catch {
        userData = createDefaultUserData(existing);
      }
    } else {
      userData = createDefaultUserData(existing);
    }

    setActiveSession(existing.id);
    setCurrentUser(userData);
    addToast(`Bem-vindo de volta, ${existing.name}!`, 'info');
    return { success: true, message: 'Sessão iniciada com sucesso!' };
  };

  const register = (
    name: string,
    email: string,
    pass: string,
    role: UserRole = 'estudante'
  ): { success: boolean; message: string } => {
    const users = getRegisteredUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'Já existe uma conta registada com este endereço de email.' };
    }

    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      role,
      passwordHash: simpleHash(pass),
      createdAt: new Date().toISOString()
    };

    saveRegisteredUsers([...users, newUser]);

    const initialData = createDefaultUserData({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isDemo: false
    });
    setActiveSession(newUser.id);
    setCurrentUser(initialData);

    addToast(`Conta criada com sucesso! Bem-vindo, ${newUser.name}.`, 'badge');
    triggerConfetti(true);
    return { success: true, message: 'Registo concluído!' };
  };

  const logout = () => {
    setActiveSession(null);
    const demo = createDefaultUserData({
      id: 'demo-guest',
      name: 'Visitante Mindora',
      email: 'visitante@mindora.edu',
      role: 'estudante',
      isDemo: true
    });
    demo.isAuthenticated = false;
    setCurrentUser(demo);
    addToast('Sessão terminada. Até breve!', 'info');
  };

  const loginAsDemo = () => {
    const demo = createDefaultUserData({
      id: 'demo-user-1',
      name: 'Estudante Mindora',
      email: 'aluno@mindora.edu',
      role: 'estudante',
      isDemo: true
    });
    setActiveSession(demo.id);
    setCurrentUser(demo);
    addToast('Modo Demonstração ativado!', 'info');
  };

  const setUserRole = (role: UserRole) => {
    setCurrentUser((prev) => {
      const isApproved = role === 'professor' ? true : prev.isTeacherApproved;
      return {
        ...prev,
        role,
        isTeacherApproved: isApproved,
        avatarEmoji: role === 'professor' ? '👨‍🏫' : role === 'administrador' ? '🛡️' : prev.avatarEmoji
      };
    });
    addToast(`Perfil alterado para: ${role.toUpperCase()}`, 'info');
  };

  const applyForTeacher = (appData: Omit<TeacherApplication, 'id' | 'userId' | 'name' | 'email' | 'status' | 'submittedAt'>) => {
    const application = TeacherService.submitApplication({
      ...appData,
      userId: currentUser.id,
      name: currentUser.name,
      email: currentUser.email
    });

    setCurrentUser((prev) => ({
      ...prev,
      teacherApplication: application
    }));

    addToast('Candidatura de Professor enviada com sucesso para análise!', 'badge');
    triggerConfetti(false);
  };

  const enrollInTeacherCourse = (courseId: string) => {
    TeacherService.enrollStudent(currentUser.id, currentUser.name, courseId);
    setCurrentUser((prev) => {
      const already = prev.enrolledTeacherCourseIds?.includes(courseId);
      if (already) return prev;
      return {
        ...prev,
        enrolledTeacherCourseIds: [...(prev.enrolledTeacherCourseIds || []), courseId]
      };
    });
    addXP(20, 'Inscrição gratuita em curso de professor');
    addToast('Inscrição confirmada com sucesso! Bons estudos.', 'badge');
  };

  const completeTeacherCourseLesson = (courseId: string, lessonId: string) => {
    TeacherService.completeLesson(currentUser.id, courseId, lessonId);
    addXP(25, 'Lição de professor concluída');
  };

  const addXP = (amount: number, reason: string = 'Atividade concluída') => {
    if (amount <= 0) return;

    setCurrentUser((prev) => {
      const newXP = prev.xp + amount;
      const newActivities = prev.activitiesCompleted + 1;
      const newlyUnlocked = [...prev.unlockedBadges];

      BADGES_DATABASE.forEach((badge) => {
        if (!newlyUnlocked.includes(badge.id) && newXP >= badge.req) {
          newlyUnlocked.push(badge.id);
          setTimeout(() => {
            addToast(`🏆 Nova Medalha Desbloqueada: ${badge.title}!`, 'badge');
            triggerConfetti(true);
          }, 300);
        }
      });

      return {
        ...prev,
        xp: newXP,
        activitiesCompleted: newActivities,
        unlockedBadges: newlyUnlocked
      };
    });

    addToast(`+${amount} XP: ${reason}`, 'xp');
    triggerConfetti(false);
  };

  const updateProfile = (updates: Partial<UserState>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    addToast('Perfil atualizado com sucesso!', 'info');
  };

  const recordCompletedExercise = (exerciseId: string, xpEarned: number) => {
    setCurrentUser((prev) => {
      if (prev.completedExercises.includes(exerciseId)) {
        return prev;
      }
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId]
      };
    });
    addXP(xpEarned, 'Exercício Resolvido');
  };

  const recordCompletedLesson = (lessonId: string, courseId: string, xpEarned: number) => {
    setCurrentUser((prev) => {
      const alreadyDone = prev.completedLessonIds.includes(lessonId);
      const enrolled = prev.enrolledCourseIds.includes(courseId)
        ? prev.enrolledCourseIds
        : [...prev.enrolledCourseIds, courseId];

      if (alreadyDone) return prev;

      return {
        ...prev,
        enrolledCourseIds: enrolled,
        completedLessonIds: [...prev.completedLessonIds, lessonId]
      };
    });
    addXP(xpEarned, 'Lição de Curso Concluída');
  };

  const recordQuizResult = (result: Omit<QuizHistoryItem, 'id'>) => {
    const item: QuizHistoryItem = {
      ...result,
      id: `qh_${Date.now()}`
    };
    setCurrentUser((prev) => ({
      ...prev,
      quizHistory: [item, ...prev.quizHistory.slice(0, 19)]
    }));
    addXP(result.xpEarned, `Quiz de ${result.theme}`);
  };

  const recordGameScore = (gameKey: keyof UserState['highScores'], score: number) => {
    setCurrentUser((prev) => {
      const current = prev.highScores[gameKey] || 0;
      if (score > current) {
        return {
          ...prev,
          highScores: {
            ...prev.highScores,
            [gameKey]: score
          }
        };
      }
      return prev;
    });
  };

  const addStudyMinutes = (minutes: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      studyTimeMinutes: prev.studyTimeMinutes + minutes
    }));
  };

  const resetAllData = () => {
    if (currentUser?.id) {
      localStorage.removeItem(getUserStorageKey(currentUser.id));
    }
    const fresh = createDefaultUserData({
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      isDemo: currentUser.isDemoUser
    });
    setCurrentUser(fresh);
    addToast('Todos os dados foram reiniciados.', 'info');
  };

  const calculateLevel = (xp: number) => {
    const level = Math.floor(xp / 100) + 1;
    const currentLevelXP = xp % 100;
    const percent = Math.min(100, currentLevelXP);
    let title = 'Aprendiz Curioso';
    if (level >= 10) title = 'Sábio Supremo';
    else if (level >= 7) title = 'Mestre Erudito';
    else if (level >= 4) title = 'Explorador Ávido';
    else if (level >= 2) title = 'Estudante Focado';

    return { level, currentLevelXP, percent, title };
  };

  const enrollInCourse = (courseId: string) => {
    setCurrentUser((prev) => {
      if (prev.enrolledCourseIds.includes(courseId)) return prev;
      return {
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId]
      };
    });
    addToast('Inscrição no curso realizada com sucesso!', 'badge');
    addXP(15, 'Inscrição num novo curso');
  };

  const recordCompletedModule = (moduleId: string, courseId: string, xpEarned = 50) => {
    setCurrentUser((prev) => {
      const enrolled = prev.enrolledCourseIds.includes(courseId)
        ? prev.enrolledCourseIds
        : [...prev.enrolledCourseIds, courseId];
      if (prev.completedModuleIds.includes(moduleId)) {
        return { ...prev, enrolledCourseIds: enrolled };
      }
      return {
        ...prev,
        enrolledCourseIds: enrolled,
        completedModuleIds: [...prev.completedModuleIds, moduleId]
      };
    });
    addXP(xpEarned, 'Módulo de Curso Concluído com Sucesso');
    triggerConfetti(true);
  };

  const recordModuleExamResult = (result: ModuleExamResult) => {
    setCurrentUser((prev) => {
      const updatedResults = {
        ...prev.moduleExamResults,
        [result.moduleId]: result
      };
      const updatedCompletedModules = result.passed && !prev.completedModuleIds.includes(result.moduleId)
        ? [...prev.completedModuleIds, result.moduleId]
        : prev.completedModuleIds;

      return {
        ...prev,
        moduleExamResults: updatedResults,
        completedModuleIds: updatedCompletedModules
      };
    });

    if (result.passed) {
      addXP(result.score * 15, `Aprovação na Prova do Módulo (${result.percentage}%)`);
      addToast(`🎉 Prova Concluída! Nota: ${result.percentage}%`, 'badge');
      triggerConfetti(true);
    } else {
      addToast(`Prova finalizada. Nota: ${result.percentage}%. Revê os conteúdos e repete!`, 'info');
    }
  };

  // MINDORA Projects Methods
  const createProject = (projectData: Omit<MindoraProject, 'id' | 'createdAt' | 'updatedAt' | 'progressPercentage'>) => {
    const totalTasks = projectData.tasks.length;
    const completedTasks = projectData.tasks.filter((t: ProjectTask) => t.completed).length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const newProject: MindoraProject = {
      ...projectData,
      id: `proj_${Date.now()}`,
      progressPercentage,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setCurrentUser((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));

    addToast(`Projeto "${newProject.title}" criado com sucesso!`, 'badge');
    addXP(25, 'Novo projeto criado');
  };

  const updateProject = (id: string, updates: Partial<MindoraProject>) => {
    setCurrentUser((prev) => {
      const updatedProjects = prev.projects.map((p) => {
        if (p.id !== id) return p;
        const merged = { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
        if (merged.tasks && merged.tasks.length > 0) {
          const comp = merged.tasks.filter((t: ProjectTask) => t.completed).length;
          merged.progressPercentage = Math.round((comp / merged.tasks.length) * 100);
        }
        return merged;
      });
      return { ...prev, projects: updatedProjects };
    });
    addToast('Projeto atualizado!', 'info');
  };

  const deleteProject = (id: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
    addToast('Projeto removido com sucesso.', 'info');
  };

  const toggleProjectTask = (projectId: string, taskId: string) => {
    setCurrentUser((prev) => {
      let taskCompletedNow = false;
      const updatedProjects = prev.projects.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedTasks = proj.tasks.map((task) => {
          if (task.id === taskId) {
            const next = !task.completed;
            taskCompletedNow = next;
            return { ...task, completed: next };
          }
          return task;
        });
        const comp = updatedTasks.filter((t) => t.completed).length;
        const progressPercentage = updatedTasks.length > 0 ? Math.round((comp / updatedTasks.length) * 100) : 0;
        return {
          ...proj,
          tasks: updatedTasks,
          progressPercentage,
          status: progressPercentage === 100 ? ('concluido' as const) : proj.status,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      });

      if (taskCompletedNow) {
        setTimeout(() => {
          addXP(10, 'Tarefa de projeto concluída');
        }, 100);
      }

      return { ...prev, projects: updatedProjects };
    });
  };

  const addProjectTask = (projectId: string, task: Omit<ProjectTask, 'id'>) => {
    const newTask: ProjectTask = {
      ...task,
      id: `task_${Date.now()}`
    };
    setCurrentUser((prev) => {
      const updatedProjects = prev.projects.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedTasks = [...proj.tasks, newTask];
        const comp = updatedTasks.filter((t) => t.completed).length;
        return {
          ...proj,
          tasks: updatedTasks,
          progressPercentage: Math.round((comp / updatedTasks.length) * 100),
          updatedAt: new Date().toISOString().split('T')[0]
        };
      });
      return { ...prev, projects: updatedProjects };
    });
    addToast('Nova tarefa adicionada!', 'info');
  };

  const deleteProjectTask = (projectId: string, taskId: string) => {
    setCurrentUser((prev) => {
      const updatedProjects = prev.projects.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedTasks = proj.tasks.filter((t) => t.id !== taskId);
        const comp = updatedTasks.filter((t) => t.completed).length;
        return {
          ...proj,
          tasks: updatedTasks,
          progressPercentage: updatedTasks.length > 0 ? Math.round((comp / updatedTasks.length) * 100) : 0,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      });
      return { ...prev, projects: updatedProjects };
    });
  };

  const completeProject = (id: string) => {
    setCurrentUser((prev) => {
      const updatedProjects = prev.projects.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          status: 'concluido' as const,
          progressPercentage: 100,
          completedAt: new Date().toISOString().split('T')[0],
          tasks: p.tasks.map((t) => ({ ...t, completed: true }))
        };
      });
      return { ...prev, projects: updatedProjects };
    });
    addXP(100, 'Projeto Concluído com Sucesso!');
    addToast('🏆 Parabéns! Projeto marcado como concluído!', 'badge');
    triggerConfetti(true);
  };

  const addActivityItem = (item: Omit<ActivityHistoryItem, 'id' | 'timestamp'>) => {
    const newAct: ActivityHistoryItem = {
      ...item,
      id: `act_${Date.now()}`,
      timestamp: 'Agora'
    };
    setCurrentUser((prev) => ({
      ...prev,
      recentActivity: [newAct, ...prev.recentActivity.slice(0, 19)]
    }));
  };

  return (
    <UserContext.Provider
      value={{
        state: currentUser,
        login,
        register,
        logout,
        loginAsDemo,
        setUserRole,
        applyForTeacher,
        enrollInTeacherCourse,
        completeTeacherCourseLesson,
        enrollInCourse,
        recordCompletedModule,
        recordModuleExamResult,
        createProject,
        updateProject,
        deleteProject,
        toggleProjectTask,
        addProjectTask,
        deleteProjectTask,
        completeProject,
        addActivityItem,
        addXP,
        updateProfile,
        recordCompletedExercise,
        recordCompletedLesson,
        recordQuizResult,
        recordGameScore,
        addStudyMinutes,
        resetAllData,
        toasts,
        removeToast,
        calculateLevel,
        allBadges: BADGES_DATABASE
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
