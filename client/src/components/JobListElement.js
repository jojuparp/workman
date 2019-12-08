import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import jobService from '../services/jobService'

import { updateJob } from '../reducers/jobReducer'

const JobListElement = ({ store, job }) => {

  if (!job) return null

  const style = {
    padding: 20,
    border: 'solid',
    margin: 10
  }

  const assignedUsers = job.users.map(user => user.name)
  const assignedParts = job.parts.map(part => part.name)

  const setJobCompleted = async event => {
    event.preventDefault()

    console.log(job.type.name)

    const completedJob = {
      users: [],
      completed: true,
      type: job.type.name,
      address: job.address,
      customerName: job.customerName,
      customerPhone: job.customerPhone,
      description: job.description,
      parts: job.parts.map(part => part.name)
    }

    try {

      const updated = await jobService.update(completedJob, job.id)
      store.dispatch(updateJob(updated))

    } catch (exception) {
      console.log(exception)
    }
  }

  const completeButton = () => {
    if (job.completed) return null
    return(
      <Button onClick={setJobCompleted}>Merkitse työ tehdyksi</Button>
    )
  }


  return (
    <div style={style}>

      Tyyppi: {job.type.name} <br />
      Osoite: {job.address} <br />
      Asiakas: {job.customerName} <br />
      Yhteystieto: {job.customerPhone} <br />
      Asiakas: {job.customerName} <br />
      Käyttäjät: {assignedUsers.join(', ')} <br />
      Osat: {assignedParts.join(', ')} <br />
      <Link to={`/tyotehtavat/${job.id}/muokkaa`}>
        <Button variant="primary" type="submit">
          Muokkaa työtehtävää
        </Button>
      </Link>
      {completeButton()}

    </div>
  )
}

export default JobListElement