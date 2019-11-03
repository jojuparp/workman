import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useField } from '../hooks/index'

const ModifyView = ({ work }) => {

  const content = useField()

  const modify = () => {
    console.log(work)
    content.reset()
  }

  return (
    <div>
      <h2>Muokkaa työtehtävää</h2>

      <Form onSubmit={modify}>
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
        </Form.Group>
      </Form>
      <Button onClick={modify} variant='primary' type='submit'>
              Tallenna
      </Button>
    </div>
  )
}

export default ModifyView