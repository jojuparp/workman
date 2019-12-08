
export const jobReducer = (state = [], action) => {
  
  switch(action.type) {

    case 'INIT_JOBS':
      return action.data

    case 'CREATE_JOB':
      const job = {
        type: action.data.type.name,
        parts: action.data.parts.map(part => part.name).join(', '),
        users: action.data.users.map(user => user.name).join(', '),
        ...action.data
      }
      console.log(job)
      return state.concat(job)

    case 'UPDATE_JOB':
      const id = action.data.id
      const jobToUpdate = state.find(j => j.id === id)
      const updatedJob = {
        id: jobToUpdate.id,
        type: action.data.type.name,
        parts: action.data.parts.map(part => part.name).join(', '),
        users: action.data.users.map(user => user.name).join(', '),
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