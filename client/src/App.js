import React, { useEffect } from 'react'

import Menu from './components/Menu'
import LoginFrom from './components/LoginForm'

import jobService from './services/jobService'
import userService from './services/userService'

import { initializeJobs } from './reducers/jobReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loginAction } from './reducers/userReducer'

const App = ({ store }) => {

  const { user, users, jobs } = store.getState()

  useEffect(() => {
    jobService
      .get()
      .then(jobs => store.dispatch(initializeJobs(jobs)))
      .then(
        userService
        .get()
        .then(users => store.dispatch(initializeUsers(users)))
        .catch(error => console.log(error))
      )
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      store.dispatch(loginAction(currentUser))
      jobService.setToken(currentUser.token)
    }
  }, [])
  
  

  return(
    <div>

        <LoginFrom store={store} user={user}/>
        {!user ? null : 
        <Menu 
          store={store}
          jobs={jobs}
          users={users}
          user={user}
        />}
        
    </div>
  )
}

export default App
