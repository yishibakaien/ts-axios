import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})


axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    baz: 'bar',
    foo: null,
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'baz'
  }
})

axios({
  method: 'get',
  url: '/base/get?baz=foo',
  params: {
    foo: 'bar'
  }
})