import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  precessConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function precessConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)

  /**
   * transformRequestHeaders 需要写在 transformRequestData 之前
   * 后者会对 data 做修改
   */
  config.headers = transformRequestHeaders(config) 
  config.data = transformRequestData(config)

  // 这里 config.method 类型断言，可以保证运行时有值
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 这里可以保证运行时 url 是有值的
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
