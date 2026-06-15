import React, { useState, useEffect } from 'react';
import { CalendarOff, Plus, Loader2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function LeaveRequestModule({ role }) {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        setLeaves([
          { _id: '1', user: { name: 'Alice Smith', email: 'alice@student.com', role: 'student' }, startDate: '2026-06-20', endDate: '2026-06-22', reason: 'Family medical emergency', status: 'Pending' },
          { _id: '2', user: { name: 'Dr. Jones', email: 'jones@faculty.com', role: 'faculty' }, startDate: '2026-07-01', endDate: '2026-07-05', reason: 'Academic Conference in NY', status: 'Approved' },
        ]);
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
          <h2 className="text-2xl font-bold text-slate-800">Leave Requests</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and track leaves of absence.</p>
        </div>
        
        {role !== 'admin' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel' : 'Apply for Leave'}
          </button>
        )}
      </div>

      {/* Add Form (Student/Faculty Only) */}
      {showAddForm && role !== 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Leave Application</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input type="date" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input type="date" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Leave</label>
              <textarea rows="3" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800">
                Submit Application
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
            <p>Loading leaves...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p>{error}</p>
          </div>
        ) : leaves.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <CalendarOff className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No leave requests found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  {role === 'admin' && <th className="p-4 pl-6">Applicant</th>}
                  <th className={role !== 'admin' ? "p-4 pl-6" : "p-4"}>Duration</th>
                  <th className="p-4">Reason</th>
                  <th className="p-4">Status</th>
                  {role === 'admin' && <th className="p-4 text-center pr-6">Action</th>}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {leaves.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    {role === 'admin' && (
                      <td className="p-4 pl-6 font-semibold text-slate-900">
                        {item.user.name} <span className="text-xs font-normal text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded ml-1 capitalize">{item.user.role}</span>
                        <p className="text-xs text-slate-500 font-normal">{item.user.email}</p>
                      </td>
                    )}
                    <td className={role !== 'admin' ? "p-4 pl-6 text-slate-600 whitespace-nowrap" : "p-4 text-slate-600 whitespace-nowrap"}>
                      {item.startDate} to {item.endDate}
                    </td>
                    <td className="p-4 text-slate-500 max-w-xs truncate" title={item.reason}>{item.reason}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                        item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="p-4 text-center pr-6">
                        {item.status === 'Pending' ? (
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors" title="Approve">
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Reject">
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">Processed</span>
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
