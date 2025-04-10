export const convertKeysToCamelCase = (obj: {
  [key: string]: string
}): { [key: string]: string } => {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw Error('Invalid input: An object is expected.')
  }

  const toCamelCase = (str: string): string => {
    return str
      .split('-')
      .map((part: string, index: number): string => {
        if (index === 0) {
          return part
        }
        if (!part) {
          return ''
        }
        return part.charAt(0).toUpperCase() + part.slice(1)
      })
      .join('')
  }

  return Object.entries(obj).reduce<{ [key: string]: V }>(
    (accumulator, [key, value]) => {
      const camelKey = toCamelCase(key)
      accumulator[camelKey] = value
      return accumulator
    },
    {},
  )
}
