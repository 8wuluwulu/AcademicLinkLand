import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Send, 
  Calendar, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Sliders, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  CreditCard,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  X,
  CheckCircle
} from 'lucide-react';

export default function LandingPage({ onEnterDashboard }) {
  // Состояние для калькулятора сэкономленного времени
  const [studentCount, setStudentCount] = useState(15);
  const hoursSaved = Math.round(studentCount * 0.5 * 10) / 10;

  // Состояние для FAQ аккордеона
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Локальное состояние для интерактива в макете Telegram-бота
  const [mockBotStatus, setMockBotStatus] = useState('pending'); // 'pending', 'confirmed', 'rescheduled', 'cancelled'
  const [toasts, setToasts] = useState([]);

  // Ссылка на Telegram-бота в качестве единой точки входа (Всего 2 кнопки на странице)
  const botLink = "https://t.me/AcademicLinkBot";

  // Автоматический поиск и отслеживание элементов для анимации прокрутки
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-element');
    elementsToReveal.forEach((element) => observer.observe(element));

    return () => {
      elementsToReveal.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Функция для плавной прокрутки к элементам
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Показ интерактивного тоста при клике на кнопки макета
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleMockConfirm = () => {
    setMockBotStatus('confirmed');
    showToast("Занятие успешно подтверждено! Автоматически отправлено уведомление родителю.");
  };

  const handleMockReschedule = () => {
    setMockBotStatus('rescheduled');
    showToast("Запрос на перенос отправлен ученику. Ожидайте подтверждения.");
  };

  const handleMockCancel = () => {
    setMockBotStatus('cancelled');
    showToast("Занятие отклонено. Бот уведомил ученика об отмене.");
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-900 font-sans overflow-x-hidden relative selection:bg-blue-600/10 selection:text-blue-600 pb-16">
      
      {/* Тосты для интерактивных кнопок макета */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className="p-4 rounded-xl border border-blue-200 bg-white shadow-xl flex items-center gap-3 w-80 pointer-events-auto animate-fade-in-up"
          >
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <p className="text-sm font-semibold text-slate-800 leading-normal">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Оверлей шума для создания эффекта премиальной бумаги */}
      <div className="noise-overlay" />

      {/* Декоративные фоновые свечения */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-100/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[850px] right-1/4 w-[600px] h-[600px] bg-sky-100/25 rounded-full blur-[125px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[900px] h-[900px] bg-slate-100/50 rounded-full blur-[150px] pointer-events-none" />

      {/* Фоновая сетка для ощущения структуры */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a03_1px,transparent_1px),linear-gradient(to_bottom,#0f172a03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* 1. Header (Навигационная панель) */}
      <header id="hero" className="sticky top-0 z-40 w-full h-16 border-b border-slate-200/80 backdrop-blur-md bg-white/70">
        <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/10">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              AcademicLink
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#problems" 
              onClick={(e) => handleScrollToSection(e, 'problems')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
            >
              Проблемы
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleScrollToSection(e, 'how-it-works')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
            >
              Как работает
            </a>
            <a 
              href="#features" 
              onClick={(e) => handleScrollToSection(e, 'features')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
            >
              Возможности
            </a>
            <a 
              href="#calculator" 
              onClick={(e) => handleScrollToSection(e, 'calculator')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
            >
              Калькулятор
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleScrollToSection(e, 'pricing')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
            >
              Тарифы
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Кнопка плавно скроллит к блоку тарифов */}
            <a 
              href="#pricing"
              onClick={(e) => handleScrollToSection(e, 'pricing')}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-organic hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Send className="w-3.5 h-3.5 fill-white text-blue-600" />
              <span>Попробовать бесплатно</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                <ArrowRight className="w-3 h-3 text-white" strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Первый экран) */}
      <section className="relative max-w-[1400px] mx-auto px-6 pt-20 md:pt-28 pb-20 flex flex-col items-center text-center reveal-element">
        {/* Метка с анимацией пульсации */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-blue-50 border border-blue-100 text-xs uppercase tracking-[0.2em] font-bold text-blue-600 mb-6 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600 animate-status-pulse" />
          <span>Умный ассистент репетитора</span>
        </div>

        {/* Главный заголовок H1 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900 max-w-5xl font-display">
          Освободите до <span className="text-blue-600">5 часов в неделю</span> для преподавания, а не администрирования
        </h1>

        {/* Подзаголовок с увеличенным размером шрифта */}
        <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
          AcademicLink — это умная CRM-система для репетиторов в Telegram. Полная автоматическая синхронизация с вашим Google Календарем, мгновенные напоминания ученикам и родителям, а также запись на свободные уроки без лишней переписки.
        </p>

        {/* Кнопка 1 (Hero CTA): Открывает Telegram-бота в новой вкладке */}
        <div className="mt-10">
          <a 
            href={botLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-bold text-white transition-organic hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] justify-center"
          >
            <Send className="w-4 h-4 fill-white text-blue-600" />
            <span>Начать бесплатно в Telegram</span>
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
              <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
            </span>
          </a>
        </div>

        {/* Статичный side-by-side макет без демо-кабинета (Двойной ободок) */}
        <div className="mt-20 w-full max-w-5xl rounded-[2rem] bg-white p-2.5 border border-slate-200/80 shadow-2xl shadow-slate-200/30 reveal-element delay-100">
          <div className="rounded-[calc(2rem-0.625rem)] bg-slate-50/70 border border-slate-100 overflow-hidden p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            {/* Макет Telegram-бота для репетитора */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-blue-300 transition-organic glow-pulse">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <Send className="w-4 h-4 text-white fill-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">AcademicLink Бот</h3>
                      <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-status-pulse" />
                        системный статус: активно
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 font-mono">Telegram Bot</span>
                </div>

                <div className="space-y-4">
                  {mockBotStatus === 'pending' && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 font-mono leading-relaxed">
                      <MessageSquare className="inline w-4 h-4 text-blue-600 mr-1.5" /> <strong>Новая запись на занятие!</strong> <br />
                      <Users className="inline w-3.5 h-3.5 text-slate-400 mr-1.5" /> Ученик: <strong>Александр Волков</strong> <br />
                      <Sparkles className="inline w-3.5 h-3.5 text-slate-400 mr-1.5" /> Предмет: <strong>Физика (Подготовка к ЕГЭ)</strong> <br />
                      <Calendar className="inline w-3.5 h-3.5 text-slate-400 mr-1.5" /> Время: <strong>Четверг, 15:00 - 16:30</strong> <br />
                      <ShieldCheck className="inline w-3.5 h-3.5 text-emerald-500 mr-1.5" /> Слот свободен в вашем Google Календаре.
                    </div>
                  )}
                  {mockBotStatus === 'confirmed' && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-800 font-mono leading-relaxed">
                      <CheckCircle className="inline w-4 h-4 text-emerald-600 mr-1.5" /> <strong>Занятие успешно подтверждено!</strong> <br />
                      Бот автоматически добавил событие в ваш Google Календарь и выслал уведомление родителю ученика.
                    </div>
                  )}
                  {mockBotStatus === 'rescheduled' && (
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-sm text-orange-850 font-mono leading-relaxed">
                      <Clock className="inline w-4 h-4 text-orange-600 mr-1.5" /> <strong>Запрос на перенос отправлен.</strong> <br />
                      Мы отправили родителю сообщение со свободными окнами для выбора нового времени занятия.
                    </div>
                  )}
                  {mockBotStatus === 'cancelled' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-150 text-sm text-red-800 font-mono leading-relaxed">
                      <AlertCircle className="inline w-4 h-4 text-red-650 mr-1.5" /> <strong>Занятие отклонено.</strong> <br />
                      Слот освобожден в веб-приложении. Бот отправил родителю сообщение об отмене урока.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button 
                      type="button" 
                      onClick={handleMockConfirm} 
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${mockBotStatus === 'confirmed' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'}`}
                    >
                      Подтвердить
                    </button>
                    <button 
                      type="button" 
                      onClick={handleMockReschedule} 
                      className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold text-center border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Перенести
                    </button>
                    <button 
                      type="button" 
                      onClick={handleMockCancel} 
                      className="px-4 py-2.5 rounded-xl bg-slate-50 text-slate-400 text-xs font-bold text-center border border-slate-200 hover:text-red-500 hover:bg-red-50/20 transition-colors cursor-pointer"
                    >
                      Отклонить
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 mt-8 flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>Интерфейс бота репетитора</span>
                <span>academiclink_bot</span>
              </div>
            </div>

            {/* Макет WebApp для записи учеников */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-blue-300 transition-organic">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-800">Выбор свободного слота</h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 font-mono">Преподаватель: С. В. Волкова</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Выбранное направление</span>
                      <span className="font-bold text-slate-800">Физика (Подготовка к ЕГЭ, 90 мин)</span>
                    </div>
                    <span className="font-extrabold text-blue-600">1 800 ₽</span>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold mb-2">Доступные слоты на завтра</label>
                    <div className="grid grid-cols-2 gap-2.5 font-mono">
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-300 text-center text-xs font-bold text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors">
                        15:00 - 16:30
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs text-slate-600 hover:border-slate-300 transition-colors cursor-pointer">
                        17:00 - 18:30
                      </div>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => showToast("Демо-запись: Для реальной записи ученику нужно использовать вашу ссылку.")}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold text-center shadow-lg shadow-emerald-500/10 transition-colors cursor-pointer"
                  >
                    Забронировать это время
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-8 flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>Ученик переходит по ссылке</span>
                <span>Мобильный WebApp</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Блок проблем (Pain Points Grid) */}
      <section id="problems" className="max-w-[1400px] mx-auto px-6 py-28 border-t border-slate-200/60 text-center reveal-element">
        <span className="text-xs text-blue-600 uppercase tracking-[0.2em] font-bold block mb-3">Главные проблемы</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-2xl mx-auto leading-tight font-display mb-16">
          Рутина, которая отвлекает вас от главного процесса — обучения
        </h2>

        {/* Сетка проблем из 4 интерактивных карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {/* Card 1 */}
          <div className="rounded-[2rem] bg-white p-1.5 border border-slate-200/85 hover:border-blue-200 card-interactive flex flex-col">
            <div className="rounded-[calc(2rem-0.375rem)] bg-slate-50/50 p-7 flex-1 flex flex-col justify-between border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">«Какое время свободно?»</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  Бесконечные переписки с родителями в мессенджерах для согласования очередного занятия. Вы отправляете списки свободных окон, которые меняются каждую минуту.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[2rem] bg-white p-1.5 border border-slate-200/85 hover:border-blue-200 card-interactive flex flex-col">
            <div className="rounded-[calc(2rem-0.375rem)] bg-slate-50/50 p-7 flex-1 flex flex-col justify-between border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">«Ой, я совсем забыл...»</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  Отмены занятий в самый последний момент и прогулы из-за забывчивости учеников. Вы теряете деньги и время, которое могли бы уделить другим.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-[2rem] bg-white p-1.5 border border-slate-200/85 hover:border-blue-200 card-interactive flex flex-col">
            <div className="rounded-[calc(2rem-0.375rem)] bg-slate-50/50 p-7 flex-1 flex flex-col justify-between border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">«А когда у меня оплата?»</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  Постоянная путаница со счетами, остатком оплаченных часов и переводами на карту. Неудобно напоминать родителям учеников о необходимости перевода средств.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-[2rem] bg-white p-1.5 border border-slate-200/85 hover:border-blue-200 card-interactive flex flex-col">
            <div className="rounded-[calc(2rem-0.375rem)] bg-slate-50/50 p-7 flex-1 flex flex-col justify-between border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">«Где ссылка на урок?»</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  Каждый раз приходится искать актуальные ссылки на конференции Zoom, Skype или Google Meet в архивах чатов. Ученики задерживаются, пытаясь их найти.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Как это работает (How It Works) */}
      <section id="how-it-works" className="max-w-[1400px] mx-auto px-6 py-28 border-t border-slate-200/60 text-center reveal-element">
        <span className="text-xs text-blue-600 uppercase tracking-[0.2em] font-bold block mb-3">Простая интеграция</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-xl mx-auto leading-tight font-display mb-16">
          Три простых шага к полному порядку
        </h2>

        {/* 3 шага */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-xl font-extrabold font-mono shadow-sm">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900">Запуск Telegram-бота</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Запустите бота AcademicLink в Telegram. Укажите ваши предметы, стоимость занятий и реквизиты СБП для автоматического создания платежных ссылок.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-xl font-extrabold font-mono shadow-sm">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900">Импорт расписания Google</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Подключите ваш рабочий Google Календарь за пару кликов. Бот автоматически заблокирует слоты, занятые вашими личными делами, чтобы исключить накладки в расписании.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-xl font-extrabold font-mono shadow-sm">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900">Ссылка для бронирования</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Отправьте ученикам вашу персональную ссылку. Они увидят доступное время и забронируют уроки самостоятельно, а вы получите мгновенное уведомление в боте.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Features Showroom (Ключевые возможности - Bento Grid) */}
      <section id="features" className="max-w-[1400px] mx-auto px-6 py-28 border-t border-slate-200/60 text-center reveal-element">
        <span className="text-xs text-blue-600 uppercase tracking-[0.2em] font-bold block mb-3">Возможности платформы</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-xl mx-auto leading-tight font-display mb-16">
          Всё необходимое для эффективной работы
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Cell 1: Google Calendar Integration (2/3 width) */}
          <div className="md:col-span-2 rounded-[2rem] bg-white p-1.5 border border-slate-200/80 shadow-sm flex flex-col hover:border-blue-200 card-interactive">
            <div className="rounded-[calc(2rem-0.375rem)] bg-slate-50/50 p-8 flex-1 flex flex-col justify-between border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Автоматическая синхронизация с Google Календарем</h3>
                <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                  Любой забронированный урок мгновенно отобразится в вашем Google Календаре с указанием имени ученика и темы. При переносе или отмене занятия в календаре бот мгновенно изменит информацию в системе и уведомит вторую сторону.
                </p>
              </div>

              <div className="mt-8 p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Синхронизация Google Calendar API
                </span>
                <span className="text-blue-600 font-semibold">Двусторонний обмен данными</span>
              </div>
            </div>
          </div>

          {/* Cell 2: Automated Telegram reminders */}
          <div className="rounded-[2rem] bg-white p-1.5 border border-slate-200/80 shadow-sm flex flex-col hover:border-blue-200 card-interactive">
            <div className="rounded-[calc(2rem-0.375rem)] bg-slate-50/50 p-8 flex-1 flex flex-col justify-between border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Автоматические напоминания ученикам</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  Система автоматически за два часа до занятия пришлет напоминание в Telegram со ссылкой на конференцию. Родителю нужно просто нажать кнопку подтверждения присутствия.
                </p>
              </div>

              <div className="mt-8 space-y-2 font-mono">
                <div className="p-3 rounded-xl bg-white border border-slate-150 text-xs text-slate-500 flex justify-between items-center">
                  <span>Статус отправки:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    Успешно
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-150 text-xs text-slate-500 flex justify-between items-center">
                  <span>Ответ ученика:</span>
                  <span className="text-blue-600 font-bold">Буду на уроке</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cell 3: Smart Rescheduling */}
          <div className="rounded-[2rem] bg-white p-1.5 border border-slate-200/80 shadow-sm flex flex-col hover:border-blue-200 card-interactive">
            <div className="rounded-[calc(2rem-0.375rem)] bg-slate-50/50 p-8 flex-1 flex flex-col justify-between border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                  <Sliders className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Простые переносы без переписок</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  Если ученик просит перенести урок, бот автоматически предложит ему другие доступные окна в календаре. Перенос расписания осуществится только после вашего согласия в Telegram-боте.
                </p>
              </div>

              <div className="mt-8 p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 animate-status-pulse" />
                <span className="text-xs text-slate-500 font-semibold leading-relaxed">Смена слота: Среда 14:00 → Пятница 17:00</span>
              </div>
            </div>
          </div>

          {/* Cell 4: SBP Payments (2/3 width) */}
          <div className="md:col-span-2 rounded-[2rem] bg-white p-1.5 border border-slate-200/80 shadow-sm flex flex-col hover:border-blue-200 card-interactive">
            <div className="rounded-[calc(2rem-0.375rem)] bg-slate-50/50 p-8 flex-1 flex flex-col justify-between border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Умный контроль оплат через СБП</h3>
                <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                  Система ведет точный учет платежей. Сразу после окончания урока бот формирует уникальный QR-код на ваши платежные реквизиты СБП для родителя. Забудьте о необходимости проверять и сверять чеки.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono font-bold uppercase">СБП Интеграция</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full animate-status-pulse">Автоматическая проверка статуса оплаты</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">Ожидает оплаты: <strong className="text-slate-800 font-bold">Физика (1 800 ₽)</strong></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Калькулятор сэкономленного времени */}
      <section id="calculator" className="max-w-[1400px] mx-auto px-6 py-28 border-t border-slate-200/60 text-center reveal-element">
        <span className="text-xs text-blue-600 uppercase tracking-[0.2em] font-bold block mb-3">Оценка эффективности</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-xl mx-auto leading-tight font-display mb-6">
          Рассчитайте ваше сохраненное время
        </h2>
        <p className="text-base text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed">
          Согласование времени, отправка ссылок и контроль оплат отнимают до 30 минут на одного ученика в неделю. Выберите ваш объем работы и посмотрите на результат.
        </p>

        {/* Виджет калькулятора */}
        <div className="max-w-2xl mx-auto rounded-[2.5rem] bg-white p-3 border border-slate-200/80 shadow-lg">
          <div className="rounded-[calc(2.5rem-0.75rem)] bg-slate-50/50 border border-slate-100 p-8 text-left space-y-8">
            
            {/* Ползунок слайдера */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-base font-bold text-slate-700">Количество активных учеников</label>
                <span className="text-2xl font-extrabold text-blue-600 font-mono">{studentCount} учеников</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all"
              />
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>5 учеников</span>
                <span>25 учеников</span>
                <span>50 учеников</span>
              </div>
            </div>

            {/* Результаты расчетов */}
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <span className="text-xs text-slate-500 block uppercase font-bold tracking-wide">Ваш сохраненный ресурс:</span>
                <span className="text-2xl md:text-3xl font-extrabold text-blue-950 font-display mt-1 block">
                  ~ {hoursSaved} часов в неделю
                </span>
                <p className="text-sm text-slate-500 leading-relaxed mt-2 max-w-md">
                  Это свободное время вы можете потратить на проведение дополнительных коммерческих уроков или долгожданный отдых.
                </p>
              </div>
              {/* Кнопка ведет к тарифному блоку */}
              <a 
                href="#pricing"
                onClick={(e) => handleScrollToSection(e, 'pricing')}
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] text-center"
              >
                Начать экономить
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Тарифный план (Pricing Table) */}
      <section id="pricing" className="max-w-[1400px] mx-auto px-6 py-28 border-t border-slate-200/60 text-center reveal-element">
        <span className="text-xs text-blue-600 uppercase tracking-[0.2em] font-bold block mb-3">Стоимость</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-xl mx-auto leading-tight font-display mb-16">
          Прозрачные условия без переплат
        </h2>

        {/* Тарифная сетка */}
        <div className="max-w-md mx-auto rounded-[2.5rem] bg-white p-3 border border-slate-200/80 shadow-xl relative">
          {/* Популярная метка */}
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 border border-blue-500 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-md animate-status-pulse">
            Единый тариф «Безлимит»
          </span>

          <div className="rounded-[calc(2.5rem-0.75rem)] bg-slate-50/50 border border-slate-100 p-8 text-left space-y-6">
            <div className="text-center pb-6 border-b border-slate-200">
              <span className="text-sm text-slate-400 font-bold uppercase tracking-wider block">Тариф «Профессиональный»</span>
              <div className="mt-3 flex justify-center items-baseline gap-1 font-display">
                <span className="text-5xl font-extrabold text-slate-900">990 ₽</span>
                <span className="text-base font-semibold text-slate-500">/ месяц</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 border border-emerald-200 px-4 py-1 rounded-full inline-block mt-4">
                14 дней тестового доступа бесплатно
              </span>
            </div>

            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-base text-slate-700">Синхронизация с <strong>Google Календарем</strong></span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-base text-slate-700">Неограниченное число учеников и занятий</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-base text-slate-700">Автоматические уведомления в Telegram</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-base text-slate-700">Формирование платежных ссылок СБП</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-base text-slate-700">Персональный WebApp для учеников</span>
              </div>
            </div>

            {/* Ведет обратно к первому экрану для совершения целевого действия */}
            <a 
              href="#hero"
              onClick={(e) => handleScrollToSection(e, 'hero')}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 block font-sans"
            >
              Начать бесплатный тестовый период
            </a>
          </div>
        </div>
      </section>

      {/* 8. Вопросы и ответы (FAQ Accordion с плавной высотой) */}
      <section className="max-w-[900px] mx-auto px-6 py-28 border-t border-slate-200/60 text-center reveal-element">
        <span className="text-xs text-blue-600 uppercase tracking-[0.2em] font-bold block mb-3">Ответы</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight font-display mb-16">
          Часто задаваемые вопросы
        </h2>

        {/* Список FAQ */}
        <div className="space-y-4 text-left">
          {faqData.map((item, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:border-blue-200 transition-organic">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-base font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {/* Анимационный блок развертывания FAQ */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-5 text-base text-slate-600 leading-relaxed bg-slate-50/50">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Подвал сайта (Footer) */}
      <footer className="relative bg-white border-t border-slate-200 pt-20 pb-16 text-center">
        <div className="max-w-[1400px] mx-auto px-6 space-y-12">
          
          {/* Финальная карточка CTA */}
          <div className="max-w-3xl mx-auto rounded-[2rem] bg-slate-50 p-2 border border-slate-200 reveal-element">
            <div className="rounded-[calc(2rem-0.5rem)] bg-white p-8 md:p-12 border border-slate-100/60 shadow-sm space-y-6">
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                Начните автоматизацию прямо сейчас
              </h3>
              <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Забудьте о рутинном согласовании расписания и ручной проверке платежей. Подключение занимает не более 3 минут вашего времени.
              </p>
              
              {/* Кнопка 2 (Footer CTA): Открывает Telegram-бота в новой вкладке */}
              <div className="pt-2">
                <a 
                  href={botLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-organic hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5 fill-white text-blue-600" />
                  <span>Начать бесплатно в Telegram</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                    <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Копирайт и ссылки подвала */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/10">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight text-slate-900">AcademicLink</span>
            </div>

            <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
              <a href="#problems" onClick={(e) => handleScrollToSection(e, 'problems')} className="hover:text-slate-600">Руководство</a>
              <a href="#how-it-works" onClick={(e) => handleScrollToSection(e, 'how-it-works')} className="hover:text-slate-600">Техподдержка</a>
              <a href="#features" onClick={(e) => handleScrollToSection(e, 'features')} className="hover:text-slate-600">Безопасность данных</a>
            </div>

            {/* Скрытая ссылка для разработчиков и тестирования демо-кабинета (Dashboard) */}
            <button 
              onClick={onEnterDashboard}
              className="text-[10px] text-slate-350 hover:text-slate-500 transition-colors uppercase font-mono tracking-widest cursor-pointer"
            >
              Вход разработчика
            </button>

            <span className="text-xs text-slate-400">
              © 2026 AcademicLink CRM. Все права защищены. Специализировано для репетиторов.
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}

const faqData = [
  {
    question: "Нужно ли ученикам устанавливать специальное приложение?",
    answer: "Нет, ученики открывают расписание прямо внутри Telegram через WebApp. Это занимает секунду."
  },
  {
    question: "Как происходит оплата занятий?",
    answer: "Ученик видит ваши реквизиты СБП в приложении и переводит деньги напрямую на вашу карту. Вы подтверждаете оплату в боте одной кнопкой."
  },
  {
    question: "Смогу ли я заблокировать время, в которое я не работаю?",
    answer: "Да, вы можете настроить регулярные рабочие часы или просто добавить событие в Google Календарь — бот мгновенно скроет это время для учеников."
  },
  {
    question: "Безопасны ли мои данные?",
    answer: "Да, мы используем безопасное подключение и официальное API Telegram и Google. Ваши данные надежно защищены."
  }
];
