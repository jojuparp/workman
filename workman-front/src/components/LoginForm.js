import React from 'react'
import { useField } from '../hooks/index'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ login, setToken }) => {

  const buttonStyle =  {
    marginTop: 10
  }

  const un = useField('text')
  const pw = useField('password')

  const submit = async (event) => {
    event.preventDefault()

    const username = un.value
    const password = pw.value

    const result = await login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('workman-user-token', token)
    }
  }

  return (
    <div className='container'>
      <h2>Login</h2>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            value={un.value}
            onChange={un.onChange}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type={pw.type}
            value={pw.value}
            onChange={pw.onChange}
          />
          <Button style={buttonStyle} variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm