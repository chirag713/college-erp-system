import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Null if broadcast
  isBroadcast: { type: Boolean, default: false },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['Fee', 'Assignment', 'Attendance', 'Exam', 'Hostel', 'General'], default: 'General' },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Used for both broadcast and individual to track read status
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
