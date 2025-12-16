import { mockProjects, mockDefects, mockComments, mockHistory, mockUsers } from '../data/mockData';

export const initDemoData = () => {
  if (!localStorage.getItem('demoInitialized')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
    localStorage.setItem('projects', JSON.stringify(mockProjects));
    localStorage.setItem('defects', JSON.stringify(mockDefects));
    localStorage.setItem('comments', JSON.stringify(mockComments));
    localStorage.setItem('history', JSON.stringify(mockHistory));
    localStorage.setItem('demoInitialized', 'true');
  }
};

export const resetDemoData = () => {
  localStorage.removeItem('users');
  localStorage.removeItem('projects');
  localStorage.removeItem('defects');
  localStorage.removeItem('comments');
  localStorage.removeItem('history');
  localStorage.removeItem('demoInitialized');
  localStorage.removeItem('currentRole');
  localStorage.removeItem('currentUserId');
  initDemoData();
};
