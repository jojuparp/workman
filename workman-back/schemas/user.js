const { UserInputError, AuthenticationError } = require('apollo-server')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Job = require('../models/job')

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

  currentUser: User

  findUsers(
    jobId: String
  ): [User]

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

  removeAssignment(
    userId: String!
    jobId: String!
  ): User!

}
`

const resolvers = {

  Query: {
    userCount: () => User.collection.countDocuments(),

    currentUser: (root, args, context) => {
      return context.currentUser
    },

    findUsers: async (root, args) => {

      const job = await Job.findById(args.jobId)

      return await User.find({ jobs: { $in: job } })
    }

  },

  Mutation: {

    createUser: async (root, args, { currentUser }) => {

      if ( args.password.length < 5 ) {
        throw new UserInputError('password too short!')
      }

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
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

    login: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

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

    removeAssignment: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const job = await Job.findOne({ _id: args.jobId })
      const user = await User.findOne({ _id: args.userId })

      job.users = job.users.filter(user => {
        return !user.equals(args.userId)
      })

      await job.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

      user.jobs = user.jobs.filter(job => {
        return !job.equals(args.jobId)
      })

      await user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

      return user
    },

  }
  
}


module.exports = {
  typeDefs,
  resolvers
}