import React from 'react'

import { createJob, updateJob, removeJob } from '../reducers/jobReducer'


const JobsList = ({ store, jobs }) => {

  const { filter } = store.getState()

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

  const jobsToShow = () => {

    if (filter === 'ALL') {
      return jobs
    }

    else if (filter === 'COMPLETED') {
      return jobs.filter(job =>
        job.completed  
      )
    }

    return jobs.filter(job =>
      !job.completed  
    )
  }

  return (
    <div>
      <form onSubmit={addJob}>
        <button type='submit'>add job</button>
      </form>

      <ul>
        {jobsToShow().map(job => {
          return (
          <li key={job.id}>
            asiakkas: {job.customerName} <br />
            kuvaus: {job.description} <br />
          </li>
          )
        })}
      </ul>
    </div>
  )
}

export default JobsList