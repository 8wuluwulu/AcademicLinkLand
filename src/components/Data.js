// Mock data representing a rich state for AcademicLink CRM
// Easily bindable with a Python (FastAPI) REST API backend

export const initialStudents = [
  {
    id: "std-1",
    name: "Alexander Wright",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
    email: "alexander.wright@gmail.com",
    course: "A-Level Physics",
    grade: "Grade 12",
    parentName: "Sarah Wright",
    telegramHandle: "@alex_wright_edu",
    telegramConnected: true,
    status: "Active",
    pendingPayment: 180,
    hoursTutored: 24,
    nextLesson: "Today, 4:00 PM",
  },
  {
    id: "std-2",
    name: "Sophia Martinez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    email: "sophia.m@hotmail.com",
    course: "AP Calculus BC",
    grade: "Grade 11",
    parentName: "Roberto Martinez",
    telegramHandle: "@sophia_mtz",
    telegramConnected: true,
    status: "Active",
    pendingPayment: 0,
    hoursTutored: 42,
    nextLesson: "Tomorrow, 2:30 PM",
  },
  {
    id: "std-3",
    name: "Benjamin Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    email: "b.chen@outlook.com",
    course: "SAT Prep (Math)",
    grade: "Grade 11",
    parentName: "Linda Chen",
    telegramHandle: "@benchen_sat",
    telegramConnected: false,
    status: "Active",
    pendingPayment: 320,
    hoursTutored: 12,
    nextLesson: "Today, 6:00 PM",
  },
  {
    id: "std-4",
    name: "Emma Watson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
    email: "emma.watson@school.edu",
    course: "GCSE Chemistry",
    grade: "Grade 10",
    parentName: "David Watson",
    telegramHandle: "@emma_watson_gcse",
    telegramConnected: true,
    status: "Pending",
    pendingPayment: 90,
    hoursTutored: 8,
    nextLesson: "Friday, 4:30 PM",
  },
  {
    id: "std-5",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    email: "liam.oconnor@gmail.com",
    course: "IB Mathematics HL",
    grade: "Grade 12",
    parentName: "Fiona O'Connor",
    telegramHandle: "@liam_oc",
    telegramConnected: true,
    status: "Active",
    pendingPayment: 0,
    hoursTutored: 36,
    nextLesson: "Next Monday, 3:00 PM",
  }
];

export const initialSchedule = [
  {
    id: "les-1",
    studentId: "std-1",
    studentName: "Alexander Wright",
    subject: "A-Level Physics (Electromagnetism)",
    time: "4:00 PM - 5:30 PM",
    date: "Today",
    status: "Confirmed",
    telegramReminded: true
  },
  {
    id: "les-2",
    studentId: "std-3",
    studentName: "Benjamin Chen",
    subject: "SAT Prep (Algebra & Trigonometry)",
    time: "6:00 PM - 7:30 PM",
    date: "Today",
    status: "Pending",
    telegramReminded: false
  },
  {
    id: "les-3",
    studentId: "std-2",
    studentName: "Sophia Martinez",
    subject: "AP Calculus BC (Integration Techniques)",
    time: "2:30 PM - 4:00 PM",
    date: "Tomorrow",
    status: "Confirmed",
    telegramReminded: true
  },
  {
    id: "les-4",
    studentId: "std-4",
    studentName: "Emma Watson",
    subject: "GCSE Chemistry (Organic Compounds)",
    time: "4:30 PM - 6:00 PM",
    date: "Friday",
    status: "Rescheduled",
    telegramReminded: false
  }
];

export const templateVariables = [
  { tag: "{{student_name}}", description: "Student's Full Name" },
  { tag: "{{parent_name}}", description: "Parent's Full Name" },
  { tag: "{{lesson_time}}", description: "Scheduled Lesson Time" },
  { tag: "{{course_name}}", description: "Name of Course" },
  { tag: "{{pending_payment}}", description: "Pending Invoice Amount" }
];

export const defaultTemplates = [
  {
    id: "tpl-1",
    name: "Lesson Reminder",
    text: "Hello {{parent_name}}, this is a friendly reminder that {{student_name}} has a {{course_name}} session scheduled for {{lesson_time}} today. Please ensure they are ready. Thank you!"
  },
  {
    id: "tpl-2",
    name: "Payment Notification",
    text: "Hi {{parent_name}}, a session invoice for {{student_name}} is pending. The total outstanding is ${{pending_payment}} for recent {{course_name}} hours. You can pay via bank transfer. Thank you!"
  },
  {
    id: "tpl-3",
    name: "Holiday Schedule Changes",
    text: "Dear AcademicLink Students and Parents, please note that there will be no sessions held during the national holiday next Monday. We will resume all scheduled {{course_name}} hours from Tuesday. Happy holidays!"
  }
];
