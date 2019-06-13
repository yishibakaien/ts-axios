const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
