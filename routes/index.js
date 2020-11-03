const express = require('express')
const router = express.Router()
const Book = require('../models/book')


router.get('/', async (req, res)=>{
    let books = []
    try{
        books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
    } catch {
        books = []
    }
    res.render('index', { books: books})
})

module.exports = router


//import express
//call the router function

//export it to the server

//create a var that requires /index.js
//add .use to the server to use index as the '/' route

//get '/' send(working)