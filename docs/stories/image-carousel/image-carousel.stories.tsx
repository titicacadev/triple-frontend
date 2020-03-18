import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ImageCarousel, { PageLabel } from '@titicaca/image-carousel'

import IMAGES from '../__mocks__/image-carousel.sample.json'

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
    <MoreImageOverlayLink href="https://triple.guide">
      트리플 앱에서 더보기
      <MoreImageOverlayLinkIcon
        src={'https://assets.triple.guide/images/ico-arrow@4x.png'}
      />
    </MoreImageOverlayLink>
  )
}

storiesOf('image-carousel | Image Carousel', module).add('일반', () => {
  return (
    <ImageCarousel
      size="medium"
      images={IMAGES}
      currentPage={0}
      borderRadius={6}
      onImageClick={action('image-click')}
      onMoveStart={action('move-start')}
      onMove={action('move')}
      onMoveEnd={action('move-end')}
      ImageSource={({ children }) =>
        `출처 ${(children || '').replace(/^https?:\/\//, '')}`
      }
      showMoreRenderer={({ currentIndex, totalCount }) => {
        const result =
          totalCount > 5 && currentIndex === totalCount - 1 ? (
            <OverlayContent />
          ) : null
        return result
      }}
      pageLabelRenderer={({ currentIndex, totalCount }) =>
        totalCount <= 5 || currentIndex < totalCount - 1 ? (
          <PageLabel currentIndex={currentIndex} totalCount={totalCount} />
        ) : null
      }
    ></ImageCarousel>
  )
})
