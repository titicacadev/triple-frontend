import React from 'react'
import { ImageV2 } from '@titicaca/core-elements'
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
        <ImageV2 borderRadius={6}>
          <ImageV2.FixedRatioFrame frame="huge" onClick={handleClick}>
            <ImageV2.Img src={image && image.sizes.large.url} />

            <ImageV2.Overlay
              padding={{ top: 16, bottom: 16, left: 16, right: 26 }}
            >
              <H3 lineHeight="25px" color="white">
                {title}
              </H3>
            </ImageV2.Overlay>
          </ImageV2.FixedRatioFrame>
        </ImageV2>
      </div>
    </StaticIntersectionObserver>
  )
}
