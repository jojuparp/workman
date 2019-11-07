const { merge } = require('lodash') 
const { makeExecutableSchema } = require('graphql-tools')

const user = require('./schemas/user')
const jobType = require('./schemas/jobType')
const part = require('./schemas/part')

const job = require('./schemas/job')

const schema = makeExecutableSchema({
  typeDefs: job.typeDefs,
  resolvers: merge(
    user.resolvers, 
    jobType.resolvers,
    part.resolvers,
    job.resolvers
  )
})

module.exports = {
  schema
}