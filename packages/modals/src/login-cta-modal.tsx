import {
  Attributes,
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
  // useHistoryFunctions,
  useHashRouter,
} from '@titicaca/react-contexts'
import { useAuthNavigate } from '@titicaca/router'

import { Confirm } from './confirm'

export const LOGIN_CTA_MODAL_HASH = 'login-cta-modal'

const LoginCtaContext = createContext<
  | {
      setReturnUrl?: (url: string) => void
    }
  | undefined
>(undefined)

export function LoginCtaModalProvider({
  children,
}: PropsWithChildren<unknown>) {
  const { t } = useTranslation('common-web')

  const { trackEvent } = useEventTrackingContext()
  const { uriHash, removeUriHash } = useHashRouter()
  const hasParentModal = useContext(LoginCtaContext)
  const open = uriHash === LOGIN_CTA_MODAL_HASH
  const [returnUrl, setReturnUrl] = useState<string | undefined>()
  const { navigate } = useAuthNavigate()

  if (hasParentModal) {
    return <>{children}</>
  }

  return (
    <LoginCtaContext.Provider value={{ setReturnUrl }}>
      {children}

      <Confirm
        open={open}
        title={t(['rogeuini-pilyohabnida.', '로그인이 필요합니다.'])}
        // onClose={back}
        // onCancel={back}
        onClose={removeUriHash}
        onCancel={removeUriHash}
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

export function withLoginCtaModal<P>(Component: ComponentType<P & Attributes>) {
  return function WithLoginCtaModal(props: P & Attributes) {
    return (
      <LoginCtaModalProvider>
        <Component {...props} />
      </LoginCtaModalProvider>
    )
  }
}

export function useLoginCtaModal() {
  // const { push } = useHistoryFunctions()
  const { addUriHash } = useHashRouter()
  const { trackEvent } = useEventTrackingContext()
  const contextValue = useContext(LoginCtaContext)

  return useMemo(
    () => ({
      show: (returnUrl?: string, triggeredEventAction = '') => {
        if (contextValue?.setReturnUrl && returnUrl) {
          contextValue.setReturnUrl(returnUrl)
        }

        trackEvent({
          ga: ['로그인유도팝업_노출', triggeredEventAction],
          fa: {
            action: '로그인유도팝업_노출',
            referrer_event: triggeredEventAction,
          },
        })
        // push(LOGIN_CTA_MODAL_HASH)
        addUriHash(LOGIN_CTA_MODAL_HASH)
      },
    }),
    // [push, trackEvent, contextValue],
    [addUriHash, trackEvent, contextValue],
  )
}
