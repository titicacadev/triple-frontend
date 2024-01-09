import { useCallback } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import {
  useEventTrackingContext,
  useHistoryFunctions,
  useUriHash,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { Button, FlexBox } from '@titicaca/kint5-core-elements'

import AskToTheLocal from './ask-to-the-local'
import { HASH_ASK_TO_LOCALS_POPUP } from './constants'

function DirectionButtons({
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
      >
        {localName && localAddress ? (
          <Button
            onClick={handleAskToLocalsClick}
            css={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--color-kint5-brand1)',
              background: 'none',
              margin: '0 0 20px 0',
              padding: '0 12px 0 0',
              backgroundImage:
                "url('https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-arrow-1-line-24.svg')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              backgroundSize: '12px 12px',
            }}
          >
            {t(['hyeonjieseo-gilmudgi', '현지에서 길묻기'])}
          </Button>
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
          {t(['gilcajgi', '길찾기'])}
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
