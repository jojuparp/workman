import React from 'react'

import { createJob, updateJob, removeJob } from '../reducers/jobReducer'

import VisibilityFilter from '../components/VisibilityFilter'
import JobsListElement from '../components/JobListElement'


const JobsList = ({ store, jobs }) => {

  const { filter } = store.getState()

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
    <div className="container">
      <VisibilityFilter store={store} />

        {jobsToShow().map(job =>
          <JobsListElement key={job.id} job={job} store={store}/>
        )}
    </div>
  )
}

export default JobsList