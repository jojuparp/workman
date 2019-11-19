import { gql } from 'apollo-boost'

const CURRENT_USER = gql`
  {
    currentUser {
      username
      name
      admin
    }
  }
`

export default CURRENT_USER