import mongoose from 'mongoose';

const alumniOpportunitySchema = new mongoose.Schema({
  alumni: { type: mongoose.Schema.Types.ObjectId, ref: 'AlumniProfile', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String }
}, { timestamps: true });

export default mongoose.model('AlumniOpportunity', alumniOpportunitySchema);
