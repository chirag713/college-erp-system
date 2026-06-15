import mongoose from 'mongoose';

const academicEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, enum: ['Holiday', 'Exam', 'Event', 'Registration', 'Other'], default: 'Other' }
}, { timestamps: true });

export default mongoose.model('AcademicEvent', academicEventSchema);
