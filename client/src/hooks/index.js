import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {

  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  const changeValue = () => setValue(value)

  return {
    type,
    value,
    changeValue,
    setValue,
    onChange,
    reset
  }
}


export const useResource = (url) => {
  const baseUrl = url
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }

  const update = async (newObject, id) => {

    const url = `${baseUrl}/${id}`

    const response = await axios.put(url, newObject)
    return response.data
  }

  const remove = async (id) => {
    const config = {
      headers: { Authorization: token }
    }

    const url = `${baseUrl}/${id}`
    const response = await axios.delete(url, config)
    return response.data
  }

  return { setToken, getAll, create, remove, update }
}
