import React from 'react';
import { Building2, User } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-blue-800 p-2 rounded">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">СтройКонтроль</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-blue-800' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              Главная
            </button>
            <button className="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors">
              Возможности
            </button>
            <button className="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors">
              Отзывы
            </button>
            <button className="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors">
              Контакты
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onNavigate('login')}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'login' ? 'text-blue-800 bg-blue-50' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              <User className="w-4 h-4 inline mr-1" />
              Войти
            </button>
            <button 
              onClick={() => onNavigate('demo')}
              className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Попробовать демо
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}