import React, { useState, useEffect } from 'react'
import { useMutation, useQuery, useApolloClient } from 'react-apollo'

import LoginForm from './components/LoginForm'
import Menu from './components/Menu'

import LOGIN from './graphql/mutations/login'
import CURRENT_USER from './graphql/queries/currentUser'

const App = () => {

  const handleError = (error) => {
    console.log(error)
  }

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const currentUser = useQuery(CURRENT_USER)

  const [login] = useMutation(LOGIN, {
    refetchQueries:[{ query: currentUser }],
    onError: handleError
  })

  useEffect(() => {
    const loggedToken = localStorage.getItem('workman-user-token')
    if (loggedToken) {
      setToken(loggedToken)
    }
  }, [])

  return (
    <div>

      {!token ?
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
        : <Menu
          setToken={setToken}
          result={currentUser}
        />}

    </div>
  )
}

export default App
