import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetAudience: {
    type: String,
    enum: ['all', 'student', 'faculty'],
    default: 'all',
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null, // If null, means it's a global notice
  }
}, { timestamps: true });

export default mongoose.model('Notice', noticeSchema);
