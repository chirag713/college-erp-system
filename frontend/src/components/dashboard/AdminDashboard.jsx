import React, { useState } from 'react';
import { Users, FileText, TrendingUp, DollarSign, Search, Filter, MoreVertical, Check, X } from 'lucide-react';
import DepartmentsModule from './modules/DepartmentsModule';
import CoursesModule from './modules/CoursesModule';
import EnrollmentsModule from './modules/EnrollmentsModule';
import NoticesModule from './modules/NoticesModule';
import DirectoryModule from './modules/DirectoryModule';
import FeeManagementModule from './modules/FeeManagementModule';
import TimetableModule from './modules/TimetableModule';
import LibraryAdminModule from './modules/LibraryAdminModule';
import HostelAdminModule from './modules/HostelAdminModule';

import SubjectSemesterModule from './modules/SubjectSemesterModule';
import ExamModule from './modules/ExamModule';
import AssignmentModule from './modules/AssignmentModule';
import AcademicCalendarModule from './modules/AcademicCalendarModule';

import TransportModule from './modules/TransportModule';
import ComplaintModule from './modules/ComplaintModule';
import LeaveRequestModule from './modules/LeaveRequestModule';
import NotificationModule from './modules/NotificationModule';

import EventModule from './modules/EventModule';
import PlacementModule from './modules/PlacementModule';
import AlumniModule from './modules/AlumniModule';
import CertificateModule from './modules/CertificateModule';
import IdCardModule from './modules/IdCardModule';

import DocumentModule from './modules/DocumentModule';
import AuditLogModule from './modules/AuditLogModule';
import SettingsModule from './modules/SettingsModule';

export default function AdminDashboard({ activeTab, user }) {
  const [applications, setApplications] = useState([
    { id: '101', student: 'Alice Smith', course: 'Computer Science', status: 'Pending', date: '2026-05-18' },
    { id: '102', student: 'Bob Jones', course: 'Mechanical Eng.', status: 'Reviewed', date: '2026-05-19' },
    { id: '103', student: 'Charlie Davis', course: 'Electrical Eng.', status: 'Pending', date: '2026-05-20' },
    { id: '104', student: 'Diana Prince', course: 'Computer Science', status: 'Accepted', date: '2026-05-15' },
  ]);

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12%
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">4,289</p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                  This Week
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Pending Apps</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">142</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3 mr-1" /> +4.5%
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Revenue (YTD)</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">$2.4M</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-6 h-6 text-indigo-300" />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Active Faculty</p>
              <p className="text-3xl font-extrabold text-white mt-1">312</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Application #10{i} submitted</p>
                      <p className="text-xs text-slate-500 mt-1">{i * 2} hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-tr from-indigo-50 to-violet-50 rounded-3xl p-6 border border-indigo-100 shadow-sm flex items-center justify-center">
               <div className="text-center">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                   <TrendingUp className="w-8 h-8 text-indigo-500" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-2">Analytics Module</h3>
                 <p className="text-sm text-slate-600 max-w-xs">Detailed chart visualizations will be rendered here via Recharts/Chart.js integration.</p>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Admissions Tab */}
      {activeTab === 'admissions' && (
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Application Logs</h3>
              <p className="text-sm text-slate-500 mt-1">Manage and evaluate incoming student admissions.</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search applicant..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Applicant Name</th>
                  <th className="p-4">Desired Course</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{app.student}</td>
                    <td className="p-4 text-slate-600">{app.course}</td>
                    <td className="p-4 text-slate-500">{app.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                        app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        app.status === 'Reviewed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {app.status === 'Accepted' && <Check className="w-3 h-3" />}
                        {app.status === 'Rejected' && <X className="w-3 h-3" />}
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-center pr-6">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => updateStatus(app.id, 'Accepted')} className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors" title="Accept">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => updateStatus(app.id, 'Rejected')} className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors" title="Reject">
                          <X className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors ml-2">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Directory Tab */}
      {activeTab === 'directory' && <DirectoryModule />}

      {/* Fees Tab */}
      {activeTab === 'fees' && <FeeManagementModule />}

      {/* Timetable Tab */}
      {activeTab === 'timetable' && <TimetableModule role="admin" user={user} />}

      {/* Library Tab */}
      {activeTab === 'library' && <LibraryAdminModule />}

      {/* Hostel Tab */}
      {activeTab === 'hostel' && <HostelAdminModule />}


      {/* Dynamic API Modules */}
      {activeTab === 'departments' && <DepartmentsModule />}
      {activeTab === 'courses' && <CoursesModule />}
      {activeTab === 'enrollments' && <EnrollmentsModule />}
      {activeTab === 'notices' && <NoticesModule role="admin" />}
      {activeTab === 'semesters' && <SubjectSemesterModule role="admin" user={user} />}
      {activeTab === 'exams' && <ExamModule role="admin" user={user} />}
      {activeTab === 'assignments' && <AssignmentModule role="admin" user={user} />}
      {activeTab === 'calendar' && <AcademicCalendarModule role="admin" user={user} />}
      
      {/* Batch 2 Modules */}
      {activeTab === 'transport' && <TransportModule role="admin" user={user} />}
      {activeTab === 'complaints' && <ComplaintModule role="admin" user={user} />}
      {activeTab === 'leaves' && <LeaveRequestModule role="admin" user={user} />}
      {activeTab === 'alerts' && <NotificationModule role="admin" user={user} />}

      {/* Batch 3 Modules */}
      {activeTab === 'events' && <EventModule role="admin" user={user} />}
      {activeTab === 'placements' && <PlacementModule role="admin" user={user} />}
      {activeTab === 'alumni' && <AlumniModule role="admin" user={user} />}
      {activeTab === 'certificates' && <CertificateModule role="admin" user={user} />}
      {activeTab === 'idcards' && <IdCardModule role="admin" user={user} />}

      {/* Batch 4 Modules */}
      {activeTab === 'documents' && <DocumentModule role="admin" user={user} />}
      {activeTab === 'auditlogs' && <AuditLogModule role="admin" user={user} />}
      {activeTab === 'settings' && <SettingsModule role="admin" user={user} />}
    </div>
  );
}
