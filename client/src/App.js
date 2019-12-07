import React, { useEffect } from 'react'

import Menu from './components/Menu'
import LoginFrom from './components/LoginForm'

import jobService from './services/jobService'
import userService from './services/userService'
import jobTypeService from './services/jobTypeService'
import partService from './services/partService'

import { initializeJobs } from './reducers/jobReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeTypes } from './reducers/jobTypeReducer'
import { initializeParts } from './reducers/partReducer'
import { loginAction } from './reducers/userReducer'

const App = ({ store }) => {

  const { user, users, jobs, jobTypes, parts } = store.getState()

  useEffect(() => {
    jobService
      .get()
      .then(jobs =>
        store.dispatch(initializeJobs(jobs))
      )
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    userService
      .get()
      .then(users =>
        store.dispatch(initializeUsers(users))
      )
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    partService
      .get()
      .then(parts =>
        store.dispatch(initializeParts(parts))
      )
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    jobTypeService
      .get()
      .then(types =>
        store.dispatch(initializeTypes(types))
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
          jobTypes={jobTypes}
          parts={parts}
        />}
        
    </div>
  )
}

export default App
