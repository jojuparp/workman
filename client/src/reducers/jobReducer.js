const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const jobReducer = (state = [], action) => {
  switch(action.type) {

    case 'CREATE_JOB':
      return state.concat(action.data)

    case 'UPDATE_JOB':
      const idToUpdate = action.data.id
      const jobToUpdate = state.find(j => j.id === idToUpdate)
      const updatedJob = {
        id: jobToUpdate.id,
        ...action.data
      }
      return state.map(job =>
        job.id !== idToUpdate ? job : updatedJob
      )
    
    case 'REMOVE_JOB':
      const jobToRemove = action.data.id
      //const jobToRemove = state.find(j => j.id === idToRemove)
      return state.filter(job =>
        job.id !== jobToRemove
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

export const removeJob = job => {
  return {
    type: 'REMOVE_JOB',
    data: {
      ...job
    }
  }
}