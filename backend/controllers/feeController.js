import FeeInvoice from '../models/FeeInvoice.js';

export const getFeeInvoices = async (req, res) => {
  try {
    const invoices = await FeeInvoice.find().populate('student', '-password');
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyFeeInvoices = async (req, res) => {
  try {
    const invoices = await FeeInvoice.find({ student: req.user._id });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFeeInvoice = async (req, res) => {
  try {
    const invoice = new FeeInvoice(req.body);
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const payFeeInvoice = async (req, res) => {
  try {
    const invoice = await FeeInvoice.findByIdAndUpdate(
      req.params.id, 
      { status: 'Paid' }, 
      { new: true, runValidators: true }
    );
    if (!invoice) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFeeInvoice = async (req, res) => {
  try {
    const invoice = await FeeInvoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
