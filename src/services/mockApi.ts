import { Defect, Comment, HistoryEntry, Project } from '../types';

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getDefects(projectId?: number, filters?: any) {
    await delay();
    try {
      const allDefects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      let result = allDefects;

      if (projectId) {
        result = result.filter(d => d.projectId === projectId);
      }

      if (filters?.status) {
        result = result.filter(d => d.status === filters.status);
      }
      if (filters?.priority) {
        result = result.filter(d => d.priority === filters.priority);
      }
      if (filters?.category) {
        result = result.filter(d => d.category === filters.category);
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке дефектов', data: null };
    }
  },

  async getDefectById(defectId: string) {
    await delay();
    try {
      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const defect = defects.find(d => d.id === defectId);
      if (!defect) {
        return { success: false, error: 'Дефект не найден', data: null };
      }
      return { success: true, data: defect };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке дефекта', data: null };
    }
  },

  async createDefect(defectData: any) {
    await delay();
    try {
      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const newId = `DF-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(defects.length + 1).padStart(4, '0')}`;

      const newDefect: Defect = {
        id: newId,
        projectId: defectData.projectId,
        title: defectData.title,
        description: defectData.description,
        priority: defectData.priority || 'medium',
        category: defectData.category,
        location: defectData.location,
        status: 'new',
        assignedTo: null,
        dueDate: defectData.dueDate || null,
        closedAt: null,
        createdBy: defectData.createdBy || 'engineer',
        createdAt: new Date().toISOString(),
      };

      defects.push(newDefect);
      localStorage.setItem('defects', JSON.stringify(defects));

      const history = JSON.parse(localStorage.getItem('history') || '[]') as HistoryEntry[];
      const newHistory: HistoryEntry = {
        id: history.length + 1,
        defectId: newId,
        action: 'create',
        author: defectData.createdBy || 'engineer',
        changes: { status: 'new' },
        timestamp: new Date().toISOString(),
      };
      history.push(newHistory);
      localStorage.setItem('history', JSON.stringify(history));

      return { success: true, data: newDefect };
    } catch (error) {
      return { success: false, error: 'Ошибка при создании дефекта', data: null };
    }
  },

  async updateDefect(defectId: string, updates: any) {
    await delay();
    try {
      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const index = defects.findIndex(d => d.id === defectId);

      if (index === -1) {
        return { success: false, error: 'Дефект не найден', data: null };
      }

      const defect = defects[index];
      const oldStatus = defect.status;
      Object.assign(defect, updates);

      defects[index] = defect;
      localStorage.setItem('defects', JSON.stringify(defects));

      if (updates.status !== oldStatus) {
        const history = JSON.parse(localStorage.getItem('history') || '[]') as HistoryEntry[];
        const newHistory: HistoryEntry = {
          id: history.length + 1,
          defectId,
          action: 'status_change',
          author: updates.author || 'engineer',
          changes: { status: updates.status },
          timestamp: new Date().toISOString(),
        };
        history.push(newHistory);
        localStorage.setItem('history', JSON.stringify(history));
      }

      return { success: true, data: defect };
    } catch (error) {
      return { success: false, error: 'Ошибка при обновлении дефекта', data: null };
    }
  },

  async assignDefect(defectId: string, assigneeId: number, dueDate?: string, comment?: string) {
    await delay();
    try {
      const currentRole = localStorage.getItem('currentRole');
      if (currentRole === 'engineer') {
        return { success: false, error: 'У вас нет прав на назначение дефектов', data: null };
      }

      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const index = defects.findIndex(d => d.id === defectId);

      if (index === -1) {
        return { success: false, error: 'Дефект не найден', data: null };
      }

      const defect = defects[index];
      defect.assignedTo = assigneeId;
      defect.status = 'in_progress';
      if (dueDate) defect.dueDate = dueDate;

      defects[index] = defect;
      localStorage.setItem('defects', JSON.stringify(defects));

      const history = JSON.parse(localStorage.getItem('history') || '[]') as HistoryEntry[];
      const newHistory: HistoryEntry = {
        id: history.length + 1,
        defectId,
        action: 'assign',
        author: currentRole as any,
        changes: { assignedTo: assigneeId, status: 'in_progress', dueDate },
        timestamp: new Date().toISOString(),
      };
      history.push(newHistory);
      localStorage.setItem('history', JSON.stringify(history));

      if (comment) {
        await this.addComment(defectId, comment, currentRole || 'engineer');
      }

      return { success: true, data: defect };
    } catch (error) {
      return { success: false, error: 'Ошибка при назначении дефекта', data: null };
    }
  },

  async updateDefectStatus(defectId: string, newStatus: string, comment?: string) {
    await delay();
    try {
      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const index = defects.findIndex(d => d.id === defectId);

      if (index === -1) {
        return { success: false, error: 'Дефект не найден', data: null };
      }

      const defect = defects[index];
      const oldStatus = defect.status;
      defect.status = newStatus as any;

      defects[index] = defect;
      localStorage.setItem('defects', JSON.stringify(defects));

      const currentRole = localStorage.getItem('currentRole') || 'engineer';
      const history = JSON.parse(localStorage.getItem('history') || '[]') as HistoryEntry[];
      const newHistory: HistoryEntry = {
        id: history.length + 1,
        defectId,
        action: 'status_change',
        author: currentRole as any,
        changes: { status: newStatus },
        timestamp: new Date().toISOString(),
      };
      history.push(newHistory);
      localStorage.setItem('history', JSON.stringify(history));

      if (comment) {
        await this.addComment(defectId, comment, currentRole);
      }

      return { success: true, data: defect };
    } catch (error) {
      return { success: false, error: 'Ошибка при изменении статуса', data: null };
    }
  },

  async closeDefect(defectId: string, comment?: string) {
    await delay();
    try {
      const currentRole = localStorage.getItem('currentRole');
      if (currentRole === 'engineer') {
        return { success: false, error: 'Только менеджер или директор могут закрывать дефекты', data: null };
      }

      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const index = defects.findIndex(d => d.id === defectId);

      if (index === -1) {
        return { success: false, error: 'Дефект не найден', data: null };
      }

      const defect = defects[index];
      const closedAt = new Date().toISOString();
      defect.status = 'closed';
      defect.closedAt = closedAt;

      defects[index] = defect;
      localStorage.setItem('defects', JSON.stringify(defects));

      const history = JSON.parse(localStorage.getItem('history') || '[]') as HistoryEntry[];
      const newHistory: HistoryEntry = {
        id: history.length + 1,
        defectId,
        action: 'close',
        author: currentRole as any,
        changes: { status: 'closed', closedAt },
        timestamp: closedAt,
      };
      history.push(newHistory);
      localStorage.setItem('history', JSON.stringify(history));

      if (comment) {
        await this.addComment(defectId, comment, currentRole || 'manager');
      }

      return { success: true, data: defect };
    } catch (error) {
      return { success: false, error: 'Ошибка при закрытии дефекта', data: null };
    }
  },

  async cancelDefect(defectId: string, reason: string) {
    await delay();
    try {
      const currentRole = localStorage.getItem('currentRole');
      if (currentRole !== 'manager' && currentRole !== 'director') {
        return { success: false, error: 'У вас нет прав на отмену дефектов', data: null };
      }

      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const index = defects.findIndex(d => d.id === defectId);

      if (index === -1) {
        return { success: false, error: 'Дефект не найден', data: null };
      }

      const defect = defects[index];
      defect.status = 'cancelled';
      defect.cancelReason = reason;

      defects[index] = defect;
      localStorage.setItem('defects', JSON.stringify(defects));

      const history = JSON.parse(localStorage.getItem('history') || '[]') as HistoryEntry[];
      const newHistory: HistoryEntry = {
        id: history.length + 1,
        defectId,
        action: 'cancel',
        author: currentRole as any,
        changes: { status: 'cancelled', cancelReason: reason },
        timestamp: new Date().toISOString(),
      };
      history.push(newHistory);
      localStorage.setItem('history', JSON.stringify(history));

      return { success: true, data: defect };
    } catch (error) {
      return { success: false, error: 'Ошибка при отмене дефекта', data: null };
    }
  },

  async getComments(defectId: string) {
    await delay();
    try {
      const comments = JSON.parse(localStorage.getItem('comments') || '[]') as Comment[];
      const result = comments.filter(c => c.defectId === defectId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке комментариев', data: null };
    }
  },

  async addComment(defectId: string, text: string, authorRole: string) {
    await delay();
    try {
      const comments = JSON.parse(localStorage.getItem('comments') || '[]') as Comment[];
      const newComment: Comment = {
        id: comments.length + 1,
        defectId,
        text,
        author: authorRole as any,
        createdAt: new Date().toISOString(),
      };
      comments.push(newComment);
      localStorage.setItem('comments', JSON.stringify(comments));
      return { success: true, data: newComment };
    } catch (error) {
      return { success: false, error: 'Ошибка при добавлении комментария', data: null };
    }
  },

  async getHistory(defectId: string) {
    await delay();
    try {
      const history = JSON.parse(localStorage.getItem('history') || '[]') as HistoryEntry[];
      const result = history.filter(h => h.defectId === defectId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке истории', data: null };
    }
  },

  async getProjects() {
    await delay();
    try {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
      return { success: true, data: projects };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке проектов', data: null };
    }
  },

  async getProjectById(projectId: number) {
    await delay();
    try {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
      const project = projects.find(p => p.id === projectId);
      if (!project) {
        return { success: false, error: 'Проект не найден', data: null };
      }
      return { success: true, data: project };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке проекта', data: null };
    }
  },

  async getDashboardStats() {
    await delay();
    try {
      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const projects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
      const now = new Date();

      const stats = {
        activeProjects: projects.filter(p => p.status === 'active').length,
        completedProjects: projects.filter(p => p.status === 'completed').length,
        pausedProjects: projects.filter(p => p.status === 'paused').length,

        newDefects: defects.filter(d => d.status === 'new').length,
        inProgressDefects: defects.filter(d => d.status === 'in_progress').length,
        onReviewDefects: defects.filter(d => d.status === 'on_review').length,
        closedDefects: defects.filter(d => d.status === 'closed').length,
        cancelledDefects: defects.filter(d => d.status === 'cancelled').length,

        overdueDefects: defects.filter(d => {
          if (['closed', 'cancelled'].includes(d.status)) return false;
          if (!d.dueDate) return false;
          return new Date(d.dueDate) < now;
        }).length,

        criticalDefects: defects.filter(d => d.priority === 'critical' && !['closed', 'cancelled'].includes(d.status)).length,
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке статистики', data: null };
    }
  },

  async getDefectsByStatus() {
    await delay();
    try {
      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const result = {
        new: defects.filter(d => d.status === 'new').length,
        in_progress: defects.filter(d => d.status === 'in_progress').length,
        on_review: defects.filter(d => d.status === 'on_review').length,
        closed: defects.filter(d => d.status === 'closed').length,
        cancelled: defects.filter(d => d.status === 'cancelled').length,
      };
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке данных', data: null };
    }
  },

  async getDefectsByPriority() {
    await delay();
    try {
      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const result = {
        critical: defects.filter(d => d.priority === 'critical').length,
        high: defects.filter(d => d.priority === 'high').length,
        medium: defects.filter(d => d.priority === 'medium').length,
        low: defects.filter(d => d.priority === 'low').length,
      };
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке данных', data: null };
    }
  },

  async getDefectsByCategory() {
    await delay();
    try {
      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];
      const result = {
        foundation: defects.filter(d => d.category === 'foundation').length,
        walls: defects.filter(d => d.category === 'walls').length,
        roof: defects.filter(d => d.category === 'roof').length,
        engineering: defects.filter(d => d.category === 'engineering').length,
        finishing: defects.filter(d => d.category === 'finishing').length,
        other: defects.filter(d => d.category === 'other').length,
      };
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке данных', data: null };
    }
  },

  async getTopProjects() {
    await delay();
    try {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
      const defects = JSON.parse(localStorage.getItem('defects') || '[]') as Defect[];

      const projectStats = projects.map(project => {
        const projectDefects = defects.filter(d => d.projectId === project.id);
        return {
          ...project,
          totalDefects: projectDefects.length,
          closedDefects: projectDefects.filter(d => d.status === 'closed').length,
          openDefects: projectDefects.filter(d => !['closed', 'cancelled'].includes(d.status)).length,
          criticalDefects: projectDefects.filter(d => d.priority === 'critical' && !['closed', 'cancelled'].includes(d.status)).length,
        };
      });

      const sorted = projectStats.sort((a, b) => b.totalDefects - a.totalDefects);
      return { success: true, data: sorted };
    } catch (error) {
      return { success: false, error: 'Ошибка при загрузке данных', data: null };
    }
  },
};
