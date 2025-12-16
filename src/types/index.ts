export type Role = 'director' | 'manager' | 'engineer';

export type ProjectStatus = 'active' | 'completed' | 'paused';

export type DefectStatus = 'new' | 'in_progress' | 'on_review' | 'closed' | 'cancelled' | 'needs_management';

export type DefectPriority = 'low' | 'medium' | 'high' | 'critical';

export type DefectCategory = 'foundation' | 'walls' | 'roof' | 'engineering' | 'finishing' | 'other';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Project {
  id: number;
  name: string;
  address: string;
  description: string;
  customer: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  createdAt: string;
}

export interface Defect {
  id: string;
  projectId: number;
  title: string;
  description: string;
  priority: DefectPriority;
  category: DefectCategory;
  location: string;
  status: DefectStatus;
  assignedTo: number | null;
  dueDate: string | null;
  closedAt: string | null;
  createdBy: Role;
  createdAt: string;
  cancelReason?: string;
}

export interface Comment {
  id: number;
  defectId: string;
  text: string;
  author: Role;
  createdAt: string;
}

export interface HistoryEntry {
  id: number;
  defectId: string;
  action: string;
  author: Role;
  changes: Record<string, any>;
  timestamp: string;
}

export interface AppState {
  currentRole: Role | null;
  projects: Project[];
  defects: Defect[];
  comments: Comment[];
  history: HistoryEntry[];
}