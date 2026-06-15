import mongoose from 'mongoose';

const assignmentSubmissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true },
  submissionDate: { type: Date, default: Date.now },
  grade: { type: String },
  feedback: { type: String }
}, { timestamps: true });

export default mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);
