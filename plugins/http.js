import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from '../config'

// enable mock
import mock from './mock'
if (!config.debug.mock) {
  mock.restore()
}

const http = axios.create({
  baseURL: config.api,
  timeout: 0
})

Vue.use(VueAxios, http)

http.interceptors.request.use((request) => {
  return request
}, (error) => {
  return Promise.reject(error)
})

http.interceptors.response.use((response) => {
  const request = response.config
  if (config.debug.http) {
    console.log(
      '>>>', request.method.toUpperCase(), request.url, request.params,
      '\n   ', response.status, response.data
    )
  }
  return response
}, (error) => {
  if (config.debug.http) {
    let { response, config: request } = error
    if (request) {
      console.log(
        '>>>', request.method.toUpperCase(), request.url, request.params,
        '\n   ', response.status, response.data
      )
    }
  }
  return Promise.reject(error)
})
export default http
