import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { BookMarked, Plus, Trash2 } from 'lucide-react';

export default function CoursesModule() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState({ courseName: '', courseCode: '', credits: 3, semester: 1, department: '' });
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      const [courseRes, deptRes] = await Promise.all([
        api.get('/courses'),
        api.get('/departments')
      ]);
      setCourses(courseRes.data);
      setDepartments(deptRes.data);
      if (deptRes.data.length > 0) {
        setNewCourse(prev => ({ ...prev, department: deptRes.data[0]._id }));
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
      await api.post('/courses', newCourse);
      setNewCourse({ ...newCourse, courseName: '', courseCode: '' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating course', error);
      alert('Error creating course');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete course?')) {
      try {
        await api.delete(`/courses/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting', error);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading courses...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-indigo-500" />
          Course Catalog
        </h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Course Name</label>
            <input required type="text" value={newCourse.courseName} onChange={e => setNewCourse({...newCourse, courseName: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Course Code</label>
            <input required type="text" value={newCourse.courseCode} onChange={e => setNewCourse({...newCourse, courseCode: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Department</label>
            <select required value={newCourse.department} onChange={e => setNewCourse({...newCourse, department: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Credits</label>
              <input required type="number" min="1" max="6" value={newCourse.credits} onChange={e => setNewCourse({...newCourse, credits: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Semester</label>
              <input required type="number" min="1" max="8" value={newCourse.semester} onChange={e => setNewCourse({...newCourse, semester: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Save Course</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="p-4 rounded-tl-xl">Code</th>
              <th className="p-4">Course Name</th>
              <th className="p-4">Department</th>
              <th className="p-4">Credits</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {courses.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-slate-500">No courses available.</td></tr>
            ) : courses.map(course => (
              <tr key={course._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-4 font-mono font-bold text-slate-700">{course.courseCode}</td>
                <td className="p-4 font-semibold text-slate-900">{course.courseName}</td>
                <td className="p-4 text-slate-600">{course.department?.code || 'N/A'}</td>
                <td className="p-4 text-slate-600">{course.credits}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(course._id)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
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
