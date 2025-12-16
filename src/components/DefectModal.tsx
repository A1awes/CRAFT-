import React, { useState, useEffect } from 'react';
import { X, Camera, User, Calendar, MapPin, MessageCircle, Send, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Defect, Comment, User as UserType } from '../types';
import { getUserById } from '../data/mockData';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DefectModalProps {
  defect: Defect | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (defect: Defect) => void;
  isEditing?: boolean;
}

export default function DefectModal({ defect, isOpen, onClose, onSave, isEditing = false }: DefectModalProps) {
  const [editedDefect, setEditedDefect] = useState<Defect | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defect) {
      setEditedDefect({ ...defect });
    }
  }, [defect]);

  if (!isOpen || !defect || !editedDefect) return null;

  const assignee = getUserById(defect.assigneeId);
  const reporter = getUserById(defect.reporterId);

  const getStatusColor = (status: Defect['status']) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-700 border-red-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'review': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: Defect['status']) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'in_progress': return 'В работе';
      case 'review': return 'На проверке';
      case 'completed': return 'Завершен';
      default: return status;
    }
  };

  const getPriorityIcon = (priority: Defect['priority']) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const handleSave = async () => {
    if (!onSave) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onSave(editedDefect);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      defectId: defect.id,
      userId: 1, // Current user
      text: newComment,
      createdAt: new Date().toISOString()
    };

    setEditedDefect(prev => prev ? {
      ...prev,
      comments: [...prev.comments, comment]
    } : null);
    
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getPriorityIcon(defect.priority)}
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Редактирование дефекта' : defect.title}
            </h2>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(defect.status)}`}>
              {getStatusText(defect.status)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название дефекта
                  </label>
                  <input
                    type="text"
                    value={editedDefect.title}
                    onChange={(e) => setEditedDefect(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={editedDefect.description}
                    onChange={(e) => setEditedDefect(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Статус
                    </label>
                    <select
                      value={editedDefect.status}
                      onChange={(e) => setEditedDefect(prev => prev ? { ...prev, status: e.target.value as Defect['status'] } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="new">Новый</option>
                      <option value="in_progress">В работе</option>
                      <option value="review">На проверке</option>
                      <option value="completed">Завершен</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Приоритет
                    </label>
                    <select
                      value={editedDefect.priority}
                      onChange={(e) => setEditedDefect(prev => prev ? { ...prev, priority: e.target.value as Defect['priority'] } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Низкий</option>
                      <option value="medium">Средний</option>
                      <option value="high">Высокий</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Местоположение
                  </label>
                  <input
                    type="text"
                    value={editedDefect.location}
                    onChange={(e) => setEditedDefect(prev => prev ? { ...prev, location: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{defect.title}</h3>
                  <p className="text-gray-600">{defect.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{defect.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(defect.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignee && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Исполнитель</h4>
                      <div className="flex items-center space-x-2">
                        <img
                          src={assignee.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(assignee.name)}&background=3b82f6&color=fff`}
                          alt={assignee.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{assignee.name}</div>
                          <div className="text-xs text-gray-500">{assignee.role}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {reporter && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Автор</h4>
                      <div className="flex items-center space-x-2">
                        <img
                          src={reporter.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reporter.name)}&background=3b82f6&color=fff`}
                          alt={reporter.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{reporter.name}</div>
                          <div className="text-xs text-gray-500">{reporter.role}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Photos */}
                {defect.photos.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Фотографии</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {defect.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Фото ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Comments Sidebar */}
          {!isEditing && (
            <div className="w-full lg:w-80 border-l border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Комментарии ({defect.comments.length})
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {defect.comments.map((comment) => {
                  const commentUser = getUserById(comment.userId);
                  return (
                    <div key={comment.id} className="flex space-x-3">
                      <img
                        src={commentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(commentUser?.name || 'User')}&background=3b82f6&color=fff`}
                        alt={commentUser?.name}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{commentUser?.name}</span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(comment.createdAt), 'dd.MM HH:mm', { locale: ru })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{comment.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Добавить комментарий..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {isEditing ? 'Отмена' : 'Закрыть'}
          </button>
          {isEditing && onSave && (
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}