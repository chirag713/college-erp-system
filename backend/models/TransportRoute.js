import mongoose from 'mongoose';

const transportRouteSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  stops: [{ type: String }],
  fare: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('TransportRoute', transportRouteSchema);
