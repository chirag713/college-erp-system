import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], default: 'Upcoming' },
  participantLimit: { type: Number, required: true },
  currentRegistrations: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
