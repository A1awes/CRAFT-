import React, { useState } from 'react';
import { Building2, Plus, Camera, CheckCircle, AlertTriangle, Clock, Filter, Search, ArrowLeft, BarChart } from 'lucide-react';
import { User } from '../types';
import { mockDefects, getUserById } from '../data/mockData';
import DefectTable from './DefectTable';
import DefectModal from './DefectModal';
import StatsDashboard from './StatsDashboard';

interface DemoPageProps {
  onNavigate: (page: string, data?: any) => void;
  currentUser?: User | null;
  onLogout?: () => void;
}

export default function DemoPage({ onNavigate, currentUser, onLogout }: DemoPageProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDefect, setSelectedDefect] = useState(null);
  const [isDefectModalOpen, setIsDefectModalOpen] = useState(false);
  const [isEditingDefect, setIsEditingDefect] = useState(false);

  const stats = [
    { label: 'Всего дефектов', value: '156', color: 'bg-blue-500' },
    { label: 'Активных', value: '23', color: 'bg-orange-500' },
    { label: 'Завершено сегодня', value: '8', color: 'bg-green-500' },
    { label: 'Просрочено', value: '3', color: 'bg-red-500' }
  ];

  const handleDefectClick = (defect: any) => {
    setSelectedDefect(defect);
    setIsEditingDefect(false);
    setIsDefectModalOpen(true);
  };

  const handleEditDefect = (defect: any) => {
    setSelectedDefect(defect);
    setIsEditingDefect(true);
    setIsDefectModalOpen(true);
  };

  const handleSaveDefect = (updatedDefect: any) => {
    console.log('Saving defect:', updatedDefect);
  };

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
                {currentUser?.name.charAt(0) || 'И'}
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Выйти
                </button>
              )}
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
          <StatsDashboard />
        )}

        {activeTab === 'defects' && (
          <DefectTable
            defects={mockDefects.slice(0, 10)}
            onDefectClick={handleDefectClick}
            onEditDefect={handleEditDefect}
          />
        )}

        {/* Defect Modal */}
        <DefectModal
          defect={selectedDefect}
          isOpen={isDefectModalOpen}
          onClose={() => {
            setIsDefectModalOpen(false);
            setSelectedDefect(null);
            setIsEditingDefect(false);
          }}
          onSave={handleSaveDefect}
          isEditing={isEditingDefect}
        />
      </div>
    </div>
  );
}