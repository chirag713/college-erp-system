import User from '../models/User.js';
import FeeInvoice from '../models/FeeInvoice.js';
import Attendance from '../models/Attendance.js';
import BookIssue from '../models/BookIssue.js';

export const getStudentCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'student' });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFacultyCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'faculty' });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeeCollectionStats = async (req, res) => {
  try {
    const totalInvoices = await FeeInvoice.countDocuments();
    const paidInvoices = await FeeInvoice.countDocuments({ status: 'Paid' });
    const pendingInvoices = await FeeInvoice.countDocuments({ status: 'Pending' });
    
    // Ideally we would aggregate the amount field
    const totalAmountAgg = await FeeInvoice.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalAmount = totalAmountAgg.length > 0 ? totalAmountAgg[0].total : 0;

    res.status(200).json({ totalInvoices, paidInvoices, pendingInvoices, totalAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttendanceStats = async (req, res) => {
  try {
    const totalRecords = await Attendance.countDocuments();
    const presentRecords = await Attendance.countDocuments({ status: 'Present' });
    res.status(200).json({ totalRecords, presentRecords });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLibraryStats = async (req, res) => {
  try {
    const totalIssued = await BookIssue.countDocuments();
    const activeIssues = await BookIssue.countDocuments({ status: 'Issued' });
    const returned = await BookIssue.countDocuments({ status: 'Returned' });
    res.status(200).json({ totalIssued, activeIssues, returned });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: 'student' });
    const faculties = await User.countDocuments({ role: 'faculty' });
    const activeBookIssues = await BookIssue.countDocuments({ status: 'Issued' });
    const pendingFees = await FeeInvoice.countDocuments({ status: 'Pending' });

    res.status(200).json({ students, faculties, activeBookIssues, pendingFees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
