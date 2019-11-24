import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  // 推导不出类型  只能强行断言
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
