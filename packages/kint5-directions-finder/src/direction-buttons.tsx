import { useCallback } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import {
  useEventTrackingContext,
  useHistoryFunctions,
  useUriHash,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { Button, CaretRightIcon, FlexBox } from '@titicaca/kint5-core-elements'

import AskToTheLocal from './ask-to-the-local'
import { HASH_ASK_TO_LOCALS_POPUP } from './constants'

function DirectionButtons({
  onDirectionsClick,
  primaryName,
  localName,
  localAddress,
  phoneNumber,
  isDomestic = false,
  ...props
}: {
  onDirectionsClick: () => void
  primaryName: string
  localName?: string
  localAddress?: string
  phoneNumber?: string
  isDomestic?: boolean
}) {
  const { t } = useTranslation('common-web')

  const app = useTripleClientMetadata()
  const uriHash = useUriHash()
  const { push, back, showTransitionModal } = useHistoryFunctions()
  const { trackSimpleEvent } = useEventTrackingContext()

  const handleAskToLocalsClick = useCallback(() => {
    trackSimpleEvent({ action: '기본정보_현지에서길묻기' })

    app ? push(HASH_ASK_TO_LOCALS_POPUP) : showTransitionModal()
  }, [trackSimpleEvent, push, showTransitionModal, app])

  return (
    <>
      <FlexBox
        flex
        css={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          margin: '0 16px',
        }}
        {...props}
      >
        {localName && localAddress ? (
          <button
            onClick={handleAskToLocalsClick}
            css={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--color-kint5-brand1)',
              background: 'none',
              marginBottom: 20,
            }}
          >
            {t(['hyeonjieseo-gilmudgi', '현지에서 길묻기'])}
            <CaretRightIcon color="#7743EE" width={12} height={12} />
          </button>
        ) : null}
        <Button
          onClick={onDirectionsClick}
          css={{
            width: '100%',
            fontSize: 14,
            fontWeight: 700,
            backgroundColor: 'var(--color-kint5-brand1)',
            color: 'var(--color-kint5-gray0)',
            borderRadius: 28,
            padding: '16px 0',
            textAlign: 'center',
          }}
        >
          {t('길안내')}
        </Button>
      </FlexBox>

      {localName && localAddress ? (
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

export default DirectionButtons
