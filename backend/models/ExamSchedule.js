import mongoose from 'mongoose';

const examScheduleSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  room: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('ExamSchedule', examScheduleSchema);
