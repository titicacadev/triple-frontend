import { Modal, Text } from '@titicaca/tds-ui'
import { styled } from 'styled-components'
import { useEffect } from 'react'
import { generateUrl } from '@titicaca/view-utilities'

import { APP_INSTALL_CTA_MODAL_HASH } from '../constants'
import { useModal } from '../context'
import { useHashRouter } from '../../hash-router/use-hash-router'
import { trackEvent } from '../../event-tracking/utils/track-event'
import { useEnv } from '../../env'
import { useTranslation } from '../../i18n'

const IconImage = styled.img`
  display: block;
  width: 66px;
  height: 66px;
  margin: 0 auto 10px;
`

export function AppInstallCtaModal() {
  const t = useTranslation()
  const { appInstallCtaModalRef, eventTrackingContextForkRef } = useModal()
  const { removeUriHash, hasUriHash } = useHashRouter()
  const { appUrlScheme } = useEnv()

  const open = hasUriHash(APP_INSTALL_CTA_MODAL_HASH)
  const eventLabel = appInstallCtaModalRef.current.triggeredEventAction

  const handleCancelOrClose = () => removeUriHash()

  const handleClick = () => {
    appInstallCtaModalRef.current.onActionClick?.()

    trackEvent(
      {
        ga: [
          '설치유도팝업_선택',
          ['선택_트리플가기', eventLabel].filter((v) => v).join('_'),
        ],
        fa: {
          action: '설치유도팝업_선택',
          ...(eventLabel && { referrer_event: eventLabel }),
        },
      },
      eventTrackingContextForkRef.current,
    )

    const appMain = generateUrl({
      scheme: appUrlScheme,
      path: '/main',
    })

    window.location.href = appInstallCtaModalRef.current.deepLink || appMain
  }

  useEffect(() => {
    if (eventLabel) {
      trackEvent(
        {
          ga: ['설치유도팝업_노출', eventLabel],
          fa: {
            action: '설치유도팝업_노출',
            ...(eventLabel && { referrer_event: eventLabel }),
          },
        },
        eventTrackingContextForkRef.current,
      )
    }
  }, [eventLabel, eventTrackingContextForkRef])

  return (
    <Modal open={open} onClose={handleCancelOrClose}>
      <Modal.Body>
        <IconImage src="https://assets.triple.guide/images/ico-popup-app@4x.png" />
        <Modal.Title>{t('여기는 트리플 앱이 필요해요')}</Modal.Title>
        <Text center alpha={0.7} size="small">
          {t(
            '일정 짜기부터 호텔, 투어・티켓 예약까지! 트리플로 한 번에 여행 준비하세요.',
          )}
        </Text>
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="gray" onClick={handleCancelOrClose}>
          {t('취소')}
        </Modal.Action>
        <Modal.Action color="blue" onClick={handleClick}>
          {t('트리플 가기')}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}
