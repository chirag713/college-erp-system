import React, { useState, useEffect } from 'react';
import { Bell, Plus, Loader2, AlertCircle, CheckCircle, Trash2, Send } from 'lucide-react';

export default function NotificationModule({ role }) {
  const [notifications, setNotifications] = useState([]);
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
        setNotifications([
          { _id: '1', title: 'Fee Due Reminder', message: 'Your semester fee is due by July 1st.', type: 'Fee', isRead: false, createdAt: '2026-06-14' },
          { _id: '2', title: 'Exam Schedule Updated', message: 'The Mid-Term schedule has been finalized and uploaded.', type: 'Academic', isRead: true, createdAt: '2026-06-12' },
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
          <h2 className="text-2xl font-bold text-slate-800">Notifications</h2>
          <p className="text-sm text-slate-500 mt-1">View personal alerts and system broadcasts.</p>
        </div>
        
        {role === 'admin' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Send className="w-4 h-4" />
            {showAddForm ? 'Cancel' : 'Send Broadcast'}
          </button>
        )}
      </div>

      {/* Add Form (Admin Only) */}
      {showAddForm && role === 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Send Notification</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>All Users</option>
                <option>All Students</option>
                <option>All Faculty</option>
                <option>Specific User ID</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea rows="3" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800">
                <Send className="w-4 h-4"/> Dispatch
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
            <p>Loading alerts...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p>{error}</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <Bell className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">All caught up!</p>
            <p className="text-sm">You have no new notifications.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {notifications.map((item) => (
              <div key={item._id} className={`p-6 flex items-start gap-4 transition-colors hover:bg-slate-50/50 ${!item.isRead ? 'bg-indigo-50/20' : ''}`}>
                <div className={`mt-1 p-2 rounded-full ${!item.isRead ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className={`text-base font-semibold ${!item.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">{item.message}</p>
                    </div>
                    <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{item.createdAt}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                      {item.type}
                    </span>
                    {!item.isRead && role !== 'admin' && (
                      <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Mark as read
                      </button>
                    )}
                    {role === 'admin' && (
                      <button className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
