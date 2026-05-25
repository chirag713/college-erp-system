import BookIssue from '../models/BookIssue.js';
import Book from '../models/Book.js';

export const getBookIssues = async (req, res) => {
  try {
    const issues = await BookIssue.find().populate('book').populate('user', '-password');
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookIssues = async (req, res) => {
  try {
    const issues = await BookIssue.find({ user: req.user._id }).populate('book');
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const issueBook = async (req, res) => {
  try {
    const { book, user, dueDate } = req.body;
    
    // Check book availability
    const bookObj = await Book.findById(book);
    if (!bookObj) return res.status(404).json({ message: 'Book not found' });
    if (bookObj.copiesAvailable <= 0) return res.status(400).json({ message: 'No copies available' });
    
    // Create issue record
    const issue = new BookIssue({ book, user, dueDate });
    const savedIssue = await issue.save();
    
    // Decrement availability
    bookObj.copiesAvailable -= 1;
    await bookObj.save();
    
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const issue = await BookIssue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue record not found' });
    if (issue.status === 'Returned') return res.status(400).json({ message: 'Book already returned' });
    
    // Mark as returned
    issue.status = 'Returned';
    issue.returnDate = new Date();
    
    // Simple fine logic: $1 per day overdue
    if (issue.returnDate > issue.dueDate) {
      const diffTime = Math.abs(issue.returnDate - issue.dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      issue.fineAmount = diffDays * 1;
    }
    
    await issue.save();
    
    // Increment book availability
    const bookObj = await Book.findById(issue.book);
    if (bookObj) {
      bookObj.copiesAvailable += 1;
      await bookObj.save();
    }
    
    res.status(200).json(issue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
