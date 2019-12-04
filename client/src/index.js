import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { jobReducer } from './reducers/jobReducer'
import { userReducer } from './reducers/userReducer'
import { Provider } from 'react-redux'


const reducer = combineReducers({
  jobs: jobReducer,
  users: userReducer
})

const store = createStore(reducer)

const renderApp = () =>
ReactDOM.render(<App store={store}/>, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)