import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  driverName: { type: String, required: true },
  driverContact: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);
