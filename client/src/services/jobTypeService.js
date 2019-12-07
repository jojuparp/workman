import axios from 'axios'
import jobService from './jobService'
const baseUrl = '/api/jobtypes'

const get = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newType => {

  const config = {
    headers: { Authorization: jobService.token }
  }

  const response = await axios.post(baseUrl, newType, config)
  return response.data
}

export default {
  get, create
}