import React from 'react'
import { createStore } from 'redux'

const jobReducer = (state = [], action) => {
  switch(action.type) {

    case 'NEW_JOB':
      return state.concat(action.data)

    case 'EDIT_JOB':
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        description: "muutettu" 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )

    default:
      return state
    
  }
}

const store = createStore(jobReducer)

store.dispatch({
  type: 'NEW_JOB',
  data: {
    id: 1,
    users: ["Joni Parpala"],
    type: "asennustyö",
    address: "vapaaherrantie 4",
    customerName: "Seppo Taalasmaa",
    customerPhone: "03031233",
    description: "ränni rikki"
  }
})

store.dispatch({
  type: 'NEW_JOB',
  data: {
    id: 2,
    users: ["Joni Parpala"],
    type: "asennustyö",
    address: "vapaaherrantie 4",
    customerName: "Seppo Taalasmaa",
    customerPhone: "03031233",
    description: "ränni rikki taas"
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(job =>
          <li key={job.id}>
            {job.description}
          </li>
        )}
        </ul>
    </div>
  )
}

export default App
