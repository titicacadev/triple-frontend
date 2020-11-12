import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'
import {
  useHistoryFunctions,
  useURIHash,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import semver from 'semver'

import { Confirm, Alert } from './modals'

const LOGIN_CTA_MODAL_HASH = 'login-cta-modal'

const WITH_LOGIN_PATH_APP_VERSION = '5.0.0'

const LoginCTAFlagContext = createContext(false)

export function LoginCTAModalProvider({ children }: PropsWithChildren<{}>) {
  const uriHash = useURIHash()
  const { back, navigate } = useHistoryFunctions()
  const hasParentModal = useContext(LoginCTAFlagContext)
  const { isPublic, os, app } = useUserAgentContext()
  const appVersion = semver.coerce(app?.version)
  const open = uriHash === LOGIN_CTA_MODAL_HASH

  if (hasParentModal) {
    return <>{children}</>
  }

  const isLegacyAndroidApp = Boolean(
    !isPublic &&
      os?.name === 'Android' &&
      appVersion &&
      semver.lt(appVersion, WITH_LOGIN_PATH_APP_VERSION),
  )

  return (
    <LoginCTAFlagContext.Provider value={true}>
      {children}

      {isLegacyAndroidApp ? (
        <Alert open={open} title="로그인이 필요합니다." onConfirm={back}>
          로그인하고 트리플을
          <br />더 편하게 이용하세요🙂
        </Alert>
      ) : (
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
      )}
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
