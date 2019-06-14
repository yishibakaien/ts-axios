import axios from '../../src/index'

axios({
  url: '/error/get1',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

axios({
  url: '/error/get',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

setTimeout(() => {
  axios({
    url: '/error/get',
    method: 'get'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}, 5000)


axios({
  url: '/error/get',
  method: 'get',
  timeout: 2000
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})