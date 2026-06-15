import React, { useState, useEffect } from 'react';
import { Activity, Loader2, AlertCircle, Search, Filter } from 'lucide-react';

export default function AuditLogModule({ role }) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        setLogs([
          { _id: '1', action: 'CREATE', module: 'Users', user: { name: 'Admin', role: 'admin' }, details: 'Created new user Alice Smith', timestamp: '2026-06-15 10:23 AM', ipAddress: '192.168.1.45' },
          { _id: '2', action: 'UPDATE', module: 'Exams', user: { name: 'Dr. Jones', role: 'faculty' }, details: 'Updated marks for CS101', timestamp: '2026-06-14 02:45 PM', ipAddress: '192.168.1.102' },
          { _id: '3', action: 'DELETE', module: 'Documents', user: { name: 'Admin', role: 'admin' }, details: 'Deleted document ID 104', timestamp: '2026-06-13 09:12 AM', ipAddress: '192.168.1.45' },
        ]);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-slate-500">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <p className="text-lg font-medium text-slate-900">Access Denied</p>
        <p className="text-sm">You do not have permission to view audit logs.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Audit Logs</h2>
          <p className="text-sm text-slate-500 mt-1">Track and monitor all system activities and data changes.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm w-48 lg:w-64" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
            <p>Loading audit logs...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p>{error}</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <Activity className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No logs recorded</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Timestamp</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Module</th>
                  <th className="p-4 w-1/3">Details</th>
                  <th className="p-4 pr-6 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50 font-mono text-[13px]">
                {logs.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 pl-6 text-slate-500">{item.timestamp}</td>
                    <td className="p-4 font-sans font-semibold text-slate-800">
                      {item.user.name} <span className="text-xs bg-slate-100 px-1 rounded text-slate-400 ml-1 font-normal capitalize">{item.user.role}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${
                        item.action === 'CREATE' ? 'bg-emerald-100 text-emerald-700' :
                        item.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                        item.action === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.action}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{item.module}</td>
                    <td className="p-4 text-slate-600 truncate max-w-xs" title={item.details}>{item.details}</td>
                    <td className="p-4 pr-6 text-slate-400 text-right">{item.ipAddress}</td>
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
