import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { jobReducer } from './reducers/jobReducer'
import { usersReducer } from './reducers/usersReducer'
import { filterReducer } from './reducers/filterReducer'
import { userReducer } from './reducers/userReducer'

const reducer = combineReducers({
  jobs: jobReducer,
  users: usersReducer,
  filter: filterReducer,
  user: userReducer
})

const store = createStore(reducer)

const renderApp = () =>
ReactDOM.render(<App store={store}/>, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)