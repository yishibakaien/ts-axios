import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  /**
   * 第三个参数为 async 是否是异步请求
   */
  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    // 如果 data 为 null headers 的 content-type 属性没有意义
    if (data === null && name.toLocaleLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
