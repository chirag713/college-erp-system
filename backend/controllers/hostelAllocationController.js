import HostelAllocation from '../models/HostelAllocation.js';
import Room from '../models/Room.js';
import FeeInvoice from '../models/FeeInvoice.js';

export const getAllocations = async (req, res) => {
  try {
    const allocations = await HostelAllocation.find()
      .populate('student', 'name email')
      .populate({
        path: 'room',
        populate: { path: 'hostel' }
      });
    res.status(200).json(allocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAllocation = async (req, res) => {
  try {
    const allocation = await HostelAllocation.findOne({ student: req.user._id, status: 'Active' })
      .populate({
        path: 'room',
        populate: [
          { path: 'hostel' },
          { path: 'currentOccupants', select: 'name email' }
        ]
      });
    res.status(200).json(allocation || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allocateRoom = async (req, res) => {
  try {
    const { student, room } = req.body;

    // Check if student already has an active allocation
    const existingAllocation = await HostelAllocation.findOne({ student, status: 'Active' });
    if (existingAllocation) {
      return res.status(400).json({ message: 'Student is already allocated a room' });
    }

    // Check room capacity
    const roomObj = await Room.findById(room);
    if (!roomObj) return res.status(404).json({ message: 'Room not found' });
    
    if (roomObj.currentOccupants.length >= roomObj.capacity) {
      return res.status(400).json({ message: 'Room is already at full capacity' });
    }

    // Create allocation
    const allocation = new HostelAllocation({ student, room });
    await allocation.save();

    // Update room occupants
    roomObj.currentOccupants.push(student);
    await roomObj.save();

    // Automatically generate Fee Invoice for Hostel
    const feeInvoice = new FeeInvoice({
      student,
      amount: roomObj.feePerSemester,
      description: `Hostel Fee for Room ${roomObj.roomNumber}`,
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) // Due in 1 month
    });
    await feeInvoice.save();

    res.status(201).json(allocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const vacateRoom = async (req, res) => {
  try {
    const allocation = await HostelAllocation.findById(req.params.id);
    if (!allocation) return res.status(404).json({ message: 'Allocation not found' });
    if (allocation.status === 'Vacated') return res.status(400).json({ message: 'Already vacated' });

    allocation.status = 'Vacated';
    allocation.vacatedAt = new Date();
    await allocation.save();

    const roomObj = await Room.findById(allocation.room);
    if (roomObj) {
      roomObj.currentOccupants = roomObj.currentOccupants.filter(
        id => id.toString() !== allocation.student.toString()
      );
      await roomObj.save();
    }

    res.status(200).json(allocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
