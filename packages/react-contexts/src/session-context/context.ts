import { createContext } from 'react'

export const SessionAvailabilityContext = createContext<boolean | null>(null)

export interface SessionControllers {
  login: (params?: { returnUrl?: string }) => void
  logout: () => Promise<void>
}

export const SessionControllerContext =
  createContext<SessionControllers | null>(null)
