const toString = Object.prototype.toString

// someArgumentName is SomeType 定义类型保护
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject (val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}


export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

// TODO 混合对象的方法，还没搞懂这语法
// T & U 交叉类型
// as 断言，开发者假设自己很清楚该属性的类型，强行断言
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // 把to断言成交叉类型 可接受任意key
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
