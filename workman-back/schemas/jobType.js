const JobType = require('../models/jobType')
const { UserInputError } = require('apollo-server')

const typeDefs = `

type JobType {
  name: String!
  hourlyRate: Float!
  id: ID!
}

extend type Query {

  jobTypeCount: Int!
}

extend type Mutation {

  createJobType(
    name: String!
    hourlyRate: Float!
  ): JobType
}
`

const resolvers = {
  
  Query: {

    jobTypeCount: () => JobType.collection.countDocuments(),
  },

  Mutation: {

    createJobType: (root, args) => {
      const jobType = new JobType({ ...args })
  
      return jobType.save()
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