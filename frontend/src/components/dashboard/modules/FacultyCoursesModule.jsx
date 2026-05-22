import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { BookOpen } from 'lucide-react';

export default function FacultyCoursesModule() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await api.get(`/courses?facultyAssigned=${userId}`);
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching faculty courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading courses...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          My Assigned Courses
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="p-4 rounded-tl-xl">Course Code</th>
              <th className="p-4">Course Name</th>
              <th className="p-4">Department</th>
              <th className="p-4 rounded-tr-xl">Credits</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {courses.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center text-slate-500">No courses assigned yet.</td></tr>
            ) : courses.map(course => (
              <tr key={course._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-4 font-mono font-bold text-slate-700">{course.courseCode}</td>
                <td className="p-4 font-semibold text-slate-900">{course.courseName}</td>
                <td className="p-4 text-slate-600">{course.department?.name || 'N/A'}</td>
                <td className="p-4 text-slate-600">{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
