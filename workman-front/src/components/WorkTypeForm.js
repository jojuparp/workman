import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useField } from '../hooks/index'

const WorkTypeForm = () => {

  const content = useField()

  const addWorkType = () => {
    console.log('added!')
    content.reset()
  }

  return (
    <div>
      <h2>Lisää uusi tehtävätyyppi</h2>

      <Form onSubmit={addWorkType}>
        <Form.Group>
          <Form.Label>Nimi:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
          <Form.Label>Tuntihinta:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
        </Form.Group>
      </Form>
      <Button onClick={addWorkType} variant='primary' type='submit'>
              Tallenna
      </Button>
    </div>
  )
}

export default WorkTypeForm