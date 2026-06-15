import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);
