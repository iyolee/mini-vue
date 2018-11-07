import { isObject } from '../util/object'

class Observer {
  constructor(data) {
    this.data = data
    this.walk(this.data)
  }

  walk(data) {
    if (data || isObject(data) !== 'object') {
      return
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
      this.walk(data[key])
    })
  }

  defineReactive(obj, key, value) {
    const _self = this
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        return value
      },
      set(newValue) {
        if (value === newValue) {
          return
        }
        value = newValue
        _self.walk(newValue)
      }
    })
  }
}

export default Observer
