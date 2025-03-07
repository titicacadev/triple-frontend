import { useContext } from 'react'
import Cookies from 'universal-cookie'

import { TP_SE } from '../middlewares/constants'

import { SessionAvailabilityContext, SessionControllerContext } from './context'

export function useSessionAvailability() {
  const sessionAvailable = useContext(SessionAvailabilityContext)

  if (sessionAvailable === null) {
    throw new Error('SessionAvailabilityContext의 Provider가 없습니다.')
  }

  return typeof window !== 'undefined' && window.document
    ? !!new Cookies(document.cookie).get<string>(TP_SE)
    : sessionAvailable
}

export function useSessionControllers() {
  const controllers = useContext(SessionControllerContext)

  if (controllers === null) {
    throw new Error('SessionControllersContext의 Provider가 없습니다.')
  }

  return controllers
}
