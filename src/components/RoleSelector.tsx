import { Building2, UserCog, Users, Wrench } from 'lucide-react';
import { Role } from '../types';

interface RoleSelectorProps {
  onSelectRole: (role: Role) => void;
}

export default function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const roles = [
    {
      id: 'director' as Role,
      title: 'Руководитель',
      description: 'Полный контроль, аналитика, принятие стратегических решений',
      icon: UserCog,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      features: [
        'Просмотр всех проектов и дефектов',
        'Аналитические дашборды и графики',
        'Отчеты по проектам',
        'Полный контроль системы'
      ]
    },
    {
      id: 'manager' as Role,
      title: 'Менеджер',
      description: 'Управление проектами, назначение задач, контроль выполнения',
      icon: Users,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      features: [
        'Создание и управление проектами',
        'Регистрация дефектов',
        'Назначение исполнителей',
        'Проверка и закрытие дефектов'
      ]
    },
    {
      id: 'engineer' as Role,
      title: 'Инженер',
      description: 'Фиксация дефектов на объектах, обновление статусов работ',
      icon: Wrench,
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700',
      features: [
        'Регистрация дефектов на объектах',
        'Просмотр назначенных задач',
        'Обновление статусов работ',
        'Добавление комментариев'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">СтройКонтроль</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">
            Демо-версия системы управления дефектами
          </p>
          <p className="text-gray-500">
            Выберите роль для демонстрации возможностей системы
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${role.color} p-8 text-white`}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <Icon className="w-12 h-12" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-2">{role.title}</h2>
                  <p className="text-center text-white/90 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Возможности:</h3>
                  <ul className="space-y-2 mb-6">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onSelectRole(role.id)}
                    className={`w-full bg-gradient-to-r ${role.color} ${role.hoverColor} text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg`}
                  >
                    Войти как {role.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
