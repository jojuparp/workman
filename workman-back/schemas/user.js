const { UserInputError } = require('apollo-server')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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


module.exports = {
  typeDefs,
  resolvers
}