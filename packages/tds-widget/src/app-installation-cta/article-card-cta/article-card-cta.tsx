import { useCallback } from 'react'
import { Image } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'
import { InventoryItemMeta } from '@titicaca/type-definitions'

export default function ArticleCardCta({
  href,
  cta,
  onClick,
}: {
  href?: string
  cta: InventoryItemMeta | null
  onClick?: () => void
}) {
  const { trackEvent } = useEventTrackingContext()

  const handleCtaIntersect = useCallback(() => {
    trackEvent({
      ga: ['앱설치 유도 구좌_노출', cta?.desc || ''],
    })
  }, [cta, trackEvent])

  const handleCtaClick = useCallback(() => {
    trackEvent({
      ga: ['앱설치 유도 구좌_선택', cta?.desc || ''],
    })
    onClick && onClick()
  }, [cta, onClick, trackEvent])

  const handleIntersectionChange = ({
    isIntersecting,
  }: {
    isIntersecting: boolean
  }) => isIntersecting && handleCtaIntersect()

  return (
    <StaticIntersectionObserver
      threshold={0.7}
      onChange={handleIntersectionChange}
    >
      <a href={href}>
        <Image borderRadius={6}>
          <Image.FixedRatioFrame frame="big" onClick={handleCtaClick}>
            <Image.Img src={cta?.image} />
          </Image.FixedRatioFrame>
        </Image>
      </a>
    </StaticIntersectionObserver>
  )
}
