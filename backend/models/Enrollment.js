import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
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
  semester: {
    type: Number,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped'],
    default: 'active',
  }
}, { timestamps: true });

// Prevent duplicate enrollments for the same course in the same semester
enrollmentSchema.index({ student: 1, course: 1, semester: 1 }, { unique: true });

export default mongoose.model('Enrollment', enrollmentSchema);
