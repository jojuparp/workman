import React, { useState } from 'react'
import { Button, DropdownButton, Form, Dropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import { useField } from '../hooks/index'

import jobService from '../services/jobService'

import { updateJob, initializeJobs } from '../reducers/jobReducer'

const EditJob = ({ store, job, users, parts, jobTypes }) => {

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
      
      
    } catch (exception) {
      console.log(exception)
    }

    return <Redirect to='/' />

  }

  return (
    <div>
      <h3>Muokkaa työtehtävää {job.id}</h3>

      <form onSubmit={editJob}>

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
        
        Uudet työntekijät: {newUsers.join(', ')} <br />
        Uudet osat: {newParts.join(', ')} <br />
        Tehtävän tyyppi: {type} <br />

        <Button variant='primary' type='submit' onClick={editJob}>Tallenna tiedot</Button>
      </form>
    </div>
  )
}

export default EditJob