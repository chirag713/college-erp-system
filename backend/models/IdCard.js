import mongoose from 'mongoose';

const idCardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Student', 'Faculty'], required: true },
  idNumber: { type: String, required: true, unique: true },
  issueDate: { type: Date, default: Date.now },
  validUntil: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('IdCard', idCardSchema);
