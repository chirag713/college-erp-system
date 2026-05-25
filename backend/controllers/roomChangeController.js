import RoomChangeRequest from '../models/RoomChangeRequest.js';
import HostelAllocation from '../models/HostelAllocation.js';
import Room from '../models/Room.js';

export const getRoomChangeRequests = async (req, res) => {
  try {
    const requests = await RoomChangeRequest.find()
      .populate('student', 'name email')
      .populate({ path: 'currentRoom', populate: { path: 'hostel' } })
      .populate({ path: 'requestedRoom', populate: { path: 'hostel' } });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyRoomChangeRequests = async (req, res) => {
  try {
    const requests = await RoomChangeRequest.find({ student: req.user._id })
      .populate({ path: 'currentRoom', populate: { path: 'hostel' } })
      .populate({ path: 'requestedRoom', populate: { path: 'hostel' } });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoomChangeRequest = async (req, res) => {
  try {
    const { requestedRoom, reason } = req.body;
    
    // Check if student has active allocation
    const allocation = await HostelAllocation.findOne({ student: req.user._id, status: 'Active' });
    if (!allocation) {
      return res.status(400).json({ message: 'You are not currently allocated a room' });
    }

    // Check if pending request already exists
    const existingReq = await RoomChangeRequest.findOne({ student: req.user._id, status: 'Pending' });
    if (existingReq) {
      return res.status(400).json({ message: 'You already have a pending room change request' });
    }

    const request = new RoomChangeRequest({
      student: req.user._id,
      currentRoom: allocation.room,
      requestedRoom,
      reason
    });
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRoomChangeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await RoomChangeRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status !== 'Pending') return res.status(400).json({ message: 'Request already processed' });

    if (status === 'Approved') {
      // Execute the room change
      const requestedRoomObj = await Room.findById(request.requestedRoom);
      if (requestedRoomObj.currentOccupants.length >= requestedRoomObj.capacity) {
        return res.status(400).json({ message: 'Requested room is now full. Cannot approve.' });
      }

      // Find current allocation
      const allocation = await HostelAllocation.findOne({ student: request.student, status: 'Active' });
      if (!allocation) return res.status(400).json({ message: 'Active allocation not found' });

      // Remove from old room
      const oldRoomObj = await Room.findById(allocation.room);
      if (oldRoomObj) {
        oldRoomObj.currentOccupants = oldRoomObj.currentOccupants.filter(
          id => id.toString() !== request.student.toString()
        );
        await oldRoomObj.save();
      }

      // Add to new room
      requestedRoomObj.currentOccupants.push(request.student);
      await requestedRoomObj.save();

      // Update allocation
      allocation.room = request.requestedRoom;
      await allocation.save();
    }

    request.status = status;
    await request.save();
    
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
