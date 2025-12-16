import { useState, useEffect } from 'react';
import { BarChart3, Building2, AlertTriangle, CheckCircle, Clock, TrendingUp, Download, FileText, Table } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { getStatusLabel, getPriorityLabel, getCategoryLabel, isOverdue } from '../utils/formatters';
import { exportDefectsReport, exportProjectsReport, exportSummaryReport } from '../utils/csvExport';
import { Defect, Project } from '../types';
import toast from 'react-hot-toast';

interface DirectorDashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function DirectorDashboard({ onNavigate }: DirectorDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [defects, setDefects] = useState<Defect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const projectsRes = await mockApi.getProjects();
        const defectsRes = await mockApi.getDefects();

        if (projectsRes.success && defectsRes.success) {
          setProjects(projectsRes.data);
          setDefects(defectsRes.data);
        } else {
          setError('Ошибка загрузки данных');
        }
      } catch (err) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка аналитики...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">Ошибка: {error}</p>
        </div>
      </div>
    );
  }

  const activeProjects = projects.filter(p => p.status === 'active');
  const openDefects = defects.filter(d => !['closed', 'cancelled'].includes(d.status));
  const overdueDefects = defects.filter(d =>
    !['closed', 'cancelled'].includes(d.status) && isOverdue(d.dueDate)
  );

  const defectsByStatus = defects.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const defectsByPriority = defects.reduce((acc, d) => {
    acc[d.priority] = (acc[d.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const defectsByCategory = defects.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const projectsWithDefects = projects.map(project => ({
    project,
    defectCount: defects.filter(d => d.projectId === project.id).length,
    openDefectCount: defects.filter(
      d => d.projectId === project.id && !['closed', 'cancelled'].includes(d.status)
    ).length,
  })).sort((a, b) => b.openDefectCount - a.openDefectCount).slice(0, 5);

  const handleExportDefects = () => {
    try {
      exportDefectsReport(defects, projects);
      toast.success('Отчет по дефектам экспортирован');
    } catch (err) {
      toast.error('Ошибка экспорта отчета');
    }
  };

  const handleExportProjects = () => {
    try {
      exportProjectsReport(projects, defects);
      toast.success('Отчет по проектам экспортирован');
    } catch (err) {
      toast.error('Ошибка экспорта отчета');
    }
  };

  const handleExportSummary = () => {
    try {
      exportSummaryReport(projects, defects);
      toast.success('Сводный отчет экспортирован');
    } catch (err) {
      toast.error('Ошибка экспорта отчета');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Дашборд руководителя</h1>
              <p className="text-gray-600">Общая аналитика по всем проектам</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExportSummary}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                title="Экспорт сводного отчета"
              >
                <FileText className="w-4 h-4" />
                Сводный отчет
              </button>
              <button
                onClick={handleExportProjects}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                title="Экспорт отчета по проектам"
              >
                <Table className="w-4 h-4" />
                Проекты
              </button>
              <button
                onClick={handleExportDefects}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                title="Экспорт отчета по дефектам"
              >
                <Download className="w-4 h-4" />
                Дефекты
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{activeProjects.length}</div>
            <div className="text-sm text-gray-600">Активных проектов</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{openDefects.length}</div>
            <div className="text-sm text-gray-600">Открытых дефектов</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-red-600 mb-1">{overdueDefects.length}</div>
            <div className="text-sm text-gray-600">Просроченных дефектов</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {defectsByStatus['closed'] || 0}
            </div>
            <div className="text-sm text-gray-600">Закрытых дефектов</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Дефекты по статусам
            </h3>
            <div className="space-y-3">
              {Object.entries(defectsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">{getStatusLabel(status as any)}</div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full flex items-center justify-end px-2"
                        style={{ width: `${(count / defects.length) * 100}%` }}
                      >
                        <span className="text-xs font-medium text-white">{count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
              Дефекты по приоритетам
            </h3>
            <div className="space-y-3">
              {Object.entries(defectsByPriority).map(([priority, count]) => (
                <div key={priority} className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">{getPriorityLabel(priority as any)}</div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className={`h-full rounded-full flex items-center justify-end px-2 ${
                          priority === 'critical' ? 'bg-red-500' :
                          priority === 'high' ? 'bg-orange-500' :
                          priority === 'medium' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${(count / defects.length) * 100}%` }}
                      >
                        <span className="text-xs font-medium text-white">{count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
              Дефекты по категориям
            </h3>
            <div className="space-y-3">
              {Object.entries(defectsByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center">
                  <div className="w-40 text-sm text-gray-600">{getCategoryLabel(category as any)}</div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full flex items-center justify-end px-2"
                        style={{ width: `${(count / defects.length) * 100}%` }}
                      >
                        <span className="text-xs font-medium text-white">{count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              Проекты с наибольшим числом дефектов
            </h3>
            <div className="space-y-3">
              {projectsWithDefects.map(({ project, openDefectCount }) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onNavigate('project-details', { projectId: project.id })}
                >
                  <div>
                    <div className="font-medium text-gray-900">{project.name}</div>
                    <div className="text-sm text-gray-500">{project.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">{openDefectCount}</div>
                    <div className="text-xs text-gray-500">открытых</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onNavigate('projects')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Все проекты
          </button>
        </div>
      </div>
    </div>
  );
}
