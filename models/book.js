//typically name it a singular form of the route

const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImage: {
        type: Buffer,
        required: true
      },
      coverImageType: {
        type: String,
        required: true
      },
    author: {
        type: mongoose.Schema.Types.ObjectId, //this references another object inside of the collections
        required: true,
        ref: 'Author' //must match the name given in the model
    }
})

//this somehow explains my yt comment. i think its creating
//another property called coverImagePath that uses whats
//already there
bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
  })

module.exports = mongoose.model('Book', bookSchema)