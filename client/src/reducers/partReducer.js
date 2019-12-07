export const partReducer = (state = [], action) => {
  switch(action.type) {

    case 'INIT_PARTS':
      return action.data

    case 'CREATE_PART':
      return state.concat(action.data)

    case 'UPDATE_PART':
      const id = action.data.id
      const partToUpdate = state.find(p => p.id === id)
      const updatedPart = {
        id: partToUpdate.id,
        ...action.data
      }
      return state.map(part =>
        part.id !== partToUpdate.id ? part : updatedPart
      )
    
    case 'REMOVE_PART':
      const partToRemove = action.data.id
      return state.filter(part =>
        part.id !== partToRemove
      )

    default:
      return state
    
  }
}

export const initializeParts = parts => {
  return {
    type: 'INIT_PARTS',
    data: parts
  }
}

export const createPart = part => {

  return {
    type: 'CREATE_PART',
    data: part
  }
}

export const updatePart = part => {
  return {
    type: 'UPDATE_PART',
    data: part
  }
}

export const removePart = part => {
  return {
    type: 'REMOVE_PART',
    data: part
  }
}