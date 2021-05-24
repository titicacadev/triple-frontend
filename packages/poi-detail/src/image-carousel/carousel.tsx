import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import ImageCarousel, {
  PageLabel,
  CarouselImageMeta,
} from '@titicaca/image-carousel'
import { Container, Responsive, ImageSource } from '@titicaca/core-elements'
import {
  useUserAgentContext,
  useEventTrackingContext,
} from '@titicaca/react-contexts'
import { ImageMeta } from '@titicaca/type-definitions'

import CtaOverlay from './cta-overlay'

const SHOW_CTA_FROM_INDEX = 5

const FixedRatioContainer = styled.div<{ ratio: number }>`
  padding-top: ${({ ratio }) => 100 * ratio}%;
  width: 100%;
`

const FixedRatioContent = styled.div<{ ratio: number }>`
  margin-top: -${({ ratio }) => 100 * ratio}%;
`

function FixedRatio({
  ratio,
  children,
}: React.PropsWithChildren<{ ratio: number }>) {
  return (
    <FixedRatioContainer ratio={ratio}>
      <FixedRatioContent ratio={ratio}>{children}</FixedRatioContent>
    </FixedRatioContainer>
  )
}

export default function Carousel({
  images,
  totalImagesCount,
  onImageClick,
  onCTAClick,
  onImagesFetch,
  optimized,
  borderRadius = 6,
}: {
  images: CarouselImageMeta[]
  totalImagesCount: number
  onImageClick: (image: ImageMeta) => void
  onCTAClick: () => void
  onImagesFetch: () => void
  optimized?: boolean
  borderRadius?: number
}) {
  const { isPublic } = useUserAgentContext()
  const { trackEvent, trackSimpleEvent } = useEventTrackingContext()
  const [currentPage, setCurrentPage] = useState(0)
  const visibleImages = isPublic
    ? images.slice(0, SHOW_CTA_FROM_INDEX + 1)
    : images

  const handleImageClick = useCallback(() => {
    if (isPublic && currentPage === SHOW_CTA_FROM_INDEX) {
      return onCTAClick()
    }

    onImageClick(images[currentPage])
  }, [onImageClick, onCTAClick, images, currentPage, isPublic])

  const handlePageChange = useCallback(
    ({ index }) => {
      if (index === currentPage) {
        return
      }

      setCurrentPage(index)

      if (isPublic && index === SHOW_CTA_FROM_INDEX) {
        return trackSimpleEvent({ action: '대표사진_앱에서더보기_노출' })
      }

      const currentImage = images[index]

      if (currentImage) {
        const { attachmentId } = currentImage
        const action = '대표사진선택'
        const label = `스와이프${attachmentId ? `_사용자등록` : ''}`

        trackEvent({
          fa: {
            action,
            label,
            ...(attachmentId ? { attachment_id: attachmentId } : {}),
          },
          ga: ['대표사진_스와이프'],
        })
      }

      if (!isPublic && index > images.length - 5) {
        onImagesFetch()
      }
    },
    [
      setCurrentPage,
      currentPage,
      images,
      isPublic,
      onImagesFetch,
      trackEvent,
      trackSimpleEvent,
    ],
  )

  const ConditionalPageLabel = isPublic
    ? ({ currentIndex }: { currentIndex: number }) =>
        !totalImagesCount || currentIndex === SHOW_CTA_FROM_INDEX ? null : (
          <PageLabel currentIndex={currentPage} totalCount={totalImagesCount} />
        )
    : undefined

  const CTA = ({ currentIndex }: { currentIndex: number }) =>
    isPublic && currentIndex === SHOW_CTA_FROM_INDEX ? <CtaOverlay /> : null

  return (
    <>
      <Responsive maxWidth={706}>
        <FixedRatio ratio={0.6}>
          <ImageCarousel
            images={visibleImages}
            currentPage={currentPage}
            displayedTotalCount={totalImagesCount}
            borderRadius={borderRadius}
            onImageClick={handleImageClick}
            onMoveEnd={handlePageChange}
            ImageSource={ImageSource}
            showMoreRenderer={CTA}
            pageLabelRenderer={ConditionalPageLabel}
            optimized={optimized}
          />
        </FixedRatio>
      </Responsive>
      <Responsive minWidth={707}>
        <Container minHeight={400}>
          <ImageCarousel
            images={visibleImages}
            currentPage={currentPage}
            displayedTotalCount={totalImagesCount}
            borderRadius={borderRadius}
            size="large"
            onImageClick={handleImageClick}
            onMoveEnd={handlePageChange}
            ImageSource={ImageSource}
            showMoreRenderer={CTA}
            pageLabelRenderer={ConditionalPageLabel}
            optimized={optimized}
          />
        </Container>
      </Responsive>
    </>
  )
}
