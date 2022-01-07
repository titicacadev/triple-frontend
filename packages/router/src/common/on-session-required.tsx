import { createContext, useContext } from 'react'

const OnSessionRequiredContext = createContext<(() => void) | null>(null)

export function useOnSessionRequired() {
  const context = useContext(OnSessionRequiredContext)

  if (context === null) {
    throw new Error('SessionAlertContext의 Provider가 없습니다.')
  }

  return context
}

export const RouterOnSessionRequiredProvider = OnSessionRequiredContext.Provider
