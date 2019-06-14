import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    // 第三个参数为 async 是否是异步请求
    // 这里可以保证运行时 url 是有值的
    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())

      // 根据传入的 responseType 来决定返回的数据
      const responseData = responseType === 'text' ? request.responseText : request.response

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }

    request.onerror = () => {
      reject(createError(`NetWork Error`, config, null, request))
    }

    request.ontimeout = () => {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    function handleResponse(response: AxiosResponse): void {
      const { status } = response
      if (status >= 200 && status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${status}`, config, null, request, response))
      }
    }

    Object.keys(headers).forEach(name => {
      // 如果 data 为 null headers 的 content-type 属性没有意义
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
