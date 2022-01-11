import { createContext, useContext } from 'react'

const OnClientRequiredContext = createContext<(() => void) | null>(null)

export function useOnClientRequired() {
  const context = useContext(OnClientRequiredContext)

  if (context === null) {
    throw new Error('OnClientRequiredContext의 Provider를 찾을 수 없습니다.')
  }

  return context
}

export const RouterOnClientRequiredProvider = OnClientRequiredContext.Provider
