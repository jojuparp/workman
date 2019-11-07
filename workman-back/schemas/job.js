const { UserInputError, AuthenticationError } = require('apollo-server')
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} = require('graphql-iso-date')

//models
const Job = require('../models/job')
const User = require('../models/user')
const JobType = require('../models/jobType')
const Part = require('../models/part')

//shcemas
const jobType = require('./jobType')
const part = require('./part')
const user = require('./user')

const typeDefs = `

${jobType.typeDefs}

${part.typeDefs}

${user.typeDefs}

type Job {

  type: JobType!
  users: [User!]
  partsUsed: [Part!]
  address: String!
  description: String!
  startDate: String
  endDate: String
  completed: Boolean!
  id: ID!

}

extend type Query {

  jobCount: Int!

  allJobs: [Job!]!
}

extend type Mutation {

  createJob(
    type: String!
    users: [String!]
    partsUsed: [String!]
    address: String!
    description: String!
    startDate: String
    endDate: String
    completed: Boolean
  ): Job

}
`

const resolvers = {
  
  Query: {

    jobCount: () => Job.collection.countDocuments(),

    allJobs: async () => {
      const jobs = await Job.find({})
        .populate('type')
      return jobs
    }

  },

  Mutation: {

    createJob: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const type = await JobType.findOne({ name: args.type })

      const job = new Job({ ...args, type: type._id, })

      const savedJob = await job.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

      if (args.user) {
        const user = await User.findOne({ username: args.users })
        job.users = job.users.concat(user._id)

        user.jobs = user.jobs.concat(savedJob._id)
      }

      return savedJob
    }
  }

}

module.exports = {
  typeDefs,
  resolvers
}