const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  name: {
    type: String,
    minlength: 5,
    required: true
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

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)