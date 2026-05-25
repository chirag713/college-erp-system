import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { Home, Users, DoorOpen, Clock, AlertTriangle, Send, Building } from 'lucide-react';

export default function HostelStudentModule() {
  const [activeTab, setActiveTab] = useState('myroom');
  const [allocation, setAllocation] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [roomChanges, setRoomChanges] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Forms
  const [newLeave, setNewLeave] = useState({ reason: '', departureDate: '', returnDate: '' });
  const [newRoomChange, setNewRoomChange] = useState({ requestedRoom: '', reason: '' });

  const fetchData = async () => {
    try {
      const [allocRes, lrRes, rcRes, roomsRes] = await Promise.all([
        api.get('/hostel-allocations/my'),
        api.get('/leave-requests/my'),
        api.get('/room-changes/my'),
        api.get('/hostels/rooms') // Fetches all rooms so they can pick one
      ]);
      setAllocation(allocRes.data);
      setLeaveRequests(lrRes.data);
      setRoomChanges(rcRes.data);
      setAllRooms(roomsRes.data);
    } catch (error) {
      console.error('Error fetching student hostel data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/leave-requests', newLeave);
      setNewLeave({ reason: '', departureDate: '', returnDate: '' });
      alert('Leave request submitted successfully');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting request');
    }
  };

  const handleApplyRoomChange = async (e) => {
    e.preventDefault();
    try {
      await api.post('/room-changes', newRoomChange);
      setNewRoomChange({ requestedRoom: '', reason: '' });
      alert('Room change request submitted successfully');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting request');
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Hostel Portal...</div>;

  if (!allocation) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
        <Home className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Not a Hostel Resident</h3>
        <p className="text-slate-500">You are currently not allocated to any hostel room.</p>
      </div>
    );
  }

  const { room } = allocation;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Home className="w-6 h-6 text-indigo-500" />
            Hostel Portal
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage your stay, room transfer, and leave requests.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('myroom')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'myroom' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            My Room
          </button>
          <button 
            onClick={() => setActiveTab('leave')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'leave' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Leave Gatepass
          </button>
          <button 
            onClick={() => setActiveTab('roomchange')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'roomchange' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Room Transfer
          </button>
        </div>
      </div>

      {activeTab === 'myroom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl text-white shadow-lg">
            <h4 className="text-indigo-100 font-bold mb-6 flex items-center gap-2"><Building className="w-5 h-5" /> Current Allocation</h4>
            <div className="space-y-4">
              <div>
                <p className="text-indigo-200 text-sm">Hostel</p>
                <p className="text-2xl font-bold">{room?.hostel?.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-indigo-400/30">
                <div>
                  <p className="text-indigo-200 text-sm">Room No.</p>
                  <p className="text-xl font-bold">{room?.roomNumber}</p>
                </div>
                <div>
                  <p className="text-indigo-200 text-sm">Type</p>
                  <p className="text-xl font-bold">{room?.roomType}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-indigo-400/30">
                <p className="text-indigo-200 text-sm">Warden Contact</p>
                <p className="font-bold">{room?.hostel?.wardenName}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-slate-400" /> Roommates</h4>
            <div className="space-y-3">
              {room?.currentOccupants?.map(occ => (
                <div key={occ._id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {occ.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{occ.name}</p>
                    <p className="text-sm text-slate-500">{occ.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leave' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 border-r border-slate-100 pr-8">
            <h4 className="font-bold text-lg text-slate-800 mb-4">Apply for Leave</h4>
            <form onSubmit={handleApplyLeave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Departure Date</label>
                <input required type="date" value={newLeave.departureDate} onChange={e => setNewLeave({...newLeave, departureDate: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Return Date</label>
                <input required type="date" value={newLeave.returnDate} onChange={e => setNewLeave({...newLeave, returnDate: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Reason for Leave</label>
                <textarea required rows="3" value={newLeave.reason} onChange={e => setNewLeave({...newLeave, reason: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Request
              </button>
            </form>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg text-slate-800 mb-4">My Request History</h4>
            <div className="space-y-3">
              {leaveRequests.map(lr => (
                <div key={lr._id} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center bg-slate-50">
                  <div>
                    <p className="font-bold text-slate-800">Leave for {new Date(lr.departureDate).toLocaleDateString()}</p>
                    <p className="text-sm text-slate-500">Reason: {lr.reason}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${lr.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : lr.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {lr.status}
                  </span>
                </div>
              ))}
              {leaveRequests.length === 0 && <p className="text-slate-500 text-sm">No leave requests found.</p>}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roomchange' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 border-r border-slate-100 pr-8">
            <h4 className="font-bold text-lg text-slate-800 mb-4">Request Room Transfer</h4>
            <form onSubmit={handleApplyRoomChange} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Select Desired Room</label>
                <select required value={newRoomChange.requestedRoom} onChange={e => setNewRoomChange({...newRoomChange, requestedRoom: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                  <option value="">Choose an available room</option>
                  {allRooms
                    .filter(r => r.currentOccupants.length < r.capacity && r._id !== room._id)
                    .map(r => (
                    <option key={r._id} value={r._id}>{r.hostel?.name} - Room {r.roomNumber} ({r.capacity - r.currentOccupants.length} spaces left)</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Only shows rooms with available beds</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Reason for Transfer</label>
                <textarea required rows="3" value={newRoomChange.reason} onChange={e => setNewRoomChange({...newRoomChange, reason: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Transfer Request
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg text-slate-800 mb-4">My Transfer Requests</h4>
            <div className="space-y-3">
              {roomChanges.map(rc => (
                <div key={rc._id} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center bg-slate-50">
                  <div>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      <DoorOpen className="w-4 h-4 text-slate-400" />
                      Requested: {rc.requestedRoom?.hostel?.name} (Room {rc.requestedRoom?.roomNumber})
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Reason: {rc.reason}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${rc.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : rc.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {rc.status}
                  </span>
                </div>
              ))}
              {roomChanges.length === 0 && <p className="text-slate-500 text-sm">No transfer requests found.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
