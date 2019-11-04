const { merge } = require('lodash') 
const { makeExecutableSchema } = require('graphql-tools')
const { mergeSchemas } = require('apollo-server')

const user = require('./schemas/user')

const resolvers = {}

const schema = makeExecutableSchema({
  typeDefs: user.typeDefs,
  resolvers: merge(resolvers, user.resolvers)
})

module.exports = {
  schema
}