const express = require('express')
const router = express.Router()


router.get('/', (req, res)=>{
    res.render('index')
})

module.exports = router


//import express
//call the router function

//export it to the server

//create a var that requires /index.js
//add .use to the server to use index as the '/' route

//get '/' send(working)