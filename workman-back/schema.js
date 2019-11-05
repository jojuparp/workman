const { merge } = require('lodash') 
const { makeExecutableSchema } = require('graphql-tools')
const { mergeSchemas } = require('apollo-server')

const user = require('./schemas/user')
const jobType = require('./schemas/jobType')
const part = require('./schemas/part')

const schema = makeExecutableSchema({
  typeDefs: [
    user.typeDefs, 
    jobType.typeDefs, 
    part.typeDefs,
  ],
  resolvers: merge(
    user.resolvers, 
    jobType.resolvers,
    part.resolvers,
  )
})

module.exports = {
  schema
}