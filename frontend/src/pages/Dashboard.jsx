import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import FacultyDashboard from '../components/dashboard/FacultyDashboard';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', role: '' });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('userName');
    const id = localStorage.getItem('userId');

    if (!token) {
      navigate('/login');
    } else {
      setUser({ id, name, role });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user.role) return null; // Or a loading spinner

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar Component */}
      <Sidebar 
        role={user.role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout}
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-bold text-slate-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">
              Academic Year: <strong className="text-slate-800">2026-2027</strong>
            </span>
          </div>
        </header>

        {/* Dynamic Dashboard Views */}
        <main className="p-8">
          {user.role === 'student' && <StudentDashboard activeTab={activeTab} />}
          {user.role === 'faculty' && <FacultyDashboard activeTab={activeTab} />}
          {user.role === 'admin' && <AdminDashboard activeTab={activeTab} />}
        </main>
      </div>
    </div>
  );
}