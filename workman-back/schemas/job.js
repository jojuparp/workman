const { UserInputError, AuthenticationError } = require('apollo-server')

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
  customerName: String!
  customerPhone: String!
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
    customerName: String!
    customerPhone: String!
    address: String!
    description: String!
    date: String
  ): Job

  setJobCompleted(
    id: String!
    setCompletedDate: String!
  ): Job!

  editJob(
    jobId: String!
    setType: String!
    setUsers: [String!]
    setParts: [String!]
    setCustomerName: String!
    setCustomerPhone: String!
    setAddress: String!
    setDescription: String!
    setDate: String!
  ): Job!

  changeType(
    jobId: String!
    setTypeTo: String!
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

      const date = new Date(args.date)

      const job = new Job({ 
        ...args, 
        type: type._id, 
        completed: '',
        users: [], 
        date: date
      })

      if (args.users) {
        const users = await User.find({ name: args.users })
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

      jobToEdit.completed = args.setCompletedDate
      
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

    editJob: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const job = await Job.findById(args.jobId)

      //changing address
      job.address = args.setAddress

      //changing customer name and number
      job.customerName = args.setCustomerName

      job.customerPhone = args.setCustomerPhone

      //changing description
      job.description = args.setDescription

      //changing job start date
      job.date = args.setDate

      //changing type
      const type = await JobType.findOne({ name: args.setType })

      job.type = type._id

      //changing assigned parts
      job.parts = []
      const parts = await Part.find({ name: args.parts })
      const partIds = parts.map(part => part._id)
      job.parts = job.parts.concat(partIds)

      //changing assigned users
      job.users = []

      const usersToAssign = await User.find({ name: { $in: args.setUsers } })

      const usersToEdit = await User.find({ jobs: { $in: args.jobId } })

      usersToAssign.map(async user => {
        user.jobs = user.jobs.concat(args.jobId)
        await user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      })

      usersToEdit.map(async user => {
        user.jobs = user.jobs.filter(job => {
          return !job.equals(args.jobId)
        })
        await user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      })

      const ids = usersToAssign.map(user => user._id)

      job.users = job.users.concat(ids)
      await job.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

      return await job.save()

    },
  
  }

}

module.exports = {
  typeDefs,
  resolvers
}