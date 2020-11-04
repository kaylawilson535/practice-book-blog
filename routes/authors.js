const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

//Everything in here is prefixed with authors/ because in server.js we created an authors/ route and used it linking up to this file

//All authors route
router.get('/', async (req, res)=>{
    let searchOptions = {}
    //because its a get, we have to use query. req.body only works for post requests. The query parameter can actually be seen in the path
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        //functionality comes from mongoose find, create, update...
        const authors = await Author.find(searchOptions)
        //req.query sends it back to the user on the view page
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query })
    } catch {
        res.redirect('/')
    }
})

//New autor route
router.get('/new', (req, res) =>{
    res.render('authors/new', { author: new Author()})
})

//Create author route
router.post('/', async (req, res) =>{
    //this is the form
    const author = new Author({
        //the reason we are explicitly abstracting here and saying what we receives is the name parameter is because the user could somehow send an id in the name field, and the id of that author could get reset which isnt what we want.
        name: req.body.name
    })
    try {
    //populates newAuthor AFTER its saved
        const newAuthor = await author.save()  
        res.redirect(`authors/${newAuthor.id}`)
    } catch {
        //this allows the input field to already be populated with what they TRIED to type
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

//this get has to come AFTER /new otherwise, it will assume that "new" is the id
router.get('/:id', async (req, res) => {
    try{
        const author = await Author.findById(req.params.id)
        const books = await Book.find({ author: author.id }).limit(6).exec()
        res.render('authors/show', {
            author: author,
            booksByAuthor: books
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req,res) => {
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author})
    } catch {
        res.redirect('/authors')
    }


})

router.put('/:id', async (req,res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()  
        res.redirect(`/authors/${author.id}`)
    
    } catch {
        if(author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating Author'
            })
        }
        
    }
})

router.delete('/:id', async(req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        await author.remove()  
        res.redirect('/authors')
    
    } catch {
        if(author == null) {
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
        
    }
})

module.exports = router