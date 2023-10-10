import { useCallback } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@titicaca/next-i18next'
import {
  useEventTrackingContext,
  useHistoryFunctions,
  useUriHash,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { Button, ButtonGroup, Container } from '@titicaca/tds-ui'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import AskToTheLocal from './ask-to-the-local'
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
  const { t } = useTranslation('common-web')

  const app = useTripleClientMetadata()
  const uriHash = useUriHash()
  const { push, back, showTransitionModal } = useHistoryFunctions()
  const { trackEvent } = useEventTrackingContext()

  const handleAskToLocalsClick = useCallback(() => {
    trackEvent({ fa: { action: '기본정보_현지에서길묻기' } })
    app ? push(HASH_ASK_TO_LOCALS_POPUP) : showTransitionModal()
  }, [trackEvent, push, showTransitionModal, app])

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
            {t(['hyeonjieseo-gilmudgi', '현지에서 길묻기'])}
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
              {t(['grab-hocul', 'Grab 호출'])}
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
          {t(['gilcajgi', '길찾기'])}
        </Button>
      </ButtonGroup>

      {hasAskToLocalsButton ? (
        <AskToTheLocal
          open={uriHash === HASH_ASK_TO_LOCALS_POPUP}
          onClose={back}
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
