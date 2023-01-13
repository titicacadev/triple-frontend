import {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import {
  useEventTrackingContext,
  useHistoryFunctions,
  useUriHash,
} from '@titicaca/react-contexts'

import { Confirm } from './confirm'

export const LOGIN_CTA_MODAL_HASH = 'login-cta-modal'

const LoginCtaContext =
  createContext<
    | {
        setReturnUrl?: (url: string) => void
      }
    | undefined
  >(undefined)

export function LoginCtaModalProvider({
  children,
}: PropsWithChildren<unknown>) {
  const { t } = useTranslation('common-web')

  const uriHash = useUriHash()
  const { trackEvent } = useEventTrackingContext()
  const { back, navigate } = useHistoryFunctions()
  const hasParentModal = useContext(LoginCtaContext)
  const open = uriHash === LOGIN_CTA_MODAL_HASH
  const [returnUrl, setReturnUrl] = useState<string | undefined>()

  if (hasParentModal) {
    return <>{children}</>
  }

  return (
    <LoginCtaContext.Provider value={{ setReturnUrl }}>
      {children}

      <Confirm
        open={open}
        title={t(['rogeuini-pilyohabnida.', '로그인이 필요합니다.'])}
        onClose={back}
        onCancel={back}
        onConfirm={() => {
          trackEvent({
            ga: ['로그인유도팝업_로그인선택'],
            fa: {
              action: '로그인유도팝업_로그인선택',
            },
          })

          navigate(
            `/login?returnUrl=${encodeURIComponent(
              returnUrl || document.location.href,
            )}`,
          )

          return true
        }}
      >
        {t([
          'rogeuinhago-teuripeuleul-deo-pyeonhage-iyonghaseyo',
          '로그인하고 트리플을\n더 편하게 이용하세요🙂',
        ])}
      </Confirm>
    </LoginCtaContext.Provider>
  )
}

export function withLoginCtaModal<P>(Component: ComponentType<P>) {
  return function WithLoginCtaModal(props: P) {
    return (
      <LoginCtaModalProvider>
        <Component {...props} />
      </LoginCtaModalProvider>
    )
  }
}

export function useLoginCtaModal() {
  const { push } = useHistoryFunctions()
  const contextValue = useContext(LoginCtaContext)

  return useMemo(
    () => ({
      show: (returnUrl?: string) => {
        if (contextValue?.setReturnUrl && returnUrl) {
          contextValue.setReturnUrl(returnUrl)
        }

        push(LOGIN_CTA_MODAL_HASH)
      },
    }),
    [push, contextValue],
  )
}
