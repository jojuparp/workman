import React from 'react'
import { useField } from '../hooks/index'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {

  const un = useField('text')
  const pw = useField('password')

  return (
    <div className='container'>
      <h2>Login</h2>
      <Form >
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            {...un}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            {...pw}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm