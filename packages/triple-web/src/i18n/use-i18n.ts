import { useContext } from 'react'

import { I18nContext } from './context'

/**
 * I18nContext 값을 가져옵니다.
 */
export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('I18nContext가 없습니다.')
  }

  return context
}
