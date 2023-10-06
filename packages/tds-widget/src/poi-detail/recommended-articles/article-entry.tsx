import { SyntheticEvent } from 'react'
import { Image, H3 } from '@titicaca/core-elements'
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
  onClick: (e: SyntheticEvent, article: ArticleListingData) => void
  onIntersect: (article: ArticleListingData) => void
}) {
  const handleClick = (e: SyntheticEvent) => onClick(e, article)
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
        <Image borderRadius={6}>
          <Image.FixedRatioFrame frame="big" onClick={handleClick}>
            <Image.Img src={image && image.sizes.large.url} />

            <Image.Overlay
              padding={{ top: 16, bottom: 16, left: 16, right: 26 }}
            >
              <H3 lineHeight="25px" color="white">
                {title}
              </H3>
            </Image.Overlay>
          </Image.FixedRatioFrame>
        </Image>
      </div>
    </StaticIntersectionObserver>
  )
}
