import { PropsWithChildren, createContext, useContext, useRef } from 'react'

import {
  EventTrackingValue,
  ModalValue,
  LoginCtaModalRef,
  TransitionModalRef,
} from '../types'
import { LoginCtaModal, TransitionModal } from '../internal-components'

export const ModalContext = createContext<ModalValue | undefined>(undefined)

export function useModal() {
  const modalContext = useContext(ModalContext)

  if (modalContext === undefined) {
    throw new Error('ModalContext가 없습니다.')
  }

  return modalContext
}

export function ModalProvider({ children }: PropsWithChildren) {
  const loginCtaModalRef = useRef<LoginCtaModalRef>({})
  const transitionModalRef = useRef<TransitionModalRef>({})
  const eventTrackingContextForkRef = useRef<EventTrackingValue>()

  return (
    <ModalContext.Provider
      value={{
        loginCtaModalRef,
        transitionModalRef,
        eventTrackingContextForkRef,
      }}
    >
      {children}
      <LoginCtaModal />
      <TransitionModal />
    </ModalContext.Provider>
  )
}
