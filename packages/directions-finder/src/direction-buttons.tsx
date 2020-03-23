import React, { useCallback } from 'react'
import {
  useHistoryContext,
  useUserAgentContext,
  useEventTrackingContext,
} from '@titicaca/react-contexts'
import { Button } from '@titicaca/core-elements'
import { useI18n } from '@titicaca/i18n'

import AskToTheLocal from './ask-to-the-local'
import { HASH_ASK_TO_LOCALS_POPUP } from './constants'

export default function DirectionButtons({
  onDirectionsClick,
  primaryName,
  localName,
  localAddress,
  phoneNumber,
}: {
  onDirectionsClick: () => void
  primaryName: string
  localName: string
  localAddress: string
  phoneNumber?: string
}) {
  const { t } = useI18n()
  const { isPublic } = useUserAgentContext()
  const { uriHash, push, back, showTransitionModal } = useHistoryContext()
  const { trackSimpleEvent } = useEventTrackingContext()

  const handleAskToLocalsClick = useCallback(() => {
    trackSimpleEvent({ action: '기본정보_현지에서길묻기' })

    isPublic ? showTransitionModal() : push(HASH_ASK_TO_LOCALS_POPUP)
  }, [trackSimpleEvent, push, showTransitionModal, isPublic])

  return (
    <>
      <Button.Group horizontalGap={10}>
        <Button
          basic
          color="gray"
          size="small"
          onClick={handleAskToLocalsClick}
        >
          {t('common:askToTheLocal', '현지에서 길묻기')}
        </Button>
        <Button
          basic
          inverted
          color="blue"
          size="small"
          onClick={onDirectionsClick}
        >
          {t('common:showDirections', '길찾기')}
        </Button>
      </Button.Group>
      <AskToTheLocal
        open={uriHash === HASH_ASK_TO_LOCALS_POPUP}
        onClose={back}
        localName={localName}
        localAddress={localAddress}
        primaryName={primaryName}
        phoneNumber={phoneNumber}
      />
    </>
  )
}
