const express = require('express');
let mongoose = require('mongoose');
const DB_URL = 'mongodb+srv://neha:neha123@cluster0.3eq5o.mongodb.net/library?retryWrites=true&w=majority';
let Book = require('./Schema/Books.schema');
let Author = require('./Schema/Author.schema');
const Section = require('./Schema/Section.schema');

let app = express();
app.use( express.json() );

const connect = () => {
    return mongoose.connect(DB_URL)
};

app.get('/books', async (req, res) => {
    let books = await Book.find().populate({
        path: 'section',
        select: ["section_name"]
    }).populate('authors');
    res.status(200).json(books);
})

app.get('/books/checkout', async (req, res) => {
    let checkout = await Book.find({"checkout": false})
    res.status(200).json(checkout);    
})

app.post('/books', async (req, res) => {
    if(req.query.author && req.query.section){
        let authorBooks = await Book.find({'author': req.query.author, 'section': req.query.section});
        res.status(200).json(authorBooks);
    }
    else{
        let createdBook = await Book.create(req.body);
        res.status(200).json(createdBook);
    }  
})

app.patch('/books/:id', async (req, res) => {
    let updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedBook);
})

app.get('/authors', async (req, res) => {
    if(req.query.first_name){
        let author = await Author.find({first_name: req.query.first_name}).populate('book');
        res.status(200).json(author);
    }
    else{
        let authors = await Author.find();
        res.status(200).json(authors);
    }
})

app.post('/authors', async (req, res) => {
    let createdAuthor = await Author.create(req.body);
    res.status(200).json(createdAuthor);
})

app.get('/sections', async (req, res) => {
    let sections = await Section.find().populate('book');
    res.status(200).json(sections);
})

app.get('/sections/:id', async (req, res) => {
    let availableBooks = await Book.findById(req.params.id);
    res.status(200).json(availableBooks)    
})

app.get('/sections/:id/checkout', async (req, res) => {
        let availableBooks = await Book.find({"section": req.params.id, "checkout": false});
        res.status(200).json(availableBooks)    
})

app.post('/sections', async (req, res) => {
    let createdSection = await Section.create(req.body);
    res.status(200).json(createdSection);
})

app.listen(8000, () => {
    try{
        connect()
        console.log("listing...")
    }catch(e){
        res.status(200).send(e.message);
    }
})