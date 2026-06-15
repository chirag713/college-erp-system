import TransportRoute from '../models/TransportRoute.js';
import Vehicle from '../models/Vehicle.js';
import TransportAllocation from '../models/TransportAllocation.js';

export const createRoute = async (req, res) => {
  try {
    const { routeName, stops, fare } = req.body;
    const route = new TransportRoute({ routeName, stops, fare });
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoutes = async (req, res) => {
  try {
    const routes = await TransportRoute.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVehicle = async (req, res) => {
  try {
    const { vehicleNumber, capacity, driverName, driverContact } = req.body;
    const vehicle = new Vehicle({ vehicleNumber, capacity, driverName, driverContact });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignTransport = async (req, res) => {
  try {
    const { student, route, vehicle, stopName } = req.body;
    const allocation = new TransportAllocation({ student, route, vehicle, stopName });
    await allocation.save();
    res.status(201).json(allocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTransport = async (req, res) => {
  try {
    const { studentId } = req.params;
    const transport = await TransportAllocation.find({ student: studentId })
      .populate('route')
      .populate('vehicle');
    res.status(200).json(transport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
