import AcademicEvent from '../models/AcademicEvent.js';

export const createAcademicEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, type } = req.body;
    const event = new AcademicEvent({ title, description, startDate, endDate, type });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAcademicCalendar = async (req, res) => {
  try {
    const events = await AcademicEvent.find().sort({ startDate: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAcademicEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await AcademicEvent.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAcademicEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await AcademicEvent.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
