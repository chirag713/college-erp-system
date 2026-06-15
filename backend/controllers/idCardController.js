import IdCard from '../models/IdCard.js';
import User from '../models/User.js';

export const generateStudentIdCard = async (req, res) => {
  try {
    const { studentId, validUntil } = req.body;
    const user = await User.findById(studentId);
    if (!user || user.role !== 'student') return res.status(404).json({ message: 'Student not found' });

    const idNumber = `STU-${Math.floor(100000 + Math.random() * 900000)}`;
    const idCard = new IdCard({ user: studentId, type: 'Student', idNumber, validUntil });
    await idCard.save();
    res.status(201).json(idCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateFacultyIdCard = async (req, res) => {
  try {
    const { facultyId, validUntil } = req.body;
    const user = await User.findById(facultyId);
    if (!user || user.role !== 'faculty') return res.status(404).json({ message: 'Faculty not found' });

    const idNumber = `FAC-${Math.floor(100000 + Math.random() * 900000)}`;
    const idCard = new IdCard({ user: facultyId, type: 'Faculty', idNumber, validUntil });
    await idCard.save();
    res.status(201).json(idCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyIdCard = async (req, res) => {
  try {
    const idCard = await IdCard.findOne({ user: req.user._id }).populate('user', 'name email');
    if (!idCard) return res.status(404).json({ message: 'ID Card not found' });
    res.status(200).json(idCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadIdCard = async (req, res) => {
  try {
    const idCard = await IdCard.findOne({ user: req.user._id }).populate('user', 'name email');
    if (!idCard) return res.status(404).json({ message: 'ID Card not found' });
    // In a real scenario, generate a PDF and stream it. Here we just return the data.
    res.status(200).json({ message: 'ID card data ready for download', data: idCard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
