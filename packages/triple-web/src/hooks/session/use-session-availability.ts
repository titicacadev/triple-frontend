import { useSession } from './use-session'

export function useSessionAvailability() {
  const { user } = useSession()
  return !!user
}
