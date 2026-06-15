import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Loader2, AlertCircle, Download, User } from 'lucide-react';

export default function IdCardModule({ role, user }) {
  const [idCards, setIdCards] = useState([]);
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
        setIdCards([
          { _id: '1', user: { name: 'Alice Smith', role: 'student', email: 'alice@student.com' }, validUntil: '2027-05-30', status: 'Active', idNumber: 'STU-2026-001', bloodGroup: 'O+' },
          { _id: '2', user: { name: 'Dr. Jones', role: 'faculty', email: 'jones@faculty.com' }, validUntil: '2030-12-31', status: 'Active', idNumber: 'FAC-0042', bloodGroup: 'B+' },
        ]);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const displayCards = role === 'admin' ? idCards : idCards.filter(c => c.user.name === (user?.name || 'Alice Smith'));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">ID Card Hub</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and download official institutional ID cards.</p>
        </div>
        
        {role === 'admin' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel' : 'Generate ID Card'}
          </button>
        )}
      </div>

      {/* Add Form (Admin Only) */}
      {showAddForm && role === 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Generate New ID Card</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select User</label>
              <input type="text" placeholder="Search user..." required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800">
                Generate Card
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Area */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[300px] p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
            <p>Loading ID Cards...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p>{error}</p>
          </div>
        ) : displayCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <CreditCard className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No ID Cards found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCards.map((item) => (
              <div key={item._id} className="relative group">
                {/* ID Card Visual */}
                <div className="bg-gradient-to-b from-indigo-600 to-violet-800 rounded-2xl p-1 shadow-lg shadow-indigo-200 overflow-hidden text-white relative h-full flex flex-col">
                  {/* Lanyard Hole visual */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-white rounded-b-xl opacity-20"></div>
                  
                  <div className="p-5 flex-1 flex flex-col items-center text-center">
                    <h3 className="font-bold text-lg tracking-wider uppercase mb-4">EduPulse University</h3>
                    
                    <div className="w-24 h-24 bg-white/20 rounded-full border-4 border-white/30 flex items-center justify-center mb-4 overflow-hidden backdrop-blur-sm">
                      <User className="w-12 h-12 text-white/80" />
                    </div>
                    
                    <h2 className="text-xl font-bold mb-1">{item.user.name}</h2>
                    <p className="text-indigo-200 font-medium uppercase tracking-widest text-sm mb-4">{item.user.role}</p>
                    
                    <div className="w-full bg-white/10 rounded-xl p-3 text-left space-y-1 mb-4 backdrop-blur-sm">
                      <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">ID NO:</span>
                        <span className="font-mono font-bold">{item.idNumber}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">BLOOD:</span>
                        <span className="font-bold">{item.bloodGroup}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">VALID:</span>
                        <span className="font-bold">{item.validUntil}</span>
                      </div>
                    </div>
                    
                    {/* Barcode Mockup */}
                    <div className="mt-auto pt-2 w-full flex justify-center">
                      <div className="h-8 w-3/4 bg-white/30 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                
                {/* Overlay Action */}
                <div className="absolute inset-0 bg-slate-900/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg shadow-black/20">
                    <Download className="w-5 h-5" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
