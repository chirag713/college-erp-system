import React from 'react';
import { BookOpen, Users, Bell, FileText, ClipboardList } from 'lucide-react';
import NoticesModule from './modules/NoticesModule';
import FacultyCoursesModule from './modules/FacultyCoursesModule';
import AttendanceModule from './modules/AttendanceModule';
import FacultyProfileModule from './modules/FacultyProfileModule';
import TimetableModule from './modules/TimetableModule';
import LibraryModule from './modules/LibraryModule';

import SubjectSemesterModule from './modules/SubjectSemesterModule';
import ExamModule from './modules/ExamModule';
import AssignmentModule from './modules/AssignmentModule';
import AcademicCalendarModule from './modules/AcademicCalendarModule';

import TransportModule from './modules/TransportModule';
import ComplaintModule from './modules/ComplaintModule';
import LeaveRequestModule from './modules/LeaveRequestModule';
import NotificationModule from './modules/NotificationModule';

import EventModule from './modules/EventModule';
import AlumniModule from './modules/AlumniModule';
import IdCardModule from './modules/IdCardModule';

import DocumentModule from './modules/DocumentModule';

export default function FacultyDashboard({ activeTab, user }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-violet-200">
            <h2 className="text-3xl font-bold mb-2">Faculty Portal 🎓</h2>
            <p className="text-indigo-100 max-w-lg">
              Manage your assigned courses, take student attendance, and upload results effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">My Courses</p>
                <p className="text-2xl font-extrabold text-slate-900">3</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Students</p>
                <p className="text-2xl font-extrabold text-slate-900">145</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                <ClipboardList className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Tasks</p>
                <p className="text-2xl font-extrabold text-slate-900">Pending</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notices' && <NoticesModule role="faculty" />}

      {activeTab === 'courses' && <FacultyCoursesModule />}
      {activeTab === 'attendance' && <AttendanceModule />}
      
      {activeTab === 'results' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900">Upload Results</h3>
          <p className="text-slate-500">Exam result publishing coming soon.</p>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && <FacultyProfileModule user={user} />}

      {/* Timetable Tab */}
      {activeTab === 'timetable' && <TimetableModule role="faculty" user={user} />}

      {/* Library Tab */}
      {activeTab === 'library' && <LibraryModule />}

      {/* New Batch 1 Modules */}
      {activeTab === 'semesters' && <SubjectSemesterModule role="faculty" user={user} />}
      {activeTab === 'exams' && <ExamModule role="faculty" user={user} />}
      {activeTab === 'assignments' && <AssignmentModule role="faculty" user={user} />}
      {activeTab === 'calendar' && <AcademicCalendarModule role="faculty" user={user} />}

      {/* Batch 2 Modules */}
      {activeTab === 'transport' && <TransportModule role="faculty" user={user} />}
      {activeTab === 'complaints' && <ComplaintModule role="faculty" user={user} />}
      {activeTab === 'leaves' && <LeaveRequestModule role="faculty" user={user} />}
      {activeTab === 'alerts' && <NotificationModule role="faculty" user={user} />}

      {/* Batch 3 Modules */}
      {activeTab === 'events' && <EventModule role="faculty" user={user} />}
      {activeTab === 'alumni' && <AlumniModule role="faculty" user={user} />}
      {activeTab === 'idcards' && <IdCardModule role="faculty" user={user} />}

      {/* Batch 4 Modules */}
      {activeTab === 'documents' && <DocumentModule role="faculty" user={user} />}
    </div>
  );
}
