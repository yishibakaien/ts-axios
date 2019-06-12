import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  /**
   * 第三个参数为 async 是否是异步请求
   */
  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
