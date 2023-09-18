import { useContext } from 'react'

import { FieldsetContext } from './fieldset-context'

export function useFieldset() {
  const context = useContext(FieldsetContext)
  if (!context) {
    throw new Error('FieldsetContext가 없습니다.')
  }
  return context
}
