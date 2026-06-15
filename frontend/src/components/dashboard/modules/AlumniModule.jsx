import React, { useState, useEffect } from 'react';
import { GraduationCap, Loader2, AlertCircle, Search, Mail, MapPin, Building } from 'lucide-react';

export default function AlumniModule({ role }) {
  const [alumni, setAlumni] = useState([]);
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
        setAlumni([
          { _id: '1', name: 'John Doe', graduationYear: 2022, course: 'Computer Science', currentCompany: 'Microsoft', location: 'Seattle, WA', email: 'john.doe@alumni.com' },
          { _id: '2', name: 'Jane Smith', graduationYear: 2021, course: 'Mechanical Engineering', currentCompany: 'Tesla', location: 'Austin, TX', email: 'jane.smith@alumni.com' },
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
          <h2 className="text-2xl font-bold text-slate-800">Alumni Network</h2>
          <p className="text-sm text-slate-500 mt-1">Connect with graduates and explore alumni achievements.</p>
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search alumni..." 
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm w-full sm:w-64"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
            <p>Loading alumni directory...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p>{error}</p>
          </div>
        ) : alumni.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
            <GraduationCap className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900">No alumni records found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 bg-slate-50/50">
            {alumni.map((item) => (
              <div key={item._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap className="w-16 h-16 text-indigo-600" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl border border-indigo-100">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 leading-tight">{item.name}</h3>
                    <p className="text-sm text-indigo-600 font-semibold mt-0.5">Class of {item.graduationYear}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400" /> {item.course}
                  </p>
                  <p className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" /> {item.currentCompany}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> {item.location}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a href={`mailto:${item.email}`} className="flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl transition-colors">
                    <Mail className="w-4 h-4" /> Contact
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
