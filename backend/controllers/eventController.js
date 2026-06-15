import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, venue, participantLimit } = req.body;
    const event = new Event({ title, description, date, venue, participantLimit });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const events = await Event.find()
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Event.countDocuments();

    res.status(200).json({
      events,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.status !== 'Upcoming') return res.status(400).json({ message: 'Event is not upcoming' });

    const existingRegistration = await EventRegistration.findOne({ event: eventId, user: req.user._id });
    if (existingRegistration) return res.status(400).json({ message: 'Already registered' });

    let status = 'Registered';
    if (event.currentRegistrations >= event.participantLimit) {
      status = 'Waitlisted';
    } else {
      event.currentRegistrations += 1;
      await event.save();
    }

    const registration = new EventRegistration({ event: eventId, user: req.user._id, status });
    await registration.save();
    
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const registrations = await EventRegistration.find({ user: req.user._id }).populate('event');
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const event = await Event.findByIdAndUpdate(id, { status }, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
