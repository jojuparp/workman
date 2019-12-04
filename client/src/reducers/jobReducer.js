const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const jobReducer = (state = [], action) => {
  switch(action.type) {

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
        job.id !== id ? job : updatedJob
      )

    default:
      return state
    
  }
}

export const createJob = job => {

  return {
    type: 'CREATE_JOB',
    data: {
      ...job,
      id: generateId()
    }
  }
}

export const updateJob = job => {
  return {
    type: 'UPDATE_JOB',
    data: {
      ...job
    }
  }
}