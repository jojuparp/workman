const Job = require('../models/job')
const { UserInputError } = require('apollo-server')

const JobType = require('./jobType')
const Part = require('./part')
const User = require('./user')

const typeDefs = `

${JobType.typeDefs}

${Part.typeDefs}

${User.typeDefs}

type Job {

  type: JobType!
  users: [User!]
  partsUsed: [Part!]
  address: String!
  description: String!
  startDate: Date!
  endDate: Date!
  completed: Boolean!

}

extend type Query {

  jobCount: Int!
}

extend type Mutation {

  createJob(

  type: JobType!
  users: [User!]
  partsUsed: [Part!]
  address: String!
  description: String!
  startDate: Date!
  endDate: Date!
  completed: Boolean!

  ): Job
}
`

const resolvers = {
  
  Query: {

    jobTypeCount: () => Job.collection.countDocuments(),
  },

  Mutation: {

    createJobType: (root, args) => {
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