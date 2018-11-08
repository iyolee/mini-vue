import { Watcher } from '../core/watcher'
import { getVMValue, setVMValue } from '../util/object'

export const ParserUtil = {
  text(node, vm, expr) {
    node.textContent = getVMValue(vm, expr)

    new Watcher(vm, expr, newValue => {
      node.textContent = newValue
    })
  },

  template(node, vm) {
    const text = node.textContent
    const reg = /\{\{(.+)\}\}/
    if (reg.test(text)) {
      const expr = RegExp.$1
      node.textContent = text.replace(reg, getVMValue(vm, expr))

      new Watcher(vm, expr, newValue => {
        node.textContent = text.replace(reg, newValue)
      })
    }
  },

  html(node, vm, expr) {
    node.innerHTML = getVMValue(vm, expr)

    new Watcher(vm, expr, newValue => {
      node.innerHTML = newValue
    })
  },

  model(node, vm, expr) {
    // const _self = this
    node.value = getVMValue(vm, expr)

    node.addEventListener('input', function() {
      setVMValue(vm, expr, this.value)
    })

    new Watcher(vm, expr, newValue => {
      node.value = newValue
    })
  },

  eventHandler(node, vm, type, expr) {
    const eventType = type.split(':')[1]
    const fn = vm.$methods && vm.$methods[expr]
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm))
    }
  },
}
