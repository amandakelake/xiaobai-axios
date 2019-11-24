export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// axios是个混合对象 给它里面的方法定义接口
export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?:AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?:AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?:AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios{
  // 函数重载  支持多种参数定义
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosRequestConfig {
  url?: string // config里面的url也变成了可选，因为get、post等方法把url变成了第一个参数
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType,
  timeout?: number
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>>{

}

export interface AxiosError extends Error{
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}
