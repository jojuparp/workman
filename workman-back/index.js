const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const User = require('./models/user')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`

type User {
  username: String!
  name: String!
  passwordhash: String
  admin: Boolean!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  userCount: Int!
  
  me: User
}

type Mutation {

  createUser(
    username: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token

}

`

const resolvers = {

  Query: {
    userCount: () => User.collection.countDocuments(),

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    createUser: (root, args) => {
      const user = new User({ ...args })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials')
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
