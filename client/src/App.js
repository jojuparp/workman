import React, { useEffect } from 'react'

import JobsList from './components/JobsList'
import  VisibilityFilter from './components/VisibilityFilter'

import jobService from './services/jobService'

import { initializeJobs } from './reducers/jobReducer'

const App = ({ store }) => {

  const { users, jobs } = store.getState()

  useEffect(() => {
    jobService
      .get()
      .then(jobs => store.dispatch(initializeJobs(jobs)))
      .catch(error => console.log(error))
  }, [])
  
  

  return(
    <div>

        <VisibilityFilter store={store} />
        <JobsList store={store} jobs={jobs} />

        <ul>
          {users.map(user => 
            <li key={user.id}>
              {user.name}
            </li>  
          )}
        </ul>
    </div>
  )
}

export default App
