import { Building2, LogOut } from 'lucide-react';
import { Role } from '../types';

interface HeaderProps {
  currentRole: Role;
  currentPage: string;
  onSwitchRole: () => void;
}

export default function Header({ currentRole, currentPage, onSwitchRole }: HeaderProps) {
  const roleLabels: Record<Role, string> = {
    director: 'Руководитель',
    manager: 'Менеджер',
    engineer: 'Инженер',
  };

  const roleColors: Record<Role, string> = {
    director: 'bg-blue-100 text-blue-800',
    manager: 'bg-green-100 text-green-800',
    engineer: 'bg-orange-100 text-orange-800',
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">СтройКонтроль</h1>
              <p className="text-xs text-gray-500">Система управления дефектами</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-lg font-medium text-sm ${roleColors[currentRole]}`}>
              {roleLabels[currentRole]}
            </div>
            <button
              onClick={onSwitchRole}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Сменить роль</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}