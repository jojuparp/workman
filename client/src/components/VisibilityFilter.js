import React from 'react'
import { Form } from 'react-bootstrap'
import { setFilter } from '../reducers/filterReducer'

const VisibilityFilter = ({ store }) => {

  const style = {
    padding: 10,
    margin: 10
  }

  const { filter } = store.getState()

  const filterClicked = (value) => {
    store.dispatch(setFilter(value))
  }

  return (
    <div className="container">
      Näytä kaikki  
      <input
        style={style}
        type="radio" 
        name="filter" 
        onChange={() => filterClicked('ALL')}
      />
      Näytä valmiit
      <input
        style={style}
        type="radio"
        name="filter"
        onChange={() => filterClicked('COMPLETED')}
      />
      Näytä kesken olevat
      <input
        style={style}
        type="radio"
        name="filter"
        checked={filter === 'NOT_COMPLETED' ? true : false}
        onChange={() => filterClicked('NOT_COMPLETED')}
      />
    </div>
  )
}

export default VisibilityFilter