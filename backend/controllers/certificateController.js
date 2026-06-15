import Certificate from '../models/Certificate.js';
import crypto from 'crypto';

export const createCertificate = async (req, res) => {
  try {
    const { user, certificateType, fileUrl } = req.body;
    // Generate a unique short hash for verification
    const verifyHash = crypto.randomBytes(8).toString('hex');
    
    const certificate = new Certificate({ user, certificateType, fileUrl, verifyHash });
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const certificates = await Certificate.find({ isDeleted: false })
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit);
      
    const total = await Certificate.countDocuments({ isDeleted: false });

    res.status(200).json({
      certificates,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCertificates: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ user: req.user._id, isDeleted: false });
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyCertificate = async (req, res) => {
  try {
    const { hash } = req.params;
    const certificate = await Certificate.findOne({ verifyHash: hash, isDeleted: false }).populate('user', 'name email role');
    
    if (!certificate) return res.status(404).json({ valid: false, message: 'Invalid or revoked certificate' });
    
    res.status(200).json({ valid: true, certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.status(200).json({ message: 'Certificate deleted (revoked) successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findOne({ _id: id, isDeleted: false });
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.status(200).json({ fileUrl: certificate.fileUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
