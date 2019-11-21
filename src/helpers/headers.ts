import { isPlainObject } from './util'

const normalizeHeaderName = (headers: any, normalizedName: string): void => {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    // headers名字大小写统一
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  // 如果是纯对象，默认是 Content-Type: text/plain  不是application/json  这样服务端拿不到body， 要小改一波
  // 如果是类似 URLSearchParams 这类数据格式，即使不设置headers的Content-Type， 浏览器会自动添加一个合适的
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string):any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
