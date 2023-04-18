import { useContext } from 'react'

import { CheckboxGroupContext } from './checkbox-group-context'

export function useCheckboxGroup() {
  const context = useContext(CheckboxGroupContext)
  if (!context) {
    throw new Error('CheckboxGroupContext가 없습니다.')
  }
  return context
}
