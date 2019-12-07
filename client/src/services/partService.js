import axios from 'axios'
import jobService from './jobService'
const baseUrl = '/api/parts'

const get = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newPart => {

  const config = {
    headers: { Authorization: jobService.token }
  }

  const response = await axios.post(baseUrl, newPart, config)
  return response.data
}

export default {
  get, create
}