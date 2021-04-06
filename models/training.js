const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: String,
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Training', trainingSchema)