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

export default {
  get, setToken
}