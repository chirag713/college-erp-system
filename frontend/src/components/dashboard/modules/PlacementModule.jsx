import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Loader2, AlertCircle, Building, CheckCircle, UploadCloud } from 'lucide-react';

export default function PlacementModule({ role }) {
  const [activeSubTab, setActiveSubTab] = useState('jobs'); // jobs, companies, applications
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeSubTab]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        if (activeSubTab === 'jobs') {
          setJobs([
            { _id: '1', title: 'Software Development Engineer', company: { name: 'Google' }, ctc: '24 LPA', location: 'Bangalore', deadline: '2026-08-30' },
            { _id: '2', title: 'Data Analyst', company: { name: 'Amazon' }, ctc: '18 LPA', location: 'Hyderabad', deadline: '2026-09-15' },
          ]);
        } else if (activeSubTab === 'companies') {
          setCompanies([
            { _id: '1', name: 'Google', industry: 'Technology', website: 'careers.google.com' },
            { _id: '2', name: 'Amazon', industry: 'E-Commerce', website: 'amazon.jobs' },
          ]);
        } else if (activeSubTab === 'applications') {
          setApplications([
            { _id: '1', job: { title: 'Software Development Engineer', company: { name: 'Google' } }, student: { name: 'Alice Smith', email: 'alice@student.com' }, status: 'Shortlisted' },
            { _id: '2', job: { title: 'Data Analyst', company: { name: 'Amazon' } }, student: { name: 'Alice Smith', email: 'alice@student.com' }, status: 'Applied' },
          ]);
        }
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Placement Cell</h2>
          <p className="text-sm text-slate-500 mt-1">Explore career opportunities and manage recruitment drives.</p>
        </div>
        
        {role === 'admin' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel' : `Add ${activeSubTab === 'jobs' ? 'Job' : 'Company'}`}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveSubTab('jobs')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'jobs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Job Postings
        </button>
        {role === 'admin' && (
          <button
            onClick={() => setActiveSubTab('companies')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'companies' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Companies
          </button>
        )}
        <button
          onClick={() => setActiveSubTab('applications')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'applications' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          {role === 'student' ? 'My Applications' : 'All Applications'}
        </button>
      </div>

      {/* Add Form (Admin Only) */}
      {showAddForm && role === 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Post a New {activeSubTab === 'jobs' ? 'Job' : 'Company'}</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title / Name</label>
              <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Details (CTC / Industry)</label>
              <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Area */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
            <p>Loading {activeSubTab}...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p>{error}</p>
          </div>
        ) : activeSubTab === 'jobs' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Job Profile</th>
                  <th className="p-4">Package (CTC)</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {jobs.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">
                      {item.title}
                      <p className="text-xs text-slate-500 font-normal mt-0.5 flex items-center gap-1">
                        <Building className="w-3 h-3"/> {item.company.name}
                      </p>
                    </td>
                    <td className="p-4 font-bold text-emerald-600">{item.ctc}</td>
                    <td className="p-4 text-slate-600">{item.location}</td>
                    <td className="p-4 text-slate-500">{item.deadline}</td>
                    <td className="p-4 text-center">
                      {role === 'student' ? (
                        <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                          Apply Now
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs">Manage</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeSubTab === 'companies' && role === 'admin' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Company Name</th>
                  <th className="p-4">Industry</th>
                  <th className="p-4">Website</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {companies.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{item.name}</td>
                    <td className="p-4 text-slate-600">{item.industry}</td>
                    <td className="p-4 text-indigo-600 hover:underline cursor-pointer">{item.website}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Job Profile</th>
                  {role === 'admin' && <th className="p-4">Applicant</th>}
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {applications.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">
                      {item.job.title}
                      <p className="text-xs text-slate-500 font-normal">{item.job.company.name}</p>
                    </td>
                    {role === 'admin' && (
                      <td className="p-4 text-slate-600">
                        {item.student.name} <br/> <span className="text-xs text-slate-400">{item.student.email}</span>
                      </td>
                    )}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                        item.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Applied' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
