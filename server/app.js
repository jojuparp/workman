const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const jobsRouter = require('./controllers/jobs')
const jobTypesRouter = require('./controllers/jobTypes')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error => {
    logger.error('error connecting to MongoDB', error.message)
  }))

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())


app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/jobs', jobsRouter)
app.use('/api/jobtypes', jobTypesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app