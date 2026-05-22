import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { GraduationCap } from 'lucide-react';

export default function StudentAcademicsModule() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get('/enrollments');
        setEnrollments(res.data);
      } catch (error) {
        console.error('Error fetching enrollments', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading academics...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-indigo-500" />
        Current Semester Courses
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-4 rounded-tl-xl">Course Code</th>
              <th className="p-4">Course Name</th>
              <th className="p-4">Semester</th>
              <th className="p-4 rounded-tr-xl">Academic Year</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {enrollments.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center text-slate-500">No courses enrolled yet.</td></tr>
            ) : enrollments.map(enroll => (
              <tr key={enroll._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-mono text-slate-600">{enroll.course?.courseCode}</td>
                <td className="p-4 font-semibold text-slate-900">{enroll.course?.courseName}</td>
                <td className="p-4 text-slate-600">{enroll.semester}</td>
                <td className="p-4 text-slate-600">{enroll.academicYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
