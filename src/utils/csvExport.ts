import { Defect, Project } from '../types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  getStatusLabel,
  getPriorityLabel,
  getCategoryLabel,
} from './formatters';

function escapeCSV(value: any): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadCSV(content: string, filename: string) {
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportDefectsReport(defects: Defect[], projects: Project[]) {
  const headers = [
    'ID дефекта',
    'Проект',
    'Название',
    'Описание',
    'Статус',
    'Приоритет',
    'Категория',
    'Местоположение',
    'Исполнитель',
    'Срок устранения',
    'Дата создания',
    'Дата закрытия',
    'Создал',
  ];

  const rows = defects.map(defect => {
    const project = projects.find(p => p.id === defect.projectId);

    return [
      escapeCSV(defect.id),
      escapeCSV(project?.name || 'Неизвестно'),
      escapeCSV(defect.title),
      escapeCSV(defect.description),
      escapeCSV(getStatusLabel(defect.status)),
      escapeCSV(getPriorityLabel(defect.priority)),
      escapeCSV(getCategoryLabel(defect.category)),
      escapeCSV(defect.location),
      escapeCSV(defect.assignedTo || 'Не назначен'),
      escapeCSV(defect.dueDate ? format(new Date(defect.dueDate), 'dd.MM.yyyy', { locale: ru }) : ''),
      escapeCSV(format(new Date(defect.createdAt), 'dd.MM.yyyy HH:mm', { locale: ru })),
      escapeCSV(defect.closedAt ? format(new Date(defect.closedAt), 'dd.MM.yyyy HH:mm', { locale: ru }) : ''),
      escapeCSV(defect.createdBy),
    ].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  const filename = `defects_report_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;

  downloadCSV(csv, filename);
}

export function exportProjectsReport(projects: Project[], defects: Defect[]) {
  const headers = [
    'ID проекта',
    'Название проекта',
    'Адрес',
    'Заказчик',
    'Статус',
    'Дата начала',
    'Дата окончания',
    'Всего дефектов',
    'Открытых дефектов',
    'В работе',
    'На проверке',
    'Закрытых',
    'Отмененных',
  ];

  const rows = projects.map(project => {
    const projectDefects = defects.filter(d => d.projectId === project.id);
    const openDefects = projectDefects.filter(d => !['closed', 'cancelled'].includes(d.status));
    const inProgressDefects = projectDefects.filter(d => d.status === 'in_progress');
    const onReviewDefects = projectDefects.filter(d => d.status === 'on_review');
    const closedDefects = projectDefects.filter(d => d.status === 'closed');
    const cancelledDefects = projectDefects.filter(d => d.status === 'cancelled');

    return [
      escapeCSV(project.id),
      escapeCSV(project.name),
      escapeCSV(project.address),
      escapeCSV(project.customer),
      escapeCSV(project.status === 'active' ? 'Активный' : project.status === 'completed' ? 'Завершен' : 'На паузе'),
      escapeCSV(format(new Date(project.startDate), 'dd.MM.yyyy', { locale: ru })),
      escapeCSV(format(new Date(project.endDate), 'dd.MM.yyyy', { locale: ru })),
      escapeCSV(projectDefects.length),
      escapeCSV(openDefects.length),
      escapeCSV(inProgressDefects.length),
      escapeCSV(onReviewDefects.length),
      escapeCSV(closedDefects.length),
      escapeCSV(cancelledDefects.length),
    ].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  const filename = `projects_report_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;

  downloadCSV(csv, filename);
}

export function exportSummaryReport(projects: Project[], defects: Defect[]) {
  const activeProjects = projects.filter(p => p.status === 'active');
  const completedProjects = projects.filter(p => p.status === 'completed');
  const pausedProjects = projects.filter(p => p.status === 'paused');

  const openDefects = defects.filter(d => !['closed', 'cancelled'].includes(d.status));
  const closedDefects = defects.filter(d => d.status === 'closed');
  const newDefects = defects.filter(d => d.status === 'new');
  const inProgressDefects = defects.filter(d => d.status === 'in_progress');
  const onReviewDefects = defects.filter(d => d.status === 'on_review');

  const criticalDefects = defects.filter(d => d.priority === 'critical');
  const highDefects = defects.filter(d => d.priority === 'high');
  const mediumDefects = defects.filter(d => d.priority === 'medium');
  const lowDefects = defects.filter(d => d.priority === 'low');

  const overdueDefects = defects.filter(d => {
    if (!d.dueDate || ['closed', 'cancelled'].includes(d.status)) return false;
    return new Date(d.dueDate) < new Date();
  });

  const content = `Сводный отчет по проектам и дефектам
Дата формирования: ${format(new Date(), 'dd.MM.yyyy HH:mm', { locale: ru })}

ПРОЕКТЫ
Всего проектов,${projects.length}
Активных,${activeProjects.length}
Завершенных,${completedProjects.length}
На паузе,${pausedProjects.length}

ДЕФЕКТЫ - ОБЩАЯ СТАТИСТИКА
Всего дефектов,${defects.length}
Открытых,${openDefects.length}
Закрытых,${closedDefects.length}
Просроченных,${overdueDefects.length}

ДЕФЕКТЫ - ПО СТАТУСАМ
Новых,${newDefects.length}
В работе,${inProgressDefects.length}
На проверке,${onReviewDefects.length}
Закрытых,${closedDefects.length}

ДЕФЕКТЫ - ПО ПРИОРИТЕТАМ
Критических,${criticalDefects.length}
Высоких,${highDefects.length}
Средних,${mediumDefects.length}
Низких,${lowDefects.length}

ПРОЕКТЫ С ОТКРЫТЫМИ ДЕФЕКТАМИ
Проект,Адрес,Открытых дефектов,Критических,Высоких
`;

  const projectStats = projects
    .map(project => {
      const projectDefects = defects.filter(d => d.projectId === project.id);
      const openProjectDefects = projectDefects.filter(d => !['closed', 'cancelled'].includes(d.status));
      const criticalProjectDefects = openProjectDefects.filter(d => d.priority === 'critical');
      const highProjectDefects = openProjectDefects.filter(d => d.priority === 'high');

      return {
        project,
        open: openProjectDefects.length,
        critical: criticalProjectDefects.length,
        high: highProjectDefects.length,
      };
    })
    .filter(p => p.open > 0)
    .sort((a, b) => b.open - a.open)
    .map(({ project, open, critical, high }) =>
      `${escapeCSV(project.name)},${escapeCSV(project.address)},${open},${critical},${high}`
    )
    .join('\n');

  const csv = content + projectStats;
  const filename = `summary_report_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;

  downloadCSV(csv, filename);
}
