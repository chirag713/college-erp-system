import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost', required: true },
  resumeUrl: { type: String, required: true },
  status: { type: String, enum: ['Applied', 'Shortlisted', 'Interviewed', 'Selected', 'Rejected'], default: 'Applied' }
}, { timestamps: true });

export default mongoose.model('JobApplication', jobApplicationSchema);
