import { AppState, Defect, Project, Comment, HistoryEntry, Role } from '../types';

const STORAGE_KEY = 'defect_management_demo';

const defaultState: AppState = {
  currentRole: null,
  projects: [],
  defects: [],
  comments: [],
  history: [],
};

export const storage = {
  getState(): AppState {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return defaultState;
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultState;
    }
  },

  setState(state: AppState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  getCurrentRole(): Role | null {
    return this.getState().currentRole;
  },

  setCurrentRole(role: Role | null): void {
    const state = this.getState();
    state.currentRole = role;
    this.setState(state);
  },

  getProjects(): Project[] {
    return this.getState().projects;
  },

  addProject(project: Project): void {
    const state = this.getState();
    state.projects.push(project);
    this.setState(state);
  },

  updateProject(id: number, updates: Partial<Project>): void {
    const state = this.getState();
    const index = state.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      state.projects[index] = { ...state.projects[index], ...updates };
      this.setState(state);
    }
  },

  deleteProject(id: number): void {
    const state = this.getState();
    state.projects = state.projects.filter(p => p.id !== id);
    this.setState(state);
  },

  getDefects(): Defect[] {
    return this.getState().defects;
  },

  getDefectsByProject(projectId: number): Defect[] {
    return this.getState().defects.filter(d => d.projectId === projectId);
  },

  getDefectById(id: string): Defect | undefined {
    return this.getState().defects.find(d => d.id === id);
  },

  addDefect(defect: Defect): void {
    const state = this.getState();
    state.defects.push(defect);
    this.setState(state);
  },

  updateDefect(id: string, updates: Partial<Defect>): void {
    const state = this.getState();
    const index = state.defects.findIndex(d => d.id === id);
    if (index !== -1) {
      state.defects[index] = { ...state.defects[index], ...updates };
      this.setState(state);
    }
  },

  getComments(defectId: string): Comment[] {
    return this.getState().comments.filter(c => c.defectId === defectId);
  },

  addComment(comment: Comment): void {
    const state = this.getState();
    state.comments.push(comment);
    this.setState(state);
  },

  getHistory(defectId: string): HistoryEntry[] {
    return this.getState().history
      .filter(h => h.defectId === defectId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  addHistoryEntry(entry: HistoryEntry): void {
    const state = this.getState();
    state.history.push(entry);
    this.setState(state);
  },

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  initializeWithMockData(state: AppState): void {
    this.setState(state);
  },
};
