const { UserInputError, AuthenticationError } = require('apollo-server')
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} = require('graphql-iso-date')
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

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

  setJobCompleted(
    id: String!
  ): Job!

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

      const job = new Job({ ...args, type: type._id, completed: false })
      job.users = job.users.concat(user._id)

      await job.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

      if (args.users) {
        const user = await User.findOne({ username: args.users })
        user.jobs = user.jobs.concat(job._id)
        await user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      }

      return job
    },

    setJobCompleted: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const jobToEdit = await Job.findById(args.id)

      jobToEdit.completed = true
      
      const usersToEdit = await User.find({ jobs: { $in: args.id } })
      console.log(usersToEdit)

      /* const newUsers = usersToEdit.map(user => {
        user.jobs.filter(job => {
          console.log(!job.equals(args.id))
          return !job.equals(args.id)
        })
      }) */

      await jobToEdit.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

      return jobToEdit
    }
  }

}

module.exports = {
  typeDefs,
  resolvers
}