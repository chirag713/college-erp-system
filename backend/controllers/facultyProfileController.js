import FacultyProfile from '../models/FacultyProfile.js';

export const getFacultyProfiles = async (req, res) => {
  try {
    const profiles = await FacultyProfile.find().populate('user', '-password').populate('department');
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFacultyProfileById = async (req, res) => {
  try {
    const profile = await FacultyProfile.findById(req.params.id).populate('user', '-password').populate('department');
    if (!profile) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFacultyProfile = async (req, res) => {
  try {
    const profile = new FacultyProfile(req.body);
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFacultyProfile = async (req, res) => {
  try {
    const profile = await FacultyProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!profile) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFacultyProfile = async (req, res) => {
  try {
    const profile = await FacultyProfile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
