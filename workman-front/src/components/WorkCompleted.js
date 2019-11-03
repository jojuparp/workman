import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const WorkCompleted = ({ work }) => {

  return (
    <div>
      <h2>Työtehtävä {work.id} merkitty valmiiksi!</h2>

      <Link to={'/'}>
        <button>Palaa</button>
      </Link>
    </div>
  )
}

export default WorkCompleted