import { useContext } from 'react'

import { HashRouterContext } from '../../contexts/hash-router'

export function useHashRouter() {
  const context = useContext(HashRouterContext)

  if (!context) {
    throw new Error('HashRouterContext가 존재하지 않습니다.')
  }

  return context
}
