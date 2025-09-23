import React, { useState } from 'react';
import { Building2, Plus, Camera, CheckCircle, AlertTriangle, Clock, Filter, Search, ArrowLeft, BarChart } from 'lucide-react';

interface DemoPageProps {
  onNavigate: (page: string) => void;
}

export default function DemoPage({ onNavigate }: DemoPageProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const defects = [
    {
      id: 1,
      title: 'Трещина в стене на 3-м этаже',
      status: 'new',
      priority: 'high',
      location: 'Блок А, этаж 3, кв. 301',
      assignee: 'Петров С.И.',
      created: '2024-01-15',
      deadline: '2024-01-20',
      image: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    },
    {
      id: 2,
      title: 'Неровность пола в коридоре',
      status: 'in_progress',
      priority: 'medium',
      location: 'Блок Б, этаж 1',
      assignee: 'Иванов А.П.',
      created: '2024-01-14',
      deadline: '2024-01-18',
      image: 'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    },
    {
      id: 3,
      title: 'Подтекание крана в санузле',
      status: 'completed',
      priority: 'low',
      location: 'Блок А, этаж 2, кв. 205',
      assignee: 'Сидоров М.В.',
      created: '2024-01-12',
      deadline: '2024-01-16',
      image: 'https://images.pexels.com/photos/1126384/pexels-photo-1126384.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-700 border-red-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершен';
      default: return status;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const stats = [
    { label: 'Всего дефектов', value: '156', color: 'bg-blue-500' },
    { label: 'Активных', value: '23', color: 'bg-orange-500' },
    { label: 'Завершено сегодня', value: '8', color: 'bg-green-500' },
    { label: 'Просрочено', value: '3', color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Выход из демо</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-800 p-2 rounded">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">СтройКонтроль</span>
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">ДЕМО</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Демо-пользователь: Инженер</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                И
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Дашборд
            </button>
            <button
              onClick={() => setActiveTab('defects')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'defects'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Дефекты
            </button>
          </nav>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${stat.color} mr-3`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Динамика дефектов</h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <BarChart className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-500">График динамики дефектов</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние активности</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Дефект #156 помечен как завершенный</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Новый дефект #157 зарегистрирован</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Дефект #145 назначен исполнителю</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'defects' && (
          <div>
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex space-x-2">
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить дефект
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Фото
                  </button>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Поиск дефектов..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Defects List */}
            <div className="space-y-4">
              {defects.map((defect) => (
                <div key={defect.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={defect.image}
                        alt={defect.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              {getPriorityIcon(defect.priority)}
                              <h3 className="text-lg font-semibold text-gray-900">
                                {defect.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(defect.status)}`}>
                                {getStatusText(defect.status)}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{defect.location}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Исполнитель: {defect.assignee}</span>
                              <span>Создан: {defect.created}</span>
                              <span>Срок: {defect.deadline}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Открыть
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                              Изменить
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}