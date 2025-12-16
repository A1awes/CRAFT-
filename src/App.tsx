import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import RoleSelector from './components/RoleSelector';
import DirectorDashboard from './components/DirectorDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import EngineerDashboard from './components/EngineerDashboard';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetailsPage from './components/ProjectDetailsPage';
import DefectDetailsPage from './components/DefectDetailsPage';
import { Role } from './types';
import { storage } from './services/storage';
import { getInitialMockData } from './data/mockData';
import { initDemoData } from './utils/initDemoData';

type Page = 'role-selector' | 'dashboard' | 'projects' | 'project-details' | 'defect-details';

function App() {
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('role-selector');
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    initDemoData();

    const state = storage.getState();

    if (!state.projects.length) {
      storage.initializeWithMockData(getInitialMockData());
    }

    const savedRole = storage.getCurrentRole();
    if (savedRole) {
      setCurrentRole(savedRole);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleSelectRole = (role: Role) => {
    setCurrentRole(role);
    storage.setCurrentRole(role);
    setCurrentPage('dashboard');
  };

  const handleSwitchRole = () => {
    setCurrentRole(null);
    storage.setCurrentRole(null);
    setCurrentPage('role-selector');
  };

  const handleNavigate = (page: Page, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
  };

  const renderPage = () => {
    if (currentPage === 'role-selector' || !currentRole) {
      return <RoleSelector onSelectRole={handleSelectRole} />;
    }

    switch (currentPage) {
      case 'dashboard':
        if (currentRole === 'director') {
          return <DirectorDashboard onNavigate={handleNavigate} />;
        } else if (currentRole === 'manager') {
          return <ManagerDashboard onNavigate={handleNavigate} />;
        } else {
          return <EngineerDashboard onNavigate={handleNavigate} />;
        }

      case 'projects':
        return <ProjectsPage currentRole={currentRole} onNavigate={handleNavigate} />;

      case 'project-details':
        return (
          <ProjectDetailsPage
            projectId={pageData?.projectId}
            currentRole={currentRole}
            onNavigate={handleNavigate}
          />
        );

      case 'defect-details':
        return (
          <DefectDetailsPage
            defectId={pageData?.defectId}
            currentRole={currentRole}
            onNavigate={handleNavigate}
          />
        );

      default:
        return <RoleSelector onSelectRole={handleSelectRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentRole && currentPage !== 'role-selector' && (
        <Header
          currentRole={currentRole}
          currentPage={currentPage}
          onSwitchRole={handleSwitchRole}
        />
      )}
      {renderPage()}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
