import {
  MutableRefObject,
  PropsWithChildren,
  createContext,
  useRef,
} from 'react'

import { EventTracking } from './event-tracking'

export interface LoginCtaModalRef {
  returnUrl?: string
}

export interface TransitionModalRef {
  deepLink?: string
  onActionClick?: () => void
}

export interface ModalState {
  loginCtaModalRef: MutableRefObject<LoginCtaModalRef>
  transitionModalRef: MutableRefObject<TransitionModalRef>
  eventTrackingContextForkRef: MutableRefObject<EventTracking | undefined>
}

export const ModalContext = createContext<ModalState | undefined>(undefined)

export function ModalProvider({ children }: PropsWithChildren) {
  const loginCtaModalRef = useRef<LoginCtaModalRef>({})
  const transitionModalRef = useRef<TransitionModalRef>({})
  const eventTrackingContextForkRef = useRef<EventTracking>()

  return (
    <ModalContext.Provider
      value={{
        loginCtaModalRef,
        transitionModalRef,
        eventTrackingContextForkRef,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
