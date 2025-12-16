import React, { useState } from 'react';
import { Building2, Eye, EyeOff } from 'lucide-react';
import { User } from '../types';
import { mockLogin, mockDemoLogin } from '../utils/auth';
import toast from 'react-hot-toast';

interface LoginPageProps {
  onNavigate: (page: string, data?: any) => void;
  onLoginSuccess: (user: User) => void;
}

export default function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const demoRoles = [
    { role: 'engineer', label: 'Войти как Инженер', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200' },
    { role: 'manager', label: 'Войти как Менеджер', color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200' },
    { role: 'supervisor', label: 'Войти как Руководитель', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    mockLogin(email, password)
      .then((authData) => {
        toast.success('Вход выполнен успешно!');
        onLoginSuccess(authData.user);
        onNavigate('demo');
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDemoLogin = (role: string) => {
    setIsSubmitting(true);
    mockDemoLogin(role)
      .then((authData) => {
        toast.success(`Вход в демо-режиме как ${authData.user.name}`);
        onLoginSuccess(authData.user);
        onNavigate('demo');
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-blue-800 p-3 rounded-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">СтройКонтроль</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Вход в систему</h2>
            <p className="text-gray-600">Введите свои учетные данные для доступа к платформе</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Пароль
                </label>
                <button
                  type="button"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Забыли пароль?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </button>
          </form>

          {/* Demo Section */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">или для ДЕМО</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {demoRoles.map((demo) => (
                <button
                  key={demo.role}
                  onClick={() => handleDemoLogin(demo.role)}
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 border rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${demo.color}`}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Нет учетной записи?{' '}
              <button 
                onClick={() => onNavigate('register')}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Зарегистрироваться
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            ← Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
}