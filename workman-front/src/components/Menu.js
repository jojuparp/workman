import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import AdminView from './AdminView'
import UserList from './UserList'
import PartList from './PartList'

const Menu = ({ handleLogin }) => {

  const padding = {
    padding: 5
  }

  return (
    <div className='container'>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">Koti</Link>
            <Link style={padding} to="/osat">Osat</Link>
            <Link style={padding} to="/tyontekijat">Työntekijät</Link>
            <button style={padding} onClick={handleLogin}>Logout</button>
          </div>
          <Route exact path="/" render={() => <AdminView />} />
          <Route path="/tyontekijat" render={() => <UserList />} />
          <Route path="/osat" render={() => <PartList />} />
        </div>
      </Router>
    </div>
  )
}

export default Menu