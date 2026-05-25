import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, isbn, copiesTotal } = req.body;
    const book = new Book({
      title,
      author,
      isbn,
      copiesTotal,
      copiesAvailable: copiesTotal // Initially available equals total
    });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    
    // If copiesTotal is being updated, we need to adjust copiesAvailable
    if (req.body.copiesTotal !== undefined) {
      const difference = req.body.copiesTotal - book.copiesTotal;
      req.body.copiesAvailable = book.copiesAvailable + difference;
      
      if (req.body.copiesAvailable < 0) {
        return res.status(400).json({ message: 'Cannot reduce total copies below currently issued count' });
      }
    }
    
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
