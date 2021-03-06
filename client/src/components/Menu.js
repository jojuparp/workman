import React from 'react'
import { Button } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

import JobsList from '../components/JobsList'
import UserList from '../components/UserList'
import JobTypeList from '../components/JobTypeList'
import PartList from '../components/PartList'
import EditJob from '../components/EditJob'
import JobForm from '../components/JobForm'
import UserForm from '../components/UserForm'
import PartForm from '../components/PartForm'
import JobTypeForm from '../components/JobTypeForm'

import { logoutAction } from '../reducers/userReducer'

const Menu = ({ store, jobs, users, jobTypes, parts }) => {

  const padding = {
    padding: 10
  }

  const jobById = id => {
    return jobs.find(j => j.id === id)
  }

  const handleLogout = () => {
    store.dispatch(logoutAction())
  }

  const logout = () => {

    return (
      <Button variant="primary" style={padding} onClick={handleLogout}>
       logout
      </Button>
    )
  }

  return(
    <div>
      <Router>

        <div className="container">
          <Link style={padding} to='/'>Työtehtävät</Link>
          <Link style={padding} to='/kayttajat'>Käyttäjät</Link>
          <Link style={padding} to='/tehtavatyypit'>Työtehtävätyypit</Link>
          <Link style={padding} to='/osat'>Lista osista</Link>
          <Link style={padding} to='/lisaa/tehtava'>Lisää työtehtävä</Link>
          <Link style={padding} to='/lisaa/tehtavatyyppi'>Lisää työtehtävätyyppi</Link>
          <Link style={padding} to='/lisaa/kayttaja'>Lisää käyttäjä</Link>
          <Link style={padding} to='/lisaa/osa'>Lisää osa</Link>
          {logout()}
        </div>

        <Route exact path={'/'} render={() => <JobsList store={store} jobs={jobs} />} />
        <Route exact path={'/kayttajat'} render={() => <UserList users={users} />} />
        <Route exact path={'/tehtavatyypit'} render={() => <JobTypeList jobTypes={jobTypes} />} />
        <Route exact path={'/osat'} render={() => <PartList store={store} parts={parts} />} />
        <Route exact path={'/lisaa/tehtava'} render={() => 
          <JobForm store={store} jobTypes={jobTypes} users={users} parts={parts} />} />
          
        <Route exact path={'/lisaa/kayttaja'} render={() => <UserForm store={store} />} />
        <Route exact path={'/lisaa/osa'} render={() => <PartForm store={store} />} />
        <Route exact path={'/lisaa/tehtavatyyppi'} render={() => <JobTypeForm store={store}/>} />

        <Route exact path={'/tyotehtavat/:id/muokkaa'} render={({ match }) => 
          <EditJob store={store} job={jobById(match.params.id)} users={users} parts={parts} jobTypes={jobTypes}/>
        }/>

      </Router>
    </div>
  )
}

export default Menu