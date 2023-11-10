import { useContext } from 'react'

import { ModalContext } from '../../contexts'

export function useModal() {
  const modalContext = useContext(ModalContext)

  if (modalContext === undefined) {
    throw new Error('ModalContext가 없습니다.')
  }

  return modalContext
}
