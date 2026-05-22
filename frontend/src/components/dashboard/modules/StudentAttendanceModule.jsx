import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { Calendar, Check, X, Clock } from 'lucide-react';

export default function StudentAttendanceModule() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get('/attendance');
        setAttendance(res.data);
      } catch (error) {
        console.error('Error fetching attendance', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading attendance records...</div>;

  // Group attendance by date
  const groupedByDate = attendance.reduce((acc, curr) => {
    const dateStr = new Date(curr.date).toLocaleDateString();
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(curr);
    return acc;
  }, {});

  const dates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-indigo-500" />
        Day-wise Attendance
      </h3>
      
      <div className="space-y-6">
        {dates.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500">
            No attendance records found.
          </div>
        ) : (
          dates.map(date => (
            <div key={date} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-4 border-b border-slate-100 font-bold text-slate-800">
                {date}
              </div>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {groupedByDate[date].map(record => (
                    <div key={record._id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl">
                      <span className="font-medium text-slate-700 text-sm truncate pr-2">
                        {record.course?.courseName}
                      </span>
                      <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        record.status === 'present' ? 'bg-emerald-100 text-emerald-700' :
                        record.status === 'absent' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {record.status === 'present' && <Check className="w-3 h-3" />}
                        {record.status === 'absent' && <X className="w-3 h-3" />}
                        {record.status === 'late' && <Clock className="w-3 h-3" />}
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
