
export const jobReducer = (state = [], action) => {
  
  switch(action.type) {

    case 'INIT_JOBS':
      return action.data

    case 'CREATE_JOB':
      return state.concat(action.data)

    case 'UPDATE_JOB':
      const id = action.data.id
      const jobToUpdate = state.find(j => j.id === id)
      const updatedJob = {
        id: jobToUpdate.id,
        ...action.data
      }
      return state.map(job =>
        job.id !== jobToUpdate.id ? job : updatedJob
      )
    
    case 'REMOVE_JOB':
      const jobToRemove = action.data.id
      return state.filter(job =>
        job.id !== jobToRemove
        )

    default:
      return state
    
  }
}

export const initializeJobs = jobs => {
  return {
    type: 'INIT_JOBS',
    data: jobs
  }
}

export const createJob = job => {

  return {
    type: 'CREATE_JOB',
    data: job
  }
}

export const updateJob = job => {
  return {
    type: 'UPDATE_JOB',
    data: job
  }
}

export const removeJob = job => {
  return {
    type: 'REMOVE_JOB',
    data: job
  }
}