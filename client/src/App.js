import React from 'react'

import JobsView from './components/JobsView'

const App = ({ store }) => {

  const { jobs, users } = store.getState()

  

  return(
    <div>

        <JobsView store={store} jobs={jobs} />

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
