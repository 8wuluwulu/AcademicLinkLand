import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Send,
  Calendar,
  Users,
  MessageSquare,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Sparkles,
  CreditCard,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Bot,
  Menu,
  X,
  Video
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// 1. HAND-DRAWN INLINE SVG DOODLES (Swapsmore-style playful illustrations)
// ─────────────────────────────────────────────────────────────────────────────

const SquiggleDoodle = ({ className = "w-12 h-6" }) => (
  <svg className={className} viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C8 6 12 18 18 12C24 6 28 18 34 12C40 6 44 14 46 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarDoodle = ({ className = "w-8 h-8 text-amber-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12.5 7 13.5 11 18 12C13.5 13 12.5 17 12 22C11.5 17 10.5 13 6 12C10.5 11 11.5 7 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PencilDoodle = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H7L18.5 9.5C19.5 8.5 19.5 7 18.5 6L18 5.5C17 4.5 15.5 4.5 14.5 5.5L3 17V21ZM3 17L14.5 5.5M13 7L17 11M3 21L4 17M20 3L21 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EnvelopeDoodle = ({ className = "w-14 h-10" }) => (
  <svg className={className} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 4L14 12L26 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MailboxDoodle = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18H26C28 18 28 14 26 14H6C4 14 4 18 6 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 14V26C6 27 7 28 8 28H12C13 28 14 27 14 26V18" stroke="currentColor" strokeWidth="2"/>
    <path d="M22 14C22 10 18.5 6 14 6H8C5 6 3 8 3 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 14V8H27V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M27 8L30 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 28V30" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const HeartDoodle = ({ className = "w-8 h-8 text-rose-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C12 21 3 15.5 3 8.5C3 5.5 5.5 3 8.5 3C10.5 3 11.5 4.5 12 5C12.5 4.5 13.5 3 15.5 3C18.5 3 21 5.5 21 8.5C21 15.5 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GradCapDoodle = ({ className = "w-14 h-12" }) => (
  <svg className={className} viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3L2 9L14 15L26 9L14 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 11V18C6 19.5 9.5 21 14 21C18.5 21 22 19.5 22 18V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25 9.5V16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="25" cy="17" r="1.5" fill="currentColor"/>
  </svg>
);

const BookDoodle = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 19.5C6.5 16.5 12 19.5 12 19.5C12 19.5 17.5 16.5 22 19.5V4.5C17.5 1.5 12 4.5 12 4.5C12 4.5 6.5 1.5 2 4.5V19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4.5V19.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const PuzzleDoodle = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 4H7C5.3 4 4 5.3 4 7V11.5C4 11.5 5.5 11 5.5 12.5C5.5 14 4 13.5 4 13.5V17C4 18.7 5.3 20 7 20H11.5C11.5 18.5 11 18.5 12.5 18.5C14 18.5 13.5 20 13.5 20H17C18.7 20 20 18.7 20 17V13.5C18.5 13.5 18.5 14 18.5 12.5C18.5 11 20 11.5 20 11.5V7C20 5.3 18.7 4 17 4H13.5C13.5 5.5 14 5.5 12.5 5.5C11 5.5 11.5 4 11.5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowDoodle = ({ className = "w-14 h-14" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 25C15 28 25 20 32 12M32 12C28 12.5 24 12 22 10.5M32 12C32 16 31.5 20 33 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const faqData = [
  {
    question: "Нужно ли ученикам устанавливать специальное приложение?",
    answer: "Нет, ученикам не требуется скачивать или настраивать дополнительные приложения. Все взаимодействия — выбор свободного времени, перенос занятий и подтверждение уроков — происходят через интуитивный WebApp прямо внутри Telegram. Это занимает буквально секунду."
  },
  {
    question: "Как репетитор получает оплату за проведенные занятия?",
    answer: "Система автоматически формирует безопасные реквизиты СБП и уникальный QR-код на оплату сразу после завершения урока. Родитель совершает прямой банковский перевод на вашу карту, а бот отслеживает статус и позволяет подтвердить зачисление в один клик без проверки чеков."
  },
  {
    question: "Смогу ли я заблокировать время, когда я занят личными делами?",
    answer: "Да, благодаря полной двусторонней интеграции с вашим личным Google Календарем. Бот автоматически считывает ваши личные события и блокирует эти временные интервалы. Для записи ученикам будут доступны только действительно свободные рабочие слоты."
  },
  {
    question: "Безопасны ли персональные данные моих учеников?",
    answer: "Мы заботимся о вашей конфиденциальности. Синхронизация расписания осуществляется через официальные защищённые протоколы Google Calendar API и API Telegram. Данные учеников не передаются сторонним сервисам и используются исключительно в рамках вашей личной базы."
  }
];

export default function LandingPage() {
  const [studentCount, setStudentCount] = useState(15);
  const hoursSaved = Math.round(studentCount * 0.5 * 10) / 10;
  const estimatedEarnBoost = studentCount * 1800 * 2; // Extra slots filled (2 extra lessons per student volume equivalent)

  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mockBotStatus, setMockBotStatus] = useState('pending');
  const [toasts, setToasts] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const botLink = "https://t.me/AcademicLinkBot";

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
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

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleMockConfirm = () => {
    setMockBotStatus('confirmed');
    showToast("Занятие подтверждено! Бот отправил напоминание и СБП-ссылку родителю.");
  };

  const handleMockReschedule = () => {
    setMockBotStatus('rescheduled');
    showToast("Запрос на перенос отправлен ученику. Ожидаем выбор нового времени.");
  };

  const handleMockCancel = () => {
    setMockBotStatus('cancelled');
    showToast("Урок отменен. Слот освобожден, родителю выслано уведомление.");
  };

  const navLinks = [
    { label: 'Проблемы', id: 'problems' },
    { label: 'Как это устроено', id: 'how-it-works' },
    { label: 'Предметы', id: 'subjects' },
    { label: 'Возможности', id: 'features' },
    { label: 'Отзывы', id: 'testimonials' },
    { label: 'Тарифы', id: 'pricing' }
  ];

  // Subjects lists matching capsule layout from the reference
  const subjectPills = [
    { text: "Математика (ЕГЭ)", dotColor: "bg-emerald-500" },
    { text: "Физика (ОГЭ)", dotColor: "bg-purple-500" },
    { text: "Химия и Биология", dotColor: "bg-blue-500" },
    { text: "Английский язык", dotColor: "bg-amber-500" },
    { text: "Подготовка к школе", dotColor: "bg-rose-500" },
    { text: "Программирование", dotColor: "bg-slate-500" },
    { text: "Русский язык (ЕГЭ)", dotColor: "bg-emerald-600" },
    { text: "История", dotColor: "bg-purple-600" },
    { text: "Начальные классы", dotColor: "bg-amber-600" },
    { text: "Высшая математика", dotColor: "bg-blue-600" },
    { text: "Информатика", dotColor: "bg-rose-600" },
    { text: "География", dotColor: "bg-slate-400" },
    { text: "Немецкий язык", dotColor: "bg-purple-400" },
    { text: "Логопедия", dotColor: "bg-emerald-400" },
    { text: "Литература", dotColor: "bg-amber-400" },
    { text: "Обществознание", dotColor: "bg-blue-400" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-stone-900 font-sans overflow-x-hidden relative selection:bg-blue-600/10 selection:text-blue-600">

      {/* ─────────────────────────────────────────────────────────────────────────────
         TOAST SYSTEM
         ───────────────────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="p-4.5 rounded-2xl border border-cream-300 bg-white/95 backdrop-blur-sm shadow-xl flex items-center gap-3.5 w-80 pointer-events-auto animate-fade-in-up"
          >
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" strokeWidth={2} />
            <p className="text-sm font-semibold text-stone-800 leading-normal">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Decorative overlays */}
      <div className="mesh-bg" />
      <div className="noise-overlay" />

      {/* ─────────────────────────────────────────────────────────────────────────────
         HEADER (Floating navigation)
         ───────────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full border-b border-cream-300 backdrop-blur-xl bg-cream-100/80">
        <div className="max-w-[1400px] mx-auto h-16.5 px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8.5 h-8.5 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/15">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-stone-900">
              AcademicLink
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollToSection(e, link.id)}
                className="text-[13px] font-semibold tracking-wider text-stone-500 hover:text-stone-900 transition-colors uppercase cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action / Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href={botLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-organic hover:shadow-lg active:scale-[0.98]"
            >
              <Send className="w-3.5 h-3.5 fill-white text-blue-600" />
              <span>Войти в бота</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-stone-600 hover:bg-cream-200 border border-cream-300 transition-colors cursor-pointer"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.8} /> : <Menu className="w-5 h-5" strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden border-t border-cream-300 bg-cream-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollToSection(e, link.id)}
                className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-stone-700 hover:bg-cream-200 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={botLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-4 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-colors"
            >
              Начать бесплатно
            </a>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────────────
         MAIN SECTION
         ───────────────────────────────────────────────────────────────────────────── */}
      <main className="flex-grow relative z-10">

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 2. HERO SECTION (Cream Playful Editorial Style) */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="hero" className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-24 flex flex-col items-center text-center reveal-element">
          
          {/* FLOATING DOODLES (Hero Section) */}
          <div className="absolute top-10 left-[8%] md:left-[12%] text-blue-600/30 animate-float pointer-events-none hidden sm:block">
            <GradCapDoodle className="w-14 h-12" />
          </div>
          <div className="absolute top-24 right-[10%] text-amber-500/40 animate-float-delayed pointer-events-none hidden sm:block">
            <PencilDoodle className="w-12 h-12" />
          </div>
          <div className="absolute bottom-16 left-[5%] text-amber-500/30 animate-float-side pointer-events-none hidden md:block">
            <EnvelopeDoodle className="w-14 h-10" />
          </div>
          <div className="absolute bottom-28 right-[8%] text-blue-600/30 animate-float pointer-events-none hidden md:block">
            <MailboxDoodle className="w-16 h-16" />
          </div>
          <div className="absolute top-1/2 left-[15%] text-rose-500/20 animate-float-delayed pointer-events-none hidden lg:block">
            <HeartDoodle className="w-8 h-8" />
          </div>
          <div className="absolute top-1/3 right-[18%] text-amber-500/30 animate-float pointer-events-none hidden lg:block">
            <StarDoodle className="w-9 h-9" />
          </div>

          {/* Badges / Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-4.5 py-1.5 bg-cream-200 border border-cream-300 text-xs font-semibold text-stone-600 mb-8 shadow-sm">
            <Zap className="w-4 h-4 text-blue-600 fill-blue-600 animate-status-pulse" />
            <span>Умный ассистент репетитора</span>
          </div>

          {/* Headline H1 (Mixed Serif + Playful tone) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-serif font-bold tracking-tight leading-[1.1] text-stone-900 max-w-4xl">
            Освободите до <span className="text-blue-600 italic font-semibold">5 часов в неделю</span> для преподавания, а не рутины
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg sm:text-xl text-stone-500 max-w-2xl leading-relaxed">
            AcademicLink — это умная CRM-система прямо в Telegram. Автоматическая запись на свободные уроки, синхронизация с Google Календарём и мгновенные уведомления.
          </p>

          {/* CTA & Italic helper */}
          <div className="mt-10 flex flex-col items-center gap-3.5">
            <a
              href={botLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-base font-bold text-white transition-organic hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Send className="w-4.5 h-4.5 fill-white text-blue-600" />
              <span>Запустить бесплатно в Telegram</span>
              <span className="w-6.5 h-6.5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
              </span>
            </a>
            <span className="text-sm font-serif italic text-stone-400">Это бесплатно! 14 дней тестового доступа</span>
          </div>

          {/* ─── Hero Visual Comps (Tutor Bot + WebApp) ─── */}
          <div className="mt-20 w-full max-w-5xl reveal-element stagger-2">
            <div className="rounded-[2.5rem] bg-white p-2 border border-cream-300 shadow-xl shadow-cream-400/10">
              <div className="rounded-[calc(2.5rem-0.5rem)] bg-cream-100/50 border border-cream-200 overflow-hidden p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative">

                {/* Left Panel: Telegram Bot Mockup */}
                <div className="rounded-2xl bg-white border border-cream-300 p-6 flex flex-col shadow-sm glow-pulse relative overflow-hidden">
                  
                  {/* Subtle vector squiggle inside bot mockup */}
                  <SquiggleDoodle className="absolute top-14 right-6 text-stone-300/40 w-12 h-6" />

                  <div className="space-y-5 flex-grow">
                    <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-stone-800">AcademicLink Бот</h3>
                          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5 animate-status-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            активен
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Telegram Bot</span>
                    </div>

                    <div className="space-y-4">
                      {mockBotStatus === 'pending' && (
                        <div className="p-4.5 rounded-xl bg-cream-100/60 border border-cream-200 text-sm text-stone-700 leading-relaxed space-y-2.5">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                            <strong className="text-stone-800">Новая запись на урок!</strong>
                          </div>
                          <div className="space-y-1 text-xs text-stone-500 font-medium">
                            <p>Ученик: <strong className="text-stone-700">Иван Некрасов</strong></p>
                            <p>Предмет: <strong className="text-stone-700">Математика (Подготовка к ЕГЭ)</strong></p>
                            <p>Время: <strong className="text-stone-700">Пятница, 16:00 — 17:30</strong></p>
                          </div>
                          <div className="flex items-center gap-1.5 pt-1">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                            <span className="text-emerald-700 text-xs font-semibold">Слот свободен в вашем Google Календаре.</span>
                          </div>
                        </div>
                      )}

                      {mockBotStatus === 'confirmed' && (
                        <div className="p-4.5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 leading-relaxed space-y-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                            <strong className="text-emerald-900">Занятие успешно подтверждено!</strong>
                          </div>
                          <p className="text-xs text-emerald-700 pl-6 leading-normal">
                            Бот автоматически внёс событие в ваш Google Календарь и выслал родителю СБП-ссылку на оплату.
                          </p>
                        </div>
                      )}

                      {mockBotStatus === 'rescheduled' && (
                        <div className="p-4.5 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 leading-relaxed space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" strokeWidth={1.5} />
                            <strong className="text-amber-900">Запрос на перенос отправлен.</strong>
                          </div>
                          <p className="text-xs text-amber-700 pl-6 leading-normal">
                            Мы выслали родителю свободные окна в вашем календаре. Ожидайте уведомления с новым временем.
                          </p>
                        </div>
                      )}

                      {mockBotStatus === 'cancelled' && (
                        <div className="p-4.5 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-800 leading-relaxed space-y-1">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" strokeWidth={1.5} />
                            <strong className="text-rose-900">Занятие отклонено.</strong>
                          </div>
                          <p className="text-xs text-rose-700 pl-6 leading-normal">
                            Бот уведомил родителя об отмене. Слот времени снова открыт в веб-приложении для записи.
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <button
                          type="button"
                          onClick={handleMockConfirm}
                          className={`py-3 rounded-xl text-xs font-bold text-center border transition-all duration-300 cursor-pointer ${
                            mockBotStatus === 'confirmed'
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/10'
                          }`}
                        >
                          Подтвердить
                        </button>
                        <button
                          type="button"
                          onClick={handleMockReschedule}
                          className="py-3 rounded-xl bg-cream-100 text-stone-700 text-xs font-bold text-center border border-cream-300 hover:bg-cream-200 transition-colors cursor-pointer"
                        >
                          Перенести
                        </button>
                        <button
                          type="button"
                          onClick={handleMockCancel}
                          className="py-3 rounded-xl bg-cream-50 text-stone-400 text-xs font-bold text-center border border-cream-200 hover:text-rose-500 hover:bg-rose-50/50 transition-colors cursor-pointer"
                        >
                          Отклонить
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-cream-200 mt-6 flex justify-between items-center text-[10px] text-stone-400 font-mono">
                    <span>Панель управления</span>
                    <span>@academiclink_bot</span>
                  </div>
                </div>

                {/* Right Panel: Student WebApp Mockup */}
                <div className="rounded-2xl bg-white border border-cream-300 p-6 flex flex-col shadow-sm hover:border-blue-300 transition-organic relative">
                  
                  <div className="space-y-5 flex-grow">
                    <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                        <h3 className="text-sm font-bold text-stone-800">Запись на занятие</h3>
                      </div>
                      <span className="text-[10px] font-semibold text-stone-400 font-mono">Преподаватель: С. В. Волкова</span>
                    </div>

                    <div className="space-y-4">
                      {/* Subject info */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-cream-100/60 border border-cream-200 text-sm gap-2">
                        <div>
                          <span className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold">Направление урока</span>
                          <span className="font-bold text-stone-800 text-sm block mt-0.5">Математика (Профиль, 90 мин)</span>
                        </div>
                        <span className="font-extrabold text-blue-600 text-sm flex-shrink-0">1 800 ₽</span>
                      </div>

                      {/* Time Slots */}
                      <div>
                        <label className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold mb-2">Свободные окна на завтра</label>
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-300 text-center text-xs font-bold text-blue-600 font-mono cursor-pointer hover:bg-blue-100/70 transition-colors">
                            16:00 — 17:30
                          </div>
                          <div className="p-3.5 rounded-xl bg-cream-100/40 border border-cream-200 text-center text-xs text-stone-500 font-mono hover:border-cream-300 transition-colors cursor-pointer">
                            18:00 — 19:30
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast("Демонстрационный режим: Нажмите кнопку подтверждения слева.")}
                        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold text-center shadow-lg shadow-emerald-500/10 transition-colors cursor-pointer"
                      >
                        Забронировать слот
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-cream-200 mt-6 flex justify-between items-center text-[10px] text-stone-400 font-mono">
                    <span>Ссылка для родителей</span>
                    <span>Мобильный WebApp</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 3. PROBLEMS (Pain Points) */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="problems" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 text-center reveal-element">
          
          <span className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-bold block mb-4">Главные проблемы</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 max-w-2xl mx-auto leading-tight mb-16 md:mb-24">
            Рутина, которая мешает главному процессу — обучению
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">

            {/* Pain Card 1 */}
            <div className="rounded-[2rem] bg-white p-2 border border-cream-300 hover:border-blue-200 card-interactive">
              <div className="rounded-[calc(2rem-0.5rem)] bg-cream-100/30 p-6 md:p-7 h-full flex flex-col justify-between border border-cream-200/50 relative overflow-hidden">
                <SquiggleDoodle className="absolute top-6 right-6 text-stone-300/40 w-10 h-5" />
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-rose-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">«Какое время свободно?»</h3>
                  <p className="text-sm md:text-base text-stone-500 leading-relaxed">
                    Бесконечные переписки с родителями в мессенджерах для согласования очередного урока. Вы присылаете списки свободных окон, которые меняются ежеминутно.
                  </p>
                </div>
              </div>
            </div>

            {/* Pain Card 2 */}
            <div className="rounded-[2rem] bg-white p-2 border border-cream-300 hover:border-blue-200 card-interactive">
              <div className="rounded-[calc(2rem-0.5rem)] bg-cream-100/30 p-6 md:p-7 h-full flex flex-col justify-between border border-cream-200/50 relative overflow-hidden">
                <StarDoodle className="absolute top-6 right-6 text-stone-300/40 w-8 h-8" />
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-rose-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">«Ой, я совсем забыл...»</h3>
                  <p className="text-sm md:text-base text-stone-500 leading-relaxed">
                    Отмены занятий в самый последний момент и прогулы из-за забывчивости учеников. Вы теряете деньги и свободное время, которое могли бы уделить другим.
                  </p>
                </div>
              </div>
            </div>

            {/* Pain Card 3 */}
            <div className="rounded-[2rem] bg-white p-2 border border-cream-300 hover:border-blue-200 card-interactive">
              <div className="rounded-[calc(2rem-0.5rem)] bg-cream-100/30 p-6 md:p-7 h-full flex flex-col justify-between border border-cream-200/50 relative overflow-hidden">
                <HeartDoodle className="absolute top-6 right-6 text-stone-300/40 w-7 h-7" />
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-rose-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">«А когда оплата?»</h3>
                  <p className="text-sm md:text-base text-stone-500 leading-relaxed">
                    Постоянная путаница со счетами, остатком оплаченных часов и переводами на карту. Неудобно каждый раз деликатно напоминать родителям о необходимости оплаты.
                  </p>
                </div>
              </div>
            </div>

            {/* Pain Card 4 */}
            <div className="rounded-[2rem] bg-white p-2 border border-cream-300 hover:border-blue-200 card-interactive">
              <div className="rounded-[calc(2rem-0.5rem)] bg-cream-100/30 p-6 md:p-7 h-full flex flex-col justify-between border border-cream-200/50 relative overflow-hidden">
                <PencilDoodle className="absolute top-6 right-6 text-stone-300/30 w-8 h-8" />
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-rose-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">«Где ссылка на урок?»</h3>
                  <p className="text-sm md:text-base text-stone-500 leading-relaxed">
                    Каждый раз приходится заново искать актуальные ссылки на видеоконференции в архивах чатов. Ученики постоянно задерживаются, разыскивая нужный диалог.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 4. HOW IT WORKS (Playful Steps + Sketch layout) */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 text-center reveal-element">
          
          <span className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-bold block mb-4">Простая интеграция</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 max-w-xl mx-auto leading-tight mb-20 md:mb-28">
            Три простых шага к идеальному порядку
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 text-left items-center">
            
            {/* Steps text list */}
            <div className="space-y-12">
              
              {/* Step 1 */}
              <div className="flex gap-5 reveal-element stagger-1">
                <div className="w-12.5 h-12.5 rounded-full bg-cream-200 border border-cream-300 text-blue-600 flex items-center justify-center text-sm font-bold font-mono shadow-sm flex-shrink-0">
                  01
                </div>
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 uppercase tracking-widest font-bold font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-status-pulse" />
                    • ШАГ 1
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Запустите Telegram-бота</h3>
                  <p className="text-sm md:text-base text-stone-500 leading-relaxed">
                    Запустите бота AcademicLink в Telegram. Укажите ваши предметы, стоимость занятий и реквизиты СБП для автоматического создания счетов.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-5 reveal-element stagger-2">
                <div className="w-12.5 h-12.5 rounded-full bg-cream-200 border border-cream-300 text-blue-600 flex items-center justify-center text-sm font-bold font-mono shadow-sm flex-shrink-0">
                  02
                </div>
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 uppercase tracking-widest font-bold font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-status-pulse" />
                    • ШАГ 2
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Подключите Google Календарь</h3>
                  <p className="text-sm md:text-base text-stone-500 leading-relaxed">
                    Свяжите ваш рабочий Google Календарь в один клик. Бот автоматически заблокирует часы, занятые вашими личными событиями, исключив накладки.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-5 reveal-element stagger-3">
                <div className="w-12.5 h-12.5 rounded-full bg-cream-200 border border-cream-300 text-blue-600 flex items-center justify-center text-sm font-bold font-mono shadow-sm flex-shrink-0">
                  03
                </div>
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 uppercase tracking-widest font-bold font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-status-pulse" />
                    • ШАГ 3
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Поделитесь личной ссылкой</h3>
                  <p className="text-sm md:text-base text-stone-500 leading-relaxed">
                    Отправьте ученикам вашу персональную ссылку. Они увидят доступное рабочее время и запишутся сами, а бот мгновенно уведомит вас в Telegram.
                  </p>
                </div>
              </div>

            </div>

            {/* Steps visual mockup (Swapsmore-style circular background with sketchy illustrations) */}
            <div className="relative flex items-center justify-center reveal-element stagger-4 py-8">
              
              {/* Circular light sand background */}
              <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-[#EDE8DF]/60 absolute z-0 animate-float" />
              
              {/* Vector arrow doodle overlay */}
              <div className="absolute top-0 right-10 z-10 text-amber-500 animate-float-delayed">
                <ArrowDoodle className="w-16 h-16 rotate-12" />
              </div>

              {/* Central Tutor Illustration */}
              <div className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] z-10 relative rounded-full overflow-hidden border-4 border-white shadow-xl bg-white animate-float">
                <img
                  src={`${import.meta.env.BASE_URL}tutor_illustration.jpg`}
                  alt="Иллюстрация процесса записи репетитора"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating micro-cards mimicking reference layout */}
              <div className="absolute top-10 left-0 bg-white border border-cream-300 p-3 rounded-2xl shadow-md z-20 w-44 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-[8px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Подготовка к ЕГЭ</span>
                <p className="text-xs font-bold text-stone-800 mt-1.5">Физика (90 мин)</p>
                <div className="flex justify-between items-center text-[9px] text-stone-400 mt-2 font-mono">
                  <span>СБП Проверка</span>
                  <span className="text-blue-600 font-bold">1 800 ₽</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-2 bg-white border border-cream-300 p-3.5 rounded-2xl shadow-md z-20 w-48 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-status-pulse" />
                  <span className="text-[8px] font-bold text-stone-400 font-mono uppercase">Забронированный слот</span>
                </div>
                <p className="text-xs font-bold text-stone-800 mt-1.5">Четверг, 15:00 — 16:30</p>
                <p className="text-[9px] text-stone-400 mt-1 font-serif">Александр Некрасов</p>
              </div>

            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 5. SUBJECTS PILLS (Floating capsule pill design) */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="subjects" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 text-center reveal-element">
          
          <span className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-bold block mb-4">Категории и предметы</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 max-w-2xl mx-auto leading-tight mb-16 md:mb-24">
            Подходит для абсолютно любых предметов и целей обучения
          </h2>

          {/* Staggered capsule pills mimicking reference image copy 4.png */}
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3.5">
            {subjectPills.map((pill, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-5.5 py-2.5 rounded-full bg-white border border-cream-300 shadow-sm hover:border-blue-300 hover:shadow-md transition-organic hover:-translate-y-0.5 active:scale-[0.98] cursor-default"
              >
                <span className={`w-2.5 h-2.5 rounded-full ${pill.dotColor}`} />
                <span className="text-sm font-semibold text-stone-800 tracking-wide">{pill.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <span className="text-sm font-serif italic text-stone-400">
              Вы также можете добавлять любые собственные категории и направления занятий в Telegram-боте
            </span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 6. FEATURES (Dark Slate Section with sketchy card list) */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="features" className="bg-stone-900 py-24 md:py-36 text-center text-white relative overflow-hidden">
          
          {/* Subtle noise inside dark section */}
          <div className="noise-overlay" />
          
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
            <span className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-bold block mb-4">Возможности платформы</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight mb-16 md:mb-24">
              Создано для преподавателей с любой учебной нагрузкой
            </h2>

            {/* 6 cards grid with sketches in bottom right corner */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              
              {/* Card 1 */}
              <div className="rounded-[2.5rem] bg-white text-stone-900 p-2 border border-cream-300 hover:border-blue-300 transition-organic hover:-translate-y-1 hover:shadow-xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2">Индивидуальные занятия</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-[21ch]">
                    Ученики бронируют свободное время без долгих и путающих согласований в чатах.
                  </p>
                </div>
                {/* Sketch illustration bottom-right */}
                <div className="absolute bottom-4 right-4 text-blue-600/30">
                  <BookDoodle className="w-14 h-14" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-[2.5rem] bg-white text-stone-900 p-2 border border-cream-300 hover:border-blue-300 transition-organic hover:-translate-y-1 hover:shadow-xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2">Групповые занятия</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-[21ch]">
                    Бот автоматически распределяет учеников по мини-группам на единый временной слот.
                  </p>
                </div>
                {/* Sketch illustration bottom-right */}
                <div className="absolute bottom-4 right-4 text-blue-600/30">
                  <Users className="w-12 h-12" strokeWidth={1.5} />
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-[2.5rem] bg-white text-stone-900 p-2 border border-cream-300 hover:border-blue-300 transition-organic hover:-translate-y-1 hover:shadow-xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2">Подготовка к экзаменам</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-[21ch]">
                    Удобные напоминания о тестах, домашней работе и вебинарах дисциплинируют школьников.
                  </p>
                </div>
                {/* Sketch illustration bottom-right */}
                <div className="absolute bottom-4 right-4 text-blue-600/30">
                  <GradCapDoodle className="w-14 h-14" />
                </div>
              </div>

              {/* Card 4 */}
              <div className="rounded-[2.5rem] bg-white text-stone-900 p-2 border border-cream-300 hover:border-blue-300 transition-organic hover:-translate-y-1 hover:shadow-xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2">Работа с родителями</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-[21ch]">
                    Система отправляет СБП ссылки родителям ученика, вежливо решая вопрос оплаты без вашего участия.
                  </p>
                </div>
                {/* Sketch illustration bottom-right */}
                <div className="absolute bottom-4 right-4 text-blue-600/30">
                  <EnvelopeDoodle className="w-14 h-14" />
                </div>
              </div>

              {/* Card 5 */}
              <div className="rounded-[2.5rem] bg-white text-stone-900 p-2 border border-cream-300 hover:border-blue-300 transition-organic hover:-translate-y-1 hover:shadow-xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2">Онлайн-формат</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-[21ch]">
                    Автоматическая генерация и отправка ссылок на Zoom / Google Meet прямо перед уроком.
                  </p>
                </div>
                {/* Sketch illustration bottom-right */}
                <div className="absolute bottom-4 right-4 text-blue-600/30">
                  <Video className="w-12 h-12" strokeWidth={1.5} />
                </div>
              </div>

              {/* Card 6 */}
              <div className="rounded-[2.5rem] bg-white text-stone-900 p-2 border border-cream-300 hover:border-blue-300 transition-organic hover:-translate-y-1 hover:shadow-xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2">Смешанное обучение</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-[21ch]">
                    Удобное совмещение очных визитов и дистанционных уроков без накладок в расписании.
                  </p>
                </div>
                {/* Sketch illustration bottom-right */}
                <div className="absolute bottom-4 right-4 text-blue-600/30">
                  <PuzzleDoodle className="w-12 h-12" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 7. DYNAMIC CALCULATOR */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 text-center reveal-element">
          
          <span className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-bold block mb-4">Экономика репетитора</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 max-w-xl mx-auto leading-tight mb-8">
            Рассчитайте сэкономленное время
          </h2>
          <p className="text-base text-stone-500 max-w-2xl mx-auto mb-16 md:mb-24 leading-relaxed">
            Каждое занятие отнимает у вас около 30 минут на переписки, сверку оплат по карте и отправку ссылок. Укажите число учеников и посмотрите, сколько часов вы получите взамен.
          </p>

          <div className="max-w-2xl mx-auto rounded-[2.5rem] bg-white p-2 border border-cream-300 shadow-xl shadow-cream-400/10">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-cream-100/30 border border-cream-200 p-6 md:p-10 text-left space-y-8">
              
              {/* Slider widget */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-base sm:text-lg font-serif font-bold text-stone-850">Количество активных учеников</label>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-600">{studentCount}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={studentCount}
                  onChange={(e) => setStudentCount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-stone-400 font-mono">
                  <span>5 учеников</span>
                  <span>25 учеников</span>
                  <span>50 учеников</span>
                </div>
              </div>

              {/* Estimated values */}
              <div className="p-6 rounded-2xl bg-cream-200 border border-cream-300 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest block font-mono">Сохраняется для вас:</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 block">
                    ~ {hoursSaved} ч. в неделю
                  </span>
                  <p className="text-xs text-stone-500 leading-normal mt-2">
                    Этого времени достаточно для ведения 3–4 новых учеников.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest block font-mono">Дополнительный доход:</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-600 block">
                    ~ {estimatedEarnBoost.toLocaleString()} ₽ / мес.
                  </span>
                  <p className="text-xs text-stone-500 leading-normal mt-2">
                    Из расчёта стоимости стандартного урока 1 800 ₽ за 90 минут.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center sm:text-left">
                <a
                  href="#pricing"
                  onClick={(e) => handleScrollToSection(e, 'pricing')}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-organic hover:shadow-md active:scale-[0.98]"
                >
                  <span>Начать автоматизацию</span>
                  <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 8. TESTIMONIALS (Staggered masonry reviews + generated images) */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="testimonials" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 text-center reveal-element">
          
          <span className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-bold block mb-4">Мнения преподавателей</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 max-w-2xl mx-auto leading-tight mb-16 md:mb-24">
            Почему репетиторы любят работать с AcademicLink
          </h2>

          {/* Testimonial masonry - text cards and photo cards matching references/image copy.png */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            
            {/* Card 1: Text review */}
            <div className="rounded-[2rem] bg-white p-6.5 border border-cream-300 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-organic">
              <p className="text-base text-stone-600 leading-relaxed font-medium">
                «Наконец-то пропали эти бесконечные переписки: 'А в четверг свободно? А в пятницу?' Теперь просто кидаю ссылку в чат, и родители учеников сами выбирают доступное время. Календарь забивается сам собой.»
              </p>
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-cream-200">
                <div className="w-10 h-10 rounded-full bg-[#EADFD3] flex items-center justify-center font-bold text-stone-700 text-sm">
                  МВ
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Мария Волкова</h4>
                  <span className="text-xs text-stone-400 font-mono">@mariya_math · Математика</span>
                </div>
              </div>
            </div>

            {/* Card 2: Photo card (Workspace) */}
            <div className="rounded-[2rem] bg-white p-2 border border-cream-300 shadow-sm hover:border-blue-200 transition-organic flex flex-col">
              <div className="rounded-[calc(2rem-0.5rem)] overflow-hidden aspect-[4/3] relative">
                <img
                  src={`${import.meta.env.BASE_URL}tutor_workspace.jpg`}
                  alt="Рабочий стол репетитора"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-5.5 space-y-1">
                <span className="text-[10px] text-blue-600 uppercase font-mono font-bold tracking-wider">Инструмент репетитора</span>
                <h4 className="text-base font-serif font-bold text-stone-900">Организованное рабочее пространство</h4>
                <p className="text-xs text-stone-400 leading-normal">AcademicLink помогает сфокусироваться на преподавании.</p>
              </div>
            </div>

            {/* Card 3: Text review */}
            <div className="rounded-[2rem] bg-white p-6.5 border border-cream-300 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-organic">
              <p className="text-base text-stone-600 leading-relaxed font-medium">
                «СБП-оплата и проверка чеков — это было моей главной болью. Родители забывали оплатить, а мне было неудобно напоминать. Бот вежливо высылает QR-код родителю сам сразу после занятия. Это спасение.»
              </p>
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-cream-200">
                <div className="w-10 h-10 rounded-full bg-[#EADFD3] flex items-center justify-center font-bold text-stone-700 text-sm">
                  ИК
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Игорь Кузнецов</h4>
                  <span className="text-xs text-stone-400 font-mono">@kuznetsov_phys · Физика</span>
                </div>
              </div>
            </div>

            {/* Card 4: Photo card (Calendar) */}
            <div className="rounded-[2rem] bg-white p-2 border border-cream-300 shadow-sm hover:border-blue-200 transition-organic flex flex-col">
              <div className="rounded-[calc(2rem-0.5rem)] overflow-hidden aspect-[4/3] relative">
                <img
                  src={`${import.meta.env.BASE_URL}calendar_schedule.jpg`}
                  alt="Интеграция с календарем"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-5.5 space-y-1">
                <span className="text-[10px] text-blue-600 uppercase font-mono font-bold tracking-wider">Умный календарь</span>
                <h4 className="text-base font-serif font-bold text-stone-900">Google синхронизация без сбоев</h4>
                <p className="text-xs text-stone-400 leading-normal">Запись идет только на свободные от ваших личных дел слоты.</p>
              </div>
            </div>

            {/* Card 5: Text review */}
            <div className="rounded-[2rem] bg-white p-6.5 border border-cream-300 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-organic">
              <p className="text-base text-stone-600 leading-relaxed font-medium">
                «Ученики перестали опаздывать и переносить уроки за 15 минут до начала. Напоминание в Telegram со ссылкой на Zoom приходит за 2 часа. Родители очень хвалят такой сервис, а моя дисциплина уроков выросла.»
              </p>
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-cream-200">
                <div className="w-10 h-10 rounded-full bg-[#EADFD3] flex items-center justify-center font-bold text-stone-700 text-sm">
                  СР
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Светлана Р.</h4>
                  <span className="text-xs text-stone-400 font-mono">@svetlana_eng · Английский</span>
                </div>
              </div>
            </div>

            {/* Card 6: Photo card (Notes) */}
            <div className="rounded-[2rem] bg-white p-2 border border-cream-300 shadow-sm hover:border-blue-200 transition-organic flex flex-col">
              <div className="rounded-[calc(2rem-0.5rem)] overflow-hidden aspect-[4/3] relative">
                <img
                  src={`${import.meta.env.BASE_URL}study_notes.jpg`}
                  alt="Материалы для обучения"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-5.5 space-y-1">
                <span className="text-[10px] text-blue-600 uppercase font-mono font-bold tracking-wider">Материалы обучения</span>
                <h4 className="text-base font-serif font-bold text-stone-900">Все уроки в едином порядке</h4>
                <p className="text-xs text-stone-400 leading-normal">Каждая карточка ученика хранит историю занятий и оплат.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 9. PRICING (Elegant Serif Single Plan layout) */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="pricing" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 text-center reveal-element">
          
          <span className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-bold block mb-4">Стоимость</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 max-w-xl mx-auto leading-tight mb-16 md:mb-24">
            Прозрачные условия без переплат
          </h2>

          <div className="max-w-md mx-auto rounded-[2.5rem] bg-white p-2 border border-cream-300 shadow-xl shadow-cream-400/10 relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold px-4.5 py-1.5 rounded-full shadow-md z-10 font-mono">
              Тариф «Безлимит»
            </span>

            <div className="rounded-[calc(2.5rem-0.5rem)] bg-cream-100/30 border border-cream-200 p-6 md:p-8 text-left space-y-6">
              
              <div className="text-center pb-6 border-b border-cream-200">
                <span className="text-sm text-stone-400 font-bold uppercase tracking-wider block">Премиальный доступ</span>
                <div className="mt-3 flex justify-center items-baseline gap-1">
                  <span className="text-5xl font-bold font-serif text-stone-900">790 ₽</span>
                  <span className="text-sm font-semibold text-stone-400">/ месяц</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full inline-block mt-4">
                  14 дней тестового доступа бесплатно
                </span>
              </div>

              {/* Benefits list */}
              <div className="space-y-4 py-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-sm md:text-base text-stone-700">Синхронизация с <strong>Google Календарём</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-sm md:text-base text-stone-700">Неограниченное число учеников и записей</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-sm md:text-base text-stone-700">Автоматические напоминания в Telegram</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-sm md:text-base text-stone-700">Формирование платежных QR-кодов СБП</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-sm md:text-base text-stone-700">Персональный WebApp для учеников</span>
                </div>
              </div>

              <a
                href={botLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm md:text-base font-bold text-white text-center shadow-md hover:shadow-lg transition-organic block"
              >
                Начать бесплатный период
              </a>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 10. FAQ (Accordions in cream design style) */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="max-w-[900px] mx-auto px-6 md:px-12 py-24 md:py-32 text-center reveal-element">
          
          <span className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-bold block mb-4">Помощь</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight mb-16 md:mb-24">
            Часто задаваемые вопросы
          </h2>

          <div className="space-y-4.5 text-left">
            {faqData.map((item, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="rounded-2xl bg-white border border-cream-300 overflow-hidden shadow-sm hover:border-blue-200 transition-organic">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 md:px-7 py-5 flex items-center justify-between text-left text-base sm:text-lg font-serif font-bold text-stone-850 hover:bg-cream-100/50 transition-colors cursor-pointer gap-4"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" strokeWidth={1.5} />
                      {item.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={2} />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={2} />
                    )}
                  </button>
                  <div
                    className={`transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                      isOpen ? 'max-h-[300px] opacity-100 border-t border-cream-200' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 md:px-7 py-5.5 text-sm md:text-base text-stone-500 leading-relaxed bg-cream-100/30">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 11. FOOTER (With card and copyright links) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <footer className="relative bg-white border-t border-cream-300 pt-20 md:pt-28 pb-12 md:pb-16 text-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-16">

          {/* Call to action double bezel container */}
          <div className="max-w-3xl mx-auto reveal-element">
            <div className="rounded-[2.5rem] bg-cream-100/80 p-2 border border-cream-300">
              <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-8 md:p-14 border border-cream-200 shadow-sm space-y-6 relative overflow-hidden">
                
                {/* Floating doodles inside footer CTA */}
                <SquiggleDoodle className="absolute top-8 left-8 text-stone-300/40 w-12 h-6" />
                <StarDoodle className="absolute bottom-10 right-10 text-amber-500/30 w-10 h-10" />

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
                  Начните автоматизацию занятий прямо сейчас
                </h3>
                <p className="text-sm md:text-base text-stone-500 max-w-xl mx-auto leading-relaxed">
                  Забудьте о бесконечных ручных сверках банковских карт и рутинной рассылке ссылок. Подключите вашего бота всего за 3 минуты.
                </p>

                <div className="pt-4">
                  <a
                    href={botLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-sm md:text-base font-bold text-white transition-organic hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4 fill-white text-blue-600" />
                    <span>Подключить бота бесплатно</span>
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                      <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright section */}
          <div className="pt-10 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/15">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-serif font-bold tracking-tight text-stone-900">AcademicLink</span>
            </div>

            <div className="flex flex-wrap gap-5 md:gap-8 text-xs font-bold uppercase tracking-wider text-stone-400 justify-center">
              <a href="#problems" onClick={(e) => handleScrollToSection(e, 'problems')} className="hover:text-stone-600 transition-colors">Проблемы</a>
              <a href="#how-it-works" onClick={(e) => handleScrollToSection(e, 'how-it-works')} className="hover:text-stone-600 transition-colors">Как устроен</a>
              <a href="#subjects" onClick={(e) => handleScrollToSection(e, 'subjects')} className="hover:text-stone-600 transition-colors">Предметы</a>
              <a href="#features" onClick={(e) => handleScrollToSection(e, 'features')} className="hover:text-stone-600 transition-colors">Возможности</a>
            </div>

            <span className="text-xs text-stone-400">
              © 2026 AcademicLink. Все права защищены.
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}
