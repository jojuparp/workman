import React from 'react'

import { createJob, updateJob, removeJob } from '../reducers/jobReducer'

import VisibilityFilter from '../components/VisibilityFilter'
import JobsListElement from '../components/JobListElement'


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
      <VisibilityFilter store={store} />

        {jobsToShow().map(job =>
          <JobsListElement key={job.id} job={job} />
        )}
    </div>
  )
}

export default JobsList