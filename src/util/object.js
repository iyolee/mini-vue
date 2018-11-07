export const isObject = obj => {
  const toString = Object.prototype.toString;
  const map = {
    '[object Array]': 'array',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)];
}