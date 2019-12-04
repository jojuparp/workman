import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { jobReducer } from './reducers/jobReducer'

const store = createStore(jobReducer)

const renderApp = () =>
ReactDOM.render(<App store={store}/>, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)