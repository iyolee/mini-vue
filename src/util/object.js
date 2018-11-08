export const isObject = obj => {
  const toString = Object.prototype.toString
  const map = {
    '[object Array]': 'array',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

export const getVMValue = (vm, expr) => {
  let data = vm.$data
  expr.split('.').forEach(key => {
    data = data[key]
  })
  return data
}

export const setVMValue = (vm, expr, value) => {
  let data = vm.$data
  const arr = expr.split('.')

  arr.forEach((key, idx) => {
    if (idx < arr.length - 1) {
      data = data[key]
    } else {
      data[key] = value
    }
  })
}
