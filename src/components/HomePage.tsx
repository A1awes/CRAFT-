import React from 'react';
import { Camera, CheckCircle, BarChart3, FileText, ArrowRight, Building2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Camera,
      title: "Моментальная фиксация дефектов",
      description: "Инженер может сфотографировать дефект, добавить описание и указать точное местоположение прямо на объекте через смартфон или планшет.",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    },
    {
      icon: CheckCircle,
      title: "Прозрачное назначение задач",
      description: "Менеджер видит все новые дефекты в едином списке, назначает ответственных исполнителей и устанавливает сроки выполнения в несколько кликов.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    },
    {
      icon: BarChart3,
      title: "Контроль статусов в реальном времени",
      description: "Отслеживайте жизненный цикл каждого дефекта: от «Новый» до «Исправлен». Все участники процесса видят актуальное состояние задач.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    },
    {
      icon: FileText,
      title: "Автоматическая отчетность",
      description: "Получайте наглядные отчеты и графики. Анализируйте, какие типы дефектов встречаются чаще всего, как быстро они устраняются и кто из исполнителей самый эффективный.",
      image: "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    }
  ];

  const testimonials = [
    {
      quote: "Раньше мы теряли до 20% задач по дефектам в бумажных журналах и чатах. Со «СтройКонтролем» все задачи централизованы, а контроль стал в разы проще. Эффективность бригад выросла.",
      author: "Алексей Иванов",
      position: "Руководитель проекта, «ГлавСтрой»",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    },
    {
      quote: "Теперь мне не нужно никому звонить, чтобы уточнить, что делать. Я просто открываю приложение, вижу свои задачи, фото и место. Сделал работу — поменял статус. Все просто и понятно.",
      author: "Семен Петров",
      position: "Бригадир",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    }
  ];

  const stats = [
    { value: "100+", label: "Активных проектов" },
    { value: "5000+", label: "Дефектов отслежено" },
    { value: "30%", label: "Рост эффективности" },
    { value: "24/7", label: "Техподдержка" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Больше ни одна проблема на стройке не останется{' '}
                <span className="text-orange-600">незамеченной.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                «СтройКонтроль» — цифровая платформа для регистрации, назначения и контроля устранения строительных дефектов. 
                Наведите порядок в задачах и сроках.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('demo')}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Попробовать демо
                </button>
                <button className="text-gray-700 hover:text-orange-600 px-8 py-4 rounded-lg font-semibold transition-colors border border-gray-300 hover:border-orange-600">
                  Узнать больше
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=800&h=600" 
                alt="Строитель с планшетом"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Возможности платформы
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Современные технологии для эффективного управления качеством строительства
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-100 p-3 rounded-lg mr-4">
                      <feature.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                </div>
                <div className="h-48 bg-gray-100">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Что говорят наши клиенты
            </h2>
            <p className="text-lg text-gray-600">
              Отзывы от реальных пользователей системы
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <div className="mb-6">
                  <div className="w-4 h-4 bg-orange-600 rounded-full mb-4"></div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Готовы навести порядок на вашей стройке?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Начните использовать «СтройКонтроль» уже сегодня и возьмите качество работ под полный цифровой контроль.
          </p>
          <button 
            onClick={() => onNavigate('demo')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            Начать работу
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white p-2 rounded">
                  <Building2 className="w-6 h-6 text-blue-800" />
                </div>
                <span className="text-xl font-bold text-white">СтройКонтроль</span>
              </div>
              <p className="text-blue-200 mb-4">Цифровой порядок на вашей стройке.</p>
              <p className="text-blue-300 text-sm">© 2024 СтройКонтроль. Все права защищены.</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Ссылки</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Главная</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Отзывы</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-blue-200">
                <p>Москва, ул. Строителей, 15</p>
                <p>Телефон: +7 (495) 123-45-67</p>
                <p>Email: info@stroycontrol.ru</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Социальные сети</h3>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
                <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
                <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
                <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
                <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}