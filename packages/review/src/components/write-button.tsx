import styled from 'styled-components'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { TransitionType } from '@titicaca/modals'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { useCallback } from 'react'

import { useClientActions } from '../services'

const WriteIcon = styled.img`
  margin-top: -5px;
  width: 34px;
  height: 34px;
  float: right;
`

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
}

export const WriteButton = ({ resourceId, resourceType, regionId }: Props) => {
  const { trackEvent } = useEventTrackingContext()
  const { writeReview } = useClientActions()

  const handleClick = useAppCallback(
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
    <button onClick={handleClick}>
      <WriteIcon src="https://assets.triple.guide/images/btn-com-write@2x.png" />
    </button>
  )
}
