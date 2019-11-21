import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // 因为 isObject 的判断方式，对于 FormData、ArrayBuffer 这些类型，isObject 判断也为 true
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
