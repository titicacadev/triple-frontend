import React from 'react'
import { FixedRatioImage } from '@titicaca/core-elements'
import { H3 } from '@titicaca/triple-document'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { ArticleListingData } from './types'

export default function ArticleEntry({
  article,
  article: {
    source: { title, image },
  },
  onClick,
  onIntersect,
}: {
  article: ArticleListingData
  onClick: (e: React.SyntheticEvent, article: ArticleListingData) => void
  onIntersect: (article: ArticleListingData) => void
}) {
  const handleClick = (e: React.SyntheticEvent) => onClick(e, article)
  const handleIntersectionChange = ({
    isIntersecting,
  }: {
    isIntersecting: boolean
  }) => isIntersecting && onIntersect(article)

  return (
    <StaticIntersectionObserver
      threshold={0.7}
      onChange={handleIntersectionChange}
    >
      <div>
        <FixedRatioImage
          src={image && image.sizes.large.url}
          frame="huge"
          borderRadius={6}
          overlay={
            <H3 lineHeight="25px" color="white">
              {title}
            </H3>
          }
          overlayPadding={{ top: 16, bottom: 16, left: 16, right: 26 }}
          onClick={handleClick}
        />
      </div>
    </StaticIntersectionObserver>
  )
}
