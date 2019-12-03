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
    //required: true
  },
  completed: {
    type: Boolean,
  },

})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Job', schema)