import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  precessConfig(config)
  xhr(config)
}

function precessConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)

  /**
   * transformRequestHeaders 需要写在 transformRequestData 之前
   * 后者会对 data 做修改
   */
  config.headers = transformRequestHeaders(config) 
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
