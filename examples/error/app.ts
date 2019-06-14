import axios from '../../src/index'

axios({
  url: '/error/get',
  method: 'get',
  params: {
    a: 1,
    b: 2
  }
})
