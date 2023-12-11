import { Confirm } from '@titicaca/tds-ui'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { LOGIN_CTA_MODAL_HASH } from '../constants'
import { useModal } from '../contexts'
import { useHashRouter } from '../hooks'
import { trackEvent } from '../utils'

export function LoginCtaModal() {
  const { t } = useTranslation('triple-frontend')
  const { loginCtaModalRef, eventTrackingContextForkRef } = useModal()
  const { removeUriHash, uriHash } = useHashRouter()
  const open = uriHash === LOGIN_CTA_MODAL_HASH

  const handleCancelOrClose = () => removeUriHash()

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
      const triggeredEventAction =
        loginCtaModalRef.current.triggeredEventAction ?? ''

      trackEvent(
        {
          ga: ['로그인유도팝업_노출', triggeredEventAction],
          fa: {
            action: '로그인유도팝업_노출',
            referrer_event: triggeredEventAction,
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
      onClose={handleCancelOrClose}
      onCancel={handleCancelOrClose}
      onConfirm={handleConfirm}
    >
      {t('로그인하고 트리플을 더 편하게 이용하세요')}
    </Confirm>
  )
}
