import { gql } from 'apollo-boost'

const CURRENT_USER = gql`
  {
    me {
      username
      name
      admin
    }
  }
`

export default CURRENT_USER