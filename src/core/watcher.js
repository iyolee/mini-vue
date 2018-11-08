import Dep from '../watch/dep'
import { getVMValue } from '../util/object'

export class Watcher {

  /**
   *Creates an instance of Watcher.
   * @param {Object} vm an instance of Vue
   * @param {String} expr key of data
   * @param {Function} cb callback
   * @memberof Watcher
   */
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb

    Dep.target = this
    this.oldValue = getVMValue(vm, expr)
    Dep.target = null
  }

  update() {
    const oldValue = this.oldValue
    const newValue = getVMValue(this.vm, this.expr)

    if (oldValue !== newValue) {
      this.cb(newValue, oldValue)
    }
  }
}

export default Watcher
