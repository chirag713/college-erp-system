import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  dayOfWeek: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true, // completely flexible text (e.g. "09:00 AM")
  },
  endTime: {
    type: String,
    required: true, // completely flexible text (e.g. "10:30 AM")
  },
  room: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Timetable', timetableSchema);
