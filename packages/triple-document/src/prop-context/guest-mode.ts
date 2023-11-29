import { GuestModeType } from '@titicaca/type-definitions'
import { createContext, useContext } from 'react'

const GuestModeContext = createContext<GuestModeType | undefined>(undefined)

export const GuestModeProvider = GuestModeContext.Provider

export function useGuestMode() {
  return useContext(GuestModeContext)
}
