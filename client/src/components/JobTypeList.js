import React from 'react'

const JobTypeList = ({ jobTypes }) => {


  const style = {
    border: 'solid',
    borderColor: 'black',
    margin: 5,
    padding: 5
  }

  const typeBlock = type => {
    return(
      <div key={type.id} style={style}>
        Nimi: {type.name} <br />
        Tuntihinta: {type.hourlyRate} euroa
      </div>
    )
  }

  const rows = () => {
    return jobTypes.map(type =>
      typeBlock(type) 
    )
  }

  return (
    <div className="container">
      <h3>Lista työtehtävätyypeistä</h3>
      {rows()}
    </div>
  )
}

export default JobTypeList