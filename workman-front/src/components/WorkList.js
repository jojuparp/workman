import React from 'react'
import { works } from '../data/data'
import WorkBlock from './WorkBlock'

const WorkList = () => {

  return (
    <div>
      <h2>Kaikki työtehtävät</h2>
      {works.map(work => <WorkBlock key={work.id} work={work} />)}
    </div>
  )
}

export default WorkList