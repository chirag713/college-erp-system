import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
  semesterNumber: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model('Semester', semesterSchema);
