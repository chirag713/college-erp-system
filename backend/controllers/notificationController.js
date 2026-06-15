import Notification from '../models/Notification.js';

export const createNotification = async (req, res) => {
  try {
    const { recipient, isBroadcast, title, message, type } = req.body;
    const notification = new Notification({
      recipient: isBroadcast ? undefined : recipient,
      isBroadcast,
      title,
      message,
      type
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyNotifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { recipient: req.user._id },
        { isBroadcast: true }
      ]
    };

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments(query);

    // Map to include a simple `isRead` boolean for the current user
    const formattedNotifications = notifications.map(notif => {
      const isRead = notif.readBy.includes(req.user._id);
      return { ...notif._doc, isRead };
    });

    res.status(200).json({
      notifications: formattedNotifications,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalNotifications: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    if (!notification.readBy.includes(req.user._id)) {
      notification.readBy.push(req.user._id);
      await notification.save();
    }

    res.status(200).json({ message: 'Marked as read', notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    // Only allow admin to delete broadcast notifications, individuals can delete their own
    if (notification.isBroadcast && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete broadcast notifications' });
    }
    
    if (!notification.isBroadcast && notification.recipient.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
       return res.status(403).json({ message: 'Not authorized' });
    }

    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
