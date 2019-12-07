const jobsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Job = require('../models/job')
const JobType = require('../models/jobType')
const User = require('../models/user')
const Part = require('../models/part')

jobsRouter.post('/', async (request, response, next) => {

  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body

    const type = await JobType.findOne({ name: body.type })

    const job = new Job({
      type: type._id,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      address: body.address,
      description: body.description,
      date: body.date,
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

jobsRouter.get('/', async (request, response, next) => {

  const jobs = await Job
    .find({})
    .populate('users', {name: 1, username: 1, admin: 1})
    .populate('type', {name: 1})
    .populate('parts', {name: 1})
  response.json(jobs.map(j => j.toJSON()))
})

jobsRouter.get('/:id', async (request, response, next) => {

  const job = await Job
    .findById(request.params.id)
    .populate('users', {name: 1, username: 1, admin: 1})
    .populate('type', {name: 1})
    .populate('parts', {name: 1})
  response.json(job.toJSON())
})

jobsRouter.put('/:id', async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body

  const job = {
    address: body.address,
    description: body.description,
    customerPhone: body.customerPhone,
    customerName: body.customerName,
    completed: body.completed,
    date: body.date
  }

  //update type
  const type = await JobType.findOne({ name: body.type })
  job.type = type._id

  //update parts
  job.parts = []
  const parts = await Part.find({ name: body.parts })
  const partIds = parts.map(part => part._id)
  job.parts = job.parts.concat(partIds)

  //update assigned users
  job.users = []

  const usersToAssign = await User.find({ name: { $in: body.users } })

  const usersToEdit = await User.find({ jobs: { $in: request.params.id } })

  usersToAssign.map(async user => {
    user.jobs = user.jobs.concat(request.params.id)
    await user.save()
      .catch(error => {
        next(error)       
      })
  })

  usersToEdit.map(async user => {
    user.jobs = user.jobs.filter(job => {
      return !job.equals(request.params.id)
    })
    await user.save()
      .catch(error => {
        next(error)
      })
  })

  const ids = usersToAssign.map(user => user._id)

  job.users = job.users.concat(ids)

  
  //update document
  try {
    const updated = await Job.findByIdAndUpdate(request.params.id, job, { new: true })
      .populate('users', {name: 1})
      .populate('type', {name: 1})
      .populate('parts', {name: 1})
    response.json(updated.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = jobsRouter