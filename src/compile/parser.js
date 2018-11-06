export const ParserUtil = {
  text(node, vm, expr) {
    node.textContent = this.getVMValue(vm, expr)
  },

  template(node, vm) {
    const text = node.textContent
    const reg = /\{\{(.+)\}\}/
    if (reg.test(text)) {
      const expr = RegExp.$1
      node.textContent = text.replace(reg, this.getVMValue(vm, expr))
    }
  },

  html(node, vm, expr) {
    node.innerHTML = this.getVMValue(vm, expr)
  },

  model(node, vm, expr) {
    node.value = this.getVMValue(vm, expr)
  },

  eventHandler(node, vm, type, expr) {
    const eventType = type.split(':')[1]
    const fn = vm.$methods && vm.$methods[expr]
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm))
    }
  },
  
  getVMValue(vm, expr) {
    let data = vm.$data
    expr.split('.').forEach(key => {
      data = data[key]
    })
    return data
  }
}
