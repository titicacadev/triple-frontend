import { ButtonBase } from '@titicaca/tds-ui'
import {
  useTrackEvent,
  TransitionType,
  useClientAppCallback,
  useSessionCallback,
} from '@titicaca/triple-web'
import { useCallback } from 'react'
import styled from 'styled-components'

import { useClientActions } from '../services'

const WriteIcon = styled.img`
  width: 34px;
  height: 34px;
`

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
}

export const WriteButton = ({ resourceId, resourceType, regionId }: Props) => {
  const trackEvent = useTrackEvent()
  const { writeReview } = useClientActions()

  const handleClick = useClientAppCallback(
    TransitionType.ReviewWrite,
    useSessionCallback(
      useCallback(() => {
        trackEvent({
          ga: ['리뷰_리뷰쓰기'],
          fa: {
            action: '리뷰_리뷰쓰기',
            item_id: resourceId,
          },
        })

        writeReview({
          resourceType,
          resourceId,
          regionId,
        })
      }, [trackEvent, resourceId, writeReview, resourceType, regionId]),
      { triggeredEventAction: '리뷰_리뷰쓰기' },
    ),
  )

  return (
    <ButtonBase css={{ marginLeft: 'auto' }} onClick={handleClick}>
      <WriteIcon src="https://assets.triple.guide/images/btn-com-write@2x.png" />
    </ButtonBase>
  )
}
