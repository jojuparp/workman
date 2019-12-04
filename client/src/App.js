import React from 'react'
import { createJob, updateJob, removeJob } from './reducers/jobReducer'

const App = ({ store }) => {

  const addJob = event => {
    event.preventDefault()
    const job = {
      address: "kauppakatu 1",
      description: "kaikki rikki",
      customerName: "aapeli käki",
      customerPhone: "2132131",
      users: [],
      parts: [],

    }
    store.dispatch(createJob(job))
  }

  const editJob = job => {
    
    const updatedJob = {
      ...job,
      description: "kaikki rikki 2"
    }
    store.dispatch(updateJob(updatedJob))
  }

  const deleteJob = job => {
    store.dispatch(removeJob(job))
  }

  return(
    <div>
      <form onSubmit={addJob}>
        <button type='submit'>add job</button>
      </form>

      <ul>
        {store.getState().map(job =>
          <li key={job.id}>
            {job.description}
            <button onClick={() => editJob(job)}>edit</button>
            <button onClick={() => deleteJob(job)}>remove</button>
          </li>
        )}
        </ul>
    </div>
  )
}

export default App
