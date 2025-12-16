import { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, Building2, Plus } from 'lucide-react';
import { Role, Project, Defect } from '../types';
import { mockApi } from '../services/mockApi';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getUserById } from '../data/mockData';
import CreateDefectModal from './CreateDefectModal';

interface ProjectDetailsPageProps {
  projectId: number;
  currentRole: Role;
  onNavigate: (page: string, data?: any) => void;
}

export default function ProjectDetailsPage({ projectId, currentRole, onNavigate }: ProjectDetailsPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [defects, setDefects] = useState<Defect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const projectRes = await mockApi.getProjectById(projectId);
      const defectsRes = await mockApi.getDefects(projectId);

      if (projectRes.success && defectsRes.success) {
        setProject(projectRes.data);
        setDefects(defectsRes.data);
      } else {
        setError('Ошибка загрузки данных проекта');
      }
    } catch (err) {
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка проекта...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к списку
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">Ошибка: {error || 'Проект не найден'}</p>
          </div>
        </div>
      </div>
    );
  }

  const openDefects = defects.filter(d => !['closed', 'cancelled'].includes(d.status));
  const closedDefects = defects.filter(d => d.status === 'closed');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('projects')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к списку
        </button>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
              <p className="text-gray-600">{project.address}</p>
            </div>
            <span className={`px-4 py-2 rounded-full font-semibold ${
              project.status === 'active' ? 'bg-green-100 text-green-800' :
              project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {project.status === 'active' ? 'Активный' :
               project.status === 'completed' ? 'Завершен' : 'На паузе'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Заказчик</p>
              <p className="font-semibold text-gray-900">{project.customer}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Дата начала</p>
              <p className="font-semibold text-gray-900">
                {format(new Date(project.startDate), 'dd.MM.yyyy', { locale: ru })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Дата окончания</p>
              <p className="font-semibold text-gray-900">
                {format(new Date(project.endDate), 'dd.MM.yyyy', { locale: ru })}
              </p>
            </div>
          </div>

          {project.description && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Описание</p>
              <p className="text-gray-900">{project.description}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Всего дефектов</p>
                <p className="text-3xl font-bold text-gray-900">{defects.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Открытых дефектов</p>
                <p className="text-3xl font-bold text-orange-600">{openDefects.length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Закрытых дефектов</p>
                <p className="text-3xl font-bold text-green-600">{closedDefects.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Дефекты проекта</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Создать дефект
            </button>
          </div>

          {defects.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">На этом проекте нет дефектов</p>
            </div>
          ) : (
            <div className="space-y-4">
              {defects.map(defect => {
                const assignee = defect.assignedTo ? getUserById(defect.assignedTo) : null;
                return (
                  <div
                    key={defect.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onNavigate('defect-details', { defectId: defect.id })}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{defect.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        defect.status === 'new' ? 'bg-red-100 text-red-800' :
                        defect.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        defect.status === 'on_review' ? 'bg-blue-100 text-blue-800' :
                        defect.status === 'closed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {defect.status === 'new' ? 'Новый' :
                         defect.status === 'in_progress' ? 'В работе' :
                         defect.status === 'on_review' ? 'На проверке' :
                         defect.status === 'closed' ? 'Закрыт' : 'Отменен'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{defect.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Приоритет: <span className="font-semibold">{
                          defect.priority === 'critical' ? 'Критический' :
                          defect.priority === 'high' ? 'Высокий' :
                          defect.priority === 'medium' ? 'Средний' : 'Низкий'
                        }</span></span>
                        {assignee && (
                          <span className="text-gray-600">Исполнитель: <span className="font-semibold">{assignee.name}</span></span>
                        )}
                      </div>
                      {defect.dueDate && (
                        <span className="text-gray-600">
                          {format(new Date(defect.dueDate), 'dd.MM.yyyy', { locale: ru })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <CreateDefectModal
          projectId={projectId}
          currentRole={currentRole}
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => loadData()}
        />
      </div>
    </div>
  );
}
