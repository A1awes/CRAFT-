import { useState, useEffect } from 'react';
import { Wrench, AlertTriangle, CheckCircle, Clock, Plus, ListTodo } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { mockUsers } from '../data/mockData';
import { Defect, Project } from '../types';
import { getStatusLabel, getStatusColor, getPriorityLabel, getPriorityColor, formatDate, isOverdue } from '../utils/formatters';

interface EngineerDashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function EngineerDashboard({ onNavigate }: EngineerDashboardProps) {
  const [defects, setDefects] = useState<Defect[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
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
          <p className="text-gray-600">Загрузка панели инженера...</p>
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

  const engineers = mockUsers.filter(u => u.role === 'engineer');
  const engineerId = engineers[0]?.id || 1;

  const myDefects = defects.filter(d => d.assignedTo === engineerId);
  const inProgressDefects = myDefects.filter(d => d.status === 'in_progress');
  const onReviewDefects = myDefects.filter(d => d.status === 'on_review');
  const overdueDefects = myDefects.filter(d =>
    !['closed', 'cancelled'].includes(d.status) && isOverdue(d.dueDate)
  );

  const recentDefects = [...myDefects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель инженера</h1>
          <p className="text-gray-600">Ваши задачи и дефекты</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <ListTodo className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{myDefects.length}</div>
            <div className="text-sm text-gray-600">Всего задач</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Wrench className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{inProgressDefects.length}</div>
            <div className="text-sm text-gray-600">В работе</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{onReviewDefects.length}</div>
            <div className="text-sm text-gray-600">На проверке</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-red-600 mb-1">{overdueDefects.length}</div>
            <div className="text-sm text-gray-600">Просроченных</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => onNavigate('projects')}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            <Plus className="w-10 h-10 mb-3" />
            <div className="text-xl font-semibold mb-2">Создать дефект</div>
            <div className="text-sm text-green-100">Зарегистрируйте новый дефект на объекте</div>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            <ListTodo className="w-10 h-10 mb-3" />
            <div className="text-xl font-semibold mb-2">Мои задачи</div>
            <div className="text-sm text-orange-100">Просмотр назначенных дефектов</div>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Мои задачи</h2>
            <button
              onClick={() => onNavigate('projects')}
              className="text-orange-600 hover:text-orange-700 font-medium text-sm"
            >
              Посмотреть все
            </button>
          </div>

          {recentDefects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>У вас пока нет назначенных задач</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Название</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Проект</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Статус</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Приоритет</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Срок</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDefects.map((defect) => {
                    const project = projects.find(p => p.id === defect.projectId);
                    const overdue = isOverdue(defect.dueDate);
                    return (
                      <tr
                        key={defect.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          overdue ? 'bg-red-50' : ''
                        }`}
                        onClick={() => onNavigate('defect-details', { defectId: defect.id })}
                      >
                        <td className="py-3 px-4 text-sm font-mono text-gray-600">{defect.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{defect.title}</div>
                          <div className="text-sm text-gray-500">{defect.location}</div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {project?.name || 'Неизвестно'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(defect.status)}`}>
                            {getStatusLabel(defect.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(defect.priority)}`}>
                            {getPriorityLabel(defect.priority)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {defect.dueDate ? (
                            <span className={overdue ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                              {formatDate(defect.dueDate)}
                            </span>
                          ) : (
                            <span className="text-gray-400">Не указан</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
