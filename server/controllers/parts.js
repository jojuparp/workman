const partsRouter = require('express').Router()
const Part = require('../models/part')
const jwt = require('jsonwebtoken')

partsRouter.get('/', async (request, response, next) => {

  const parts = await Part
    .find({})
  response.json(parts.map( jt => jt.toJSON() ))
})

partsRouter.post('/', async (request, response, next) => {

  try {

    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    // if (!request.token || !decodedToken.id) {
    //   return response.status(401).json({ error: 'token missing or invalid' })
    // }

    const body = request.body

    const price = Number(body.price)

    const part = new Part({
      name: body.name,
      price: price
    })

    const saved = await part.save()

    response.json(saved)

  } catch (exception) {
    next(exception)
  }
})

module.exports = partsRouter