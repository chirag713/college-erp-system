import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Registered', 'Waitlisted', 'Cancelled'], default: 'Registered' }
}, { timestamps: true });

export default mongoose.model('EventRegistration', eventRegistrationSchema);
