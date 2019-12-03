const jobsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Job = require('../models/job')
const JobType = require('../models/jobType')
const User = require('../models/user')


jobsRouter.post('/', async (request, response, next) => {

  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body

    //const jobDate = new Date(body.date)

    const type = await JobType.findOne({ name: body.type })

    const job = new Job({
      type: type._id,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      address: body.address,
      description: body.description,
      //date: jobDate,
    })

    if (body.users) {
      const users = await User.find({ name: body.users })
      const ids = users.map(user => user._id)
      job.users = job.users.concat(ids)
      
      users.map(async user => {
        user.jobs = user.jobs.concat(job._id)
        await user.save()
      })
    }

    const saved = await job.save()
    response.json(saved.toJSON())

  } catch (exception) {
    next(exception)
  }
})

module.exports = jobsRouter