import React, { useState, useEffect } from 'react';
import { FileText, Plus, Loader2, AlertCircle, Upload, CheckCircle, File, Clock } from 'lucide-react';

export default function DocumentModule({ role }) {
  const [documents, setDocuments] = useState([]);
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
        setDocuments([
          { _id: '1', title: '10th Marksheet', user: { name: 'Alice Smith', role: 'student' }, type: 'Marksheet', status: 'Verified', uploadedAt: '2026-06-10' },
          { _id: '2', title: 'Aadhaar Card', user: { name: 'Alice Smith', role: 'student' }, type: 'ID Proof', status: 'Pending', uploadedAt: '2026-06-14' },
          { _id: '3', title: 'PhD Certificate', user: { name: 'Dr. Jones', role: 'faculty' }, type: 'Certificate', status: 'Verified', uploadedAt: '2026-01-20' },
        ]);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const displayDocs = role === 'admin' ? documents : documents.filter(d => d.user.name === 'Alice Smith' || d.user.name === 'Dr. Jones'); // Simulated filter

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Document Vault</h2>
          <p className="text-sm text-slate-500 mt-1">Upload and manage official institutional documents.</p>
        </div>
        
        {role !== 'admin' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Upload className="w-4 h-4" />
            {showAddForm ? 'Cancel' : 'Upload Document'}
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && role !== 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Upload New File</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
              <input type="text" placeholder="e.g., Semester 1 Transcript" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>ID Proof</option>
                <option>Marksheet</option>
                <option>Certificate</option>
                <option>Admission Form</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-400 transition-colors cursor-pointer bg-slate-50">
                <Upload className="w-8 h-8 mb-2 text-indigo-400" />
                <p className="font-medium text-slate-700">Click to browse or drag and drop</p>
                <p className="text-xs mt-1">PDF, JPG, or PNG (Max 5MB)</p>
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800">
                Submit for Verification
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
            <p>Loading documents...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p>{error}</p>
          </div>
        ) : displayDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <FileText className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No documents found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Document Details</th>
                  {role === 'admin' && <th className="p-4">Owner</th>}
                  <th className="p-4">Type</th>
                  <th className="p-4">Date Uploaded</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {displayDocs.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900 flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                        <File className="w-4 h-4" />
                      </div>
                      {item.title}
                    </td>
                    {role === 'admin' && (
                      <td className="p-4 text-slate-600">
                        {item.user.name} <span className="text-xs bg-slate-100 px-1.5 rounded text-slate-400 ml-1 capitalize">{item.user.role}</span>
                      </td>
                    )}
                    <td className="p-4 text-slate-600">{item.type}</td>
                    <td className="p-4 text-slate-500">{item.uploadedAt}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                        item.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status === 'Verified' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {role === 'admin' && item.status === 'Pending' ? (
                        <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors">
                          Verify
                        </button>
                      ) : (
                        <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">View</button>
                      )}
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
