import Exam from '../models/Exam.js';

export const createExam = async (req, res) => {
  try {
    const { examName, semester, course, startDate, endDate } = req.body;
    const newExam = new Exam({ examName, semester, course, startDate, endDate });
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('semester').populate('course');
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
