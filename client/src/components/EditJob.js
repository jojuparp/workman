import React from 'react'
import { Button, Form } from 'react-bootstrap'

import { useField } from '../hooks/index'

const EditJob = ({ store, job }) => {

  const type = useField('text')
  const address = useField('text')
  const customerPhone = useField('text')
  const customerName = useField('text')
  const users = useField('text')
  const parts = useField('text')
  const description = useField('text')

  if (!job) return null


  const editJob = (event) => {
    event.preventDefault()
    
    console.log('saved')
  }

  const setUsers = () => {

    return job.users.join(', ')
  }

  const parseUsers = () => {

    return users.split(', ')
  }

  return (
    <div>
      <h3>Muokkaa työtehtävää {job.id}</h3>

      <form onSubmit={editJob}>
        Tyyppi:
        <input
          defaultValue={job.type.name}
          onChange={type.onChange}
        /> <br />
        Kuvaus:
        <input
          defaultValue={job.description}
          onChange={description.onChange}
        /> <br />
        Osoite:
        <input
          defaultValue={job.address}
          onChange={address.onChange}
        /> <br />
        Asiakas:
        <input
          defaultValue={job.customerName}
          onChange={customerName.onChange}
        /> <br />
        Yhteystieto:
        <input
          defaultValue={job.customerPhone}
          onChange={customerPhone.onChange}
        /> <br />
        Työntekijät:
        <input
          defaultValue={setUsers()}
          onChange={users.onChange}
        /> <br />
        Osat:
        <input
          defaultValue={job.parts}
          onChange={parts.onChange}
        /> <br />
        <Button variant='primary' type='submit'>Tallenna tiedot</Button>
      </form>
    </div>
  )
}

export default EditJob