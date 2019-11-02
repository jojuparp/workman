import React from 'react'

const WorkStarted = ({ work }) => {

  if (work.completed) return (
    <div><h2>Työ on jo valmis!</h2></div>
  )

  return (
    <div>


      <h2>Työ {work.id} aloitettu</h2>
    </div>
  )
}

export default WorkStarted