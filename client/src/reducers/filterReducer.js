
export const filterReducer = (state = 'NOT_COMPLETED', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}


export const setFilter = filter => {

  return {
    type: 'SET_FILTER',
    filter
  }
}

