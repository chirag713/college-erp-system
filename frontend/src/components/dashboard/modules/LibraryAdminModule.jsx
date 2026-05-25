import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { BookOpen, Search, Plus, Trash2, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';

export default function LibraryAdminModule() {
  const [activeSubTab, setActiveSubTab] = useState('inventory'); // inventory or circulation
  const [books, setBooks] = useState([]);
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Forms state
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', copiesTotal: '' });
  
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [newIssue, setNewIssue] = useState({ book: '', user: '', dueDate: '' });

  const fetchData = async () => {
    try {
      const [booksRes, issuesRes, usersRes] = await Promise.all([
        api.get('/books'),
        api.get('/book-issues'),
        api.get('/users')
      ]);
      setBooks(booksRes.data);
      setIssues(issuesRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching library data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', { ...newBook, copiesTotal: Number(newBook.copiesTotal) });
      setShowAddBook(false);
      setNewBook({ title: '', author: '', isbn: '', copiesTotal: '' });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding book');
    }
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    try {
      await api.post('/book-issues', newIssue);
      setShowIssueForm(false);
      setNewIssue({ book: '', user: '', dueDate: '' });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error issuing book');
    }
  };

  const handleReturnBook = async (id) => {
    if (window.confirm('Mark this book as returned?')) {
      try {
        await api.put(`/book-issues/${id}/return`);
        fetchData();
      } catch (error) {
        alert('Error returning book');
      }
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Delete this book from the catalog? This cannot be undone.')) {
      try {
        await api.delete(`/books/${id}`);
        fetchData();
      } catch (error) {
        alert('Error deleting book');
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading library system...</div>;

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn.includes(search)
  );

  const filteredIssues = issues.filter(i => 
    i.user?.name?.toLowerCase().includes(search.toLowerCase()) || 
    i.book?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-500" />
            Library Management
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage physical inventory and book circulation.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveSubTab('inventory')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'inventory' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveSubTab('circulation')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'circulation' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Circulation
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder={activeSubTab === 'inventory' ? "Search books by title, author, or ISBN..." : "Search issues by student or book title..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
          />
        </div>
        
        {activeSubTab === 'inventory' && (
          <button onClick={() => setShowAddBook(!showAddBook)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" /> Add Book
          </button>
        )}
        {activeSubTab === 'circulation' && (
          <button onClick={() => setShowIssueForm(!showIssueForm)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            <UserCheck className="w-4 h-4" /> Issue Book
          </button>
        )}
      </div>

      {activeSubTab === 'inventory' && showAddBook && (
        <form onSubmit={handleAddBook} className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
              <input required type="text" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Author</label>
              <input required type="text" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">ISBN</label>
              <input required type="text" value={newBook.isbn} onChange={e => setNewBook({...newBook, isbn: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Total Copies</label>
              <input required type="number" min="1" value={newBook.copiesTotal} onChange={e => setNewBook({...newBook, copiesTotal: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowAddBook(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-xl font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Add to Catalog</button>
          </div>
        </form>
      )}

      {activeSubTab === 'circulation' && showIssueForm && (
        <form onSubmit={handleIssueBook} className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">User (Student/Faculty)</label>
              <select required value={newIssue.user} onChange={e => setNewIssue({...newIssue, user: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                <option value="">Select User</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.role})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Book</label>
              <select required value={newIssue.book} onChange={e => setNewIssue({...newIssue, book: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                <option value="">Select Book</option>
                {books.filter(b => b.copiesAvailable > 0).map(b => <option key={b._id} value={b._id}>{b.title} ({b.copiesAvailable} left)</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Due Date</label>
              <input required type="date" value={newIssue.dueDate} onChange={e => setNewIssue({...newIssue, dueDate: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowIssueForm(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-xl font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Issue Book</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        {activeSubTab === 'inventory' ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 pl-6">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">ISBN</th>
                <th className="p-4">Availability</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-50">
              {filteredBooks.map(b => (
                <tr key={b._id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-900">{b.title}</td>
                  <td className="p-4 text-slate-600">{b.author}</td>
                  <td className="p-4 text-slate-500 font-mono text-xs">{b.isbn}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${b.copiesAvailable > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                      <span className="font-semibold text-slate-700">{b.copiesAvailable} / {b.copiesTotal}</span>
                    </div>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button onClick={() => handleDeleteBook(b._id)} className="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBooks.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-slate-500">No books found in catalog.</td></tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 pl-6">User</th>
                <th className="p-4">Book</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-50">
              {filteredIssues.map(issue => {
                const isOverdue = issue.status === 'Issued' && new Date(issue.dueDate) < new Date();
                return (
                  <tr key={issue._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{issue.user?.name}</td>
                    <td className="p-4 font-bold text-indigo-900">{issue.book?.title}</td>
                    <td className="p-4 text-slate-500">{new Date(issue.issueDate).toLocaleDateString()}</td>
                    <td className="p-4 text-slate-500">{new Date(issue.dueDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      {issue.status === 'Returned' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="w-3 h-3" /> Returned {issue.fineAmount > 0 && `(Fine: $${issue.fineAmount})`}
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {isOverdue && <AlertTriangle className="w-3 h-3" />}
                          {isOverdue ? 'Overdue' : 'Issued'}
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {issue.status === 'Issued' && (
                        <button onClick={() => handleReturnBook(issue._id)} className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors">
                          Mark Returned
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredIssues.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-slate-500">No circulation records found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
