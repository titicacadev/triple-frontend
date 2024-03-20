import {
  ButtonBase,
  CaretRightIcon,
  FlexBox,
} from '@titicaca/kint5-core-elements'
import { TransitionType } from '@titicaca/kint5-modals'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { useCallback } from 'react'
import { useTranslation } from '@titicaca/next-i18next'

import { useClientActions } from '../services'

import { useReviewLanguage } from './language-context'

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
}

export const WriteButton = ({ resourceId, resourceType, regionId }: Props) => {
  const { t } = useTranslation('common-web')
  const { reviewLang } = useReviewLanguage()
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
          lang: reviewLang,
        })
      }, [
        trackEvent,
        resourceId,
        writeReview,
        resourceType,
        regionId,
        reviewLang,
      ]),
      { triggeredEventAction: '리뷰_리뷰쓰기', skipTransitionModal: true },
    ),
  )

  return (
    <FlexBox
      flex
      css={{
        alignItems: 'center',
        gap: 2,
        marginLeft: 'auto',
      }}
    >
      <ButtonBase
        css={{
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--color-kint5-brand1)',
        }}
        onClick={handleClick}
      >
        {t(['ribyusseugi', '리뷰쓰기'])}
      </ButtonBase>
      <CaretRightIcon color="#7743EE" width={12} height={12} />
    </FlexBox>
  )
}
