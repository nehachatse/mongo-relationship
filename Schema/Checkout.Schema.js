const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'book'},
    checkout: {type: Boolean, default: false},
    user: {type: String, required: true}
})