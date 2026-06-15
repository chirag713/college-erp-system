import ExamSchedule from '../models/ExamSchedule.js';

export const createSchedule = async (req, res) => {
  try {
    const { exam, subject, date, time, room } = req.body;
    const newSchedule = new ExamSchedule({ exam, subject, date, time, room });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSchedules = async (req, res) => {
  try {
    const schedules = await ExamSchedule.find().populate('exam').populate('subject');
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
