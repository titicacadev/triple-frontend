import { useContext } from 'react'

import { SessionAvailabilityContext, SessionControllerContext } from './context'

export function useSessionAvailability() {
  const sessionAvailable = useContext(SessionAvailabilityContext)

  if (sessionAvailable === null) {
    throw new Error('SessionAvailabilityContext의 Provider가 없습니다.')
  }

  return sessionAvailable
}

export function useSessionControllers() {
  const controllers = useContext(SessionControllerContext)

  if (controllers === null) {
    throw new Error('SessionControllersContext의 Provider가 없습니다.')
  }

  return controllers
}
