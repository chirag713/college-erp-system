import Notice from '../models/Notice.js';

export const getNotices = async (req, res) => {
  try {
    let query = {
      $or: [
        { targetAudience: 'all' },
        { targetAudience: req.user.role }
      ]
    };
    const notices = await Notice.find(query).populate('author', 'name role').populate('department', 'name').sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotice = async (req, res) => {
  try {
    req.body.author = req.user._id; // set author to current user
    const notice = new Notice(req.body);
    const saved = await notice.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!notice) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(notice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
