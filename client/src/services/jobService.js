import axios from 'axios'
const baseUrl = '/api/jobs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const get = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newJob => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newJob, config)
  return response.data
}

const update = async (newJob, id) => {

  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`

  const response = await axios.put(url, newJob, config)
  return response.data
}

export default {
  get, setToken, create, update, token
}