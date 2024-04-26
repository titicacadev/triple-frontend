import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Button, Text } from '@titicaca/tds-ui'
import { useTrackEvent } from '@titicaca/triple-web'

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
  itemIds,
  geotag,
  disabled = false,
}: {
  itemIds: string[]
  geotag: Geotag
  disabled?: boolean
}) {
  const trackEvent = useTrackEvent()

  const { t } = useTranslation('triple-frontend')

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
      addPoisToTrip(itemIds)
    }
  }, [geotag, itemIds, addPoisToTrip, trackEvent])

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
        {t('내 일정으로 담기')}
      </Text>
    </SaveToItineraryButton>
  )
}
