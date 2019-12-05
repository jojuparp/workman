import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const VisibilityFilter = ({ store }) => {

  const { filter } = store.getState()

  const filterClicked = (value) => {
    store.dispatch(setFilter(value))
  }

  return (
    <div>
      Näytä <br />
      Kaikki  
      <input 
        type="radio" 
        name="filter" 
        onChange={() => filterClicked('ALL')}
      />
      Valmiit
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('COMPLETED')}
      />
      Kesken olevat
      <input
        type="radio"
        name="filter"
        checked={filter === 'NOT_COMPLETED' ? true : false}
        onChange={() => filterClicked('NOT_COMPLETED')}
      />
    </div>
  )
}

export default VisibilityFilter