import React from 'react'
import { works } from '../data/data'
import WorkBlock from './WorkBlock'

const AdminView = () => {

  return (
    <div className='container'>
      <h2>Suorittamattomat työtehtävät</h2>

      {works.map(work =>
        !work.completed ? <WorkBlock key={work.id} work={work}/>
          : null
      )}
    </div>
  )
}

export default AdminView