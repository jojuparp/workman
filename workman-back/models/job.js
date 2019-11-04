const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  
  type: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Type',
    required: true
  },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  partsUsed: [
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
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalTime: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },

})

module.exports = mongoose.model('Job', schema)