import axios from '../../src'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello axios.request'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })


// 函数重载 demo
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi normal'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hi function reload'
  }
})