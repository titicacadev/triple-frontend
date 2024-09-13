import { useContext } from 'react'

import { I18nContext } from './context'

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('I18nContext가 없습니다.')
  }

  return context
}
