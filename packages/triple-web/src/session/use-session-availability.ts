import { useSession } from './use-session'

/**
 * 세션이 유효한지 여부를 판별합니다.
 */
export function useSessionAvailability() {
  const { user } = useSession()
  return !!user
}
