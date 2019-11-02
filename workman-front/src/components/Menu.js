import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import { works } from '../data/data'

import AdminView from './AdminView'
import UserList from './UserList'
import PartList from './PartList'
import WorkList from './WorkList'
import WorkView from './WorkView'
import WorkForm from './WorkForm'
import WorkStarted from './WorkStarted'

const Menu = ({ handleLogin }) => {

  const padding = {
    padding: 5
  }

  const workById = id => {
    return works.find(w => w.id === Number(id))
  }

  return (
    <div className='container'>
      <Router>
        <div>
          <div>
            Joni kirjautunut
            <Link style={padding} to="/">Koti</Link>
            <Link style={padding} to="/tyotehtavat">Kaikki työtehtävät</Link>
            <Link style={padding} to="/uusitehtava">Lisää työkeikka</Link>
            <Link style={padding} to="/osat">Osat</Link>
            <Link style={padding} to="/tyontekijat">Työntekijät</Link>
            <button style={padding} onClick={handleLogin}>Logout</button>
          </div>
          <Route exact path="/" render={() => <AdminView />} />
          <Route exact path="/tyontekijat" render={() => <UserList />} />
          <Route exact path="/uusitehtava" render={() => <WorkForm />} />
          <Route exact path="/tyotehtavat" render={() => <WorkList />} />
          <Route exact path="/tyotehtavat/:id" render={({ match }) =>
            <WorkView work={workById(match.params.id)} />
          }/>
          <Route exact path="/tyotehtavat/:id/aloitettu" render={({ match }) =>
            <WorkStarted work={workById(match.params.id)} />
          }/>
          <Route exact path="/osat" render={() => <PartList />} />
        </div>
      </Router>
    </div>
  )
}

export default Menu