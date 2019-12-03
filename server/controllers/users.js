const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (!body.password || body.password.length < 5) {
      logger.error('password either too short or missing')
      return response.status(400)
        .json({ error: 'password either too long or missing'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      admin: body.admin,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
  
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('jobs', { users: 0 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter