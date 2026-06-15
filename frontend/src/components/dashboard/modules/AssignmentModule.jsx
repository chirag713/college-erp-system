import React, { useState, useEffect } from 'react';
import { FileText, Plus, Loader2, AlertCircle, UploadCloud, CheckCircle } from 'lucide-react';

export default function AssignmentModule({ role, user }) {
  const [activeSubTab, setActiveSubTab] = useState('assignments'); // assignments, submissions
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
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
        if (activeSubTab === 'assignments') {
          setAssignments([
            { _id: '1', title: 'React Basics', subject: { name: 'Frontend Dev' }, faculty: { name: 'Dr. Jones' }, deadline: '2026-11-01', description: 'Build a simple app.' },
            { _id: '2', title: 'Node API', subject: { name: 'Backend Dev' }, faculty: { name: 'Dr. Smith' }, deadline: '2026-11-10', description: 'Create an Express API.' },
          ]);
        } else if (activeSubTab === 'submissions') {
          setSubmissions([
            { _id: '1', assignment: { title: 'React Basics' }, student: { name: 'John Doe' }, status: 'Graded', marksObtained: 90 },
            { _id: '2', assignment: { title: 'React Basics' }, student: { name: 'Jane Smith' }, status: 'Pending', marksObtained: null },
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
          <h2 className="text-2xl font-bold text-slate-800">Assignments & LMS</h2>
          <p className="text-sm text-slate-500 mt-1">Manage coursework, assignments, and submissions.</p>
        </div>
        
        {role === 'faculty' && activeSubTab === 'assignments' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel' : 'Create Assignment'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveSubTab('assignments')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'assignments' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Assignments
        </button>
        <button
          onClick={() => setActiveSubTab('submissions')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'submissions' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          {role === 'student' ? 'My Submissions' : 'All Submissions'}
        </button>
      </div>

      {/* Add Form (Faculty Only) */}
      {showAddForm && role === 'faculty' && activeSubTab === 'assignments' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Create Assignment</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Frontend Dev</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
              <input type="date" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea rows="3" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800">
                Post Assignment
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
        ) : activeSubTab === 'assignments' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Title</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {assignments.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">
                      {item.title}
                      <p className="text-xs text-slate-500 font-normal mt-0.5">{item.description}</p>
                    </td>
                    <td className="p-4 text-slate-600">{item.subject.name}</td>
                    <td className="p-4 text-slate-500">{item.deadline}</td>
                    <td className="p-4 text-center">
                      {role === 'student' ? (
                        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors inline-flex items-center gap-1.5">
                          <UploadCloud className="w-4 h-4" /> Submit
                        </button>
                      ) : (
                        <span className="text-slate-400">Manage</span>
                      )}
                    </td>
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
                  <th className="p-4 pl-6">Assignment</th>
                  <th className="p-4">Student</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Marks</th>
                  {role === 'faculty' && <th className="p-4 text-center">Action</th>}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {submissions.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{item.assignment.title}</td>
                    <td className="p-4 text-slate-600">{item.student.name}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                        item.status === 'Graded' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium">
                      {item.marksObtained ? `${item.marksObtained}/100` : '-'}
                    </td>
                    {role === 'faculty' && (
                      <td className="p-4 text-center">
                        {item.status === 'Pending' ? (
                          <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors inline-flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" /> Grade
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs">Graded</span>
                        )}
                      </td>
                    )}
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
