import { PropsWithChildren, createContext, useContext, useRef } from 'react'

import type { EventTrackingValue } from '../event-tracking/types'

import type {
  LoginCtaModalRef,
  ModalValue,
  AppInstallCtaModalRef,
} from './types'

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
  const appInstallCtaModalRef = useRef<AppInstallCtaModalRef>({})
  const eventTrackingContextForkRef = useRef<EventTrackingValue>()

  return (
    <ModalContext.Provider
      value={{
        loginCtaModalRef,
        appInstallCtaModalRef,
        eventTrackingContextForkRef,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
