import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const JobListElement = ({ store, job }) => {

  if (!job) return null

  const style = {
    padding: 20,
    border: 'solid',
    margin: 10
  }

  return (
    <div style={style}>

      Tyyppi: {job.type.name} <br />
      Osoite: {job.address} <br />
      Asiakas: {job.customerName} <br />
      Yhteystieto: {job.customerPhone} <br />
      Käyttäjät: {job.users} <br />
      <Link to={`tyotehtavat/${job.id}`}>
        <button>avaa</button>
      </Link>

    </div>
  )
}

export default JobListElement