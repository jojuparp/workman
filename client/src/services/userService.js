import axios from 'axios'
import jobService from './jobService'

const baseUrl = '/api/users'

const get = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newUser => {

	console.log(jobService.token)

  const config = {
    headers: { Authorization: jobService.token }
  }

  const response = await axios.post(baseUrl, newUser, config)
  return response.data
}

export default {
  get, create
}