export function filterValidValue<T extends object>(obj: T) {
  return Object.entries(obj)
    .filter((_, value) => !!value)
    .reduce<T>((obj, [key, value]) => ({ ...obj, [key]: value }), {} as T)
}
