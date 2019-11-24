import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { processHeaders } from '../helpers/headers'
import { transformRequest, transformResponse } from '../helpers/data'
import { buildURL } from '../helpers/url'
import xhr from './xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // 优先处理headers再处理data
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  // url在config里面不是必填参数，后面加个！号断言不为空即可
  return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
