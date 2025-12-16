import { useState, useEffect } from 'react';
import { Plus, Search, AlertTriangle, Building2, X } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { Role, Project, Defect, DefectCategory, DefectPriority } from '../types';
import {
  formatDate,
  getStatusLabel,
  getStatusColor,
  getPriorityLabel,
  getPriorityColor,
  getCategoryLabel
} from '../utils/formatters';
import toast from 'react-hot-toast';

interface ProjectsPageProps {
  currentRole: Role;
  onNavigate: (page: string, data?: any) => void;
}

export default function ProjectsPage({ currentRole, onNavigate }: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [defects, setDefects] = useState<Defect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDefectModal, setShowDefectModal] = useState(false);

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

  useEffect(() => {
    loadData();
  }, []);

  const [newDefect, setNewDefect] = useState({
    title: '',
    description: '',
    priority: 'medium' as DefectPriority,
    category: 'other' as DefectCategory,
    location: '',
    dueDate: '',
  });

  const filteredDefects = selectedProject
    ? defects.filter(d => d.projectId === selectedProject)
    : defects;

  const searchedDefects = searchTerm
    ? filteredDefects.filter(d =>
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredDefects;

  const handleCreateDefect = async () => {
    if (!selectedProject) {
      toast.error('Выберите проект');
      return;
    }

    if (!newDefect.title.trim() || !newDefect.description.trim() || !newDefect.location.trim()) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    try {
      const response = await mockApi.createDefect({
        projectId: selectedProject,
        title: newDefect.title.trim(),
        description: newDefect.description.trim(),
        priority: newDefect.priority,
        category: newDefect.category,
        location: newDefect.location.trim(),
        dueDate: newDefect.dueDate || null,
        createdBy: currentRole,
      });

      if (response.success) {
        await loadData();
        setShowDefectModal(false);
        setNewDefect({
          title: '',
          description: '',
          priority: 'medium',
          category: 'other',
          location: '',
          dueDate: '',
        });
        toast.success('Дефект успешно создан');
      } else {
        toast.error(response.error || 'Ошибка при создании дефекта');
      }
    } catch (err) {
      toast.error('Ошибка при создании дефекта');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка проектов...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Проекты и дефекты</h1>
            <p className="text-gray-600 mt-1">Управление дефектами на строительных объектах</p>
          </div>
          <button
            onClick={() => setShowDefectModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Создать дефект
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Проекты</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedProject === null
                      ? 'bg-blue-100 text-blue-900 font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    Все проекты
                  </div>
                  <div className="text-xs text-gray-500 ml-6 mt-1">
                    {defects.length} дефектов
                  </div>
                </button>
                {projects.map(project => {
                  const projectDefects = defects.filter(d => d.projectId === project.id);
                  return (
                    <button
                      key={project.id}
                      onClick={() => setSelectedProject(project.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedProject === project.id
                          ? 'bg-blue-100 text-blue-900 font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {projectDefects.length} дефектов
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedProject
                    ? projects.find(p => p.id === selectedProject)?.name
                    : 'Все дефекты'}
                </h3>
                <div className="relative w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск дефектов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {searchedDefects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Дефектов пока нет</p>
                  <button
                    onClick={() => setShowDefectModal(true)}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Создать первый дефект
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Название</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Статус</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Приоритет</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Создан</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedDefects.map(defect => (
                        <tr
                          key={defect.id}
                          className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => onNavigate('defect-details', { defectId: defect.id })}
                        >
                          <td className="py-3 px-4 text-sm font-mono text-gray-600">{defect.id}</td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{defect.title}</div>
                            <div className="text-sm text-gray-500">{defect.location}</div>
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
                          <td className="py-3 px-4 text-sm text-gray-600">{formatDate(defect.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDefectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Создать дефект</h2>
              <button
                onClick={() => setShowDefectModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Проект *
                </label>
                <select
                  value={selectedProject || ''}
                  onChange={(e) => setSelectedProject(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Выберите проект</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название дефекта *
                </label>
                <input
                  type="text"
                  value={newDefect.title}
                  onChange={(e) => setNewDefect({ ...newDefect, title: e.target.value })}
                  placeholder="Краткое описание дефекта"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание *
                </label>
                <textarea
                  value={newDefect.description}
                  onChange={(e) => setNewDefect({ ...newDefect, description: e.target.value })}
                  placeholder="Подробное описание дефекта"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Приоритет
                  </label>
                  <select
                    value={newDefect.priority}
                    onChange={(e) => setNewDefect({ ...newDefect, priority: e.target.value as DefectPriority })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="critical">Критический</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория
                  </label>
                  <select
                    value={newDefect.category}
                    onChange={(e) => setNewDefect({ ...newDefect, category: e.target.value as DefectCategory })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="foundation">Фундамент</option>
                    <option value="walls">Стены</option>
                    <option value="roof">Кровля</option>
                    <option value="engineering">Инженерные сети</option>
                    <option value="finishing">Отделка</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Местоположение *
                </label>
                <input
                  type="text"
                  value={newDefect.location}
                  onChange={(e) => setNewDefect({ ...newDefect, location: e.target.value })}
                  placeholder="Например: Подъезд 2, этаж 5, кв. 52"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Срок устранения
                </label>
                <input
                  type="date"
                  value={newDefect.dueDate}
                  onChange={(e) => setNewDefect({ ...newDefect, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDefectModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleCreateDefect}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Создать дефект
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
