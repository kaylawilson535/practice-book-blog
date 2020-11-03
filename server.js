if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors') //makes the connection to authros.js
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs') //ejs is the view engine
app.set('views', __dirname + '/views') //accesses the views folder
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose') //npm i mongoose first
mongoose.connect(process.env.DATABASE_URL, { //hidden without .env in mongoose. you can just manually set keys. Also, .env must be npm i envdot
    useNewUrlParser: true, 
    useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/authors', authorRouter) //this prefixes everything in authors.js
app.use('/books', bookRouter)


app.listen(process.env.PORT || 3000) //confused why this works on Heroku...