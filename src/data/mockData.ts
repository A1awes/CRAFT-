import { User, Project, Defect, Comment, HistoryEntry, AppState } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Иван Петров",
    email: "i.petrov@example.com",
    role: "engineer"
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "m.sidorova@example.com",
    role: "engineer"
  },
  {
    id: 3,
    name: "Сергей Волков",
    email: "s.volkov@example.com",
    role: "engineer"
  },
  {
    id: 4,
    name: "Елена Морозова",
    email: "e.morozova@example.com",
    role: "engineer"
  },
  {
    id: 5,
    name: "Алексей Кузнецов",
    email: "a.kuznetsov@example.com",
    role: "manager"
  },
  {
    id: 6,
    name: "Наталья Орлова",
    email: "n.orlova@example.com",
    role: "manager"
  },
  {
    id: 7,
    name: "Владимир Лебедев",
    email: "v.lebedev@example.com",
    role: "manager"
  },
  {
    id: 8,
    name: "Ольга Смирнова",
    email: "o.smirnova@example.com",
    role: "director"
  },
  {
    id: 9,
    name: "Игорь Соколов",
    email: "i.sokolov@example.com",
    role: "director"
  }
];

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "ЖК Новостройка",
    address: "г. Москва, ул. Ленина 10",
    description: "Строительство жилого комплекса на 300 квартир",
    customer: "ООО Строй-Инвест",
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z"
  },
  {
    id: 2,
    name: "Бизнес-центр Альфа",
    address: "г. Санкт-Петербург, Невский пр. 50",
    description: "Строительство бизнес-центра класса А",
    customer: "АО Альфа-Строй",
    startDate: "2024-06-01",
    endDate: "2025-06-30",
    status: "active",
    createdAt: "2024-05-15T10:00:00Z"
  },
  {
    id: 3,
    name: "ТЦ Мегаполис",
    address: "г. Москва, ул. Строителей 25",
    description: "Торгово-развлекательный центр площадью 50000 кв.м",
    customer: "ООО Ритейл-Групп",
    startDate: "2024-03-01",
    endDate: "2025-09-30",
    status: "active",
    createdAt: "2024-02-20T10:00:00Z"
  },
  {
    id: 4,
    name: "Производственный комплекс",
    address: "г. Екатеринбург, ул. Индустриальная 15",
    description: "Многоэтажное производственное здание с офисами",
    customer: "ПАО Индустрия",
    startDate: "2024-09-01",
    endDate: "2025-08-31",
    status: "active",
    createdAt: "2024-08-20T10:00:00Z"
  },
  {
    id: 5,
    name: "Жилой комплекс Премиум",
    address: "г. Санкт-Петербург, Крестовский остров",
    description: "Элитный жилой комплекс с 150 апартаментами",
    customer: "ООО Премиум Девелопмент",
    startDate: "2024-04-10",
    endDate: "2025-11-30",
    status: "paused",
    createdAt: "2024-03-25T10:00:00Z"
  },
  {
    id: 6,
    name: "Офисный центр Гарант",
    address: "г. Москва, Лаврушинский переулок 5",
    description: "Офисный комплекс 6 этажей в центре города",
    customer: "ОАО Гарант",
    startDate: "2023-06-01",
    endDate: "2024-12-31",
    status: "completed",
    createdAt: "2023-05-15T10:00:00Z"
  }
];

export const mockDefects: Defect[] = [
  {
    id: "DF-20251001-0001",
    projectId: 1,
    title: "Трещина в несущей стене",
    description: "Обнаружена вертикальная трещина шириной 2мм в несущей стене подъезда 2. Требуется срочная экспертиза.",
    priority: "critical",
    category: "walls",
    location: "Подъезд 2, этаж 5",
    status: "new",
    assignedTo: null,
    dueDate: "2025-10-15",
    closedAt: null,
    createdBy: "engineer",
    createdAt: "2025-10-01T09:00:00Z"
  },
  {
    id: "DF-20251002-0002",
    projectId: 1,
    title: "Откос окна просел",
    description: "В квартире 15 обнаружен просадок оконного откоса на 5мм.",
    priority: "critical",
    category: "walls",
    location: "Подъезд 1, этаж 3, кв. 15",
    status: "new",
    assignedTo: null,
    dueDate: "2025-10-10",
    closedAt: null,
    createdBy: "engineer",
    createdAt: "2025-10-02T10:30:00Z"
  },
  {
    id: "DF-20251003-0003",
    projectId: 1,
    title: "Протечка кровли",
    description: "Обнаружена протечка в секции Б после сильного дождя. Вода проникает на последний этаж.",
    priority: "critical",
    category: "roof",
    location: "Секция Б, кровля",
    status: "new",
    assignedTo: null,
    dueDate: "2025-10-08",
    closedAt: null,
    createdBy: "engineer",
    createdAt: "2025-10-03T14:30:00Z"
  },
  {
    id: "DF-20251004-0004",
    projectId: 2,
    title: "Неровность напольного покрытия",
    description: "В квартире 52 обнаружена значительная неровность пола в гостиной, перепад высот до 3см.",
    priority: "high",
    category: "finishing",
    location: "Подъезд 3, этаж 7, кв. 52",
    status: "in_progress",
    assignedTo: 2,
    dueDate: "2025-10-25",
    closedAt: null,
    createdBy: "engineer",
    createdAt: "2025-10-04T11:20:00Z"
  },
  {
    id: "DF-20251005-0005",
    projectId: 2,
    title: "Проблемы с вентиляцией",
    description: "На этаже 8 система вентиляции работает с повышенным шумом. Требуется проверка и регулировка.",
    priority: "high",
    category: "engineering",
    location: "Этаж 8, офис 801",
    status: "in_progress",
    assignedTo: 1,
    dueDate: "2025-10-18",
    closedAt: null,
    createdBy: "manager",
    createdAt: "2025-10-05T10:15:00Z"
  },
  {
    id: "DF-20251006-0006",
    projectId: 2,
    title: "Трещина в цоколе",
    description: "На фасаде здания обнаружена диагональная трещина в цокольном этаже.",
    priority: "high",
    category: "walls",
    location: "Фасад, цокольный этаж",
    status: "in_progress",
    assignedTo: 3,
    dueDate: "2025-10-20",
    closedAt: null,
    createdBy: "manager",
    createdAt: "2025-10-06T09:00:00Z"
  },
  {
    id: "DF-20251007-0007",
    projectId: 3,
    title: "Недостаточная гидроизоляция",
    description: "В подвальных помещениях обнаружены признаки сырости из-за недостаточной гидроизоляции стен.",
    priority: "high",
    category: "foundation",
    location: "Подвал, западная стена",
    status: "in_progress",
    assignedTo: 4,
    dueDate: "2025-10-22",
    closedAt: null,
    createdBy: "engineer",
    createdAt: "2025-10-07T08:00:00Z"
  },
  {
    id: "DF-20251008-0008",
    projectId: 3,
    title: "Косметические дефекты окраски",
    description: "В холле главного входа обнаружены следы подтеков краски на стенах.",
    priority: "medium",
    category: "finishing",
    location: "Главный вход, холл",
    status: "on_review",
    assignedTo: 2,
    dueDate: "2025-10-10",
    closedAt: null,
    createdBy: "engineer",
    createdAt: "2025-10-08T13:45:00Z"
  },
  {
    id: "DF-20251009-0009",
    projectId: 3,
    title: "Дефекты штукатурки",
    description: "На потолках офисов обнаружены локальные отслоения штукатурки.",
    priority: "medium",
    category: "finishing",
    location: "Офисы 2-5 этажей",
    status: "on_review",
    assignedTo: 1,
    dueDate: "2025-10-12",
    closedAt: null,
    createdBy: "manager",
    createdAt: "2025-10-09T14:20:00Z"
  },
  {
    id: "DF-20251010-0010",
    projectId: 4,
    title: "Утечка в системе отопления",
    description: "Обнаружена утечка в соединении труб на 3-м этаже.",
    priority: "medium",
    category: "engineering",
    location: "3-й этаж, техническое помещение",
    status: "on_review",
    assignedTo: 3,
    dueDate: "2025-10-14",
    closedAt: null,
    createdBy: "engineer",
    createdAt: "2025-10-10T11:00:00Z"
  },
  {
    id: "DF-20251011-0011",
    projectId: 4,
    title: "Установка окон с браком",
    description: "Несколько окон установлены с нарушением уровня, требуется переустановка.",
    priority: "medium",
    category: "finishing",
    location: "Западный фасад",
    status: "closed",
    assignedTo: 2,
    dueDate: "2025-10-05",
    closedAt: "2025-10-08T16:30:00Z",
    createdBy: "engineer",
    createdAt: "2025-10-02T08:00:00Z"
  },
  {
    id: "DF-20251012-0012",
    projectId: 1,
    title: "Дефект кровельного покрытия",
    description: "Участок кровельного материала поврежден и требует замены.",
    priority: "high",
    category: "roof",
    location: "Секция А, участок 12",
    status: "closed",
    assignedTo: 1,
    dueDate: "2025-09-30",
    closedAt: "2025-10-01T10:00:00Z",
    createdBy: "engineer",
    createdAt: "2025-09-28T15:30:00Z"
  },
  {
    id: "DF-20251013-0013",
    projectId: 2,
    title: "Неправильная подготовка подложки",
    description: "Под плиточное покрытие в ванной комнате заливалась бетонная стяжка без грунтовки.",
    priority: "medium",
    category: "finishing",
    location: "Квартира 42, ванная комната",
    status: "closed",
    assignedTo: 4,
    dueDate: "2025-09-25",
    closedAt: "2025-09-27T14:00:00Z",
    createdBy: "manager",
    createdAt: "2025-09-20T10:00:00Z"
  },
  {
    id: "DF-20251014-0014",
    projectId: 5,
    title: "Проблемы с дверными проёмами",
    description: "Дверные проёмы не соответствуют стандартным размерам, требуется подгонка.",
    priority: "low",
    category: "finishing",
    location: "Этажи 1-3",
    status: "closed",
    assignedTo: 3,
    dueDate: "2025-09-20",
    closedAt: "2025-09-22T11:30:00Z",
    createdBy: "engineer",
    createdAt: "2025-09-18T09:00:00Z"
  },
  {
    id: "DF-20251015-0015",
    projectId: 5,
    title: "Недостатки электропроводки",
    description: "Несоответствие расположения розеток нормативным требованиям.",
    priority: "medium",
    category: "engineering",
    location: "Кухни и ванные комнаты",
    status: "closed",
    assignedTo: 1,
    dueDate: "2025-09-15",
    closedAt: "2025-09-17T15:45:00Z",
    createdBy: "manager",
    createdAt: "2025-09-12T10:00:00Z"
  },
  {
    id: "DF-20251016-0016",
    projectId: 6,
    title: "Усадка фундамента",
    description: "Обнаружена неравномерная усадка фундамента, требуется мониторинг.",
    priority: "low",
    category: "foundation",
    location: "Западный край здания",
    status: "cancelled",
    assignedTo: null,
    dueDate: "2024-11-30",
    closedAt: null,
    cancelReason: "Результаты мониторинга показали норму",
    createdBy: "engineer",
    createdAt: "2024-11-01T08:00:00Z"
  },
  {
    id: "DF-20251017-0017",
    projectId: 6,
    title: "Требуется документация по материалам",
    description: "Отсутствуют сертификаты качества на некоторые использованные материалы.",
    priority: "low",
    category: "other",
    location: "Архив проекта",
    status: "cancelled",
    assignedTo: null,
    dueDate: "2024-12-15",
    closedAt: null,
    cancelReason: "Документы найдены и предоставлены",
    createdBy: "manager",
    createdAt: "2024-11-10T11:00:00Z"
  },
  {
    id: "DF-20251018-0018",
    projectId: 1,
    title: "Отклонение размеров в несущей конструкции",
    description: "Обнаружено отклонение в размерах несущей конструкции на 15мм.",
    priority: "critical",
    category: "walls",
    location: "Подъезд 4",
    status: "in_progress",
    assignedTo: 4,
    dueDate: "2025-10-09",
    closedAt: null,
    createdBy: "engineer",
    createdAt: "2025-10-08T16:45:00Z"
  },
  {
    id: "DF-20251019-0019",
    projectId: 3,
    title: "Коррозия металлических элементов",
    description: "На фасаде обнаружены признаки коррозии металлических кронштейнов.",
    priority: "high",
    category: "other",
    location: "Фасад, все этажи",
    status: "in_progress",
    assignedTo: 2,
    dueDate: "2025-10-11",
    closedAt: null,
    createdBy: "engineer",
    createdAt: "2025-10-08T15:20:00Z"
  },
  {
    id: "DF-20251020-0020",
    projectId: 4,
    title: "Нарушение герметичности швов",
    description: "В местах соединения панелей обнаружены нарушения герметичности.",
    priority: "medium",
    category: "engineering",
    location: "Внешние швы",
    status: "in_progress",
    assignedTo: 1,
    dueDate: "2025-10-16",
    closedAt: null,
    createdBy: "manager",
    createdAt: "2025-10-09T12:00:00Z"
  }
];

export const mockComments: Comment[] = [
  {
    id: 1,
    defectId: "DF-20251001-0001",
    text: "Требуется срочная консультация специалиста. Невозможно игнорировать критическую трещину.",
    author: "engineer",
    createdAt: "2025-10-01T10:30:00Z"
  },
  {
    id: 2,
    defectId: "DF-20251001-0001",
    text: "Согласен. Это требует немедленного внимания. Назначу опытного инженера.",
    author: "manager",
    createdAt: "2025-10-01T11:15:00Z"
  },
  {
    id: 3,
    defectId: "DF-20251002-0002",
    text: "Предварительная оценка показывает необходимость монолитной подливки.",
    author: "engineer",
    createdAt: "2025-10-02T11:00:00Z"
  },
  {
    id: 4,
    defectId: "DF-20251003-0003",
    text: "Начал работу по устранению протечки. Обнаружил поврежденный участок кровельного покрытия.",
    author: "engineer",
    createdAt: "2025-10-04T09:00:00Z"
  },
  {
    id: 5,
    defectId: "DF-20251003-0003",
    text: "Пожалуйста, ускорьте работы. Прогнозируют дожди на следующей неделе.",
    author: "manager",
    createdAt: "2025-10-04T15:30:00Z"
  },
  {
    id: 6,
    defectId: "DF-20251003-0003",
    text: "Уже мобилизовал доп. бригаду. Работы должны закончиться в течение 2 дней.",
    author: "engineer",
    createdAt: "2025-10-05T08:00:00Z"
  },
  {
    id: 7,
    defectId: "DF-20251004-0004",
    text: "Проведено первоначальное выравнивание. Необходимо дополнительное шпатлевание.",
    author: "engineer",
    createdAt: "2025-10-05T14:00:00Z"
  },
  {
    id: 8,
    defectId: "DF-20251005-0005",
    text: "Диагностика завершена. Проблема в забитом фильтре вентиляции.",
    author: "engineer",
    createdAt: "2025-10-06T10:00:00Z"
  },
  {
    id: 9,
    defectId: "DF-20251005-0005",
    text: "Когда будет очищена вентиляция? Это срочно нужно для сдачи офиса.",
    author: "manager",
    createdAt: "2025-10-06T14:30:00Z"
  },
  {
    id: 10,
    defectId: "DF-20251006-0006",
    text: "Планирую начать работы завтра. Требуется подмост и страховка.",
    author: "engineer",
    createdAt: "2025-10-07T16:00:00Z"
  },
  {
    id: 11,
    defectId: "DF-20251007-0007",
    text: "Обнаружена проблема с дренажной системой. Требуется комплексное решение.",
    author: "engineer",
    createdAt: "2025-10-08T09:00:00Z"
  },
  {
    id: 12,
    defectId: "DF-20251008-0008",
    text: "Косметические работы начнутся после высыхания шпатлевки.",
    author: "engineer",
    createdAt: "2025-10-09T10:00:00Z"
  },
  {
    id: 13,
    defectId: "DF-20251008-0008",
    text: "Основание подготовлено. Готов к финальной проверке.",
    author: "engineer",
    createdAt: "2025-10-09T15:00:00Z"
  },
  {
    id: 14,
    defectId: "DF-20251009-0009",
    text: "Начал замену участков штукатурки. Работа выполняется по графику.",
    author: "engineer",
    createdAt: "2025-10-10T08:30:00Z"
  },
  {
    id: 15,
    defectId: "DF-20251010-0010",
    text: "Утечка локализована. Требуется замена соединительной части трубопровода.",
    author: "engineer",
    createdAt: "2025-10-11T09:00:00Z"
  },
  {
    id: 16,
    defectId: "DF-20251010-0010",
    text: "Есть запасные части? Сроки критичны для запуска отопления.",
    author: "manager",
    createdAt: "2025-10-11T13:00:00Z"
  },
  {
    id: 17,
    defectId: "DF-20251011-0011",
    text: "Окна переустановлены. Проведена проверка соответствия уровню.",
    author: "engineer",
    createdAt: "2025-10-08T14:00:00Z"
  },
  {
    id: 18,
    defectId: "DF-20251011-0011",
    text: "Спасибо за качественную работу. Окна идеально установлены.",
    author: "manager",
    createdAt: "2025-10-08T17:00:00Z"
  },
  {
    id: 19,
    defectId: "DF-20251012-0012",
    text: "Кровельный материал заменен на всех повреждённых участках.",
    author: "engineer",
    createdAt: "2025-10-01T12:00:00Z"
  },
  {
    id: 20,
    defectId: "DF-20251012-0012",
    text: "Отличная работа! Дефект полностью устранен.",
    author: "director",
    createdAt: "2025-10-01T15:00:00Z"
  },
  {
    id: 21,
    defectId: "DF-20251013-0013",
    text: "Выполнена предварительная грунтовка. Плиточные работы начнутся завтра.",
    author: "engineer",
    createdAt: "2025-09-25T14:00:00Z"
  },
  {
    id: 22,
    defectId: "DF-20251013-0013",
    text: "Плиточные работы завершены. Покрытие отличного качества.",
    author: "engineer",
    createdAt: "2025-09-27T13:00:00Z"
  },
  {
    id: 23,
    defectId: "DF-20251014-0014",
    text: "Произведена подгонка всех дверных проёмов по стандартам.",
    author: "engineer",
    createdAt: "2025-09-21T10:00:00Z"
  },
  {
    id: 24,
    defectId: "DF-20251015-0015",
    text: "Переразведена электросхема. Все розетки теперь соответствуют нормативам.",
    author: "engineer",
    createdAt: "2025-09-16T11:00:00Z"
  },
  {
    id: 25,
    defectId: "DF-20251015-0015",
    text: "Электроэнергия предоставлена своевременно. Качество работы отличное.",
    author: "manager",
    createdAt: "2025-09-17T14:00:00Z"
  },
  {
    id: 26,
    defectId: "DF-20251016-0016",
    text: "Установлены маячки мониторинга. Начало регулярных измерений.",
    author: "engineer",
    createdAt: "2024-11-05T10:00:00Z"
  },
  {
    id: 27,
    defectId: "DF-20251016-0016",
    text: "Первые результаты мониторинга показали стабилизацию. Критерий норма достигнут.",
    author: "engineer",
    createdAt: "2024-11-28T15:00:00Z"
  },
  {
    id: 28,
    defectId: "DF-20251018-0018",
    text: "Проведены измерения. Требуется перепроверка геометрии конструкции.",
    author: "engineer",
    createdAt: "2025-10-08T17:30:00Z"
  },
  {
    id: 29,
    defectId: "DF-20251018-0018",
    text: "Это критично. Нужно привлечь специалистов по конструкциям.",
    author: "director",
    createdAt: "2025-10-08T18:00:00Z"
  },
  {
    id: 30,
    defectId: "DF-20251019-0019",
    text: "Обнаружена коррозия 3 уровня. Требуется механическая обработка и защитное покрытие.",
    author: "engineer",
    createdAt: "2025-10-09T10:00:00Z"
  },
  {
    id: 31,
    defectId: "DF-20251019-0019",
    text: "Начнём работы после согласования бюджета. Когда возможно?",
    author: "manager",
    createdAt: "2025-10-09T14:00:00Z"
  },
  {
    id: 32,
    defectId: "DF-20251020-0020",
    text: "Герметик нанесен на все швы. Ожидание высыхания 48 часов.",
    author: "engineer",
    createdAt: "2025-10-10T10:00:00Z"
  },
  {
    id: 33,
    defectId: "DF-20251004-0004",
    text: "Второй этап выравнивания начнётся после прима контрольной проверки.",
    author: "engineer",
    createdAt: "2025-10-06T15:00:00Z"
  },
  {
    id: 34,
    defectId: "DF-20251004-0004",
    text: "Необходимо завершить в течение недели для сдачи объекта.",
    author: "manager",
    createdAt: "2025-10-07T09:00:00Z"
  },
  {
    id: 35,
    defectId: "DF-20251006-0006",
    text: "Трещина очищена и загрунтована. Следующий этап - инъекция расширяющегося раствора.",
    author: "engineer",
    createdAt: "2025-10-08T10:30:00Z"
  },
  {
    id: 36,
    defectId: "DF-20251009-0009",
    text: "Используем специальную шпатлёвку для потолков. Работы идут согласно плану.",
    author: "engineer",
    createdAt: "2025-10-11T09:00:00Z"
  }
];

export const mockHistory: HistoryEntry[] = [
  {
    id: 1,
    defectId: "DF-20251001-0001",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-01T09:00:00Z"
  },
  {
    id: 2,
    defectId: "DF-20251002-0002",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-02T10:30:00Z"
  },
  {
    id: 3,
    defectId: "DF-20251003-0003",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-03T14:30:00Z"
  },
  {
    id: 4,
    defectId: "DF-20251004-0004",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-04T11:20:00Z"
  },
  {
    id: 5,
    defectId: "DF-20251004-0004",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 2, status: "in_progress" },
    timestamp: "2025-10-04T13:00:00Z"
  },
  {
    id: 6,
    defectId: "DF-20251005-0005",
    action: "create",
    author: "manager",
    changes: { status: "new" },
    timestamp: "2025-10-05T10:15:00Z"
  },
  {
    id: 7,
    defectId: "DF-20251005-0005",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 1, status: "in_progress" },
    timestamp: "2025-10-05T10:30:00Z"
  },
  {
    id: 8,
    defectId: "DF-20251006-0006",
    action: "create",
    author: "manager",
    changes: { status: "new" },
    timestamp: "2025-10-06T09:00:00Z"
  },
  {
    id: 9,
    defectId: "DF-20251006-0006",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 3, status: "in_progress" },
    timestamp: "2025-10-06T09:30:00Z"
  },
  {
    id: 10,
    defectId: "DF-20251007-0007",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-07T08:00:00Z"
  },
  {
    id: 11,
    defectId: "DF-20251007-0007",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 4, status: "in_progress" },
    timestamp: "2025-10-07T10:00:00Z"
  },
  {
    id: 12,
    defectId: "DF-20251008-0008",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-08T13:45:00Z"
  },
  {
    id: 13,
    defectId: "DF-20251008-0008",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 2, status: "in_progress" },
    timestamp: "2025-10-08T14:15:00Z"
  },
  {
    id: 14,
    defectId: "DF-20251008-0008",
    action: "status_change",
    author: "engineer",
    changes: { status: "on_review" },
    timestamp: "2025-10-09T15:00:00Z"
  },
  {
    id: 15,
    defectId: "DF-20251009-0009",
    action: "create",
    author: "manager",
    changes: { status: "new" },
    timestamp: "2025-10-09T14:20:00Z"
  },
  {
    id: 16,
    defectId: "DF-20251009-0009",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 1, status: "in_progress" },
    timestamp: "2025-10-09T14:45:00Z"
  },
  {
    id: 17,
    defectId: "DF-20251009-0009",
    action: "status_change",
    author: "engineer",
    changes: { status: "on_review" },
    timestamp: "2025-10-11T09:00:00Z"
  },
  {
    id: 18,
    defectId: "DF-20251010-0010",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-10T11:00:00Z"
  },
  {
    id: 19,
    defectId: "DF-20251010-0010",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 3, status: "in_progress" },
    timestamp: "2025-10-10T12:00:00Z"
  },
  {
    id: 20,
    defectId: "DF-20251010-0010",
    action: "status_change",
    author: "engineer",
    changes: { status: "on_review" },
    timestamp: "2025-10-11T10:00:00Z"
  },
  {
    id: 21,
    defectId: "DF-20251011-0011",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-02T08:00:00Z"
  },
  {
    id: 22,
    defectId: "DF-20251011-0011",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 2, status: "in_progress" },
    timestamp: "2025-10-02T09:00:00Z"
  },
  {
    id: 23,
    defectId: "DF-20251011-0011",
    action: "status_change",
    author: "engineer",
    changes: { status: "on_review" },
    timestamp: "2025-10-08T15:00:00Z"
  },
  {
    id: 24,
    defectId: "DF-20251011-0011",
    action: "close",
    author: "manager",
    changes: { status: "closed", closedAt: "2025-10-08T16:30:00Z" },
    timestamp: "2025-10-08T16:30:00Z"
  },
  {
    id: 25,
    defectId: "DF-20251012-0012",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-09-28T15:30:00Z"
  },
  {
    id: 26,
    defectId: "DF-20251012-0012",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 1, status: "in_progress" },
    timestamp: "2025-09-28T16:00:00Z"
  },
  {
    id: 27,
    defectId: "DF-20251012-0012",
    action: "status_change",
    author: "engineer",
    changes: { status: "on_review" },
    timestamp: "2025-10-01T09:00:00Z"
  },
  {
    id: 28,
    defectId: "DF-20251012-0012",
    action: "close",
    author: "manager",
    changes: { status: "closed", closedAt: "2025-10-01T10:00:00Z" },
    timestamp: "2025-10-01T10:00:00Z"
  },
  {
    id: 29,
    defectId: "DF-20251013-0013",
    action: "create",
    author: "manager",
    changes: { status: "new" },
    timestamp: "2025-09-20T10:00:00Z"
  },
  {
    id: 30,
    defectId: "DF-20251013-0013",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 4, status: "in_progress" },
    timestamp: "2025-09-20T11:00:00Z"
  },
  {
    id: 31,
    defectId: "DF-20251013-0013",
    action: "status_change",
    author: "engineer",
    changes: { status: "on_review" },
    timestamp: "2025-09-27T12:00:00Z"
  },
  {
    id: 32,
    defectId: "DF-20251013-0013",
    action: "close",
    author: "manager",
    changes: { status: "closed", closedAt: "2025-09-27T14:00:00Z" },
    timestamp: "2025-09-27T14:00:00Z"
  },
  {
    id: 33,
    defectId: "DF-20251014-0014",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-09-18T09:00:00Z"
  },
  {
    id: 34,
    defectId: "DF-20251014-0014",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 3, status: "in_progress" },
    timestamp: "2025-09-18T10:00:00Z"
  },
  {
    id: 35,
    defectId: "DF-20251014-0014",
    action: "status_change",
    author: "engineer",
    changes: { status: "on_review" },
    timestamp: "2025-09-22T10:00:00Z"
  },
  {
    id: 36,
    defectId: "DF-20251014-0014",
    action: "close",
    author: "manager",
    changes: { status: "closed", closedAt: "2025-09-22T11:30:00Z" },
    timestamp: "2025-09-22T11:30:00Z"
  },
  {
    id: 37,
    defectId: "DF-20251015-0015",
    action: "create",
    author: "manager",
    changes: { status: "new" },
    timestamp: "2025-09-12T10:00:00Z"
  },
  {
    id: 38,
    defectId: "DF-20251015-0015",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 1, status: "in_progress" },
    timestamp: "2025-09-12T11:00:00Z"
  },
  {
    id: 39,
    defectId: "DF-20251015-0015",
    action: "status_change",
    author: "engineer",
    changes: { status: "on_review" },
    timestamp: "2025-09-17T14:00:00Z"
  },
  {
    id: 40,
    defectId: "DF-20251015-0015",
    action: "close",
    author: "manager",
    changes: { status: "closed", closedAt: "2025-09-17T15:45:00Z" },
    timestamp: "2025-09-17T15:45:00Z"
  },
  {
    id: 41,
    defectId: "DF-20251016-0016",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2024-11-01T08:00:00Z"
  },
  {
    id: 42,
    defectId: "DF-20251016-0016",
    action: "status_change",
    author: "manager",
    changes: { status: "in_progress" },
    timestamp: "2024-11-02T09:00:00Z"
  },
  {
    id: 43,
    defectId: "DF-20251016-0016",
    action: "cancel",
    author: "director",
    changes: { status: "cancelled", cancelReason: "Результаты мониторинга показали норму" },
    timestamp: "2024-11-28T16:00:00Z"
  },
  {
    id: 44,
    defectId: "DF-20251017-0017",
    action: "create",
    author: "manager",
    changes: { status: "new" },
    timestamp: "2024-11-10T11:00:00Z"
  },
  {
    id: 45,
    defectId: "DF-20251017-0017",
    action: "cancel",
    author: "director",
    changes: { status: "cancelled", cancelReason: "Документы найдены и предоставлены" },
    timestamp: "2024-11-20T10:00:00Z"
  },
  {
    id: 46,
    defectId: "DF-20251018-0018",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-08T16:45:00Z"
  },
  {
    id: 47,
    defectId: "DF-20251018-0018",
    action: "assign",
    author: "director",
    changes: { assignedTo: 4, status: "in_progress" },
    timestamp: "2025-10-08T17:00:00Z"
  },
  {
    id: 48,
    defectId: "DF-20251019-0019",
    action: "create",
    author: "engineer",
    changes: { status: "new" },
    timestamp: "2025-10-08T15:20:00Z"
  },
  {
    id: 49,
    defectId: "DF-20251019-0019",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 2, status: "in_progress" },
    timestamp: "2025-10-08T16:00:00Z"
  },
  {
    id: 50,
    defectId: "DF-20251020-0020",
    action: "create",
    author: "manager",
    changes: { status: "new" },
    timestamp: "2025-10-09T12:00:00Z"
  },
  {
    id: 51,
    defectId: "DF-20251020-0020",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 1, status: "in_progress" },
    timestamp: "2025-10-09T13:00:00Z"
  },
  {
    id: 52,
    defectId: "DF-20251003-0003",
    action: "assign",
    author: "manager",
    changes: { assignedTo: 1, status: "in_progress" },
    timestamp: "2025-10-04T09:00:00Z"
  },
  {
    id: 53,
    defectId: "DF-20251004-0004",
    action: "status_change",
    author: "engineer",
    changes: { status: "on_review" },
    timestamp: "2025-10-09T14:00:00Z"
  }
];

export const getInitialMockData = (): AppState => ({
  currentRole: null,
  projects: mockProjects,
  defects: mockDefects,
  comments: mockComments,
  history: mockHistory,
});

export const getUserById = (id: number): User | undefined =>
  mockUsers.find(user => user.id === id);

export const getProjectById = (id: number): Project | undefined =>
  mockProjects.find(project => project.id === id);
