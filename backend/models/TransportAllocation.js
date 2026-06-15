import mongoose from 'mongoose';

const transportAllocationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportRoute', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  stopName: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('TransportAllocation', transportAllocationSchema);
