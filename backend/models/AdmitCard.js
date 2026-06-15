import mongoose from 'mongoose';

const admitCardSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  status: { type: String, enum: ['Generated', 'Withheld'], default: 'Generated' },
  remarks: { type: String }
}, { timestamps: true });

export default mongoose.model('AdmitCard', admitCardSchema);
