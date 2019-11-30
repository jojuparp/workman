import React, { useState, useEffect } from 'react'
import { Button, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import { works } from '../data/data'

import CURRENT_USER from '../graphql/queries/currentUser'

import AdminView from './AdminView'
import UserList from './UserList'
import PartList from './PartList'
import WorkList from './WorkList'
import WorkView from './WorkView'
import WorkForm from './WorkForm'
import WorkStarted from './WorkStarted'
import ModifyView from './ModifyView'
import WorkCompleted from './WorkCompleted'
import UserForm from './UserForm'
import WorkTypeForm from './WorkTypeForm'
import { useApolloClient } from 'react-apollo'

const Menu = ({ setToken, result}) => {

  if (result.loading) {
    return <div>loading...</div>
  }
  
  //const [user, setUser] = useState(result.data.currentUser)

  const padding = {
    padding: 5,
  }

  const workById = id => {
    return works.find(w => w.id === Number(id))
  }

  const logout = () => {
    localStorage.clear()
    setToken(null)
    return <Redirect to='/'/>
  }

  return (
    <div className='container'>
      <Router>
        <div>
          <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/">Koti</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/tyotehtavat">Kaikki työtehtävät</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/tyontekijat">Työntekijät</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/osat">Osat</Link>
                  </Nav.Link>

                  <NavDropdown title="Lisää" bg="dark" variant="dark">
                    <Nav.Link href="#" as="span">
                      <Link style={padding} to="/uusitehtava">Uusi työtehtävä</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                      <Link style={padding} to="/uusitehtavatyyppi">Uusi työtehtävätyyppi</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                      <Link style={padding} to="/uusikayttaja">Uusi käyttäjä</Link>
                    </Nav.Link>
                  </NavDropdown>

                  <Nav.Link href="#" as="span">
                    Olet kirjautunut
                  </Nav.Link>

                  <Button onClick={() => logout()} variant="primary" type="submit">
                    kirjaudu ulos
                  </Button>

                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>

          <Route exact path="/" render={() => <AdminView />} />
          <Route exact path="/tyontekijat" render={() => <UserList />} />
          <Route exact path="/uusitehtava" render={() => <WorkForm />} />
          <Route exact path="/uusitehtavatyyppi" render={() => <WorkTypeForm />} />
          <Route exact path="/uusikayttaja" render={() => <UserForm />} />
          <Route exact path="/tyotehtavat" render={() => <WorkList />} />
          <Route exact path="/tyotehtavat/:id" render={({ match }) =>
            <WorkView work={workById(match.params.id)} />
          }/>
          <Route exact path="/tyotehtavat/:id/aloitettu" render={({ match }) =>
            <WorkStarted work={workById(match.params.id)} />
          }/>
          <Route exact path="/tyotehtavat/:id/muokkaa" render={({ match }) =>
            <ModifyView work={workById(match.params.id)} />
          }/>
          <Route exact path="/tyotehtavat/:id/valmis" render={({ match }) =>
            <WorkCompleted work={workById(match.params.id)} />
          }/>
          <Route exact path="/osat" render={() => <PartList />} />

        </div>
      </Router>
    </div>
  )
}

export default Menu