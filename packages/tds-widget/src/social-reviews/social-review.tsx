import { useTranslation, useTrackEvent } from '@titicaca/triple-web'
import { Section } from '@titicaca/tds-ui'
import { useNavigate } from '@titicaca/router'

import { ExternalLinks } from './external-links'

export interface SocialReview {
  imageUrl?: string
  publisher?: string
  title?: string
  url: string
}

export type SocialReviewsProps = {
  placeholderImageUrl?: string
  socialReviews?: SocialReview[]
} & Parameters<typeof Section>['0']

export function SocialReviews({
  placeholderImageUrl,
  socialReviews,
  ...props
}: SocialReviewsProps) {
  const t = useTranslation()

  const trackEvent = useTrackEvent()
  const { navigate } = useNavigate()

  if (!socialReviews || socialReviews.length === 0) {
    return null
  }

  return (
    <ExternalLinks
      title={t('소셜 리뷰')}
      externalLinks={socialReviews.map(
        ({ imageUrl, publisher: meta, title, url }) => ({
          data: url,
          title,
          meta,
          imageUrl:
            imageUrl &&
            `/api/images/cast?url=${encodeURIComponent(
              imageUrl,
            )}&transformation=${encodeURIComponent(
              'c_fill,f_auto,q_auto,h_256,w_256',
            )}${
              placeholderImageUrl
                ? `&placeholder=${encodeURIComponent(placeholderImageUrl)}`
                : ''
            }`,
        }),
      )}
      onItemClick={(_, { data: url, title }) => {
        trackEvent({
          ga: ['소셜리뷰선택'],
          fa: { action: '소셜리뷰선택' },
        })

        navigate(url, { title })
      }}
      {...props}
    />
  )
}
