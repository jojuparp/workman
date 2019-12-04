const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const initialState = [
  {
    id: generateId(),
    address: "kauppakatu 1",
    description: "putki rikki",
    customerName: "aapeli käki",
    customerPhone: "1203123",
    users: [],
    parts: [],
  },

  {
    id: generateId(),
    address: "kauppakatu 1",
    description: "seinässä reikä",
    customerName: "aapeli käki",
    customerPhone: "1203123",
    users: [],
    parts: [],
  }
]

export const jobReducer = (state = initialState, action) => {
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