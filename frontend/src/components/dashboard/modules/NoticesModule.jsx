import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { Bell, Plus, Trash2 } from 'lucide-react';

export default function NoticesModule({ role }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', targetAudience: 'all' });
  const [showForm, setShowForm] = useState(false);

  const fetchNotices = async () => {
    try {
      const { data } = await api.get('/notices');
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notices', newNotice);
      setNewNotice({ title: '', content: '', targetAudience: 'all' });
      setShowForm(false);
      fetchNotices();
    } catch (error) {
      console.error('Error creating notice', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notices/${id}`);
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice', error);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading notices...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-500" />
          Campus Notices
        </h3>
        {(role === 'admin' || role === 'faculty') && (
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Notice
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
            <input required type="text" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Content</label>
            <textarea required value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="3"></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Target Audience</label>
            <select value={newNotice.targetAudience} onChange={e => setNewNotice({...newNotice, targetAudience: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              <option value="all">Everyone</option>
              <option value="student">Students Only</option>
              <option value="faculty">Faculty Only</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-xl font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Publish Notice</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {notices.length === 0 ? (
          <p className="text-slate-500 text-center py-4">No recent notices.</p>
        ) : (
          notices.map((notice) => (
            <div key={notice._id} className="p-5 border border-slate-100 rounded-2xl hover:border-indigo-100 transition-colors flex justify-between items-start group">
              <div>
                <div className="flex gap-2 items-center mb-1">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                    notice.targetAudience === 'all' ? 'bg-indigo-100 text-indigo-700' :
                    notice.targetAudience === 'student' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {notice.targetAudience}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(notice.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-lg">{notice.title}</h4>
                <p className="text-slate-600 mt-2 text-sm">{notice.content}</p>
              </div>
              {(role === 'admin' || role === 'faculty') && (
                <button onClick={() => handleDelete(notice._id)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
