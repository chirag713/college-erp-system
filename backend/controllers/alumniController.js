import AlumniProfile from '../models/AlumniProfile.js';
import AlumniOpportunity from '../models/AlumniOpportunity.js';

export const createAlumniProfile = async (req, res) => {
  try {
    const { batchYear, currentCompany, designation, linkedinUrl } = req.body;
    const existing = await AlumniProfile.findOne({ user: req.user._id });
    if (existing) return res.status(400).json({ message: 'Alumni profile already exists' });

    const profile = new AlumniProfile({
      user: req.user._id,
      batchYear,
      currentCompany,
      designation,
      linkedinUrl
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlumniProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const profiles = await AlumniProfile.find()
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit);
      
    const total = await AlumniProfile.countDocuments();

    res.status(200).json({
      profiles,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProfiles: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAlumniProfile = async (req, res) => {
  try {
    const profile = await AlumniProfile.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    if (!profile) return res.status(404).json({ message: 'Alumni profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postAlumniOpportunity = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const profile = await AlumniProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Alumni profile not found' });

    const opportunity = new AlumniOpportunity({
      alumni: profile._id,
      title,
      description,
      link
    });
    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
