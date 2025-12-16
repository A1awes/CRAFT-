import { DefectStatus, DefectPriority, DefectCategory, ProjectStatus, Role } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const generateDefectId = (): string => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `DF-${dateStr}-${randomNum}`;
};

export const getStatusLabel = (status: DefectStatus): string => {
  const labels: Record<DefectStatus, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    on_review: 'На проверке',
    closed: 'Закрыта',
    cancelled: 'Отменена',
    needs_management: 'Требует решения руководства',
  };
  return labels[status];
};

export const getStatusColor = (status: DefectStatus): string => {
  const colors: Record<DefectStatus, string> = {
    new: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    on_review: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-600',
    needs_management: 'bg-red-100 text-red-800',
  };
  return colors[status];
};

export const getPriorityLabel = (priority: DefectPriority): string => {
  const labels: Record<DefectPriority, string> = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    critical: 'Критический',
  };
  return labels[priority];
};

export const getPriorityColor = (priority: DefectPriority): string => {
  const colors: Record<DefectPriority, string> = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };
  return colors[priority];
};

export const getCategoryLabel = (category: DefectCategory): string => {
  const labels: Record<DefectCategory, string> = {
    foundation: 'Фундамент',
    walls: 'Стены',
    roof: 'Кровля',
    engineering: 'Инженерные сети',
    finishing: 'Отделка',
    other: 'Другое',
  };
  return labels[category];
};

export const getProjectStatusLabel = (status: ProjectStatus): string => {
  const labels: Record<ProjectStatus, string> = {
    active: 'Активный',
    completed: 'Завершён',
    paused: 'Приостановлен',
  };
  return labels[status];
};

export const getProjectStatusColor = (status: ProjectStatus): string => {
  const colors: Record<ProjectStatus, string> = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    paused: 'bg-yellow-100 text-yellow-800',
  };
  return colors[status];
};

export const getRoleLabel = (role: Role): string => {
  const labels: Record<Role, string> = {
    director: 'Руководитель',
    manager: 'Менеджер',
    engineer: 'Инженер',
  };
  return labels[role];
};

export const isOverdue = (dueDate: string | null): boolean => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};
