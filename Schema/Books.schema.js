const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_name: {type: String, required: true},
    body: {type: String, required: true},
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: "author"}],
    section: {type: mongoose.Schema.Types.ObjectId, ref: 'section'},
    checkout: {type: String, default: false}
})

const Book = mongoose.model('book', bookSchema);

module.exports = Book;