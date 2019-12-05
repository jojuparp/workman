import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import JobsList from '../components/JobsList'
import JobView from '../components/JobView'
import UserList from '../components/UserList'
import EditJob from '../components/EditJob'

const Menu = ({ store, jobs, users }) => {

  const padding = {
    padding: 5
  }

  const jobById = id => {
    return jobs.find(j => j.id === id)
  }

  return(
    <div>
      <Router>
        <div>
          <Link style={padding} to='/'>Työtehtävät</Link>
          <Link style={padding} to='/kayttajat'>Käyttäjät</Link>
        </div>

        <Route exact path={'/'} render={() => <JobsList store={store} jobs={jobs} />} />
        <Route exact path={'/kayttajat'} render={() => <UserList store={store} users={users} />} />
        <Route exact path={'/tyotehtavat/:id'} render={({ match }) => 
          <JobView store={store} job={jobById(match.params.id)}/>
        }/>
        <Route exact path={'/tyotehtavat/:id/muokkaa'} render={({ match }) => 
          <EditJob store={store} job={jobById(match.params.id)}/>
        }/>

      </Router>

    </div>
  )
}

export default Menu