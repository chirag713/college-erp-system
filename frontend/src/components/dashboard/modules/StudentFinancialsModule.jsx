import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { CreditCard, Download, CheckCircle2, Clock } from 'lucide-react';

export default function StudentFinancialsModule() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(null);

  const fetchInvoices = async () => {
    try {
      const { data } = await api.get('/fees/my');
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handlePay = async (id) => {
    setPaying(id);
    try {
      // Simulate payment delay
      await new Promise(r => setTimeout(r, 1500));
      await api.put(`/fees/${id}/pay`);
      fetchInvoices();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setPaying(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading financials...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-indigo-500" />
          Fee Invoices
        </h3>
      </div>
      <div className="space-y-4">
        {invoices.length === 0 ? (
          <p className="text-center py-8 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">No pending or past invoices found.</p>
        ) : (
          invoices.map(inv => (
            <div key={inv._id} className="p-5 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-100 transition-colors">
              <div>
                <p className="font-bold text-slate-900 text-lg">{inv.description}</p>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Due: {new Date(inv.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-2xl font-extrabold text-slate-900">${inv.amount}</p>
                {inv.status === 'Paid' ? (
                  <span className="px-4 py-2 flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold tracking-wider border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" /> Paid
                  </span>
                ) : (
                  <button 
                    onClick={() => handlePay(inv._id)}
                    disabled={paying === inv._id}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all disabled:opacity-70 flex items-center gap-2"
                  >
                    {paying === inv._id ? 'Processing...' : 'Pay Now'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
