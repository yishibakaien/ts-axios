import axios from '../../src'
import qs from 'qs'

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

// 自定义合法状态码 demo
axios.get('/more/304').then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})


axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})

// 自定义 params 的解析规则 demo
axios.get('/more/get', {
  params: new URLSearchParams('a=b&c=d')
}).then(res => {
  console.log(res)
})

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})

const instance2 = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets'
    })
  }
})

instance2.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})
