import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useField } from '../hooks/index'

const WorkForm = () => {

  const content = useField()

  const addJob = () => {
    console.log('added!')
    content.reset()
  }

  return (
    <div>
      <h2>Lisää uusi työkeikka</h2>

      <Form onSubmit={addJob}>
        <Form.Group>
          <Form.Label>Tehtävän tyyppi:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
          <Form.Label>Tehtävän osoite:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
          <Form.Label>Tehtävän kuvaus:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
          <Form.Label>Tehtävän tärkeys:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
          <Form.Label>Tehtävän työntekijät:</Form.Label>
          <Form.Control
            value={content.value}
            onChange={content.onChange}
          />
        </Form.Group>
      </Form>
      <Button onClick={addJob} variant='primary' type='submit'>
              Tallenna
      </Button>
    </div>
  )
}

export default WorkForm