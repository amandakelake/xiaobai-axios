import { RejectedFn, ResolvedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({ resolved, rejected })
    return this.interceptors.length - 1
  }

  // 这个方法是内部使用的  不会暴露给用户  所以在定义接口时  该属性也不必定义到types
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      interceptor !== null && fn(interceptor)
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      // 不能直接打乱数组的长度  id会变   所以只能置null
      // 置为null 所以上面要加一个联合类型 null
      this.interceptors[id] = null
    }
  }
}
