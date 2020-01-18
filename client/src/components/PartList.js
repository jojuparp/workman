import React from 'react'

const PartList = ({ parts }) => {

  const style = {
    border: 'solid',
    borderColor: 'black',
    margin: 5,
    padding: 5
  }

  const partBlock = part => {
    return(
      <div key={part.id} style={style}>
        Nimi: {part.name} <br />
        Hinta: {part.price}
      </div>
    )
  }

  const rows = () => {
    return parts.map(part =>
      partBlock(part) 
    )
  }

  return (
    <div className="container">
      <h3>Lista osista</h3>
      {rows()}
    </div>
  )
}

export default PartList