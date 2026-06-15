import mongoose from 'mongoose';

const systemSettingSchema = new mongoose.Schema({
  academicYear: { type: String, default: '2025-2026' },
  currentSemester: { type: Number, default: 1 },
  configMap: { 
    type: Map, 
    of: mongoose.Schema.Types.Mixed, 
    default: {} 
  } // Extensible schema for future configurations
}, { timestamps: true });

export default mongoose.model('SystemSetting', systemSettingSchema);
