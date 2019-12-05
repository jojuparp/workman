
export const usersReducer = (state = [], action) => {
  switch(action.type) {

    case 'INIT_USERS':
      return action.data

    case 'CREATE_USER':
      return state.concat(action.data)

    case 'UPDATE_USER':
      const id = action.data.id
      const userToUpdate = state.find(u => u.id === id)
      const updatedUser = {
        id: userToUpdate.id,
        ...action.data
      }
      return state.map(user =>
        user.id !== userToUpdate.id ? user : updatedUser
      )
    
    case 'REMOVE_USER':
      const userToRemove = action.data.id
      return state.filter(user =>
        user.id !== userToRemove
        )

    default:
      return state
    
  }
}

export const initializeUsers = users => {
  return {
    type: 'INIT_USERS',
    data: users
  }
}

export const createUser = user => {

  return {
    type: 'CREATE_USER',
    data: user
  }
}

export const updateUser = user => {
  return {
    type: 'UPDATE_USER',
    data: user
  }
}

export const removeUser = user => {
  return {
    type: 'REMOVE_USER',
    data: user
  }
}