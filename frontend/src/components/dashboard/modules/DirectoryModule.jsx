import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { Users, Search, Filter } from 'lucide-react';

export default function DirectoryModule() {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'students', 'faculty'
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, facultyRes] = await Promise.all([
          api.get('/student-profiles'),
          api.get('/faculty-profiles')
        ]);
        setStudents(studentRes.data);
        setFaculty(facultyRes.data);
      } catch (error) {
        console.error('Error fetching directory:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading directory...</div>;

  const filteredStudents = students.filter(s => 
    (filter === 'all' || filter === 'students') && 
    (s.user?.name?.toLowerCase().includes(search.toLowerCase()) || s.enrollmentNumber?.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredFaculty = faculty.filter(f => 
    (filter === 'all' || filter === 'faculty') && 
    (f.user?.name?.toLowerCase().includes(search.toLowerCase()) || f.employeeId?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" />
            User Directory
          </h3>
          <p className="text-sm text-slate-500 mt-1">View profiles of all students and faculty members.</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search directory..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-slate-200 rounded-xl text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-sm font-semibold"
          >
            <option value="all">All Roles</option>
            <option value="students">Students</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="p-4 pl-6 rounded-tl-xl">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">ID Number</th>
              <th className="p-4">Department</th>
              <th className="p-4 rounded-tr-xl">Contact</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {filteredFaculty.map(f => (
              <tr key={f._id} className="hover:bg-indigo-50/30 transition-colors">
                <td className="p-4 pl-6 font-semibold text-slate-900">{f.user?.name || 'Unknown'}</td>
                <td className="p-4">
                  <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-bold">Faculty</span>
                  <div className="text-xs text-slate-400 mt-1">{f.designation}</div>
                </td>
                <td className="p-4 text-slate-600 font-mono text-xs">{f.employeeId}</td>
                <td className="p-4 text-slate-600">{f.department?.name || 'N/A'}</td>
                <td className="p-4 text-slate-600">{f.phone || 'N/A'}</td>
              </tr>
            ))}
            
            {filteredStudents.map(s => (
              <tr key={s._id} className="hover:bg-indigo-50/30 transition-colors">
                <td className="p-4 pl-6 font-semibold text-slate-900">{s.user?.name || 'Unknown'}</td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">Student</span>
                  <div className="text-xs text-slate-400 mt-1">Sem {s.semester}</div>
                </td>
                <td className="p-4 text-slate-600 font-mono text-xs">{s.enrollmentNumber}</td>
                <td className="p-4 text-slate-600">{s.department?.name || 'N/A'}</td>
                <td className="p-4 text-slate-600">{s.phone || 'N/A'}</td>
              </tr>
            ))}

            {(filteredStudents.length === 0 && filteredFaculty.length === 0) && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500">No profiles found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
