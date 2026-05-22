import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { FileText, Save, CheckCircle2 } from 'lucide-react';

export default function AttendanceModule() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [enrollments, setEnrollments] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await api.get(`/courses?facultyAssigned=${userId}`);
        setCourses(res.data);
        if (res.data.length > 0) {
          setSelectedCourse(res.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching faculty courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const fetchStudents = async () => {
        try {
          const res = await api.get(`/enrollments?course=${selectedCourse}`);
          setEnrollments(res.data);
          
          // Initialize attendance data
          const initialData = {};
          res.data.forEach(enroll => {
            initialData[enroll.student._id] = 'present'; // Default to present
          });
          setAttendanceData(initialData);
        } catch (error) {
          console.error('Error fetching enrollments', error);
        }
      };
      fetchStudents();
    }
  }, [selectedCourse]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    setSuccessMsg('');
    try {
      const promises = enrollments.map(enroll => {
        return api.post('/attendance', {
          student: enroll.student._id,
          course: selectedCourse,
          date,
          status: attendanceData[enroll.student._id]
        });
      });
      await Promise.all(promises);
      setSuccessMsg('Attendance marked successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Error saving attendance', error);
      alert('Error saving attendance. Records for this date might already exist.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading attendance portal...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          Mark Attendance
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Course</label>
          <select 
            value={selectedCourse} 
            onChange={e => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          >
            {courses.length === 0 ? <option value="">No courses assigned</option> : null}
            {courses.map(c => <option key={c._id} value={c._id}>{c.courseName} ({c.courseCode})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
          <input 
            type="date" 
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          />
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-700 font-medium animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5" />
          {successMsg}
        </div>
      )}

      {selectedCourse && enrollments.length > 0 ? (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 rounded-tl-xl">Student Name</th>
                  <th className="p-4 text-center">Present</th>
                  <th className="p-4 text-center">Absent</th>
                  <th className="p-4 text-center rounded-tr-xl">Late</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {enrollments.map(enroll => (
                  <tr key={enroll._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-900">{enroll.student.name}</td>
                    <td className="p-4 text-center">
                      <input 
                        type="radio" 
                        name={`status-${enroll.student._id}`} 
                        checked={attendanceData[enroll.student._id] === 'present'}
                        onChange={() => handleStatusChange(enroll.student._id, 'present')}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input 
                        type="radio" 
                        name={`status-${enroll.student._id}`} 
                        checked={attendanceData[enroll.student._id] === 'absent'}
                        onChange={() => handleStatusChange(enroll.student._id, 'absent')}
                        className="w-4 h-4 text-red-600 focus:ring-red-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input 
                        type="radio" 
                        name={`status-${enroll.student._id}`} 
                        checked={attendanceData[enroll.student._id] === 'late'}
                        onChange={() => handleStatusChange(enroll.student._id, 'late')}
                        className="w-4 h-4 text-amber-500 focus:ring-amber-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button 
              onClick={handleSaveAttendance}
              disabled={saving}
              className={`flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl transition-all shadow-md hover:bg-indigo-700 active:scale-95 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Submit Attendance'}
            </button>
          </div>
        </>
      ) : selectedCourse ? (
        <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500">
          No students enrolled in this course yet.
        </div>
      ) : null}
    </div>
  );
}
