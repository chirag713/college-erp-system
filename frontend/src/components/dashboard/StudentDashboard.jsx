import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Download, UploadCloud, AlertCircle, CheckCircle2 } from 'lucide-react';
import NoticesModule from './modules/NoticesModule';

export default function StudentDashboard({ activeTab }) {
  const [fileSelected, setFileSelected] = useState(null);
  const [appSubmitted, setAppSubmitted] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileSelected(e.target.files[0].name);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setAppSubmitted(true);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h2>
            <p className="text-indigo-100 max-w-lg">
              You have 2 upcoming assignments due this week and your overall attendance is looking great. Keep up the good work!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Attendance</p>
                <p className="text-2xl font-extrabold text-slate-900">92.4%</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Current CGPA</p>
                <p className="text-2xl font-extrabold text-slate-900">3.84</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Pending Tasks</p>
                <p className="text-2xl font-extrabold text-slate-900">4 Due</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admissions Tab */}
      {activeTab === 'admissions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <UploadCloud className="w-6 h-6 text-indigo-500" />
              Admission Application Form
            </h3>
            
            {appSubmitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-2xl text-center text-emerald-800 animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <span className="text-2xl font-bold block mb-2">Application Uploaded!</span>
                <p className="text-emerald-600">Your submission package has been safely queued for review.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Desired Course</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                      <option>Computer Science Engineering</option>
                      <option>Mechanical Engineering</option>
                      <option>Electrical Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Passing Year</label>
                    <input type="text" defaultValue="2026" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Upload Academic Marksheet (PDF)</label>
                  <label className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer bg-slate-50 group">
                    <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-3 transition-colors" />
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-700">
                      {fileSelected ? `📄 Selected: ${fileSelected}` : 'Click to upload or drag and drop'}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">PDF up to 10MB</span>
                  </label>
                </div>
                <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
                  Submit Application
                </button>
              </form>
            )}
          </div>
          
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Live Review Tracking
            </h3>
            <div className={`p-5 rounded-2xl text-sm font-medium border transition-all ${
              appSubmitted 
                ? 'bg-amber-50 border-amber-200 text-amber-800' 
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              Status: <span className="font-bold text-base block mt-1">{appSubmitted ? 'Pending Evaluation ⏳' : 'Awaiting Submission'}</span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 ring-4 ring-emerald-50"></div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Account Created</p>
                  <p className="text-xs text-slate-500 mt-0.5">Profile setup complete</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${appSubmitted ? 'bg-indigo-500 ring-4 ring-indigo-50' : 'bg-slate-300'}`}></div>
                <div>
                  <p className={`text-sm font-semibold ${appSubmitted ? 'text-slate-800' : 'text-slate-500'}`}>Application Submitted</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5"></div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Under Review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Academics Tab (Mockup) */}
      {activeTab === 'academics' && (
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Current Semester Courses</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4 rounded-tl-xl">Course Code</th>
                  <th className="p-4">Course Name</th>
                  <th className="p-4">Credits</th>
                  <th className="p-4 rounded-tr-xl">Current Grade</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono text-slate-600">CS301</td>
                  <td className="p-4 font-semibold text-slate-900">Data Structures & Algorithms</td>
                  <td className="p-4 text-slate-600">4</td>
                  <td className="p-4"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg font-bold">A</span></td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono text-slate-600">CS302</td>
                  <td className="p-4 font-semibold text-slate-900">Database Management Systems</td>
                  <td className="p-4 text-slate-600">3</td>
                  <td className="p-4"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg font-bold">A-</span></td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono text-slate-600">MA201</td>
                  <td className="p-4 font-semibold text-slate-900">Discrete Mathematics</td>
                  <td className="p-4 text-slate-600">3</td>
                  <td className="p-4"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold">B+</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Financials Tab (Mockup) */}
      {activeTab === 'financials' && (
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">Fee Invoices</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors">
              <Download className="w-4 h-4" /> Download Statement
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-5 border border-slate-100 rounded-2xl flex items-center justify-between hover:border-indigo-100 transition-colors">
              <div>
                <p className="font-bold text-slate-900">Fall Semester 2026 Tuition</p>
                <p className="text-sm text-slate-500 mt-1">Due: Aug 15, 2026</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-lg font-bold text-slate-900">$4,500.00</p>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-wider">Paid</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notices' && <NoticesModule role="student" />}
    </div>
  );
}
