const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const initialState = [
  {
    id: generateId(),
    name: "Joni Parpala",
    username: "jojuparp",
    admin: true
  },

  {
    id: generateId(),
    name: "Seppo Taalasmaa",
    username: "sepitale",
    admin: false
  }
]

export const userReducer = (state = initialState, action) => {
  switch(action.type) {

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

export const createUser = user => {

  return {
    type: 'CREATE_user',
    data: {
      ...user,
      id: generateId()
    }
  }
}

export const updateUser = user => {
  return {
    type: 'UPDATE_user',
    data: {
      ...user
    }
  }
}

export const removeUser = user => {
  return {
    type: 'REMOVE_user',
    data: {
      ...user
    }
  }
}