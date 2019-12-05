import React from 'react'

import { useField } from '../hooks/index'
import jobService from '../services/jobService'
import loginService from '../services/loginService'
import { loginAction, logoutAction } from '../reducers/userReducer'

const LoginForm = ({ store, user }) => {

  const un = useField('text')
  const pw = useField('password')

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const username = un.value
      const password = pw.value

      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      jobService.setToken(user.token)
      store.dispatch(loginAction(user))

      un.reset()
      pw.reset()
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    store.dispatch(logoutAction())
  }

  const login = () => {

    return(
      <div>
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={handleLogin}>
          Käyttäjätunnus:
          <input 
            value={un.value}
            onChange={un.onChange}
          /> <br />
          Salasana:
          <input
            type={pw.type}
            value={pw.value}
            onChange={pw.onChange}
          /> <br />
          <button type='submit'>Kirjaudu sisään</button>
        </form>
      </div>
    )
  }

  const logout = () => {

    return (
      <div>
        {user.name} kirjautunut
        <button onClick={handleLogout}>
       logout
        </button>
      </div>
    )
  }

  return(
    <div>
      {!user ? login() : logout()}
    </div>
  )
}

export default LoginForm