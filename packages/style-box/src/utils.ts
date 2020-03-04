export function isObject(arg: any): arg is object {
  return typeof arg === 'object'
}

export function isString(arg: any): arg is string {
  return typeof arg === 'string'
}
