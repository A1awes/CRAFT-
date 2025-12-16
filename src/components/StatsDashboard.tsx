import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981'];

const mockChartData = {
  defectsByMonth: [
    { month: 'Янв', new: 12, completed: 8, inProgress: 4 },
    { month: 'Фев', new: 15, completed: 12, inProgress: 3 },
    { month: 'Мар', new: 8, completed: 14, inProgress: 2 },
    { month: 'Апр', new: 18, completed: 10, inProgress: 8 },
    { month: 'Май', new: 22, completed: 16, inProgress: 6 },
    { month: 'Июн', new: 14, completed: 20, inProgress: 2 }
  ],
  defectsByStatus: [
    { name: 'Новые', value: 23, color: '#ef4444' },
    { name: 'В работе', value: 15, color: '#f59e0b' },
    { name: 'На проверке', value: 8, color: '#3b82f6' },
    { name: 'Завершены', value: 45, color: '#10b981' }
  ],
  defectsByPriority: [
    { name: 'Высокий', value: 12, color: '#ef4444' },
    { name: 'Средний', value: 34, color: '#f59e0b' },
    { name: 'Низкий', value: 25, color: '#10b981' }
  ],
  completionTrend: [
    { week: 'Нед 1', completed: 5 },
    { week: 'Нед 2', completed: 8 },
    { week: 'Нед 3', completed: 12 },
    { week: 'Нед 4', completed: 15 },
    { week: 'Нед 5', completed: 18 },
    { week: 'Нед 6', completed: 22 }
  ]
};

const stats = [
  {
    title: 'Всего дефектов',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: AlertTriangle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Завершено',
    value: '89',
    change: '+8%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'В работе',
    value: '34',
    change: '-5%',
    trend: 'down',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    title: 'Активных исполнителей',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }
];

export default function StatsDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">за месяц</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Defects by Month */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Динамика дефектов по месяцам</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData.defectsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="new" fill="#ef4444" name="Новые" />
              <Bar dataKey="inProgress" fill="#f59e0b" name="В работе" />
              <Bar dataKey="completed" fill="#10b981" name="Завершены" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Defects by Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Распределение по статусам</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockChartData.defectsByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockChartData.defectsByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Тренд завершения дефектов</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData.completionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Завершено"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Defects by Priority */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Распределение по приоритету</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockChartData.defectsByPriority}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {mockChartData.defectsByPriority.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {mockChartData.defectsByPriority.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Экспорт данных</h3>
            <p className="text-gray-600 mt-1">Выгрузите отчеты в различных форматах</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Экспорт в Excel
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Экспорт в PDF
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Экспорт в CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}