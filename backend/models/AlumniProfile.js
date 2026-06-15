import mongoose from 'mongoose';

const alumniProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  batchYear: { type: Number, required: true },
  currentCompany: { type: String },
  designation: { type: String },
  linkedinUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('AlumniProfile', alumniProfileSchema);
