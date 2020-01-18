import React from 'react'
import { Button, Form } from 'react-bootstrap'

import { useField } from '../hooks/index'
import { createPart } from '../reducers/partReducer'
import partService from '../services/partService'


const PartForm = ({ store }) => {

  const nameField = useField('text')
  const priceField = useField('text')
  

  const addPart = async event => {
    event.preventDefault()

    const part = {
      name: nameField.value,
      price: priceField.value
    }

    try {

      const createdPart = await partService.create(part)
      store.dispatch(createPart(createdPart))

      nameField.reset()
      priceField.reset()

    } catch (exception) {
      console.log(exception)
    }
  }

  return(
    <div className="container">
      <h3>Lisää uusi osa</h3>

      <Form onSubmit={addPart}>
        <Form.Group>
        <Form.Label>Nimi:</Form.Label>
        <Form.Control
          value={nameField.value}
          onChange={nameField.onChange}
        /> < br/>
        <Form.Label>Hinta: (merkitse muodossa: " 21.90 ")</Form.Label>
        <Form.Control
          value={priceField.value}
          onChange={priceField.onChange}
        /> <br/>

        <Button variant="primary" type="submit">
          Lisää
        </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default PartForm