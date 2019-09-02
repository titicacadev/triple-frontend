import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import IMAGES from './image-carousel.sample.json'
import { ImagePager } from '@titicaca/image-carousel'

const MoreImageOverlayLink = styled.a`
  width: 100%;
  text-align: center;
  color: white;
  vertical-align: middle;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  text-decoration: none;
`

const MoreImageOverlayLinkIcon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: sub;
`
const OverlayContent = () => {
  return (
    <MoreImageOverlayLink>
      트리플 앱에서 더보기
      <MoreImageOverlayLinkIcon
        src={'https://assets.triple.guide/images/ico-arrow@4x.png'}
      />
    </MoreImageOverlayLink>
  )
}

storiesOf('ImagePager', module).add('일반', () => {
  return (
    <ImagePager
      size="medium"
      images={IMAGES}
      currentPage={0}
      borderRadius={6}
      onImageClick={(e) => {
        console.log(e)
      }}
      onBeforePageChange={(e) => {
        console.log(
          `onBeforePageChange: index(${e.index}), direction(${e.direction})`,
        )
      }}
      onPageMove={(e) => {
        console.log(`onPageMove: index(${e.index}), direction(${e.direction})`)
      }}
      onPageChange={(e) => {
        console.log(
          `onPageChange: index(${e.index}), direction(${e.direction})`,
        )
      }}
      ImageSource={({ children }) =>
        `출처 ${children.replace(/^https?:\/\//, '')}`
      }
      lastPageOverlayContent={<OverlayContent />}
    ></ImagePager>
  )
})
