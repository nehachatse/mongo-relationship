const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    section_name: {type: String, required: true},
    book: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}]
})

const Section = mongoose.model('section', sectionSchema);

module.exports = Section;