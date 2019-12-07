import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import JobsList from '../components/JobsList'
import UserList from '../components/UserList'
import EditJob from '../components/EditJob'
import JobForm from '../components/JobForm'
import UserForm from '../components/UserForm'

import { logoutAction } from '../reducers/userReducer'

const Menu = ({ store, jobs, user, users }) => {

  const padding = {
    padding: 5
  }

  const jobById = id => {
    return jobs.find(j => j.id === id)
  }

  const handleLogout = () => {
    store.dispatch(logoutAction())
  }

  const logout = () => {

    return (
      <div>
        {user.name} kirjautunut
        <button onClick={handleLogout}>
       logout
        </button>
      </div>
    )
  }

  return(
    <div>
      <Router>
        <div>
          <Link style={padding} to='/'>Työtehtävät</Link>
          <Link style={padding} to='/kayttajat'>Käyttäjät</Link>
          <Link style={padding} to='/lisaa/tehtava'>Lisää työtehtävä</Link>
          <Link style={padding} to='/lisaa/kayttaja'>Lisää käyttäjä</Link>
          {logout()}
        </div>

        <Route exact path={'/'} render={() => <JobsList store={store} jobs={jobs} />} />
        <Route exact path={'/kayttajat'} render={() => <UserList store={store} users={users} />} />
        <Route exact path={'/lisaa/tehtava'} render={() => <JobForm store={store} />} />
        <Route exact path={'/lisaa/kayttaja'} render={() => <UserForm store={store} />} />

        <Route exact path={'/tyotehtavat/:id/muokkaa'} render={({ match }) => 
          <EditJob store={store} job={jobById(match.params.id)}/>
        }/>

      </Router>

    </div>
  )
}

export default Menu