
export const jobTypeReducer = (state = [], action) => {
  switch(action.type) {

    case 'INIT_TYPES':
      return action.data

    case 'CREATE_TYPE':
      return state.concat(action.data)

    case 'UPDATE_TYPE':
      const id = action.data.id
      const typeToUpdate = state.find(t => t.id === id)
      const updatedType = {
        id: typeToUpdate.id,
        ...action.data
      }
      return state.map(type =>
        type.id !== typeToUpdate.id ? type : updatedType
      )
    
    case 'REMOVE_TYPE':
      const typeToRemove = action.data.id
      return state.filter(type =>
        type.id !== typeToRemove
        )

    default:
      return state
    
  }
}

export const initializeTypes = types => {
  return {
    type: 'INIT_TYPES',
    data: types
  }
}

export const createType = type => {

  return {
    type: 'CREATE_TYPE',
    data: type
  }
}

export const updateType = type => {
  return {
    type: 'UPDATE_TYPE',
    data: type
  }
}

export const removeType = type => {
  return {
    type: 'REMOVE_TYPE',
    data: type
  }
}