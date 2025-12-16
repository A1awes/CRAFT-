import { useState, useEffect } from 'react';
import { ArrowLeft, User, Clock, MessageCircle, History, X } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { mockUsers } from '../data/mockData';
import { Role, Defect, Comment as CommentType, HistoryEntry, Project } from '../types';
import {
  formatDateTime,
  getStatusLabel,
  getStatusColor,
  getPriorityLabel,
  getPriorityColor,
  getCategoryLabel,
  getRoleLabel,
} from '../utils/formatters';
import toast from 'react-hot-toast';

interface DefectDetailsPageProps {
  defectId: string;
  currentRole: Role;
  onNavigate: (page: string, data?: any) => void;
}

export default function DefectDetailsPage({ defectId, currentRole, onNavigate }: DefectDetailsPageProps) {
  const [defect, setDefect] = useState<Defect | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'history'>('details');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState<number | null>(null);
  const [returnReason, setReturnReason] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const defectRes = await mockApi.getDefectById(defectId);
        const commentsRes = await mockApi.getComments(defectId);
        const historyRes = await mockApi.getHistory(defectId);

        if (defectRes.success && commentsRes.success && historyRes.success) {
          setDefect(defectRes.data);
          setComments(commentsRes.data);
          setHistory(historyRes.data);

          const projectRes = await mockApi.getProjectById(defectRes.data.projectId);
          if (projectRes.success) {
            setProject(projectRes.data);
          }
        } else {
          setError('Ошибка загрузки дефекта');
        }
      } catch (err) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [defectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка дефекта...</p>
        </div>
      </div>
    );
  }

  if (error || !defect) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{error || 'Дефект не найден'}</p>
          <button
            onClick={() => onNavigate('projects')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  const assignee = defect.assignedTo ? mockUsers.find(u => u.id === defect.assignedTo) : null;
  const engineers = mockUsers.filter(u => u.role === 'engineer');

  const reloadData = async () => {
    const defectRes = await mockApi.getDefectById(defectId);
    const commentsRes = await mockApi.getComments(defectId);
    const historyRes = await mockApi.getHistory(defectId);

    if (defectRes.success && commentsRes.success && historyRes.success) {
      setDefect(defectRes.data);
      setComments(commentsRes.data);
      setHistory(historyRes.data);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('Введите текст комментария');
      return;
    }

    try {
      setActionLoading(true);
      const response = await mockApi.addComment(defectId, newComment, currentRole);
      if (response.success) {
        setNewComment('');
        await reloadData();
        toast.success('Комментарий добавлен');
      } else {
        toast.error(response.error || 'Ошибка при добавлении комментария');
      }
    } catch (err) {
      toast.error('Ошибка при добавлении комментария');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssignDefect = async () => {
    if (!selectedEngineer) {
      toast.error('Выберите инженера');
      return;
    }

    try {
      setActionLoading(true);
      const response = await mockApi.assignDefect(defectId, selectedEngineer, defect.dueDate || undefined);
      if (response.success) {
        setShowAssignModal(false);
        setSelectedEngineer(null);
        await reloadData();
        toast.success('Дефект назначен инженеру');
      } else {
        toast.error(response.error || 'Ошибка при назначении');
      }
    } catch (err) {
      toast.error('Ошибка при назначении');
    } finally {
      setActionLoading(false);
    }
  };

  const handleChangeStatus = async (newStatus: string, commentText?: string) => {
    try {
      setActionLoading(true);
      const response = await mockApi.updateDefectStatus(defectId, newStatus, commentText);
      if (response.success) {
        await reloadData();
        toast.success('Статус изменен');
      } else {
        toast.error(response.error || 'Ошибка при изменении статуса');
      }
    } catch (err) {
      toast.error('Ошибка при изменении статуса');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseDefect = async () => {
    await handleChangeStatus('closed', 'Дефект закрыт');
  };

  const handleReturnDefect = async () => {
    if (!returnReason.trim()) {
      toast.error('Укажите причину возврата');
      return;
    }

    try {
      setActionLoading(true);
      await handleChangeStatus('in_progress', `Возвращено на доработку: ${returnReason}`);
      setShowReturnModal(false);
      setReturnReason('');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEngineerSubmitReview = async () => {
    await handleChangeStatus('on_review', 'Работы завершены, отправлено на проверку');
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500 font-mono mb-1">{defect.id}</div>
                  <h1 className="text-2xl font-bold text-gray-900">{defect.title}</h1>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(defect.status)}`}>
                  {getStatusLabel(defect.status)}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(defect.priority)}`}>
                  {getPriorityLabel(defect.priority)}
                </span>
                <span>{getCategoryLabel(defect.category)}</span>
                <span>•</span>
                <span>{defect.location}</span>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Описание</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{defect.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md">
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'details'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Детали
                  </button>
                  <button
                    onClick={() => setActiveTab('comments')}
                    className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'comments'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Комментарии ({comments.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'history'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    История
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Проект</div>
                      <div className="font-medium">{project?.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Создал</div>
                      <div className="font-medium">{getRoleLabel(defect.createdBy)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Дата создания</div>
                      <div className="font-medium">{formatDateTime(defect.createdAt)}</div>
                    </div>
                    {defect.dueDate && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Срок устранения</div>
                        <div className="font-medium">{formatDateTime(defect.dueDate)}</div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="font-medium text-sm">{getRoleLabel(comment.author)}</span>
                            </div>
                            <span className="text-xs text-gray-500">{formatDateTime(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{comment.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Добавить комментарий..."
                        rows={3}
                        disabled={actionLoading}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3 disabled:opacity-50"
                      />
                      <button
                        onClick={handleAddComment}
                        disabled={actionLoading}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading ? 'Добавление...' : 'Добавить комментарий'}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-3">
                    {history.map(entry => (
                      <div key={entry.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                        <History className="w-4 h-4 text-gray-400 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{getRoleLabel(entry.author)}</span>
                            <span className="text-xs text-gray-500">{formatDateTime(entry.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-600">{entry.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Действия</h3>
              <div className="space-y-3">
                {defect.status === 'new' && (currentRole === 'manager' || currentRole === 'director') && (
                  <button
                    onClick={() => setShowAssignModal(true)}
                    disabled={actionLoading}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading ? 'Загрузка...' : 'Назначить исполнителя'}
                  </button>
                )}

                {defect.status === 'in_progress' && currentRole === 'engineer' && (
                  <button
                    onClick={() => handleEngineerSubmitReview()}
                    disabled={actionLoading}
                    className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading ? 'Загрузка...' : 'Отправить на проверку'}
                  </button>
                )}

                {defect.status === 'on_review' && (currentRole === 'manager' || currentRole === 'director') && (
                  <>
                    <button
                      onClick={() => handleCloseDefect()}
                      disabled={actionLoading}
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading ? 'Загрузка...' : 'Закрыть дефект'}
                    </button>
                    <button
                      onClick={() => setShowReturnModal(true)}
                      disabled={actionLoading}
                      className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading ? 'Загрузка...' : 'Вернуть в работу'}
                    </button>
                  </>
                )}
              </div>
            </div>

            {assignee && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Исполнитель</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{assignee.name}</div>
                    <div className="text-sm text-gray-500">{assignee.email}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Назначить инженера</h3>
                <button
                  onClick={() => setShowAssignModal(false)}
                  disabled={actionLoading}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Выберите инженера
                  </label>
                  <select
                    value={selectedEngineer || ''}
                    onChange={(e) => setSelectedEngineer(e.target.value ? Number(e.target.value) : null)}
                    disabled={actionLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">-- Выберите инженера --</option>
                    {engineers.map(engineer => (
                      <option key={engineer.id} value={engineer.id}>
                        {engineer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    Отменить
                  </button>
                  <button
                    onClick={handleAssignDefect}
                    disabled={actionLoading || !selectedEngineer}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading ? 'Назначение...' : 'Назначить'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showReturnModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Вернуть в работу</h3>
                <button
                  onClick={() => setShowReturnModal(false)}
                  disabled={actionLoading}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Причина возврата
                  </label>
                  <textarea
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    placeholder="Укажите причину возврата на доработку..."
                    rows={4}
                    disabled={actionLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowReturnModal(false)}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    Отменить
                  </button>
                  <button
                    onClick={handleReturnDefect}
                    disabled={actionLoading || !returnReason.trim()}
                    className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading ? 'Возврат...' : 'Вернуть'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
