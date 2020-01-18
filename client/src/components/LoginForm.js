import React from 'react'
import { Button, Form } from 'react-bootstrap'

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

  const login = () => {

    return(
      <div className="container">
        <h2>Kirjaudu sisään</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control
            value={un.value}
            onChange={un.onChange}
          /> <br />
          <Form.Label>Salasana</Form.Label>
          <Form.Control
            type={pw.type}
            value={pw.value}
            onChange={pw.onChange}
          /> <br />
          <Button variant="primary" type='submit'>Kirjaudu sisään</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  return(
    <div>
      {!user ? login() : null}
    </div>
  )
}

export default LoginForm