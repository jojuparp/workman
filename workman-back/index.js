const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')

const User = require('./models/user')
const Schema = require('./schema').schema

mongoose.set('useUnifiedTopology', true)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const path = '/graphql'
const app = express()

const server = new ApolloServer({
  schema: Schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

app.use(express.static('build'))

server.applyMiddleware({ app, path })

app.listen({ port: config.PORT }, () =>
  console.log(`server ready at http:localhost:4000${server.graphqlPath}`)
)
