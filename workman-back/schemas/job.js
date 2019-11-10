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
  parts: [Part!]
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

  findJobs(
    user: String
  ): [Job]
}

extend type Mutation {

  createJob(
    type: String!
    users: [String!]
    parts: [String!]
    address: String!
    description: String!
    startDate: String
    endDate: String
    completed: Boolean
  ): Job

  setJobCompleted(
    id: String!
  ): Job!

  assignJob(
    jobId: String!
    userIds: [String!]
  ): Job!

  removeAssigned(
    jobId: String!
    userId: String!
  ): Job!

}
`

const resolvers = {
  
  Query: {

    jobCount: () => Job.collection.countDocuments(),

    allJobs: async () => {
      const jobs = await Job.find({})
        .populate('type')
        .populate('users')
        .populate('parts')
      return jobs
    },

    findJobs: async (root, args) => {

      const user = await User.find({$or:[{ username: args.user }, { name: args.user }]})

      return await Job.find({ users: { $in: user }})
        .populate('type')
        .populate('users')
        .populate('parts')
      
    }

  },

  Mutation: {

    createJob: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const type = await JobType.findOne({ name: args.type })

      const job = new Job({ ...args, type: type._id, completed: false })

      if (args.users) {
        const users = await User.find({ username: args.users })
        const ids = users.map(user => user._id)
        job.users = job.users.concat(ids)
        
        users.map(async user => {
          user.jobs = user.jobs.concat(job._id)
          await user.save()
            .catch(error => {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            })
        })
      }

      if (args.parts) {
        const parts = await Part.find({ name: args.parts })
        const ids = parts.map(part => part._id)
        job.parts = job.parts.concat(ids)
      }

      return await job.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

    },

    setJobCompleted: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const jobToEdit = await Job.findById(args.id)

      jobToEdit.completed = true
      
      const usersToEdit = await User.find({ jobs: { $in: args.id } })

      usersToEdit.map(async user => {
        user.jobs = user.jobs.filter(job => {
          return !job.equals(args.id)
        })
        await user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      })

      await jobToEdit.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

      return jobToEdit
    },

    assignJob: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const job = await Job.findOne({ _id: args.jobId })
      const users = await User.find({ _id: { $in: args.userIds } })

      const ids = users.map(user => user._id)

      job.users = job.users.concat(ids)
      await job.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

      users.map(async user => {
        user.jobs = user.jobs.concat(job._id)
        await user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      })

      return job
    },

    removeAssigned: async (root, args, { currentUser }) => {
      
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

      return job
    },

  }

}

module.exports = {
  typeDefs,
  resolvers
}