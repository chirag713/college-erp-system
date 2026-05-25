import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  copiesTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  copiesAvailable: {
    type: Number,
    required: true,
    min: 0,
  }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
