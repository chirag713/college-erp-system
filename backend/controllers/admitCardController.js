import AdmitCard from '../models/AdmitCard.js';

export const generateAdmitCard = async (req, res) => {
  try {
    const { student, exam, remarks } = req.body;
    const admitCard = new AdmitCard({ student, exam, remarks });
    await admitCard.save();
    res.status(201).json(admitCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdmitCard = async (req, res) => {
  try {
    const { examId, studentId } = req.params;
    const query = {};
    if (examId) query.exam = examId;
    if (studentId) query.student = studentId;
    const admitCards = await AdmitCard.find(query).populate('student', 'name email').populate('exam');
    res.status(200).json(admitCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
