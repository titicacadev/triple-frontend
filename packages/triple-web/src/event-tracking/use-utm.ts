import { useEventTracking } from './context'

export function useUtm() {
  const { utm } = useEventTracking()

  return utm
}
