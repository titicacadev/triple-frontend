export const interpolate = (
  text: string,
  values: Record<string, string> = {},
) => {
  return text.replace(/{{(\w+)}}/g, (match, key) => {
    return values[key] !== undefined ? values[key] : match
  })
}
