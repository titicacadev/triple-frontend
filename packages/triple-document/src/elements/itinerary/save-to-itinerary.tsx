import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useCallback } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { Text, Button } from '@titicaca/core-elements'

import useHandleAddPoisToTrip from '../itinerary/use-handle-add-pois-to-trip'

import { Download } from './icons'

export interface Geotag {
  type: 'triple-region' | 'triple-zone'
  id: string
}

const SaveToItineraryButton = styled(Button)`
  > * {
    vertical-align: middle;
  }
`

export default function SaveToItinerary({
  poiIds,
  geotag,
  disabled = false,
}: {
  poiIds: string[]
  geotag: Geotag
  disabled?: boolean
}) {
  const { trackEvent } = useEventTrackingContext()

  const { t } = useTranslation('common-web')

  const addPoisToTrip = useHandleAddPoisToTrip({
    geotag,
  })

  const handleSaveToItinerary = useCallback(() => {
    trackEvent({
      ga: ['내일정으로담기_선택'],
      fa: {
        action: '내일정으로담기_선택',
      },
    })
    if (geotag) {
      addPoisToTrip(poiIds)
    }
  }, [geotag, poiIds, addPoisToTrip, trackEvent])

  return (
    <SaveToItineraryButton
      fluid
      basic
      bold
      inverted
      margin={{ top: 20 }}
      onClick={handleSaveToItinerary}
      disabled={disabled}
    >
      <Download />
      <Text inline size={14} margin={{ left: 3 }} color="white">
        {t(['nae-iljeongeuro-damgi', '내 일정으로 담기'])}
      </Text>
    </SaveToItineraryButton>
  )
}
