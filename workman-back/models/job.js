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
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  totalTime: {
    type: Number,
  },
  completed: {
    type: Date,
  },

})

module.exports = mongoose.model('Job', schema)