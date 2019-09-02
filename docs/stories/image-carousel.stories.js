import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ImagePager } from '@titicaca/image-carousel'

import IMAGES from './image-carousel.sample.json'

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
      onImageClick={action('image-click')}
      onBeforePageChange={action('before-page-change')}
      onPageMove={action('page-move')}
      onPageChange={action('page-change')}
      ImageSource={({ children }) =>
        `출처 ${children.replace(/^https?:\/\//, '')}`
      }
      lastPageOverlayContent={<OverlayContent />}
    ></ImagePager>
  )
})
