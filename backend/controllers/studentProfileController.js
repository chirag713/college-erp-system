import StudentProfile from '../models/StudentProfile.js';

export const getStudentProfiles = async (req, res) => {
  try {
    const profiles = await StudentProfile.find().populate('user', '-password').populate('department');
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProfileById = async (req, res) => {
  try {
    const profile = await StudentProfile.findById(req.params.id).populate('user', '-password').populate('department');
    if (!profile) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudentProfile = async (req, res) => {
  try {
    const profile = new StudentProfile(req.body);
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!profile) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudentProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
