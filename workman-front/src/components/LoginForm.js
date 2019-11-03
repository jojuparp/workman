import React from 'react'
import { useField } from '../hooks/index'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin }) => {

  const buttonStyle =  {
    marginTop: 10
  }

  const un = useField('text')
  const pw = useField('password')

  return (
    <div className='container'>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
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