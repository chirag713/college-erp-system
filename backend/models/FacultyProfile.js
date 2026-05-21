import mongoose from 'mongoose';

const facultyProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  designation: {
    type: String,
    enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'],
    default: 'Assistant Professor'
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  }
}, { timestamps: true });

export default mongoose.model('FacultyProfile', facultyProfileSchema);
