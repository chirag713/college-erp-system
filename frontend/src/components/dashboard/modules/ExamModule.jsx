import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Loader2, AlertCircle, FileText, CheckCircle, Download, BookOpen } from 'lucide-react';

export default function ExamModule({ role, user }) {
  const [activeSubTab, setActiveSubTab] = useState('schedules'); // schedules, admit-cards, grades
  const [schedules, setSchedules] = useState([]);
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeSubTab]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        if (activeSubTab === 'schedules') {
          setSchedules([
            { _id: '1', exam: { name: 'Mid-Term 2026' }, subject: { name: 'Intro to CS' }, date: '2026-10-15', time: '10:00 AM', room: 'Hall A' },
            { _id: '2', exam: { name: 'Mid-Term 2026' }, subject: { name: 'Calculus II' }, date: '2026-10-17', time: '02:00 PM', room: 'Hall B' },
          ]);
        } else if (activeSubTab === 'grades') {
          setGrades([
            { _id: '1', exam: { name: 'Mid-Term 2026' }, subject: { name: 'Intro to CS' }, student: { name: 'John Doe' }, marksObtained: 85, maxMarks: 100, grade: 'A' },
            { _id: '2', exam: { name: 'Mid-Term 2026' }, subject: { name: 'Calculus II' }, student: { name: 'John Doe' }, marksObtained: 72, maxMarks: 100, grade: 'B' },
          ]);
        }
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Exam Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage exam schedules, admit cards, and grades.</p>
        </div>
        
        {role === 'admin' && activeSubTab === 'schedules' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel' : 'Schedule Exam'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveSubTab('schedules')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'schedules' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Schedules
        </button>
        {(role === 'student' || role === 'admin') && (
          <button
            onClick={() => setActiveSubTab('admit-cards')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'admit-cards' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Admit Cards
          </button>
        )}
        <button
          onClick={() => setActiveSubTab('grades')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'grades' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Grades
        </button>
      </div>

      {/* Add Form (Admin Only) */}
      {showAddForm && role === 'admin' && activeSubTab === 'schedules' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Create Schedule</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Exam</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Mid-Term 2026</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Intro to CS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input type="date" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time & Room</label>
              <div className="flex gap-2">
                <input type="time" required className="w-1/2 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                <input type="text" placeholder="Room" required className="w-1/2 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800">
                Save Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Area */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
            <p>Loading {activeSubTab}...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p>{error}</p>
          </div>
        ) : activeSubTab === 'admit-cards' ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <FileText className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Admit Card Download</h3>
            {role === 'student' ? (
              <button className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 transition-colors">
                <Download className="w-5 h-5" /> Download Mid-Term 2026 Admit Card
              </button>
            ) : (
              <p>Admins can generate admit cards from the detailed view.</p>
            )}
          </div>
        ) : activeSubTab === 'schedules' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Exam</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Room</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {schedules.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{item.exam.name}</td>
                    <td className="p-4 text-slate-600">{item.subject.name}</td>
                    <td className="p-4 text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {item.date} at {item.time}</span>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{item.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Exam</th>
                  <th className="p-4">Subject</th>
                  {role !== 'student' && <th className="p-4">Student</th>}
                  <th className="p-4 text-center">Marks</th>
                  <th className="p-4 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {grades.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{item.exam.name}</td>
                    <td className="p-4 text-slate-600">{item.subject.name}</td>
                    {role !== 'student' && <td className="p-4 text-slate-600">{item.student.name}</td>}
                    <td className="p-4 text-center font-medium">
                      {item.marksObtained} / {item.maxMarks}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                        item.grade === 'A' || item.grade === 'B' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
