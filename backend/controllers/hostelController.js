import Hostel from '../models/Hostel.js';
import Room from '../models/Room.js';

export const getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    const savedHostel = await hostel.save();
    res.status(201).json(savedHostel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('hostel').populate('currentOccupants', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (room.currentOccupants && room.currentOccupants.length > 0) {
      return res.status(400).json({ message: 'Cannot delete room with active occupants' });
    }
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
