import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { Home, Building, Users, Clock, AlertTriangle, CheckCircle2, UserPlus, DoorOpen } from 'lucide-react';

export default function HostelAdminModule() {
  const [activeSubTab, setActiveSubTab] = useState('infrastructure'); // infrastructure, allocations, requests
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [roomChanges, setRoomChanges] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Forms
  const [showAddHostel, setShowAddHostel] = useState(false);
  const [newHostel, setNewHostel] = useState({ name: '', type: 'Boys', wardenName: '' });

  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({ hostel: '', roomNumber: '', capacity: '', roomType: 'Non-AC', feePerSemester: '' });

  const [showAllocate, setShowAllocate] = useState(false);
  const [newAllocation, setNewAllocation] = useState({ student: '', room: '' });

  const fetchData = async () => {
    try {
      const [hRes, rRes, aRes, lrRes, rcRes, uRes] = await Promise.all([
        api.get('/hostels'),
        api.get('/hostels/rooms'),
        api.get('/hostel-allocations'),
        api.get('/leave-requests'),
        api.get('/room-changes'),
        api.get('/users?role=student')
      ]);
      setHostels(hRes.data);
      setRooms(rRes.data);
      setAllocations(aRes.data);
      setLeaveRequests(lrRes.data);
      setRoomChanges(rcRes.data);
      setUsers(uRes.data);
    } catch (error) {
      console.error('Error fetching hostel data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddHostel = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hostels', newHostel);
      setShowAddHostel(false);
      setNewHostel({ name: '', type: 'Boys', wardenName: '' });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding hostel');
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hostels/rooms', { ...newRoom, capacity: Number(newRoom.capacity), feePerSemester: Number(newRoom.feePerSemester) });
      setShowAddRoom(false);
      setNewRoom({ hostel: '', roomNumber: '', capacity: '', roomType: 'Non-AC', feePerSemester: '' });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding room');
    }
  };

  const handleAllocate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hostel-allocations', newAllocation);
      setShowAllocate(false);
      setNewAllocation({ student: '', room: '' });
      alert('Student allocated and Fee Invoice generated successfully!');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error allocating room');
    }
  };

  const handleLeaveStatus = async (id, status) => {
    try {
      await api.put(`/leave-requests/${id}/status`, { status });
      fetchData();
    } catch (error) {
      alert('Error updating leave request');
    }
  };

  const handleRoomChangeStatus = async (id, status) => {
    try {
      await api.put(`/room-changes/${id}/status`, { status });
      alert(`Room change request ${status.toLowerCase()} successfully!`);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error processing room change');
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Hostel System...</div>;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Home className="w-6 h-6 text-indigo-500" />
            Hostel Management
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage dormitories, student room allocations, and requests.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveSubTab('infrastructure')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'infrastructure' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Infrastructure
          </button>
          <button 
            onClick={() => setActiveSubTab('allocations')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'allocations' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Allocations
          </button>
          <button 
            onClick={() => setActiveSubTab('requests')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'requests' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Requests
          </button>
        </div>
      </div>

      {activeSubTab === 'infrastructure' && (
        <div className="space-y-8">
          {/* Hostels Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg text-slate-800">Hostel Buildings</h4>
              <button onClick={() => setShowAddHostel(!showAddHostel)} className="text-sm font-bold bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
                + Add Hostel
              </button>
            </div>
            
            {showAddHostel && (
              <form onSubmit={handleAddHostel} className="mb-6 p-5 bg-slate-50 border border-slate-100 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Hostel Name</label>
                  <input required type="text" value={newHostel.name} onChange={e => setNewHostel({...newHostel, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
                  <select required value={newHostel.type} onChange={e => setNewHostel({...newHostel, type: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                    <option value="Co-ed">Co-ed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Warden Name</label>
                  <input required type="text" value={newHostel.wardenName} onChange={e => setNewHostel({...newHostel, wardenName: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Save Hostel</button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    <th className="p-4 pl-6">Hostel Name</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Warden Name</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50">
                  {hostels.map(h => (
                    <tr key={h._id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          <Building className="w-4 h-4" />
                        </div>
                        {h.name}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600">
                          {h.type}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">{h.wardenName}</td>
                    </tr>
                  ))}
                  {hostels.length === 0 && (
                    <tr><td colSpan="3" className="p-8 text-center text-slate-500">No hostels added yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Rooms Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg text-slate-800">Rooms</h4>
              <button onClick={() => setShowAddRoom(!showAddRoom)} className="text-sm font-bold bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
                + Add Room
              </button>
            </div>
            
            {showAddRoom && (
              <form onSubmit={handleAddRoom} className="mb-6 p-5 bg-slate-50 border border-slate-100 rounded-2xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Hostel</label>
                  <select required value={newRoom.hostel} onChange={e => setNewRoom({...newRoom, hostel: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                    <option value="">Select Hostel</option>
                    {hostels.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Room No.</label>
                  <input required type="text" value={newRoom.roomNumber} onChange={e => setNewRoom({...newRoom, roomNumber: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Capacity</label>
                  <input required type="number" min="1" value={newRoom.capacity} onChange={e => setNewRoom({...newRoom, capacity: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Fee ($)</label>
                  <input required type="number" min="0" value={newRoom.feePerSemester} onChange={e => setNewRoom({...newRoom, feePerSemester: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200" />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Save</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {rooms.map(r => {
                const isFull = r.currentOccupants.length >= r.capacity;
                return (
                  <div key={r._id} className={`p-4 border rounded-2xl flex flex-col justify-between ${isFull ? 'bg-red-50/50 border-red-100' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-lg text-slate-900">{r.roomNumber}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isFull ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {r.currentOccupants.length}/{r.capacity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold mb-1">{r.hostel?.name}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className="text-slate-500">{r.roomType}</span>
                      <span className="font-bold text-slate-700">${r.feePerSemester}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'allocations' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-lg text-slate-800">Current Allocations</h4>
            <button onClick={() => setShowAllocate(!showAllocate)} className="flex items-center gap-2 text-sm font-bold bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
              <UserPlus className="w-4 h-4" /> Allocate Room
            </button>
          </div>

          {showAllocate && (
            <form onSubmit={handleAllocate} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Student</label>
                <select required value={newAllocation.student} onChange={e => setNewAllocation({...newAllocation, student: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                  <option value="">Select Student</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Available Room</label>
                <select required value={newAllocation.room} onChange={e => setNewAllocation({...newAllocation, room: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white">
                  <option value="">Select Room</option>
                  {rooms.filter(r => r.currentOccupants.length < r.capacity).map(r => (
                    <option key={r._id} value={r._id}>{r.hostel?.name} - Room {r.roomNumber} ({r.capacity - r.currentOccupants.length} beds free)</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Confirm Allocation & Bill</button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Student</th>
                  <th className="p-4">Hostel</th>
                  <th className="p-4">Room No.</th>
                  <th className="p-4">Joined At</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {allocations.map(a => (
                  <tr key={a._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-900">{a.student?.name}</td>
                    <td className="p-4 text-slate-600">{a.room?.hostel?.name}</td>
                    <td className="p-4 text-slate-900 font-bold">{a.room?.roomNumber}</td>
                    <td className="p-4 text-slate-500">{new Date(a.joinedAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${a.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'requests' && (
        <div className="space-y-8">
          {/* Room Change Requests */}
          <div>
            <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <DoorOpen className="w-5 h-5 text-indigo-500" /> Room Change Requests
            </h4>
            <div className="grid gap-4">
              {roomChanges.map(req => (
                <div key={req._id} className="p-5 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-slate-900">{req.student?.name} <span className="text-slate-400 font-normal ml-2">{req.student?.email}</span></h5>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <span className="font-medium bg-slate-100 px-2 py-1 rounded-lg">Current: {req.currentRoom?.hostel?.name} - {req.currentRoom?.roomNumber}</span>
                      <span>➡️</span>
                      <span className="font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg">Requested: {req.requestedRoom?.hostel?.name} - {req.requestedRoom?.roomNumber}</span>
                    </div>
                    <p className="text-sm text-slate-500 italic mt-2">" {req.reason} "</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {req.status === 'Pending' ? (
                      <>
                        <button onClick={() => handleRoomChangeStatus(req._id, 'Approved')} className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold text-sm rounded-xl transition-colors">Approve & Transfer</button>
                        <button onClick={() => handleRoomChangeStatus(req._id, 'Rejected')} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm rounded-xl transition-colors">Reject</button>
                      </>
                    ) : (
                      <span className={`px-4 py-2 text-sm font-bold rounded-xl ${req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {req.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {roomChanges.length === 0 && <p className="text-slate-500 text-sm">No room change requests.</p>}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Leave Requests */}
          <div>
            <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" /> Leave Requests (Gatepass)
            </h4>
            <div className="grid gap-4">
              {leaveRequests.map(lr => (
                <div key={lr._id} className="p-5 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-slate-900">{lr.student?.name} <span className="text-slate-400 font-normal ml-2">{lr.student?.email}</span></h5>
                    <div className="flex items-center gap-4 mt-2 text-sm font-medium text-slate-600">
                      <span>Leave: {new Date(lr.departureDate).toLocaleDateString()}</span>
                      <span>Return: {new Date(lr.returnDate).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-500 italic mt-2">" {lr.reason} "</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {lr.status === 'Pending' ? (
                      <>
                        <button onClick={() => handleLeaveStatus(lr._id, 'Approved')} className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold text-sm rounded-xl transition-colors">Approve</button>
                        <button onClick={() => handleLeaveStatus(lr._id, 'Rejected')} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm rounded-xl transition-colors">Reject</button>
                      </>
                    ) : (
                      <span className={`px-4 py-2 text-sm font-bold rounded-xl ${lr.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {lr.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {leaveRequests.length === 0 && <p className="text-slate-500 text-sm">No leave requests.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
