const Part = require('../models/part')
const { UserInputError } = require('apollo-server')

const typeDefs = `

type Part {
  name: String!
  price: Float!
  id: ID!
}

extend type Query {

  partCount: Int!
}

extend type Mutation {

  createPart(
    name: String!
    price: Float!
  ): Part
}
`

const resolvers = {
  
  Query: {

    partCount: () => Part.collection.countDocuments(),
  },

  Mutation: {

    createPart: (root, args) => {
      const part = new Part({ ...args })
  
      return part.save()
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