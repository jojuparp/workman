import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const WorkView = ({ work }) => {

  if (!work) return null

  const buttonStyle = {
    marginTop: 10
  }

  return (
    <div>
      <h2>Työtehtävä {work.id} </h2>
      <br />
      Tyyppi {work.type} <br />
      Osoite {work.address} <br />
      Kuvaus {work.description} <br />
      <Link to={`/tyotehtavat/${work.id}/aloitettu`}>
        <button style={buttonStyle}>Avaa</button>
      </Link>
    </div>
  )
}

export default WorkView