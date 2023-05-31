export function filterValidValue<T extends object>(obj: T) {
  return Object.entries(obj)
    .filter(([_, value]) => !!value)
    .reduce<T>((obj, [key, value]) => ({ ...obj, [key]: value }), {} as T)
}

export function toISOString(dateString: string | undefined) {
  if (!dateString) {
    return
  }

  const date = new Date(dateString)
  const isValidDate = date instanceof Date && !isNaN(date.getTime())

  return isValidDate ? date.toISOString() : undefined
}

export function addSchemaType<T extends object>(
  obj: T | undefined,
  type: string,
) {
  if (!obj || !Object.keys(obj).length) {
    return undefined
  }

  const typedObj = {
    '@type': 'type' in obj ? obj.type : type,
    ...obj,
  }

  if ('type' in typedObj) {
    delete typedObj.type
  }

  return typedObj
}
