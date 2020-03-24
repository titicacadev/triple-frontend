import React from 'react'
import styled from 'styled-components'
import { Section, Container, List, Image, Text } from '@titicaca/core-elements'
import { H1, H3 } from '@titicaca/triple-document'
import {
  useHistoryContext,
  useEventTrackingContext,
} from '@titicaca/react-contexts'
import { useI18n } from '@titicaca/i18n'

const SocialReviewEntry = styled(List.Item)`
  cursor: pointer;
`

export interface SocialReview {
  imageUrl?: string
  publisher?: string
  title?: string
  url: string
}

export default function SocialReviews({
  socialReviews,
  ...props
}: {
  socialReviews?: SocialReview[]
} & Parameters<typeof Section>['0']) {
  const { trackSimpleEvent } = useEventTrackingContext()
  const { navigate } = useHistoryContext()
  const { t } = useI18n()

  if (!socialReviews) {
    return null
  }

  return (
    <Section anchor="external-links" {...props}>
      <H1>{t('common:externalLinks', '소셜 리뷰')}</H1>
      <List divided margin={{ top: 10 }}>
        {socialReviews.map(
          ({ imageUrl, publisher, title, url }: SocialReview, i) => (
            <SocialReviewEntry
              key={`external-link-${i}`}
              minHeight={106}
              onClick={() => {
                trackSimpleEvent({ action: '소셜리뷰선택' })
                navigate(url, { title })
              }}
            >
              <Container
                floated="right"
                width={60}
                margin={{ left: 20 }}
                padding={{ top: 20 }}
              >
                <Image src={imageUrl} frame="big" borderRadius={4} />
              </Container>
              <Container padding={{ top: 20 }}>
                <H3 maxLines={2}>{title}</H3>
                <Text size="small" alpha={0.5} margin={{ top: 8 }}>
                  {publisher}
                </Text>
              </Container>
            </SocialReviewEntry>
          ),
        )}
      </List>
    </Section>
  )
}
