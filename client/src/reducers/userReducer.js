
export const userReducer = (state = null, action) => {

  switch(action.type) {
    
    case 'SET_USER':
      return action.data

    default:
      return state
  }
}

export const loginAction = user => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const logoutAction = () => {
  window.localStorage.clear()
  return {
    type: 'SET_USER',
    data: null
  }
}