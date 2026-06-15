import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Loader2, AlertCircle, Shield, Globe, Database, Mail } from 'lucide-react';

export default function SettingsModule({ role }) {
  const [settings, setSettings] = useState({
    siteName: 'EduPulse ERP',
    contactEmail: 'admin@edupulse.edu',
    maintenanceMode: false,
    maxUploadSize: '5MB',
    academicYear: '2026-2027',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg('Settings updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1000);
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-slate-500">
        <Shield className="w-12 h-12 text-red-400 mb-4" />
        <p className="text-lg font-medium text-slate-900">Access Restricted</p>
        <p className="text-sm">Only system administrators can access settings.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
        <p>Loading configuration...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
          <p className="text-sm text-slate-500 mt-1">Configure global platform behavior and parameters.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 disabled:opacity-70"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 font-medium flex items-center gap-2">
          <Shield className="w-5 h-5" /> {successMsg}
        </div>
      )}

      {/* General Settings */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-6 text-slate-800 border-b border-slate-100 pb-4">
          <Globe className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-bold">General Configuration</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Platform Name</label>
            <input 
              type="text" 
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Academic Year</label>
            <select 
              value={settings.academicYear}
              onChange={(e) => handleChange('academicYear', e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>2025-2026</option>
              <option>2026-2027</option>
              <option>2027-2028</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Admin Contact Email</label>
            <input 
              type="email" 
              value={settings.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
        </div>
      </div>

      {/* System Limitations */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-6 text-slate-800 border-b border-slate-100 pb-4">
          <Database className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-bold">Storage & Security</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Max Document Upload Size</label>
            <select 
              value={settings.maxUploadSize}
              onChange={(e) => handleChange('maxUploadSize', e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>2MB</option>
              <option>5MB</option>
              <option>10MB</option>
              <option>25MB</option>
            </select>
            <p className="text-xs text-slate-500 mt-2">Limits file sizes for assignments and documents.</p>
          </div>
          
          <div className="flex flex-col justify-center">
            <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <input 
                type="checkbox" 
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span className="block font-bold text-slate-800">Enable Maintenance Mode</span>
                <span className="block text-xs text-slate-500">Temporarily locks out non-admin users.</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      
    </div>
  );
}
