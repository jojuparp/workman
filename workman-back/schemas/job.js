const { UserInputError } = require('apollo-server')
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

}

extend type Query {

  jobCount: Int!
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
    completed: Boolean!
  ): Job

}
`

const resolvers = {
  
  Query: {

    jobCount: () => Job.collection.countDocuments(),
  },

  Mutation: {

    createJob: (root, args) => {
      const job = new Job({ ...args })
  
      return job.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    }
  }

}

module.exports = {
  typeDefs,
  resolvers
}