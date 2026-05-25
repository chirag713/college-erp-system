import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { BookOpen, Search, BookMarked, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function LibraryModule() {
  const [activeSubTab, setActiveSubTab] = useState('catalog'); // catalog or mybooks
  const [books, setBooks] = useState([]);
  const [myIssues, setMyIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const [booksRes, issuesRes] = await Promise.all([
        api.get('/books'),
        api.get('/book-issues/my')
      ]);
      setBooks(booksRes.data);
      setMyIssues(issuesRes.data);
    } catch (error) {
      console.error('Error fetching library data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading library catalog...</div>;

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn.includes(search)
  );

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-500" />
            Digital Library
          </h3>
          <p className="text-sm text-slate-500 mt-1">Browse the college catalog and track your reading.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button 
            onClick={() => setActiveSubTab('catalog')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeSubTab === 'catalog' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Search className="w-4 h-4" /> Catalog
          </button>
          <button 
            onClick={() => setActiveSubTab('mybooks')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeSubTab === 'mybooks' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <BookMarked className="w-4 h-4" /> My Books
          </button>
        </div>
      </div>

      {activeSubTab === 'catalog' && (
        <>
          <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search books by title, author, or ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 shadow-sm" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => (
              <div key={book._id} className="border border-slate-100 rounded-2xl p-5 hover:border-indigo-100 hover:shadow-md transition-all group flex flex-col h-full bg-slate-50/50">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover:text-indigo-700 transition-colors">{book.title}</h4>
                  <p className="text-sm font-semibold text-slate-500 mb-4">{book.author}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">ISBN: {book.isbn}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${book.copiesAvailable > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {book.copiesAvailable > 0 ? `${book.copiesAvailable} Available` : 'Out of Stock'}
                  </span>
                </div>
              </div>
            ))}
            {filteredBooks.length === 0 && (
              <div className="col-span-full p-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                No books found matching your search.
              </div>
            )}
          </div>
        </>
      )}

      {activeSubTab === 'mybooks' && (
        <div className="space-y-4">
          {myIssues.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              You haven't borrowed any books yet.
            </div>
          ) : (
            myIssues.map(issue => {
              const isOverdue = issue.status === 'Issued' && new Date(issue.dueDate) < new Date();
              return (
                <div key={issue._id} className={`p-5 border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${isOverdue ? 'border-red-100 bg-red-50/30' : 'border-slate-100 hover:border-indigo-100'}`}>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{issue.book?.title}</h4>
                    <p className="text-sm text-slate-500 font-semibold">{issue.book?.author}</p>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-4 h-4" /> Issued: {new Date(issue.issueDate).toLocaleDateString()}
                      </span>
                      {issue.status === 'Issued' && (
                        <span className={`flex items-center gap-1.5 font-bold ${isOverdue ? 'text-red-600' : 'text-amber-600'}`}>
                          <AlertTriangle className="w-4 h-4" /> Due: {new Date(issue.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {issue.status === 'Returned' ? (
                      <span className="px-4 py-2 flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4" /> Returned
                      </span>
                    ) : (
                      <span className={`px-4 py-2 flex items-center gap-2 rounded-xl text-sm font-bold border ${isOverdue ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                        {isOverdue ? 'Overdue' : 'Active Issue'}
                      </span>
                    )}
                    {issue.fineAmount > 0 && (
                      <span className="text-xs font-bold text-red-500">Fine Paid: ${issue.fineAmount}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
