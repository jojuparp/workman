const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  name: {
    type: String,
    minlength: 5
  },
  passwordHash: String,
  admin: {
    type: Boolean,
    required: true,
  },
  jobs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
  ]
})

module.exports = mongoose.model('User', schema)