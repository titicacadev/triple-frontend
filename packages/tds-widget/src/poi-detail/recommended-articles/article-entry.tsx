import { SyntheticEvent } from 'react'
import { Image, H3 } from '@titicaca/tds-ui'
import { InView } from 'react-intersection-observer'

import { ArticleListingData } from './types'

export function ArticleEntry({
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
  const handleIntersectionChange = (inView: boolean) =>
    inView && onIntersect(article)

  return (
    <InView threshold={0.7} onChange={handleIntersectionChange}>
      <Image borderRadius={6}>
        <Image.FixedRatioFrame frame="big" onClick={handleClick}>
          <Image.Img src={image && image.sizes.large.url} />

          <Image.Overlay padding={{ top: 16, bottom: 16, left: 16, right: 26 }}>
            <H3 lineHeight="25px" color="white">
              {title}
            </H3>
          </Image.Overlay>
        </Image.FixedRatioFrame>
      </Image>
    </InView>
  )
}
