export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse<T=any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {

}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null | number
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig
  
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>
  
  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios{
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager<T> {
  // 返回值的 number 是这个 interceptor 的 ID 用于 eject 的时候删除此 interceptor
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}