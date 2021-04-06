const mongoose = require('mongoose')

const assessmentSchema = new mongoose.Schema({
  examination: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  ratio: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  assessmentDate: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Assessment', assessmentSchema)