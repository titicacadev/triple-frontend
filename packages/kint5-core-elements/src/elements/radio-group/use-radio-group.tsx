import { useContext } from 'react'

import { RadioGroupContext } from './radio-group-context'

export function useRadioGroup() {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error('RadioGroupContext가 없습니다.')
  }
  return context
}
