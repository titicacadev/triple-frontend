import { ButtonBase } from '@titicaca/core-elements'
import { TransitionType } from '@titicaca/modals'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { useCallback } from 'react'
import styled from 'styled-components'

import { useClientActions } from '../services'

const WriteIcon = styled.img`
  width: 34px;
  height: 34px;
`

const StyledButtonBase = styled(ButtonBase)`
  margin-left: auto;
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
    <StyledButtonBase onClick={handleClick}>
      <WriteIcon src="https://assets.triple.guide/images/btn-com-write@2x.png" />
    </StyledButtonBase>
  )
}
