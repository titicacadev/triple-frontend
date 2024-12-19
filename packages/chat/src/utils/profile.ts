export const DEFAULT_MAX_USERNAME_LENGTH = 10

export function formatUsername({
  name,
  unregistered = false,
  maxLength,
}: {
  name: string
  unregistered?: boolean | null
  maxLength?: number
}) {
  if (unregistered) {
    return '***'
  }

  if (maxLength) {
    return name.length > maxLength ? `${name.slice(0, maxLength)}⋯` : name
  }

  return name
}
