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

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', schema)