import Semester from '../models/Semester.js';

export const createSemester = async (req, res) => {
  try {
    const { semesterNumber, year, startDate, endDate } = req.body;
    const newSemester = new Semester({ semesterNumber, year, startDate, endDate });
    await newSemester.save();
    res.status(201).json(newSemester);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find();
    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
