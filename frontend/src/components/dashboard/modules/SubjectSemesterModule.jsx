import React, { useState, useEffect } from 'react';
import { Book, Plus, Loader2, AlertCircle, CheckCircle, Edit, Trash2 } from 'lucide-react';

export default function SubjectSemesterModule({ role, user }) {
  const [activeSubTab, setActiveSubTab] = useState('semesters'); // semesters, subjects
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states for Admin
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', description: '', credits: '' });

  useEffect(() => {
    fetchData();
  }, [activeSubTab]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      // For demonstration, simulating API response if backend is not seeded
      // In reality, you'd fetch from /api/semesters or /api/subjects
      setTimeout(() => {
        if (activeSubTab === 'semesters') {
          setSemesters([
            { _id: '1', name: 'Semester 1', startDate: '2026-08-01', endDate: '2026-12-15' },
            { _id: '2', name: 'Semester 2', startDate: '2027-01-10', endDate: '2027-05-20' },
          ]);
        } else {
          setSubjects([
            { _id: '1', code: 'CS101', name: 'Intro to Computer Science', credits: 4, faculty: { name: 'Dr. Smith' } },
            { _id: '2', code: 'MATH201', name: 'Calculus II', credits: 3, faculty: { name: 'Dr. Jones' } },
          ]);
        }
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API logic to save would go here
    setShowAddForm(false);
    setFormData({ name: '', code: '', description: '', credits: '' });
    fetchData(); // Refresh list
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Subjects & Semesters</h2>
          <p className="text-sm text-slate-500 mt-1">Manage academic structures and coursework.</p>
        </div>
        
        {role === 'admin' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel' : `Add ${activeSubTab === 'semesters' ? 'Semester' : 'Subject'}`}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveSubTab('semesters')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'semesters' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Semesters
        </button>
        <button
          onClick={() => setActiveSubTab('subjects')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'subjects' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Subjects
        </button>
      </div>

      {/* Add Form (Admin Only) */}
      {showAddForm && role === 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Create New {activeSubTab === 'semesters' ? 'Semester' : 'Subject'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            {activeSubTab === 'subjects' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject Code</label>
                  <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Credits</label>
                  <input type="number" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </>
            )}
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="submit" className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800">
                Save {activeSubTab === 'semesters' ? 'Semester' : 'Subject'}
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
        ) : activeSubTab === 'semesters' && semesters.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <Book className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No semesters found</p>
            <p className="text-sm mt-1">Check back later or contact admin.</p>
          </div>
        ) : activeSubTab === 'subjects' && subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <Book className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No subjects found</p>
            <p className="text-sm mt-1">Check back later or contact admin.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">{activeSubTab === 'semesters' ? 'Semester Name' : 'Subject Code'}</th>
                  <th className="p-4">{activeSubTab === 'semesters' ? 'Start Date' : 'Subject Name'}</th>
                  <th className="p-4">{activeSubTab === 'semesters' ? 'End Date' : 'Credits'}</th>
                  <th className="p-4">{activeSubTab === 'semesters' ? 'Status' : 'Assigned Faculty'}</th>
                  {role === 'admin' && <th className="p-4 text-center pr-6">Actions</th>}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {(activeSubTab === 'semesters' ? semesters : subjects).map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">
                      {activeSubTab === 'semesters' ? item.name : item.code}
                    </td>
                    <td className="p-4 text-slate-600">
                      {activeSubTab === 'semesters' ? item.startDate : item.name}
                    </td>
                    <td className="p-4 text-slate-500">
                      {activeSubTab === 'semesters' ? item.endDate : item.credits}
                    </td>
                    <td className="p-4">
                      {activeSubTab === 'semesters' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">
                          Active
                        </span>
                      ) : (
                        item.faculty ? item.faculty.name : <span className="text-amber-500">Unassigned</span>
                      )}
                    </td>
                    {role === 'admin' && (
                      <td className="p-4 text-center pr-6">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors mr-2">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
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
