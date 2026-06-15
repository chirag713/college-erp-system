import React, { useState, useEffect } from 'react';
import { Bus, Plus, Loader2, AlertCircle, MapPin, Users } from 'lucide-react';

export default function TransportModule({ role }) {
  const [activeSubTab, setActiveSubTab] = useState('routes'); // routes, vehicles, allocations
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [allocations, setAllocations] = useState([]);
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
        if (activeSubTab === 'routes') {
          setRoutes([
            { _id: '1', routeName: 'City Center Express', startPoint: 'Downtown', endPoint: 'Campus', stops: ['Mall', 'Station'], fee: 5000 },
            { _id: '2', routeName: 'North Suburbs', startPoint: 'North Gate', endPoint: 'Campus', stops: ['Park', 'Library'], fee: 4500 },
          ]);
        } else if (activeSubTab === 'vehicles') {
          setVehicles([
            { _id: '1', vehicleNumber: 'KA-01-AB-1234', capacity: 40, driverName: 'Ramesh', driverContact: '9876543210' },
            { _id: '2', vehicleNumber: 'KA-01-XY-9876', capacity: 25, driverName: 'Suresh', driverContact: '9123456780' },
          ]);
        } else if (activeSubTab === 'allocations') {
          setAllocations([
            { _id: '1', student: { name: 'Alice Smith', email: 'alice@student.com' }, route: { routeName: 'City Center Express' }, pickUpStop: 'Station', feeStatus: 'Paid' },
            { _id: '2', student: { name: 'Bob Jones', email: 'bob@student.com' }, route: { routeName: 'North Suburbs' }, pickUpStop: 'Library', feeStatus: 'Pending' },
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
          <h2 className="text-2xl font-bold text-slate-800">Transport Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage college bus routes, vehicles, and student allocations.</p>
        </div>
        
        {role === 'admin' && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel' : `Add ${activeSubTab.charAt(0).toUpperCase() + activeSubTab.slice(1, -1)}`}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveSubTab('routes')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'routes' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Routes
        </button>
        {role === 'admin' && (
          <button
            onClick={() => setActiveSubTab('vehicles')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'vehicles' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Vehicles
          </button>
        )}
        <button
          onClick={() => setActiveSubTab('allocations')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${activeSubTab === 'allocations' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          {role === 'student' ? 'My Allocation' : 'Allocations'}
        </button>
      </div>

      {/* Add Form (Admin Only) */}
      {showAddForm && role === 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Create New {activeSubTab.charAt(0).toUpperCase() + activeSubTab.slice(1, -1)}</h3>
          {/* Simplified form structure just to show intent */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name / Identifier</label>
              <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Details</label>
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
        ) : activeSubTab === 'routes' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Route Name</th>
                  <th className="p-4">Path</th>
                  <th className="p-4">Stops</th>
                  <th className="p-4">Annual Fee</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {routes.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{item.routeName}</td>
                    <td className="p-4 text-slate-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400"/> {item.startPoint} → {item.endPoint}
                    </td>
                    <td className="p-4 text-slate-500">{item.stops.join(', ')}</td>
                    <td className="p-4 font-medium text-emerald-600">${item.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeSubTab === 'vehicles' && role === 'admin' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Vehicle No.</th>
                  <th className="p-4">Capacity</th>
                  <th className="p-4">Driver Name</th>
                  <th className="p-4">Driver Contact</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {vehicles.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">{item.vehicleNumber}</td>
                    <td className="p-4 text-slate-600 flex items-center gap-1">
                      <Users className="w-4 h-4" /> {item.capacity} seats
                    </td>
                    <td className="p-4 text-slate-500">{item.driverName}</td>
                    <td className="p-4 text-slate-500">{item.driverContact}</td>
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
                  <th className="p-4 pl-6">Student</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Pickup Stop</th>
                  <th className="p-4">Fee Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {allocations.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-slate-900">
                      {item.student.name}
                      <p className="text-xs text-slate-500 font-normal">{item.student.email}</p>
                    </td>
                    <td className="p-4 text-slate-600 flex items-center gap-2">
                      <Bus className="w-4 h-4 text-indigo-400" /> {item.route.routeName}
                    </td>
                    <td className="p-4 text-slate-500">{item.pickUpStop}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                        item.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.feeStatus}
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
