import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = tramsformUrl(config)
  config.headers = transfromHeaders(config)
  config.data = transformRequestData(config)
}

function transfromHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function tramsformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
