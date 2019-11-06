import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useField } from '../hooks/index'

const UserForm = () => {

  const content = useField()

  const addUser = () => {
    console.log('added!')
    content.reset()
  }

  return (
    <div>
      <h2>Lisää uusi käyttäjä</h2>

      <Form onSubmit={addUser}>
        <Form.Group>
          <Form.Label>Nimi:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
          <Form.Label>Käyttäjänimi:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
          <Form.Label>Ylläpitäjä:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
        </Form.Group>
      </Form>
      <Button onClick={addUser} variant='primary' type='submit'>
              Tallenna
      </Button>
    </div>
  )
}

export default UserForm