import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import data from './data.js'

let mock = new MockAdapter(axios, {delayResponse: 80})

mock.onGet('/search').reply(({params}) => {
  console.log(params)
  return [200, data.cs]
})

mock.onGet('/query').reply(({params}) => {
  console.log(params)
  return [200, data.CS309]
})

mock.onPost('/work').reply((params) => {
  console.log(params.data)
  return [200, data.work]
})

export default mock
