const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    // book: [{type: String, required: true}]
    book: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}]
})

let Author = mongoose.model('author', authorSchema)

module.exports = Author;