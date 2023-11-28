import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useTrackEvent, useHashRouter } from '@titicaca/triple-web'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { Button, ButtonGroup } from '@titicaca/tds-ui'

import AskToTheLocal from './ask-to-the-local'
import { HASH_ASK_TO_LOCALS_POPUP } from './constants'

export function DirectionButtons({
  onDirectionsClick,
  primaryName,
  localName,
  localAddress,
  phoneNumber,
  isDomestic = false,
}: {
  onDirectionsClick: () => void
  primaryName: string
  localName?: string
  localAddress?: string
  phoneNumber?: string
  isDomestic?: boolean
}) {
  const { t } = useTranslation('triple-frontend')

  const app = useTripleClientMetadata()
  const { uriHash, addUriHash, removeUriHash } = useHashRouter()
  const trackEvent = useTrackEvent()

  const handleAskToLocalsClick = useCallback(() => {
    trackEvent({
      ga: ['기본정보_현지에서길묻기'],
      fa: {
        action: '기본정보_현지에서길묻기',
      },
    })

    // TODO: showTrnasitionModal 대체하기
    app ? addUriHash(HASH_ASK_TO_LOCALS_POPUP) : showTransitionModal()
  }, [trackEvent, showTransitionModal, app])

  return (
    <>
      <ButtonGroup horizontalGap={10}>
        {localName && localAddress ? (
          <Button
            basic
            color="gray"
            size="small"
            onClick={handleAskToLocalsClick}
          >
            {t('현지에서 길묻기')}
          </Button>
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

      {localName && localAddress ? (
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
