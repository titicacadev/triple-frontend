import { useHistoryFunctions, useURIHash } from '@titicaca/react-contexts'
import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'

import { Confirm } from './modals'

const LOGIN_CTA_MODAL_HASH = 'login-cta-modal'

const LoginCTAFlagContext = createContext(false)

export function LoginCTAModalProvider({ children }: PropsWithChildren<{}>) {
  const uriHash = useURIHash()
  const { back, navigate } = useHistoryFunctions()
  const hasParentModal = useContext(LoginCTAFlagContext)

  const open = uriHash === LOGIN_CTA_MODAL_HASH

  if (hasParentModal) {
    return null
  }

  return (
    <LoginCTAFlagContext.Provider value={true}>
      {children}

      <Confirm
        open={open}
        title="로그인이 필요합니다."
        onClose={back}
        onCancel={back}
        onConfirm={() => {
          navigate('/login')
        }}
      >
        로그인하고 트리플을
        <br />더 편하게 이용하세요🙂
      </Confirm>
    </LoginCTAFlagContext.Provider>
  )
}

export function withLoginCTAModal<P>(Component: ComponentType<P>) {
  return function WithLoginCTAModal(props: P) {
    return (
      <LoginCTAModalProvider>
        <Component {...props} />
      </LoginCTAModalProvider>
    )
  }
}

export function useLoginCTAModal() {
  const { push } = useHistoryFunctions()

  return useMemo(
    () => ({
      show: () => {
        push(LOGIN_CTA_MODAL_HASH)
      },
    }),
    [push],
  )
}
