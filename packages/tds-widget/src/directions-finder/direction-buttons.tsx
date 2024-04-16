import { useCallback } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  useTrackEvent,
  useHashRouter,
  useTransitionModal,
  TransitionType,
  useClientApp,
} from '@titicaca/triple-web'
import { Button, ButtonGroup, Container } from '@titicaca/tds-ui'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { AskToTheLocal } from './ask-to-the-local'
import { HASH_ASK_TO_LOCALS_POPUP } from './constants'

const LinkBreak = styled(Container)`
  flex-basis: 100%;
  height: 0;
`

export function DirectionButtons({
  onDirectionsClick,
  primaryName,
  localName,
  localAddress,
  phoneNumber,
  isDomestic = false,
  onCallGrabButtonClick,
  onCallGrabButtonIntersecting,
}: {
  onDirectionsClick: () => void
  primaryName: string
  localName?: string
  localAddress?: string
  phoneNumber?: string
  isDomestic?: boolean
  onCallGrabButtonClick?: () => void
  onCallGrabButtonIntersecting?: (entry: IntersectionObserverEntry) => void
}) {
  const { t } = useTranslation('triple-frontend')

  const app = useClientApp()
  const { uriHash, addUriHash, removeUriHash } = useHashRouter()
  const { show: showTransitionModal } = useTransitionModal()
  const trackEvent = useTrackEvent()

  const handleAskToLocalsClick = useCallback(() => {
    trackEvent({
      ga: ['기본정보_현지에서길묻기'],
      fa: {
        action: '기본정보_현지에서길묻기',
      },
    })

    app
      ? addUriHash(HASH_ASK_TO_LOCALS_POPUP)
      : showTransitionModal(TransitionType.General)
  }, [trackEvent, app, addUriHash, showTransitionModal])

  const hasAskToLocalsButton = !!(localName && localAddress)
  const hasLineBreak = hasAskToLocalsButton && !!onCallGrabButtonClick

  return (
    <>
      <ButtonGroup css={{ flexWrap: 'wrap', gap: '5px 10px' }}>
        {hasAskToLocalsButton ? (
          <Button
            basic
            color="gray"
            size="small"
            onClick={handleAskToLocalsClick}
          >
            {t('현지에서 길묻기')}
          </Button>
        ) : null}

        {hasLineBreak ? <LinkBreak /> : null}

        {onCallGrabButtonClick ? (
          <StaticIntersectionObserver
            onChange={(entry) => onCallGrabButtonIntersecting?.(entry)}
          >
            <Button
              basic
              inverted
              color="blue"
              size="small"
              onClick={onCallGrabButtonClick}
            >
              {t('grab-hocul')}
            </Button>
          </StaticIntersectionObserver>
        ) : null}

        <Button
          basic
          inverted
          color="blue"
          size="small"
          onClick={onDirectionsClick}
        >
          {t('길찾기')}
        </Button>
      </ButtonGroup>

      {hasAskToLocalsButton ? (
        <AskToTheLocal
          open={uriHash === HASH_ASK_TO_LOCALS_POPUP}
          onClose={removeUriHash}
          localName={localName}
          localAddress={localAddress}
          primaryName={primaryName}
          phoneNumber={phoneNumber}
          isDomestic={isDomestic}
        />
      ) : null}
    </>
  )
}
