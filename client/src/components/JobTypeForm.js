import React from 'react'
import { Button, Form } from 'react-bootstrap'

import { useField } from '../hooks/index'
import { createType } from '../reducers/jobTypeReducer'
import jobTypeService from '../services/jobTypeService'

const JobTypeForm = ({ store }) => {

  const nameField = useField('text')
  const priceField = useField('text')

  const addJobType = async event => {
    event.preventDefault()

    const newType = {
      name: nameField.value,
      hourlyRate: priceField.value
    }

    try {
      const createdType = await jobTypeService.create(newType)
      store.dispatch(createType(createdType))
      priceField.reset()
      nameField.reset()


    } catch (exception) {
      console.log(exception)
      priceField.reset()
      nameField.reset()
    }
  }

  return(
    <div>
      <h3>Lisää työtehtävätyyppi</h3>

      <Form onSubmit={addJobType}>
        Nimi:
        <input
          value={nameField.value}
          onChange={nameField.onChange}
        /> <br />
        Tuntihinta:
        <input
          value={priceField.value}
          onChange={priceField.onChange}
        />
        <Button variant="primary" type="submit">
          Lisää työtehtävätyyppi
        </Button>
      </Form>

    </div>
  )
}

export default JobTypeForm