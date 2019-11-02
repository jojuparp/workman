import React, { useState } from 'react'

import LoginForm from './components/LoginForm'
import Menu from './components/Menu'

const App = () => {

  const [login, setLogin] = useState(false)

  const handleLogin = () => {
    setLogin(!login)
  }

  return (
    <div>

      {!login ? <LoginForm handleLogin={handleLogin}/>
        : <Menu handleLogin={handleLogin}/>}

    </div>
  )
}

export default App
