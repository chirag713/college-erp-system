import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { DollarSign, Plus, CheckCircle2, Search } from 'lucide-react';

export default function FeeManagementModule() {
  const [invoices, setInvoices] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    student: '',
    amount: '',
    description: '',
    dueDate: ''
  });
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const [invoiceRes, userRes] = await Promise.all([
        api.get('/fees'),
        api.get('/users?role=student')
      ]);
      setInvoices(invoiceRes.data);
      setStudents(userRes.data);
    } catch (error) {
      console.error('Error fetching fees data:', error);
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
      await api.post('/fees', newInvoice);
      setShowForm(false);
      setNewInvoice({ student: '', amount: '', description: '', dueDate: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this invoice?")) {
      try {
        await api.delete(`/fees/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading fee data...</div>;

  const filteredInvoices = invoices.filter(inv => 
    inv.student?.name?.toLowerCase().includes(search.toLowerCase()) || 
    inv.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-500" />
            Fee Management
          </h3>
          <p className="text-sm text-slate-500 mt-1">Generate and track student invoices.</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Invoice
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Student</label>
              <select required value={newInvoice.student} onChange={e => setNewInvoice({...newInvoice, student: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                <option value="">Select Student</option>
                {students.map(s => (
                  <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Amount ($)</label>
              <input required type="number" min="0" value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <input required type="text" placeholder="e.g. Fall Semester Tuition" value={newInvoice.description} onChange={e => setNewInvoice({...newInvoice, description: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Due Date</label>
              <input required type="date" value={newInvoice.dueDate} onChange={e => setNewInvoice({...newInvoice, dueDate: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-xl font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Create Invoice</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="p-4 pl-6">Student</th>
              <th className="p-4">Description</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {filteredInvoices.map(inv => (
              <tr key={inv._id} className="hover:bg-indigo-50/30 transition-colors">
                <td className="p-4 pl-6 font-semibold text-slate-900">{inv.student?.name || 'Unknown'}</td>
                <td className="p-4 text-slate-600">{inv.description}</td>
                <td className="p-4 font-bold text-slate-900">${inv.amount}</td>
                <td className="p-4 text-slate-500">{new Date(inv.dueDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                    inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {inv.status === 'Paid' && <CheckCircle2 className="w-3 h-3" />}
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 pr-6 text-right">
                  <button onClick={() => handleDelete(inv._id)} className="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500">No invoices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
