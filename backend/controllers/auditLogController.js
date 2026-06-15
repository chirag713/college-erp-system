import AuditLog from '../models/AuditLog.js';

// Internal utility function for controllers to call
export const logAction = async (adminId, action, resource, details) => {
  try {
    const log = new AuditLog({ admin: adminId, action, resource, details });
    await log.save();
  } catch (error) {
    console.error('Audit Log Error:', error);
  }
};

export const createAuditLog = async (req, res) => {
  try {
    const { action, resource, details } = req.body;
    const log = new AuditLog({ admin: req.user._id, action, resource, details });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuditLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = { isDeleted: false };
    if (req.query.resource) query.resource = req.query.resource;
    if (req.query.action) query.action = req.query.action;

    const logs = await AuditLog.find(query)
      .populate('admin', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AuditLog.countDocuments(query);

    res.status(200).json({
      logs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalLogs: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserActivityLogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await AuditLog.find({ admin: userId, isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAuditLog = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await AuditLog.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json({ message: 'Audit log soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
