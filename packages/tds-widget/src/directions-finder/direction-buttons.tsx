import { useCallback } from 'react'
import { styled } from 'styled-components'
import {
  useTrackEvent,
  useHashRouter,
  useAppInstallCtaModal,
  useClientApp,
  useTranslation,
} from '@titicaca/triple-web'
import { Button, ButtonGroup, Container } from '@titicaca/tds-ui'
import { InView } from 'react-intersection-observer'

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
  onCallGrabButtonIntersecting?: (
    inView: boolean,
    entry: IntersectionObserverEntry,
  ) => void
}) {
  const t = useTranslation()

  const app = useClientApp()
  const { uriHash, addUriHash, removeUriHash } = useHashRouter()
  const { show: showAppInstallCtaModal } = useAppInstallCtaModal()
  const trackEvent = useTrackEvent()

  const handleAskToLocalsClick = useCallback(() => {
    trackEvent({
      ga: ['기본정보_현지에서길묻기'],
      fa: {
        action: '기본정보_현지에서길묻기',
      },
    })

    app ? addUriHash(HASH_ASK_TO_LOCALS_POPUP) : showAppInstallCtaModal()
  }, [trackEvent, app, addUriHash, showAppInstallCtaModal])

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
          <InView
            onChange={(inView, entry) =>
              onCallGrabButtonIntersecting?.(inView, entry)
            }
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
          </InView>
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
