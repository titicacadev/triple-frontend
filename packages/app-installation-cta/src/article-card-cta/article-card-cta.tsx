import React, { useCallback } from 'react'
import { Image } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { InventoryItem } from '../interfaces'

export default function ArticleCardCTA({
  href,
  cta,
  onClick,
}: {
  href?: string
  cta?: InventoryItem | null
  onClick?: () => void
}) {
  const { trackEvent } = useEventTrackingContext()

  const handleCTAIntersect = useCallback(() => {
    trackEvent({
      ga: ['앱설치 유도 구좌_노출', cta?.detailedDesc],
    })
  }, [cta, trackEvent])

  const handleCTAClick = useCallback(() => {
    trackEvent({
      ga: ['앱설치 유도 구좌_선택', cta?.desc],
    })
    onClick && onClick()
  }, [cta, onClick, trackEvent])

  const handleIntersectionChange = ({
    isIntersecting,
  }: {
    isIntersecting: boolean
  }) => isIntersecting && handleCTAIntersect()

  return (
    <StaticIntersectionObserver
      threshold={0.7}
      onChange={handleIntersectionChange}
    >
      <a href={href}>
        <Image borderRadius={6}>
          <Image.FixedRatioFrame frame="huge" onClick={handleCTAClick}>
            <Image.Img src={cta?.image} />
          </Image.FixedRatioFrame>
        </Image>
      </a>
    </StaticIntersectionObserver>
  )
}
