import { Confirm } from '@titicaca/tds-ui'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useModal } from '../contexts'
import { trackEvent } from '../utils'

// TODO: hash-router-context 사용
function removeUriHash() {}

export const LOGIN_CTA_MODAL_HASH = 'login-cta-modal'

export function LoginCtaModal() {
  const { t } = useTranslation('triple-frontend')
  const { loginCtaModalRef, eventTrackingContextForkRef } = useModal()

  // TODO: hash-router-context와 연결
  const uriHash: string = ''
  const open = uriHash === LOGIN_CTA_MODAL_HASH

  const handleConfirm = () => {
    trackEvent(
      {
        ga: ['로그인유도팝업_로그인선택'],
        fa: {
          action: '로그인유도팝업_로그인선택',
        },
      },
      eventTrackingContextForkRef.current,
    )

    // TODO: router와 연결
    // navigate(
    //   `/login?returnUrl=${encodeURIComponent(
    //     loginCtaModalRef.current.returnUrl || document.location.href,
    //   )}`,
    // )
    return true
  }

  useEffect(() => {
    if (open) {
      const triggeredEventLabel =
        loginCtaModalRef.current.triggeredEventLabel ?? ''

      trackEvent(
        {
          ga: ['로그인유도팝업_노출', triggeredEventLabel],
          fa: {
            action: '로그인유도팝업_노출',
            referrer_event: triggeredEventLabel,
          },
        },
        eventTrackingContextForkRef.current,
      )
    }
  }, [eventTrackingContextForkRef, loginCtaModalRef, open])

  return (
    <Confirm
      open={open}
      title={t('로그인이 필요합니다.')}
      onClose={removeUriHash}
      onCancel={removeUriHash}
      onConfirm={handleConfirm}
    >
      {t('로그인하고 트리플을 더 편하게 이용하세요')}
    </Confirm>
  )
}
