const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companyDescription: {
    type: String,
    required: true
  },
  companyAddress: {
    type: String,
    required: true
  },
  partnershipStartedDate: {
    type: Date,
    required: true
  },
  partnershipExpirationDate: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Partner', partnerSchema)