import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('AuditLog', auditLogSchema);
