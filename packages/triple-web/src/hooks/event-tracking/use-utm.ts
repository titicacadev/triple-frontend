import { useEventTracking } from '../../contexts'

export function useUtm() {
  const { utm } = useEventTracking()

  return utm
}
