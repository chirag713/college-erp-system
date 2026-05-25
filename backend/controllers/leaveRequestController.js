import LeaveRequest from '../models/LeaveRequest.js';

export const getLeaveRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find().populate('student', 'name email');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyLeaveRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ student: req.user._id });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLeaveRequest = async (req, res) => {
  try {
    const request = new LeaveRequest({
      student: req.user._id,
      ...req.body
    });
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLeaveRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
