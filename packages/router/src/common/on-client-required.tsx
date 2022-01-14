import { createContext, useContext } from 'react'

const OnTripleClientRequiredContext = createContext<(() => void) | null>(null)

export function useOnTripleClientRequired() {
  const context = useContext(OnTripleClientRequiredContext)

  if (context === null) {
    throw new Error(
      'OnTripleClientRequiredContext의 Provider를 찾을 수 없습니다.',
    )
  }

  return context
}

export const RouterOnTripleClientRequiredProvider =
  OnTripleClientRequiredContext.Provider
