const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    unique: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  totalHoursDone: {
    type: Number
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('JobType', schema)