import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { User, Save, Building2, Calendar, Phone, MapPin, Hash, CheckCircle2 } from 'lucide-react';

export default function StudentProfileModule({ user }) {
  const [profile, setProfile] = useState({
    enrollmentNumber: '',
    department: '',
    semester: 1,
    phone: '',
    address: '',
    dateOfBirth: ''
  });
  const [departments, setDepartments] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilesRes, deptsRes] = await Promise.all([
          api.get('/student-profiles'),
          api.get('/departments')
        ]);
        
        setDepartments(deptsRes.data);
        
        // Find my profile
        const myProfile = profilesRes.data.find(p => p.user?._id === user.id || p.user === user.id);
        
        if (myProfile) {
          setProfileId(myProfile._id);
          setProfile({
            enrollmentNumber: myProfile.enrollmentNumber || '',
            department: myProfile.department?._id || myProfile.department || '',
            semester: myProfile.semester || 1,
            phone: myProfile.phone || '',
            address: myProfile.address || '',
            dateOfBirth: myProfile.dateOfBirth ? myProfile.dateOfBirth.split('T')[0] : ''
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id) fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...profile, user: user.id };
      
      if (profileId) {
        await api.put(`/student-profiles/${profileId}`, payload);
      } else {
        const { data } = await api.post('/student-profiles', payload);
        setProfileId(data._id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading profile data...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
          <p className="text-slate-500 text-sm">Manage your student information and details.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Hash className="w-4 h-4 text-slate-400" /> Enrollment Number
            </label>
            <input 
              required 
              name="enrollmentNumber"
              value={profile.enrollmentNumber}
              onChange={handleChange}
              disabled={!!profileId}
              className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${profileId ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-slate-50 focus:bg-white'}`}
              placeholder="e.g. STU2026101"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Building2 className="w-4 h-4 text-slate-400" /> Department
            </label>
            <select 
              name="department"
              value={profile.department}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept._id} value={dept._id}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Calendar className="w-4 h-4 text-slate-400" /> Current Semester
            </label>
            <input 
              type="number"
              name="semester"
              min="1"
              max="8"
              value={profile.semester}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Phone className="w-4 h-4 text-slate-400" /> Phone Number
            </label>
            <input 
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Calendar className="w-4 h-4 text-slate-400" /> Date of Birth
            </label>
            <input 
              type="date"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <MapPin className="w-4 h-4 text-slate-400" /> Address
            </label>
            <textarea 
              name="address"
              value={profile.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
              placeholder="Full residential address"
            ></textarea>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-end gap-4 border-t border-slate-100">
          {saved && (
            <span className="text-emerald-600 flex items-center gap-1 text-sm font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Profile saved!
            </span>
          )}
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-200"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : (profileId ? 'Update Profile' : 'Create Profile')}
          </button>
        </div>
      </form>
    </div>
  );
}
