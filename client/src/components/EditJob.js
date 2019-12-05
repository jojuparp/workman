import React from 'react'
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

    const job = {
      address: address,
      type: type,
      customerPhone: customerPhone,
      customerName: customerName,
      users: parseUsers(),
      parts: parts,
    }
    
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
          //value={type.value}
          defaultValue={job.type.name}
          onChange={type.onChange}
        /> <br />
        Kuvaus:
        <input
          //value={type.value}
          defaultValue={job.description}
          onChange={description.onChange}
        /> <br />
        Osoite:
        <input
          //value={type.value}
          defaultValue={job.address}
          onChange={address.onChange}
        /> <br />
        Asiakas:
        <input
          //value={type.value}
          defaultValue={job.customerName}
          onChange={customerName.onChange}
        /> <br />
        Yhteystieto:
        <input
          //value={type.value}
          defaultValue={job.customerPhone}
          onChange={customerPhone.onChange}
        /> <br />
        Työntekijät
        <input
          //value={type.value}
          defaultValue={setUsers()}
          onChange={users.onChange}
        /> <br />
        <button type='submit'>Tallenna tiedot</button>
      </form>
    </div>
  )
}

export default EditJob