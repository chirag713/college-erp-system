import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Modern Interactive Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo / Brand Indicator */}
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-200">
                Ω
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-slate-900 bg-clip-text text-transparent">
                EduPulse <span className="text-xs font-semibold text-indigo-500 tracking-normal px-2 py-0.5 bg-indigo-50 rounded-full ml-1">ERP</span>
              </span>
            </Link>

            {/* Navigation Links with Tailwind States */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-all duration-200"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-all duration-200"
              >
                Register
              </Link>
              <Link 
                to="/dashboard" 
                className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-95 shadow-sm shadow-indigo-100 transition-all duration-200"
              >
                Dashboard
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Dynamic Page Main Content Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 min-h-[400px] overflow-hidden transition-all duration-300">
          {children}
        </div>
      </main>

      {/* Clean Footer Element */}
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-200/60 bg-white mt-auto">
        &copy; {new Date().getFullYear()} EduPulse Management System. Built module by module.
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-16 min-h-[400px] bg-gradient-to-b from-white to-slate-50/50">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
        ✨ System Environment Online
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-2xl leading-tight">
        Welcome to the <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">College ERP Portal</span>
      </h1>
      <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
        Manage admissions, track academic workflows, and view real-time student updates effortlessly within a unified terminal hub.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link to="/register" className="px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 shadow-md transition-all duration-200">
          Get Started
        </Link>
        <Link to="/login" className="px-6 py-3 bg-white text-slate-700 font-medium border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200">
          Sign In
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with Main Layout */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        
        {/* Dashboard has its own Layout (Sidebar + Topbar) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;