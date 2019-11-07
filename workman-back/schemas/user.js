const { UserInputError } = require('apollo-server')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const typeDefs =`

type Query {
  _empty: String
}

type Mutation {
  _empty: String
}


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

extend type Query {

  userCount: Int!
  me: User
}

extend type Mutation {

  createUser(
    username: String!
    password: String!
    name: String!
    admin: Boolean!
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

    createUser: async (root, args) => {

      if ( args.password.length < 5 ) {
        throw new UserInputError('password too short!')
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)

      const user = new User({ ...args, passwordHash })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.passwordHash)

      if (!(user && passwordCorrect)) {
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


module.exports = {
  typeDefs,
  resolvers
}