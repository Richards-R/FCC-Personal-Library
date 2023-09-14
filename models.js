const mongoose = require('mongoose');
const { Schema } = mongoose;


let bookSchema = new Schema({
  title: {type: String, required: true},
  comments: [String]
});

const Book = mongoose.model('Book', bookSchema);

exports.Book = Book;