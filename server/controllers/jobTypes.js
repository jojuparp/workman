const jobTypesRouter = require('express').Router()
const JobType = require('../models/jobType')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

jobTypesRouter.get('/', async (request, response, next) => {

  const jobTypes = await JobType
    .find({})
  response.json(jobTypes.map( jt => jt.toJSON() ))
})

jobTypesRouter.post('/', async (request, response, next) => {

  try {
    
    const body = request.body

    const hourlyRate = Number(body.hourlyRate)

    const jobType = new JobType({
      name: body.name,
      hourlyRate: hourlyRate,
    })

    const saved = await jobType.save()

    response.json(saved)

  } catch (exception) {
    next(exception)
  }
})

module.exports = jobTypesRouter