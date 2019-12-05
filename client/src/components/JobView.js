import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const JobView = ({ store, job }) => {

  if (!job) return null

  return (
    <div>
      <h3>Työ {job.id}</h3>

      <Link to={`/tyotehtavat/${job.id}/muokkaa`}>
        <button>Muokkaa työtehtävää</button>
      </Link>
    </div>
  )
}

export default JobView