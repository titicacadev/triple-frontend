import {
  MutableRefObject,
  PropsWithChildren,
  createContext,
  useRef,
} from 'react'

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
}

export const ModalContext = createContext<ModalState | undefined>(undefined)

export function ModalProvider({ children }: PropsWithChildren) {
  const loginCtaModalRef = useRef<LoginCtaModalRef>({})
  const transitionModalRef = useRef<TransitionModalRef>({})

  return (
    <ModalContext.Provider value={{ loginCtaModalRef, transitionModalRef }}>
      {children}
    </ModalContext.Provider>
  )
}
