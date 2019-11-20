const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  totalHoursDone: {
    type: Number
  }
})

module.exports = mongoose.model('JobType', schema)