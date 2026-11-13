/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, GameType, Subject } from './types';
import { UserProvider } from './context/UserContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SubjectModal } from './components/SubjectModal';
import { AuthModal } from './components/AuthModal';
import { LegalModal } from './components/LegalModal';
import { ToastNotification } from './components/ToastNotification';

import { HomeView } from './views/HomeView';
import { SearchView } from './views/SearchView';
import { SubjectsView } from './views/SubjectsView';
import { GamesView } from './views/GamesView';
import { QuizzesView } from './views/QuizzesView';
import { CoursesView } from './views/CoursesView';
import { ToolsView } from './views/ToolsView';
import { ProjectsView } from './views/ProjectsView';
import { MindoraAiView } from './views/MindoraAiView';
import { ProgressView } from './views/ProgressView';
import { ProfileView } from './views/ProfileView';
import { TeacherDiscoveryView } from './views/TeacherDiscoveryView';
import { TeacherDashboardView } from './views/TeacherDashboardView';
import { AdminModerationView } from './views/AdminModerationView';
import { TeacherApplyModal } from './components/TeacherApplyModal';

export function MainApp() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [activeGame, setActiveGame] = useState<GameType>('calc');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTeacherApplyOpen, setIsTeacherApplyOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleNavigate = (tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSubject = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleCloseSubject = () => {
    setSelectedSubject(null);
  };

  const handleOpenGame = (game: GameType) => {
    setActiveGame(game);
    setCurrentTab('jogos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 selection:bg-brand-200 selection:text-brand-900">
      {/* Persistent Desktop Sidebar & Responsive Mobile Drawer */}
      <Sidebar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthOpen(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <Navbar
          currentTab={currentTab}
          onNavigate={handleNavigate}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Viewport Router */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {currentTab === 'inicio' && (
            <HomeView
              onNavigate={handleNavigate}
              onOpenSubject={handleOpenSubject}
              onOpenGame={handleOpenGame}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {currentTab === 'cursos' && (
            <CoursesView filterOnlyEnrolled={false} />
          )}

          {currentTab === 'meus-cursos' && (
            <CoursesView filterOnlyEnrolled={true} />
          )}

          {currentTab === 'ferramentas' && (
            <ToolsView />
          )}

          {currentTab === 'projetos' && (
            <ProjectsView />
          )}

          {currentTab === 'conquistas' && (
            <ProgressView />
          )}

          {currentTab === 'ia' && (
            <MindoraAiView />
          )}

          {currentTab === 'materias' && (
            <SubjectsView onOpenSubject={handleOpenSubject} />
          )}

          {currentTab === 'jogos' && (
            <GamesView
              activeGame={activeGame}
              onSelectGame={(g) => setActiveGame(g)}
            />
          )}

          {currentTab === 'quizzes' && (
            <QuizzesView />
          )}

          {currentTab === 'pesquisar' && (
            <SearchView
              onNavigate={handleNavigate}
              onOpenSubject={handleOpenSubject}
              onOpenGame={handleOpenGame}
            />
          )}

          {currentTab === 'professores' && (
            <TeacherDiscoveryView
              onOpenTeacherApply={() => setIsTeacherApplyOpen(true)}
              onNavigateToDashboard={() => setCurrentTab('painel-professor')}
            />
          )}

          {currentTab === 'painel-professor' && (
            <TeacherDashboardView
              onOpenTeacherDiscovery={() => setCurrentTab('professores')}
            />
          )}

          {currentTab === 'admin' && (
            <AdminModerationView />
          )}

          {currentTab === 'progresso' && (
            <ProgressView />
          )}

          {currentTab === 'perfil' && (
            <ProfileView
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenLegal={(type) => setLegalModalType(type)}
              onOpenTeacherApply={() => setIsTeacherApplyOpen(true)}
            />
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Teacher Application Modal ("Quero ser Professor") */}
      <TeacherApplyModal
        isOpen={isTeacherApplyOpen}
        onClose={() => setIsTeacherApplyOpen(false)}
        onSuccess={() => {
          setIsTeacherApplyOpen(false);
        }}
      />

      {/* Subject Modal */}
      <SubjectModal subject={selectedSubject} onClose={handleCloseSubject} />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Legal Modal (Terms / Privacy) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Toast Notification Container */}
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
