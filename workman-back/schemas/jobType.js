const JobType = require('../models/jobType')
const { UserInputError } = require('apollo-server')

const typeDefs = `

type Query {
  _empty: String
}

type Mutation {
  _empty: String
}

type jobType {
  name: String!
  hourlyRate: Float!
}

extend type Query {

  jobTypeCount: Int!
}

`

const resolvers = {
  
  Query: {

    jobTypeCount: () => JobType.collection.countDocuments(),
  },

}

module.exports = {
  typeDefs,
  resolvers
}