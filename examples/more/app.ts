import axios from '../../src'

document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', {}, {
  withCredentials: true
}).then(res => {
  console.log(res)
})

// xsrf demo
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
  console.log('csrf demo:', res)
})

// http auth demo
axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'chen',
    password: '123456'
  }
}).then(res => {
  console.log('http auth success demo', res)
})

axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'chen111',
    password: '123456'
  }
}).then(res => {
  console.log('http auth fail demo', res)
}).catch(err => {
  console.log('http auth fail demo', err)
})