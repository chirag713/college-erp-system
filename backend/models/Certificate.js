import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  certificateType: { type: String, required: true }, // bonafide, character, participation, etc.
  fileUrl: { type: String, required: true },
  verifyHash: { type: String, required: true, unique: true },
  issueDate: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
