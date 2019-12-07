import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import userService from '../services/userService'

import { updateUser } from '../reducers/usersReducer'

import { useField } from '../hooks/index'


const UserForm = ({ store }) => {

  const nameField = useField('text')
  const passwordField = useField('password')
  const confirmPasswordField = useField('password')

  const [isAdmin, setIsAdmin] = useState(false)

  const handleIsAdmin = () => {
    setIsAdmin(!isAdmin)
    console.log(isAdmin)
  }

  const addUser = async (event) => {
    event.preventDefault()

    console.log('added')
  }

  return (
    <div>
      <h3>Lisää käyttäjä</h3>
      <Form onSubmit={addUser}>
        Nimi:
        <input 
          value={nameField.value}
          onChange={nameField.onChange}
        /> <br />
        Salasana:
        <input 
          value={passwordField.value}
          type={passwordField.type}
          onChange={passwordField.onChange}
        /> <br />
        Salasana uudelleen:
        <input 
          value={confirmPasswordField.value}
          type={confirmPasswordField.type}
          onChange={confirmPasswordField.onChange}
        /> <br />
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check onChange={handleIsAdmin} type="checkbox" label="Käyttäjä on ylläpitäjä" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Luo käyttäjä
        </Button>
      </Form>
    </div>
  )
}

export default UserForm