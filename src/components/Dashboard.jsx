import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Send, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Bell, 
  Plus, 
  ChevronRight, 
  Check, 
  MessageSquare, 
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  X,
  UserPlus,
  CalendarPlus,
  RefreshCw,
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { 
  initialStudents, 
  initialSchedule, 
  templateVariables, 
  defaultTemplates 
} from './Data';

export default function Dashboard({ onGoBack }) {
  // Sidebar states
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');
  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3 },
    { name: 'Students', icon: Users },
    { name: 'Schedule', icon: Calendar },
    { name: 'Telegram Broadcasts', icon: Send },
    { name: 'Settings', icon: Settings },
  ];

  // Core Data States
  const [students, setStudents] = useState(initialStudents);
  const [schedule, setSchedule] = useState(initialSchedule);
  
  // Tab control in workspace module
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('students');

  // Bot Status Toggle
  const [botActive, setBotActive] = useState(true);
  const [messagesSentToday, setMessagesSentToday] = useState(28);

  // Search filter for Student Directory
  const [searchQuery, setSearchQuery] = useState('');

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Time state for Header
  const [currentTime, setCurrentTime] = useState(new Date());

  // Modal States
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedStudentForReschedule, setSelectedStudentForReschedule] = useState(null);

  // Form states - Add Student
  const [newStudent, setNewStudent] = useState({
    name: '',
    course: 'AP Calculus BC',
    email: '',
    parentName: '',
    telegramHandle: '',
    pendingPayment: 0
  });

  // Form states - Add Lesson
  const [newLesson, setNewLesson] = useState({
    studentId: '',
    subject: '',
    time: '4:00 PM - 5:30 PM',
    date: 'Today',
  });

  // Form states - Reschedule
  const [rescheduleData, setRescheduleData] = useState({
    lessonId: '',
    newTime: '4:00 PM - 5:30 PM',
    newDate: 'Today'
  });

  // Form states - Telegram Broadcast Template
  const [broadcastTemplate, setBroadcastTemplate] = useState(defaultTemplates[0].text);
  const [selectedTemplateId, setSelectedTemplateId] = useState(defaultTemplates[0].id);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper: Trigger custom animated toast
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Action: Add Student
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.parentName) {
      addToast("Please fill in required student fields.", "error");
      return;
    }
    const created = {
      id: `std-${students.length + 1}`,
      name: newStudent.name,
      avatar: "", // Initials will render fallback
      email: newStudent.email || "not-provided@gmail.com",
      course: newStudent.course,
      grade: "Grade 11",
      parentName: newStudent.parentName,
      telegramHandle: newStudent.telegramHandle || "@not_connected",
      telegramConnected: !!newStudent.telegramHandle,
      status: "Active",
      pendingPayment: Number(newStudent.pendingPayment) || 0,
      hoursTutored: 0,
      nextLesson: "Not scheduled"
    };

    setStudents((prev) => [created, ...prev]);
    setIsAddStudentModalOpen(false);
    setNewStudent({
      name: '',
      course: 'AP Calculus BC',
      email: '',
      parentName: '',
      telegramHandle: '',
      pendingPayment: 0
    });
    addToast(`Student ${created.name} registered successfully!`);
  };

  // Action: Add Lesson
  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!newLesson.studentId || !newLesson.subject) {
      addToast("Please select a student and define subject.", "error");
      return;
    }

    const matchedStudent = students.find((s) => s.id === newLesson.studentId);
    if (!matchedStudent) return;

    const created = {
      id: `les-${schedule.length + 1}`,
      studentId: newLesson.studentId,
      studentName: matchedStudent.name,
      subject: newLesson.subject,
      time: newLesson.time,
      date: newLesson.date,
      status: "Confirmed",
      telegramReminded: false
    };

    // Update schedules
    setSchedule((prev) => [created, ...prev]);
    
    // Update student next lesson time in list
    setStudents(prev => prev.map(s => {
      if (s.id === matchedStudent.id) {
        return { ...s, nextLesson: `${newLesson.date}, ${newLesson.time.split(' - ')[0]}` };
      }
      return s;
    }));

    setIsAddLessonModalOpen(false);
    setNewLesson({
      studentId: '',
      subject: '',
      time: '4:00 PM - 5:30 PM',
      date: 'Today'
    });
    addToast(`New lesson scheduled for ${matchedStudent.name}!`);
  };

  // Action: Reschedule Lesson Submit
  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleData.lessonId) return;

    setSchedule((prev) => prev.map((item) => {
      if (item.id === rescheduleData.lessonId) {
        return { 
          ...item, 
          time: rescheduleData.newTime, 
          date: rescheduleData.newDate,
          status: "Rescheduled",
          telegramReminded: false
        };
      }
      return item;
    }));

    // Find student name to display in Toast
    const lessonObj = schedule.find(l => l.id === rescheduleData.lessonId);
    if (lessonObj) {
      addToast(`Lesson rescheduled for ${lessonObj.studentName}! Bot notification queued.`);
    }

    setIsRescheduleModalOpen(false);
  };

  // Action: Open Reschedule Modal
  const openRescheduleModal = (lesson) => {
    setRescheduleData({
      lessonId: lesson.id,
      newTime: lesson.time,
      newDate: lesson.date
    });
    setSelectedStudentForReschedule(lesson.studentName);
    setIsRescheduleModalOpen(true);
  };

  // Action: Trigger Telegram alert manually
  const triggerTelegramReminder = (student) => {
    if (!botActive) {
      addToast("Bot alerts are paused. Reactivate Telegram sync in Settings first.", "error");
      return;
    }
    if (!student.telegramConnected) {
      addToast(`Telegram is not connected for parent of ${student.name}.`, "error");
      return;
    }

    // Simulate sending message
    setMessagesSentToday((prev) => prev + 1);
    addToast(`Telegram alert sent successfully to ${student.parentName} (${student.telegramHandle})!`);

    // Mark as reminded in schedule list
    setSchedule(prev => prev.map(item => {
      if (item.studentId === student.id) {
        return { ...item, telegramReminded: true };
      }
      return item;
    }));
  };

  // Action: Change Status of scheduled lesson
  const toggleLessonStatus = (lessonId, currentStatus) => {
    const nextStatus = currentStatus === 'Confirmed' ? 'Pending' : currentStatus === 'Pending' ? 'Rescheduled' : 'Confirmed';
    setSchedule(prev => prev.map(item => {
      if (item.id === lessonId) {
        return { ...item, status: nextStatus };
      }
      return item;
    }));
    addToast(`Lesson status updated to ${nextStatus}.`);
  };

  // Action: Send Telegram Broadcast via Form
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTemplate.trim()) {
      addToast("Broadcast template cannot be empty.", "error");
      return;
    }
    if (!botActive) {
      addToast("Bot is paused. Please activate Telegram bot sync first.", "error");
      return;
    }

    // Count how many students have telegram connected
    const connectedRecipients = students.filter(s => s.telegramConnected && s.status === 'Active');
    
    if (connectedRecipients.length === 0) {
      addToast("No active students with connected Telegram handles found.", "error");
      return;
    }

    setMessagesSentToday((prev) => prev + connectedRecipients.length);
    addToast(`Broadcast sent successfully to ${connectedRecipients.length} connected parent contacts!`);
  };

  // Action: Select Template
  const handleSelectTemplate = (templateId) => {
    const template = defaultTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplateId(templateId);
      setBroadcastTemplate(template.text);
      addToast(`Loaded "${template.name}" template.`);
    }
  };

  // Insert Variable Tag into template input
  const insertTag = (tag) => {
    setBroadcastTemplate((prev) => prev + " " + tag);
    addToast(`Inserted variable tag: ${tag}`);
  };

  // Filter students based on search query
  const filteredStudents = students.filter((s) => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.parentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date time
  const formatDateTime = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row overflow-x-hidden font-sans">
      {/* Toast notifications popup area */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`p-4 rounded-xl border shadow-xl flex items-center gap-3 w-80 pointer-events-auto animate-status-pulse transition-custom ${
              toast.type === 'error' 
                ? 'bg-red-950/80 border-red-500/20 text-red-200' 
                : 'bg-slate-900/90 border-orange-500/20 text-slate-200'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
            )}
            <p className="text-xs font-medium leading-normal">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-white/10 flex flex-col justify-between p-6 flex-shrink-0 z-30">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                AcademicLink
              </span>
            </div>
            <button 
              onClick={onGoBack} 
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebar === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveSidebar(item.name);
                    // Also switch workspace tabs when navigation demands
                    if (item.name === 'Telegram Broadcasts') {
                      setActiveWorkspaceTab('telegram');
                    } else if (item.name === 'Students') {
                      setActiveWorkspaceTab('students');
                    } else {
                      setActiveWorkspaceTab('students');
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group ${
                    isActive 
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/10' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} strokeWidth={1.5} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Profile Card and Back Link */}
        <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80" 
              alt="Tutor Avatar"
              className="w-10 h-10 rounded-full border border-white/10 bg-slate-900 object-cover"
            />
            <div>
              <div className="text-xs font-bold text-white">Dr. Sarah Jenkins</div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-status-pulse" />
                Senior Physics Tutor
              </div>
            </div>
          </div>

          <button 
            onClick={onGoBack} 
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Return to Landing</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-slate-950/50 backdrop-blur-md">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              {activeSidebar === 'Dashboard' ? 'Dashboard Overview' : activeSidebar}
            </h1>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5 font-mono">
              {formatDateTime(currentTime)}
            </div>
          </div>

          {/* Header Quick Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAddStudentModalOpen(true)}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all duration-200 active:scale-[0.98]"
            >
              <UserPlus className="w-3.5 h-3.5 text-orange-400" />
              <span>+ Add Student</span>
            </button>

            <button
              onClick={() => setIsAddLessonModalOpen(true)}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-xs font-semibold text-white transition-all duration-200 shadow-md shadow-orange-500/10 active:scale-[0.98]"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-white" />
              <span>+ New Lesson</span>
            </button>

            <div className="relative w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center cursor-pointer transition-colors">
              <Bell className="w-4 h-4 text-slate-400 hover:text-white" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
            </div>
          </div>
        </header>

        {/* Content Body Grid */}
        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          
          {/* Dashboard Metrics: Bento-Grid style */}
          {activeSidebar === 'Dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Box 1: Active Students Count (Double Bezel architecture) */}
              <div className="rounded-[2rem] bg-slate-900/40 p-1.5 ring-1 ring-white/10 shadow-lg flex flex-col">
                <div className="rounded-[calc(2rem-0.375rem)] bg-slate-950 border border-white/5 p-6 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Roster Capacity</span>
                    <span className="w-6 h-6 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-orange-400" />
                    </span>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-4xl font-extrabold tracking-tight text-white font-display">
                      {students.length} <span className="text-sm font-semibold text-slate-500">active</span>
                    </div>
                    <p className="mt-2 text-[10px] text-slate-400 leading-normal">
                      Full capacity targets 20 students. 2 remaining slots open for booking requests.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-semibold">GROWTH TARIFF</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +15% this quarter
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 2: Telegram Bot Status Sync */}
              <div className="rounded-[2rem] bg-slate-900/40 p-1.5 ring-1 ring-white/10 shadow-lg flex flex-col">
                <div className="rounded-[calc(2rem-0.375rem)] bg-slate-950 border border-white/5 p-6 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Bot Status Sync</span>
                    <button 
                      onClick={() => setBotActive(!botActive)}
                      className="text-slate-400 hover:text-white transition-colors"
                      title={botActive ? "Pause alerts" : "Activate alerts"}
                    >
                      {botActive ? (
                        <ToggleRight className="w-8 h-8 text-orange-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-slate-600" />
                      )}
                    </button>
                  </div>

                  <div className="mt-6">
                    <div className="text-4xl font-extrabold tracking-tight text-white font-display">
                      {messagesSentToday} <span className="text-sm font-semibold text-slate-500">alerts</span>
                    </div>
                    <p className="mt-2 text-[10px] text-slate-400 leading-normal">
                      Webhook is synced with parent chats. Current ping: <span className="text-emerald-400 font-mono">14ms</span> (TLS 1.3).
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-semibold">BOT WEBHOOK STATUS</span>
                    <span className={`flex items-center gap-1.5 font-bold uppercase ${botActive ? 'text-emerald-400' : 'text-red-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${botActive ? 'bg-emerald-500 animate-status-pulse' : 'bg-red-500'}`} />
                      {botActive ? 'Webhook Sync Active' : 'Webhook Sync Paused'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 3: Today's Schedule Quick View */}
              <div className="rounded-[2rem] bg-slate-900/40 p-1.5 ring-1 ring-white/10 shadow-lg flex flex-col">
                <div className="rounded-[calc(2rem-0.375rem)] bg-slate-950 border border-white/5 p-6 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Upcoming Today</span>
                    <span className="text-[9px] font-semibold font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {schedule.filter(l => l.date === 'Today').length} slots
                    </span>
                  </div>

                  <div className="mt-4 flex-1 space-y-3 overflow-y-auto max-h-[140px] pr-1">
                    {schedule.filter(l => l.date === 'Today').map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/30 border border-white/5 text-xs">
                        <div>
                          <div className="font-bold text-white">{lesson.studentName}</div>
                          <div className="text-[9px] text-slate-400">{lesson.time.split(' - ')[0]} • {lesson.subject.split(' (')[0]}</div>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleLessonStatus(lesson.id, lesson.status)}
                            className={`px-2 py-0.5 rounded-md text-[9px] font-bold border transition-colors ${
                              lesson.status === 'Confirmed' 
                                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                                : lesson.status === 'Pending' 
                                ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' 
                                : 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                            }`}
                            title="Click to toggle status"
                          >
                            {lesson.status}
                          </button>
                        </div>
                      </div>
                    ))}
                    {schedule.filter(l => l.date === 'Today').length === 0 && (
                      <div className="text-center text-xs text-slate-500 py-6">No lessons scheduled for today.</div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Interactive Workspace Module (Tabs System) */}
          <div className="rounded-[2.5rem] bg-slate-900/40 p-2 border border-white/10">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-slate-950 border border-white/5 p-6 space-y-6">
              
              {/* Tab Header Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <div className="flex gap-2 p-0.5 rounded-xl bg-slate-900 border border-white/5 w-max">
                  <button
                    onClick={() => setActiveWorkspaceTab('students')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      activeWorkspaceTab === 'students' 
                        ? 'bg-orange-500 text-white shadow' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Student Directory
                  </button>
                  <button
                    onClick={() => setActiveWorkspaceTab('telegram')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      activeWorkspaceTab === 'telegram' 
                        ? 'bg-orange-500 text-white shadow' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Telegram Broadcast Center
                  </button>
                </div>

                {/* Filter and Search inside active tab */}
                {activeWorkspaceTab === 'students' && (
                  <div className="relative max-w-xs">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" strokeWidth={1.5} />
                    <input
                      type="text"
                      placeholder="Search students or courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 bg-slate-900 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                    />
                  </div>
                )}
              </div>

              {/* Tab Content 1: Student Directory & Management */}
              {activeWorkspaceTab === 'students' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-500 uppercase tracking-widest font-bold">
                        <th className="pb-3.5 font-semibold">Student Name</th>
                        <th className="pb-3.5 font-semibold">Active Course</th>
                        <th className="pb-3.5 font-semibold">Parent & Telegram</th>
                        <th className="pb-3.5 font-semibold">Pending Payment</th>
                        <th className="pb-3.5 font-semibold">Hours Tutored</th>
                        <th className="pb-3.5 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="py-4.5">
                            <div className="flex items-center gap-3">
                              {student.avatar ? (
                                <img 
                                  src={student.avatar} 
                                  alt={student.name}
                                  className="w-8 h-8 rounded-full border border-white/10 bg-slate-800 object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-slate-300">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-white group-hover:text-orange-400 transition-colors">{student.name}</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{student.grade}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4.5">
                            <span className="font-semibold text-slate-300">{student.course}</span>
                          </td>
                          <td className="py-4.5">
                            <div>
                              <div className="font-medium text-slate-300">{student.parentName}</div>
                              <div className={`text-[10px] flex items-center gap-1.5 mt-0.5 font-mono ${student.telegramConnected ? 'text-indigo-400' : 'text-slate-500'}`}>
                                <Send className="w-3 h-3" />
                                {student.telegramHandle}
                              </div>
                            </div>
                          </td>
                          <td className="py-4.5">
                            {student.pendingPayment > 0 ? (
                              <span className="font-bold text-orange-400 font-mono">
                                ${student.pendingPayment}
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                                Paid
                              </span>
                            )}
                          </td>
                          <td className="py-4.5">
                            <span className="font-mono text-slate-300">{student.hoursTutored} hrs</span>
                          </td>
                          <td className="py-4.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Trigger Telegram message */}
                              <button
                                onClick={() => triggerTelegramReminder(student)}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/30 text-slate-400 hover:text-orange-400 transition-colors"
                                title="Send Telegram Alert Alert"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>

                              {/* Reschedule button */}
                              <button
                                onClick={() => {
                                  // Find the next scheduled lesson for this student
                                  const upcoming = schedule.find(l => l.studentId === student.id);
                                  if (upcoming) {
                                    openRescheduleModal(upcoming);
                                  } else {
                                    // Open Add Lesson modal with student preset
                                    setNewLesson(prev => ({ ...prev, studentId: student.id }));
                                    setIsAddLessonModalOpen(true);
                                  }
                                }}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-slate-300 text-slate-400 hover:text-white transition-colors text-[10px] font-semibold px-3 flex items-center gap-1"
                              >
                                <span>Reschedule</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredStudents.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-8 text-slate-500">
                            No students match your query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab Content 2: Telegram Broadcast Center */}
              {activeWorkspaceTab === 'telegram' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                  
                  {/* Broadcast compose template form */}
                  <form onSubmit={handleSendBroadcast} className="lg:col-span-8 space-y-4">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-2">Select Core Announcement Template</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {defaultTemplates.map((tpl) => (
                          <button
                            key={tpl.id}
                            type="button"
                            onClick={() => handleSelectTemplate(tpl.id)}
                            className={`p-3 text-left rounded-xl border transition-custom flex flex-col justify-between gap-2 h-24 ${
                              selectedTemplateId === tpl.id 
                                ? 'bg-orange-500/10 border-orange-500/40 text-white' 
                                : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span className="text-xs font-bold text-slate-200">{tpl.name}</span>
                            <span className="text-[10px] leading-relaxed line-clamp-2">{tpl.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Edit Broadcast Message Template</label>
                        <span className="text-[9px] text-slate-500 font-semibold font-mono">Use variable placeholders below</span>
                      </div>
                      
                      <textarea
                        value={broadcastTemplate}
                        onChange={(e) => setBroadcastTemplate(e.target.value)}
                        rows="6"
                        className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500/50 leading-relaxed font-mono"
                        placeholder="Hi {{parent_name}}, write your custom notification message here..."
                      />
                    </div>

                    {/* Variable tags inserter */}
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-2">Insert Dynamic Variables</span>
                      <div className="flex flex-wrap gap-2">
                        {templateVariables.map((variable) => (
                          <button
                            key={variable.tag}
                            type="button"
                            onClick={() => insertTag(variable.tag)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/30 text-slate-400 hover:text-orange-400 text-[10px] font-mono transition-colors flex flex-col text-left"
                            title={variable.description}
                          >
                            <span className="font-semibold">{variable.tag}</span>
                            <span className="text-[8px] text-slate-500 mt-0.5">{variable.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button
                        type="submit"
                        disabled={!botActive}
                        className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-semibold text-white transition-custom shadow-lg active:scale-[0.98] ${
                          botActive 
                            ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20 cursor-pointer' 
                            : 'bg-slate-800 border border-white/5 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Send Broadcast Alert to Connected Chats</span>
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                          <Send className="w-3 h-3 text-white" strokeWidth={2.5} />
                        </span>
                      </button>
                    </div>
                  </form>

                  {/* Broadcast helper preview log panel */}
                  <div className="lg:col-span-4 rounded-2xl bg-slate-900/30 border border-white/5 p-5 space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1.5">Broadcast Statistics</h4>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        AcademicLink CRM utilizes direct bot webhooks. Status variables will dynamically bind during execution.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-[9px] text-slate-500 block font-semibold uppercase">Total Recipients</span>
                        <div className="text-xl font-bold text-white mt-1">
                          {students.filter(s => s.telegramConnected && s.status === 'Active').length} <span className="text-xs font-normal text-slate-500">parents connected</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-[9px] text-slate-500 block font-semibold uppercase">Connection Reliability</span>
                        <div className="text-xl font-bold text-emerald-400 mt-1 flex items-baseline gap-1.5">
                          <span>100%</span>
                          <span className="text-[9px] text-slate-500 font-mono font-normal">Active API webhooks</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/10 text-xs">
                        <h5 className="font-semibold text-orange-400 mb-1 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Variables Syntax Warning
                        </h5>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          Always ensure variable syntax resembles double curly braces. Double check that parent telegram contacts remain valid prior to triggering.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* MODAL 1: ADD STUDENT (Glassmorphic) */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md">
          <div className="rounded-[2rem] bg-slate-900/60 p-2 ring-1 ring-white/15 max-w-md w-full shadow-2xl">
            <div className="rounded-[calc(2rem-0.5rem)] bg-slate-950 border border-white/5 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-orange-500" />
                  Register New Student
                </h3>
                <button 
                  onClick={() => setIsAddStudentModalOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-4 text-left">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Alexander Wright"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Active Course</label>
                    <select
                      value={newStudent.course}
                      onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                    >
                      <option>AP Calculus BC</option>
                      <option>A-Level Physics</option>
                      <option>SAT Prep (Math)</option>
                      <option>GCSE Chemistry</option>
                      <option>IB Mathematics HL</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Initial Deposit ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newStudent.pendingPayment || ''}
                      onChange={(e) => setNewStudent({...newStudent, pendingPayment: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Parent Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sarah Wright"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Parent Telegram Handle</label>
                    <input
                      type="text"
                      placeholder="@sarah_wright"
                      value={newStudent.telegramHandle}
                      onChange={(e) => setNewStudent({...newStudent, telegramHandle: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="sarah.w@gmail.com"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddStudentModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-semibold text-white shadow-md"
                  >
                    Register Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD LESSON (Glassmorphic) */}
      {isAddLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md">
          <div className="rounded-[2rem] bg-slate-900/60 p-2 ring-1 ring-white/15 max-w-md w-full shadow-2xl">
            <div className="rounded-[calc(2rem-0.5rem)] bg-slate-950 border border-white/5 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CalendarPlus className="w-4 h-4 text-orange-500" />
                  Schedule New Lesson
                </h3>
                <button 
                  onClick={() => setIsAddLessonModalOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddLesson} className="space-y-4 text-left">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Select Student *</label>
                  <select
                    required
                    value={newLesson.studentId}
                    onChange={(e) => setNewLesson({...newLesson, studentId: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  >
                    <option value="">-- Choose Student --</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.course})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Lesson Subject Topic *</label>
                  <input
                    type="text"
                    required
                    placeholder="AP Calculus BC: Particle Motion"
                    value={newLesson.subject}
                    onChange={(e) => setNewLesson({...newLesson, subject: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Date</label>
                    <select
                      value={newLesson.date}
                      onChange={(e) => setNewLesson({...newLesson, date: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50 font-mono"
                    >
                      <option>Today</option>
                      <option>Tomorrow</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Next Monday</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Time Range</label>
                    <select
                      value={newLesson.time}
                      onChange={(e) => setNewLesson({...newLesson, time: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50 font-mono"
                    >
                      <option>2:30 PM - 4:00 PM</option>
                      <option>4:00 PM - 5:30 PM</option>
                      <option>6:00 PM - 7:30 PM</option>
                      <option>10:00 AM - 11:30 AM</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddLessonModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-semibold text-white shadow-md"
                  >
                    Schedule Lesson
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: RESCHEDULE LESSON (Glassmorphic) */}
      {isRescheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md">
          <div className="rounded-[2rem] bg-slate-900/60 p-2 ring-1 ring-white/15 max-w-sm w-full shadow-2xl">
            <div className="rounded-[calc(2rem-0.5rem)] bg-slate-950 border border-white/5 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-orange-500" />
                  Reschedule Lesson
                </h3>
                <button 
                  onClick={() => setIsRescheduleModalOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-400 leading-normal">
                Modifying schedule slots for <span className="font-semibold text-white">{selectedStudentForReschedule}</span>. Auto-Telegram confirmation notifications will update trigger lists.
              </div>

              <form onSubmit={handleRescheduleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">New Date</label>
                    <select
                      value={rescheduleData.newDate}
                      onChange={(e) => setRescheduleData({...rescheduleData, newDate: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50 font-mono"
                    >
                      <option>Today</option>
                      <option>Tomorrow</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Next Monday</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">New Time Slot</label>
                    <select
                      value={rescheduleData.newTime}
                      onChange={(e) => setRescheduleData({...rescheduleData, newTime: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50 font-mono"
                    >
                      <option>2:30 PM - 4:00 PM</option>
                      <option>4:00 PM - 5:30 PM</option>
                      <option>6:00 PM - 7:30 PM</option>
                      <option>10:00 AM - 11:30 AM</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsRescheduleModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-semibold text-white shadow-md"
                  >
                    Confirm Change
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
