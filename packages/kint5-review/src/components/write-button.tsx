import { ButtonBase } from '@titicaca/kint5-core-elements'
import { TransitionType } from '@titicaca/modals'
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
      { triggeredEventAction: '리뷰_리뷰쓰기' },
    ),
  )

  return (
    <ButtonBase
      css={{
        marginLeft: 'auto',
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--color-kint5-brand1)',
        paddingRight: 14,
        backgroundImage:
          "url('https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-arrow-1-line-24.svg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
        backgroundSize: 12,
      }}
      onClick={handleClick}
    >
      {t(['ribyusseugi', '리뷰쓰기'])}
    </ButtonBase>
  )
}
