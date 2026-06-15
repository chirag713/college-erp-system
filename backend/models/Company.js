import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industry: { type: String },
  website: { type: String },
  contactEmail: { type: String }
}, { timestamps: true });

export default mongoose.model('Company', companySchema);
