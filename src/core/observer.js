import { isObject } from '../util/object'
import Dep from '../watch/dep'

class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
  }

  walk(data) {
    if (!data || isObject(data) !== 'object') {
      return
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
      this.walk(data[key])
    })
  }

  defineReactive(obj, key, value) {
    const _self = this
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        if (value === newValue) {
          return
        }
        value = newValue
        _self.walk(newValue)
        dep.notify()
      }
    })
  }
}

export default Observer
