import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { jobReducer } from './reducers/jobReducer'
import { usersReducer } from './reducers/usersReducer'
import { filterReducer } from './reducers/filterReducer'
import { userReducer } from './reducers/userReducer'
import { jobTypeReducer } from './reducers/jobTypeReducer'
import { partReducer } from './reducers/partReducer'

const reducer = combineReducers({
  jobs: jobReducer,
  users: usersReducer,
  filter: filterReducer,
  user: userReducer,
  jobTypes: jobTypeReducer,
  parts: partReducer
})

const store = createStore(reducer)

const renderApp = () =>
ReactDOM.render(<App store={store}/>, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)