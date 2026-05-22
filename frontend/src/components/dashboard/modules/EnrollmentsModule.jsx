import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { UserPlus, Plus, Trash2 } from 'lucide-react';

export default function EnrollmentsModule() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [newEnrollment, setNewEnrollment] = useState({ 
    student: '', 
    course: '', 
    semester: 1, 
    academicYear: new Date().getFullYear().toString() 
  });

  const fetchData = async () => {
    try {
      const [enrollRes, studentRes, courseRes] = await Promise.all([
        api.get('/enrollments'),
        api.get('/users?role=student'),
        api.get('/courses')
      ]);
      setEnrollments(enrollRes.data);
      setStudents(studentRes.data);
      setCourses(courseRes.data);
      if (studentRes.data.length > 0) {
        setNewEnrollment(prev => ({ ...prev, student: studentRes.data[0]._id }));
      }
      if (courseRes.data.length > 0) {
        setNewEnrollment(prev => ({ ...prev, course: courseRes.data[0]._id }));
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/enrollments', newEnrollment);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating enrollment', error);
      alert('Error creating enrollment. Student may already be enrolled in this course.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this enrollment?')) {
      try {
        await api.delete(`/enrollments/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting', error);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading enrollments...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-indigo-500" />
          Student Enrollments
        </h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Enroll Student
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Student</label>
            <select required value={newEnrollment.student} onChange={e => setNewEnrollment({...newEnrollment, student: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Course</label>
            <select required value={newEnrollment.course} onChange={e => setNewEnrollment({...newEnrollment, course: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              {courses.map(c => <option key={c._id} value={c._id}>{c.courseName} ({c.courseCode})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Semester</label>
              <input required type="number" min="1" max="8" value={newEnrollment.semester} onChange={e => setNewEnrollment({...newEnrollment, semester: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Academic Year</label>
              <input required type="text" value={newEnrollment.academicYear} onChange={e => setNewEnrollment({...newEnrollment, academicYear: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Save Enrollment</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="p-4 rounded-tl-xl">Student</th>
              <th className="p-4">Course</th>
              <th className="p-4">Semester</th>
              <th className="p-4">Academic Year</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {enrollments.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-slate-500">No enrollments available.</td></tr>
            ) : enrollments.map(enroll => (
              <tr key={enroll._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-4 font-semibold text-slate-900">{enroll.student?.name || 'Unknown'}</td>
                <td className="p-4 text-slate-700">{enroll.course?.courseName || 'Unknown'}</td>
                <td className="p-4 text-slate-600">{enroll.semester}</td>
                <td className="p-4 text-slate-600">{enroll.academicYear}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(enroll._id)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
