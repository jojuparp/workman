import React from 'react'

import jobService from '../services/jobService'

import { createJob } from '../reducers/jobReducer'

import { useField } from '../hooks/index'

const JobForm = ({ store }) => {

  const type = useField('text')
  const address = useField('text')
  const customerPhone = useField('text')
  const customerName = useField('text')
  const users = useField('text')
  const parts = useField('text')
  const description = useField('text')

  const addJob = (event) => {
    event.preventDefault()
    console.log('added')
  }

  return (
    <div>
      <h3>Lisää työtehtävä</h3>

      <form onSubmit={addJob}>
        Tyyppi:
        <input
          value={type.value}
          onChange={type.onChange}
        /> <br />
        Kuvaus:
        <input
          value={description.value}
          onChange={description.onChange}
        /> <br />
        Osoite:
        <input
          value={address.value}
          onChange={address.onChange}
        /> <br />
        Asiakas:
        <input
          value={customerName.value}
          onChange={customerName.onChange}
        /> <br />
        Yhteystieto:
        <input
          value={customerPhone.value}
          onChange={customerPhone.onChange}
        /> <br />
        Työntekijät:
        <input
          value={users.value}
          onChange={users.onChange}
        /> <br />
        Osat:
        <input
          defaultValue={parts.value}
          onChange={parts.onChange}
        /> <br />
        <button type='submit'>Tallenna tiedot</button>
      </form>
    </div>
  )
}

export default JobForm