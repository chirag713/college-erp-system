import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { CalendarDays, Plus, Trash2 } from 'lucide-react';

export default function TimetableModule({ role, user }) {
  const [timetables, setTimetables] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [newClass, setNewClass] = useState({
    course: '',
    faculty: '',
    department: '',
    semester: 1,
    dayOfWeek: 'Monday',
    startTime: '',
    endTime: '',
    room: ''
  });

  const fetchData = async () => {
    try {
      const promises = [api.get('/timetable')];
      
      if (role === 'admin') {
        promises.push(api.get('/courses'));
        promises.push(api.get('/users?role=faculty'));
        promises.push(api.get('/departments'));
      } else {
        promises.push(Promise.resolve({ data: [] }));
        promises.push(Promise.resolve({ data: [] }));
        promises.push(Promise.resolve({ data: [] }));
      }

      if (role === 'student') {
        promises.push(api.get('/enrollments'));
      } else {
        promises.push(Promise.resolve({ data: [] }));
      }

      const [ttRes, coursesRes, facultyRes, deptsRes, enrollRes] = await Promise.all(promises);

      setTimetables(ttRes.data);
      if (role === 'admin') {
        setCourses(coursesRes.data);
        setFaculty(facultyRes.data);
        setDepartments(deptsRes.data);
      }
      if (role === 'student') setEnrollments(enrollRes.data);
    } catch (error) {
      console.error('Error fetching timetable data:', error);
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
      await api.post('/timetable', newClass);
      setShowForm(false);
      setNewClass({
        course: '', faculty: '', department: '', semester: 1, 
        dayOfWeek: 'Monday', startTime: '', endTime: '', room: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error creating class schedule:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this class from the timetable?")) {
      try {
        await api.delete(`/timetable/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting class schedule:', error);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading timetable...</div>;

  let visibleTimetables = timetables;
  if (role === 'student') {
    const enrolledCourseIds = enrollments.map(e => e.course?._id || e.course);
    visibleTimetables = timetables.filter(t => enrolledCourseIds.includes(t.course?._id));
  } else if (role === 'faculty' && user) {
    visibleTimetables = timetables.filter(t => t.faculty?._id === user.id || t.faculty === user.id);
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-500" />
            Class Timetable
          </h3>
          <p className="text-sm text-slate-500 mt-1">Weekly schedule of classes across all departments.</p>
        </div>
        
        {role === 'admin' && (
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Schedule Class
          </button>
        )}
      </div>

      {showForm && role === 'admin' && (
        <form onSubmit={handleCreate} className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Course</label>
              <select required value={newClass.course} onChange={e => {
                const selectedId = e.target.value;
                const c = courses.find(course => course._id === selectedId);
                setNewClass({
                  ...newClass, 
                  course: selectedId,
                  faculty: c?.facultyAssigned?._id || c?.facultyAssigned || '',
                  department: c?.department?._id || c?.department || '',
                  semester: c?.semester || ''
                });
              }} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                <option value="">Select Course</option>
                {courses.map(c => <option key={c._id} value={c._id}>{c.courseCode} - {c.courseName}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Faculty</label>
              <select required disabled value={newClass.faculty} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed">
                <option value="">Auto-filled</option>
                {faculty.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Department</label>
              <select required disabled value={newClass.department} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed">
                <option value="">Auto-filled</option>
                {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Semester</label>
              <input required disabled type="number" value={newClass.semester} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Day</label>
              <select required value={newClass.dayOfWeek} onChange={e => setNewClass({...newClass, dayOfWeek: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Start Time (Flexible)</label>
              <input required type="text" placeholder="e.g. 09:00 AM or 1st Period" value={newClass.startTime} onChange={e => setNewClass({...newClass, startTime: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">End Time (Flexible)</label>
              <input required type="text" placeholder="e.g. 10:30 AM or 2nd Period" value={newClass.endTime} onChange={e => setNewClass({...newClass, endTime: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Room</label>
              <input required type="text" placeholder="e.g. Room 101 or Lab 2" value={newClass.room} onChange={e => setNewClass({...newClass, room: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-xl font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Schedule Class</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {days.map(day => {
          const dayClasses = visibleTimetables.filter(t => t.dayOfWeek === day);
          if (dayClasses.length === 0 && role !== 'admin') return null;
          
          return (
            <div key={day} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="font-bold text-lg text-indigo-900 mb-4 pb-2 border-b border-slate-200">{day}</h4>
              <div className="space-y-3">
                {dayClasses.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No classes scheduled.</p>
                ) : (
                  dayClasses.map(cls => (
                    <div key={cls._id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start group">
                      <div>
                        <div className="flex gap-2 items-center mb-1">
                          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">
                            {cls.startTime} - {cls.endTime}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            Sem {cls.semester}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-800">{cls.course?.courseName || 'Unknown Course'}</h5>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                          <span className="font-semibold text-slate-600">{cls.faculty?.name || 'TBD'}</span>
                          <span>&bull;</span>
                          <span>{cls.room}</span>
                        </p>
                      </div>
                      {role === 'admin' && (
                        <button onClick={() => handleDelete(cls._id)} className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
