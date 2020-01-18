import React, { useState } from 'react'
import { Button, DropdownButton, Form, Dropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import { useField } from '../hooks/index'

import jobService from '../services/jobService'

import { updateJob } from '../reducers/jobReducer'

const EditJob = ({ store, job, users, parts, jobTypes }) => {

  const clearButtonStyle = {
    margin: 5
  }

  const [newUsers, setNewUsers] = useState([])
  const [newParts, setNewParts] = useState([])
  const [type, setType] = useState(null)

  const address = useField('text')
  const customerPhone = useField('text')
  const customerName = useField('text')
  const date = useField('text')
  const description = useField('text')

  if (!job) return null

  const userChooser = () => users.map(user =>
    <Dropdown.Item
      onClick={() => handleSetUsers(user.name)}
      key={user.id}
    >
      {user.name}
    </Dropdown.Item>
  )

  const partChooser = () => parts.map(part =>
    <Dropdown.Item
      onClick={() => handleSetParts(part.name)}
      key={part.id}
    >
      {part.name}
    </Dropdown.Item>
  )

  const typeChooser = () => jobTypes.map(type =>
    <Dropdown.Item
      onClick={() => setType(type.name)}
      key={type.id}
    >
      {type.name}
    </Dropdown.Item>
  )

  const handleSetUsers = name => {
    if (newUsers.includes(name)) {
      window.alert('Nimi on jo lisättävien listassa')
      return
    }
    setNewUsers(newUsers.concat(name))
  }

  const handleSetParts = partName => {
    if (newParts.includes(partName)) {
      window.alert('Osa on jo lisättävien listalla')
      return
    }
    setNewParts(newParts.concat(partName))
  }

  const editJob = async (event) => {
    event.preventDefault()

    const newJob = {
      address: address.value,
      customerName: customerName.value,
      customerPhone: customerPhone.value,
      description: description.value,
      date: date.value,
      users: newUsers,
      parts: newParts,
      type: type,
      completed: false
    }

    try {

      const updatedJob = await jobService.update(newJob, job.id)
      store.dispatch(updateJob(updatedJob))
      
      address.reset()
      customerName.reset()
      customerPhone.reset()
      description.reset()
      date.reset()
      setNewUsers([])
      setType(null)
      setNewParts([])
      
    } catch (exception) {
      console.log(exception)
    }

    return (<Redirect to='/' />)

  }

  const clearUsersButton = () => {

    if (!newUsers.length) return null

    return (
      <Button style={clearButtonStyle} onClick={() => setNewUsers([])}>Tyhjennä</Button>
    )
  }

  const clearPartsButton = () => {

    if (!newParts.length) return null

    return (
      <Button style={clearButtonStyle} onClick={() => setNewParts([])}>Tyhjennä</Button>
    )
  }

  const clearTypeButton = () => {

    if (!type) return null

    return (
      <Button style={clearButtonStyle} onClick={() => setType(null)}>Tyhjennä</Button>
    )
  }

  return (
    <div className="container">
      <h3>Muokkaa työtehtävää</h3>

      <Form onSubmit={editJob}>
        <Form.Group>

        <Form.Label>Kuvaus:</Form.Label>
        <Form.Control as="textarea" rows="3"
          value={description.value}
          onChange={description.onChange}
        /> <br />
        <Form.Label>Osoite:</Form.Label>
        <Form.Control
          value={address.value}
          onChange={address.onChange}
        /> <br />
        <Form.Label>Päivä ja aika:</Form.Label>
        <Form.Control
          value={date.value}
          onChange={date.onChange}
        /> <br />
        <Form.Label>Asiakas:</Form.Label>
        <Form.Control
          value={customerName.value}
          onChange={customerName.onChange}
        /> <br />
        <Form.Label>Yhteystieto:</Form.Label>
        <Form.Control
          value={customerPhone.value}
          onChange={customerPhone.onChange}
        /> <br />

        <DropdownButton id="dropdown-basic-button" title="Valitse työntekijät">
          {userChooser()}
        </DropdownButton> <br />
        <DropdownButton id="dropdown-basic-button" title="Valitse osat">
          {partChooser()} 
        </DropdownButton> <br />
        <DropdownButton id="dropdown-basic-button" title="Valitse tehtävätyyppi">
          {typeChooser()} 
        </DropdownButton> <br />
        
        <Form.Label>Uudet työntekijät: {newUsers.join(', ')}</Form.Label>
        {clearUsersButton()}
        <br />
        <Form.Label>Uudet osat: {newParts.join(', ')}</Form.Label>
        {clearPartsButton()}
         <br />
         <Form.Label>Tehtävän tyyppi: {type}</Form.Label>
        {clearTypeButton()}
        <br />
        <div className="row">
        <Button variant='primary' type='submit' style={clearButtonStyle} onClick={editJob}>Tallenna tiedot</Button>
        <Button variant='primary' type='submit' style={clearButtonStyle} onClick={() => window.location.href="/"}>Peruuta</Button>
        </div>
        </Form.Group>
      </Form>
    </div>
  )
}

export default EditJob