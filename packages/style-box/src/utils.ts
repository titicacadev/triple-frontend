export function isObject(arg: unknown): arg is object {
  return typeof arg === 'object'
}

export function isString(arg: unknown): arg is string {
  return typeof arg === 'string'
}
