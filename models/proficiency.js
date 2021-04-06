const mongoose = require('mongoose')

const proficiencySchema = new mongoose.Schema({
  examination: {
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
  examinationDate: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Proficiency', proficiencySchema)