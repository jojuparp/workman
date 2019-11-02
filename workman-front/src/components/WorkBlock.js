import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const WorkBlock = ({ work }) => {

  const style = {
    padding: 20,
    border: 'solid',
    margin: 10
  }

  const buttonStyle = {
    marginTop: 10
  }

  return (

    <div style={style}>
      {work.type} <br />
      {work.address} <br />
      {work.allocated ? 'allokoitu: kyllä' : 'allokoitu: ei'} <br />
      <Link to={`/tyotehtavat/${work.id}`}>
        <button style={buttonStyle}>Avaa</button>
      </Link>
    </div>
  )
}

export default WorkBlock