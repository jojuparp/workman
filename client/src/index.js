import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { jobReducer } from './reducers/jobReducer'
import { userReducer } from './reducers/userReducer'
import { filterReducer } from './reducers/filterReducer'
import { Provider } from 'react-redux'


const reducer = combineReducers({
  jobs: jobReducer,
  users: userReducer,
  filter: filterReducer
})

const store = createStore(reducer)

const renderApp = () =>
ReactDOM.render(<App store={store}/>, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)