import { AxiosPromise, AxiosRequestConfig, Method, RejectedFn, ResolvedFn } from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosPromise>
}

interface PromiseChain<T> {
  // resolved 也可能是一个 dispatchRequest 类型
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  // 初始化为undefined
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosPromise>()
    }
  }

  // 实际上 下面所有方法最终指向的都是这个request方法
  request(url: any, config?: any): AxiosPromise {
    // 虽然修改了 request 的实现，支持了 2 种参数，但是我们对外提供的 request 接口仍然不变
    // 可以理解为这仅仅是内部的实现的修改，与对外接口不必一致，只要保留实现兼容接口即可
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors.request.forEach(interceptor => {
      // 注意执行顺序  后添加的先执行
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      // res 后添加后执行
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while(chain.length) {
      // 断言非空 不然会读取到undefined
      const {resolved, rejected} = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise

    // return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
