import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  marksObtained: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
  },
  semester: {
    type: Number,
    required: true,
  },
  evaluationType: {
    type: String,
    enum: ['midterm', 'final', 'assignment', 'project'],
    default: 'final',
  }
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);
