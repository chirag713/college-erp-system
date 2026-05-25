import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  FileText, 
  Settings, 
  CreditCard,
  LogOut,
  ChevronRight,
  Bell,
  Building2,
  BookMarked,
  User,
  CalendarDays,
  DollarSign,
  BookOpen,
  Home
} from 'lucide-react';

export default function Sidebar({ role, activeTab, setActiveTab, handleLogout, user }) {
  const adminTabs = [
    { id: 'overview', label: 'System Overview', icon: LayoutDashboard },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'courses', label: 'Courses', icon: BookMarked },
    { id: 'enrollments', label: 'Enrollments', icon: Users },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'directory', label: 'Directory', icon: Users },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'hostel', label: 'Hostel', icon: Home },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const facultyTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookMarked },
    { id: 'attendance', label: 'Attendance', icon: FileText },
    { id: 'results', label: 'Results', icon: FileText },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const studentTabs = [
    { id: 'overview', label: 'My Overview', icon: LayoutDashboard },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: FileText },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays },
    { id: 'financials', label: 'Financials', icon: CreditCard },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'hostel', label: 'Hostel', icon: Home },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const tabs = role === 'admin' ? adminTabs : role === 'faculty' ? facultyTabs : studentTabs;

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed top-0 left-0 overflow-y-auto">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="h-8 w-8 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-900">
          Ω
        </div>
        <span className="font-bold text-xl text-white tracking-tight">
          EduPulse
        </span>
      </div>

      {/* User Profile Summary */}
      <div className="p-6 border-b border-slate-800 bg-slate-800/30">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border border-slate-600">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-400 capitalize mt-0.5">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6 space-y-1">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-400' 
                  : 'hover:bg-slate-800/50 hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className={`text-sm font-medium ${isActive ? 'text-indigo-400' : ''}`}>
                  {tab.label}
                </span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-indigo-400" />}
            </button>
          );
        })}
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-semibold transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
