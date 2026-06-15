import mongoose from 'mongoose';

const jobPostSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  eligibilityCriteria: { type: String },
  salary: { type: String },
  deadline: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('JobPost', jobPostSchema);
