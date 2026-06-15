import React, { useState, useEffect } from 'react';
import { Award, Plus, Loader2, AlertCircle, Download, CheckCircle2, Search } from 'lucide-react';

export default function CertificateModule({ role }) {
  const [certificates, setCertificates] = useState([]);
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
        setCertificates([
          { _id: '1', title: 'Course Completion', recipient: { name: 'Alice Smith', email: 'alice@student.com' }, issuedDate: '2026-06-10', status: 'Issued', verifyHash: 'abc123xyz' },
          { _id: '2', title: 'Merit Award - Hackathon', recipient: { name: 'Bob Jones', email: 'bob@student.com' }, issuedDate: '2026-05-15', status: 'Issued', verifyHash: 'def456uvw' },
        ]);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Filter based on role if needed. In a real app, the API would only return the student's own certificates.
  // We'll simulate it for the UI.
  const displayCertificates = role === 'student' ? certificates.filter(c => c.recipient.name === 'Alice Smith') : certificates;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Certificates</h2>
          <p className="text-sm text-slate-500 mt-1">Generate, download, and verify digital certificates.</p>
        </div>
        
        {role === 'admin' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel' : 'Generate Certificate'}
          </button>
        )}
      </div>

      {/* Add Form (Admin Only) */}
      {showAddForm && role === 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Issue New Certificate</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Student / Recipient</label>
              <input type="text" placeholder="Select student..." required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Certificate Type/Title</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Course Completion</option>
                <option>Merit Award</option>
                <option>Participation</option>
                <option>Degree</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Additional Details (Optional)</label>
              <textarea rows="2" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800">
                Generate & Issue
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Verification Tool (Public/Admin) */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-6 rounded-2xl border border-indigo-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-indigo-900">Certificate Verification Portal</h3>
          <p className="text-sm text-indigo-700 mt-1">Verify authenticity using the unique certificate hash.</p>
        </div>
        <div className="relative w-full sm:w-auto flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Enter Hash ID..." className="w-full pl-9 pr-4 py-2 border border-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" />
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
            Verify
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
            <p>Loading certificates...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p>{error}</p>
          </div>
        ) : displayCertificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <Award className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No certificates found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50/50">
            {displayCertificates.map((item) => (
              <div key={item._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Award className="w-32 h-32 text-indigo-600 translate-x-4 -translate-y-4" />
                </div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3" /> Valid
                  </span>
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-bold text-xl text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">Issued to <span className="font-semibold text-slate-800">{item.recipient.name}</span></p>
                  
                  <div className="space-y-1.5 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Date Issued</span>
                      <span className="font-medium text-slate-800">{item.issuedDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Verify Hash</span>
                      <span className="font-mono text-slate-800 bg-slate-100 px-1.5 rounded">{item.verifyHash}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold rounded-xl transition-colors">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
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
