import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import userService from '../services/userService'

import { createUser } from '../reducers/usersReducer'

import { useField } from '../hooks/index'


const UserForm = ({ store }) => {

  const nameField = useField('text')
  const usernameField = useField('text')
  const passwordField = useField('password')
  const confirmPasswordField = useField('password')

  const [isAdmin, setIsAdmin] = useState(false)

  const handleIsAdmin = () => {
    setIsAdmin(!isAdmin)
  }

  const addUser = async (event) => {
    event.preventDefault()

    if (passwordField.value !== confirmPasswordField.value) {
      window.alert('salasanat eivät täsmää')
      passwordField.reset()
      confirmPasswordField.reset()
      return
    }

    const user = {
      name: nameField.value,
      username: usernameField.value,
      password: passwordField.value,
      admin: isAdmin,
      jobs: []
    }

    try {

      const createdUser = await userService.create(user)
      store.dispatch(createUser(createdUser))

      nameField.reset()
      usernameField.reset()
      passwordField.reset()
      confirmPasswordField.reset()

    } catch (exception) {
      console.log(exception)
      nameField.reset()
      passwordField.reset()
      confirmPasswordField.reset()
      setIsAdmin(false)
    }

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
        Käyttäjätunnus:
        <input 
          value={usernameField.value}
          onChange={usernameField.onChange}
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
          <Form.Check 
            onChange={handleIsAdmin}
            checked={isAdmin ? true : false}
            type="checkbox"
            label="Käyttäjä on ylläpitäjä"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Luo käyttäjä
        </Button>
      </Form>
    </div>
  )
}

export default UserForm