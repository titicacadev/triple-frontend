import { styled } from 'styled-components'

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

export function CtaOverlay() {
  return (
    <MoreImageOverlayLink>
      더 많은 이미지 보기
      <MoreImageOverlayLinkIcon src="https://assets.triple.guide/images/ico-arrow@4x.png" />
    </MoreImageOverlayLink>
  )
}
