const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  
  type: {
    type: mongoose.Schema.Types.ObjectId, ref: 'JobType',
    required: true
  },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  parts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Part' }
  ],
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  totalTime: {
    type: Number,
  },
  completed: {
    type: Boolean,
  },

})

module.exports = mongoose.model('Job', schema)