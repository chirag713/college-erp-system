import Timetable from '../models/Timetable.js';

export const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate('course')
      .populate('faculty', '-password')
      .populate('department');
    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTimetable = async (req, res) => {
  try {
    const timetable = new Timetable(req.body);
    const savedTimetable = await timetable.save();
    res.status(201).json(savedTimetable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetable) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
