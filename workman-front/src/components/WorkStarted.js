import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const WorkStarted = ({ work }) => {


  if (work.completed) return (
    <div><h2>Työ on jo valmis!</h2></div>
  )

  const buttonStyle = {
    marginTop: 10,
    marginRight: 5
  }

  return (
    <div>

      <h2>Työ {work.id} aloitettu</h2>

      <Link to={`/tyotehtavat/${work.id}/valmis`}>
        <button style={buttonStyle}>Työtehtävä valmis</button>
      </Link>
    </div>
  )
}

export default WorkStarted