import { StaticIntersectionObserver } from '@titicaca/intersection-observer'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import styled from 'styled-components'

const MoreImageOverlayLink = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  color: white;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  text-decoration: none;
  font-size: 16px;
`

const MoreImageOverlayLinkIcon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: sub;
`

export default function CtaOverlay() {
  const { trackEvent } = useEventTrackingContext()
  return (
    <StaticIntersectionObserver
      onChange={({ isIntersecting }) => {
        if (isIntersecting) {
          trackEvent({ fa: { action: '대표사진_더보기_노출' } })
        }
      }}
    >
      <MoreImageOverlayLink>
        더 많은 이미지 보기
        <MoreImageOverlayLinkIcon src="https://assets.triple.guide/images/ico-arrow@4x.png" />
      </MoreImageOverlayLink>
    </StaticIntersectionObserver>
  )
}
