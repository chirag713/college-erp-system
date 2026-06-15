import Document from '../models/Document.js';

export const uploadDocument = async (req, res) => {
  try {
    const { documentType, fileUrl } = req.body;
    const document = new Document({
      user: req.user._id,
      documentType,
      fileUrl
    });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = { isDeleted: false };
    if (req.query.status) query.status = req.query.status;

    const documents = await Document.find(query)
      .populate('user', 'name email role')
      .skip(skip)
      .limit(limit);
    
    const total = await Document.countDocuments(query);

    res.status(200).json({
      documents,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalDocuments: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id, isDeleted: false });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Verified' or 'Rejected'
    const document = await Document.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { status },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
