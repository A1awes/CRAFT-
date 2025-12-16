import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, Edit, AlertTriangle, Clock, CheckCircle, Calendar, User } from 'lucide-react';
import { Defect, User as UserType } from '../types';
import { getUserById } from '../data/mockData';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DefectTableProps {
  defects: Defect[];
  onDefectClick: (defect: Defect) => void;
  onEditDefect: (defect: Defect) => void;
}

export default function DefectTable({ defects, onDefectClick, onEditDefect }: DefectTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'created' | 'priority' | 'status'>('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedDefects = useMemo(() => {
    let filtered = defects.filter(defect => {
      const matchesSearch = defect.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           defect.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || defect.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || defect.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [defects, searchTerm, statusFilter, priorityFilter, sortBy, sortOrder]);

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

  const getPriorityText = (priority: Defect['priority']) => {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return priority;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск дефектов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Все статусы</option>
              <option value="new">Новый</option>
              <option value="in_progress">В работе</option>
              <option value="review">На проверке</option>
              <option value="completed">Завершен</option>
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Все приоритеты</option>
              <option value="high">Высокий</option>
              <option value="medium">Средний</option>
              <option value="low">Низкий</option>
            </select>
            
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as 'created' | 'priority' | 'status');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="created-desc">Сначала новые</option>
              <option value="created-asc">Сначала старые</option>
              <option value="priority-desc">По приоритету ↓</option>
              <option value="priority-asc">По приоритету ↑</option>
              <option value="status-asc">По статусу A-Z</option>
              <option value="status-desc">По статусу Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дефект
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Приоритет
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Исполнитель
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Создан
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedDefects.map((defect) => {
              const assignee = getUserById(defect.assigneeId);
              return (
                <tr key={defect.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      {defect.photos.length > 0 && (
                        <img
                          src={defect.photos[0]}
                          alt={defect.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{defect.title}</div>
                        <div className="text-sm text-gray-500">{defect.location}</div>
                        <div className="text-xs text-gray-400 mt-1 line-clamp-2">{defect.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(defect.status)}`}>
                      {getStatusText(defect.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      {getPriorityIcon(defect.priority)}
                      <span className="text-sm text-gray-900">{getPriorityText(defect.priority)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {assignee && (
                      <div className="flex items-center space-x-2">
                        <img
                          src={assignee.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(assignee.name)}&background=3b82f6&color=fff`}
                          alt={assignee.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-900">{assignee.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(defect.createdAt), 'dd.MM.yyyy', { locale: ru })}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onDefectClick(defect)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Просмотр"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditDefect(defect)}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredAndSortedDefects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <AlertTriangle className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Дефекты не найдены</h3>
          <p className="text-gray-500">Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      )}
    </div>
  );
}