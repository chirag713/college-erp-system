import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { Building2, Plus, Trash2 } from 'lucide-react';

export default function DepartmentsModule() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDept, setNewDept] = useState({ name: '', code: '' });
  const [showForm, setShowForm] = useState(false);

  const fetchDepartments = async () => {
    try {
      const { data } = await api.get('/departments');
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/departments', newDept);
      setNewDept({ name: '', code: '' });
      setShowForm(false);
      fetchDepartments();
    } catch (error) {
      console.error('Error creating department', error);
      alert('Error creating department');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await api.delete(`/departments/${id}`);
        fetchDepartments();
      } catch (error) {
        console.error('Error deleting', error);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading departments...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-500" />
          Academic Departments
        </h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Department Name</label>
            <input required type="text" placeholder="e.g. Computer Science" value={newDept.name} onChange={e => setNewDept({...newDept, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="w-32">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Code</label>
            <input required type="text" placeholder="CSE" value={newDept.code} onChange={e => setNewDept({...newDept, code: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 h-[42px]">Save</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.length === 0 ? (
          <p className="text-slate-500 col-span-3">No departments found.</p>
        ) : (
          departments.map((dept) => (
            <div key={dept._id} className="p-6 border border-slate-100 rounded-2xl hover:border-indigo-200 bg-gradient-to-b from-white to-slate-50 shadow-sm transition-all relative group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <span className="font-bold">{dept.code}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-lg leading-tight">{dept.name}</h4>
              <p className="text-slate-500 text-sm mt-2">Head: {dept.head ? dept.head.name : 'Not Assigned'}</p>
              
              <button onClick={() => handleDelete(dept._id)} className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
