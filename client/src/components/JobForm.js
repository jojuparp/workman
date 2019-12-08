import React, { useState } from 'react'
import { Button, DropdownButton, Form, Dropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import { useField } from '../hooks/index'

import jobService from '../services/jobService'

import { createJob  } from '../reducers/jobReducer'

const JobForm = ({ store, users, parts, jobTypes }) => {

  const [newUsers, setNewUsers] = useState([])
  const [newParts, setNewParts] = useState([])
  const [type, setType] = useState(null)

  const address = useField('text')
  const customerPhone = useField('text')
  const customerName = useField('text')
  const date = useField('text')
  const description = useField('text')

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

  const clearUsersButton = () => {

    if (!newUsers.length) return null

    return (
      <Button onClick={() => setNewUsers([])}>Tyhjennä</Button>
    )
  }

  const clearPartsButton = () => {

    if (!newParts.length) return null

    return (
      <Button onClick={() => setNewParts([])}>Tyhjennä</Button>
    )
  }

  const clearTypeButton = () => {

    if (!type) return null

    return (
      <Button onClick={() => setType(null)}>Tyhjennä</Button>
    )
  }

  const addJob = async (event) => {
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

      const createdJob = await jobService.create(newJob)
      store.dispatch(createJob(createdJob))
      
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

  return (
    <div>
      <h3>Lisää työtehtävä</h3>

      <form onSubmit={addJob}>

        Kuvaus:
        <input
          value={description.value}
          onChange={description.onChange}
        /> <br />
        Osoite:
        <input
          value={address.value}
          onChange={address.onChange}
        /> <br />
        Päivä ja aika:
        <input
          value={date.value}
          onChange={date.onChange}
        /> <br />
        Asiakas:
        <input
          value={customerName.value}
          onChange={customerName.onChange}
        /> <br />
        Yhteystieto:
        <input
          value={customerPhone.value}
          onChange={customerPhone.onChange}
        /> <br />
        <div className='row'>
          <DropdownButton id="dropdown-basic-button" title="Valitse uudet työntekijät">
            {userChooser()}
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Valitse uudet osat">
            {partChooser()}
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Valitse uusi tehtävätyyppi">
            {typeChooser()}
          </DropdownButton>
        </div>
        
        Uudet työntekijät: {newUsers.join(', ')}
        {clearUsersButton()}
        <br />
        Uudet osat: {newParts.join(', ')}
        {clearPartsButton()}
         <br />
        Tehtävän tyyppi: {type}
        {clearTypeButton()}
        <br />


        <Button variant='primary' type='submit' onClick={addJob}>Tallenna tiedot</Button>
      </form>
    </div>
  )
}

export default JobForm