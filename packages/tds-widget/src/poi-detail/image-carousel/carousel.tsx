import { useState, useCallback, PropsWithChildren, MouseEvent } from 'react'
import styled from 'styled-components'
import { Container, Responsive } from '@titicaca/tds-ui'
import { useClientApp, useTrackEvent } from '@titicaca/triple-web'
import { GuestModeType, ImageMeta } from '@titicaca/type-definitions'

import {
  ImageCarousel,
  CarouselImageMeta,
  PageLabel,
} from '../../image-carousel'

import { CtaOverlay } from './cta-overlay'

const SHOW_CTA_FROM_INDEX = 5

const FixedRatioContainer = styled.div<{ ratio: number }>`
  padding-top: ${({ ratio }) => 100 * ratio}%;
  width: 100%;
`

const FixedRatioContent = styled.div<{ ratio: number }>`
  margin-top: -${({ ratio }) => 100 * ratio}%;
`

function FixedRatio({ ratio, children }: PropsWithChildren<{ ratio: number }>) {
  return (
    <FixedRatioContainer ratio={ratio}>
      <FixedRatioContent ratio={ratio}>{children}</FixedRatioContent>
    </FixedRatioContainer>
  )
}

export interface CarouselProps {
  images: CarouselImageMeta[]
  totalImagesCount: number
  onImageClick: (image: ImageMeta) => void
  onCtaClick: () => void
  onImagesFetch: () => void
  optimized?: boolean
  borderRadius?: number
  height?: number
  guestMode?: GuestModeType
}

export function Carousel({
  images,
  totalImagesCount,
  onImageClick,
  onCtaClick,
  onImagesFetch,
  optimized,
  borderRadius = 6,
  height,
  guestMode,
}: CarouselProps) {
  const app = useClientApp()
  const trackEvent = useTrackEvent()
  const [currentPage, setCurrentPage] = useState(0)
  const visibleImages = app
    ? images
    : images.slice(0, guestMode ? SHOW_CTA_FROM_INDEX : SHOW_CTA_FROM_INDEX + 1)

  const handleImageClick = useCallback(
    (event?: MouseEvent, media?: ImageMeta) => {
      if (!app && currentPage === SHOW_CTA_FROM_INDEX) {
        return onCtaClick()
      }

      onImageClick(images[currentPage])

      const action = '대표사진선택'
      const label = '선택'

      trackEvent({
        fa: {
          action,
          label,
          media_id: media?.id,
          type: media?.type === 'video' ? '비디오' : '이미지',
        },
      })
    },
    [app, currentPage, onImageClick, images, trackEvent, onCtaClick],
  )

  const handlePageChange = useCallback(
    ({ index }: { index: number }) => {
      if (index === currentPage) {
        return
      }

      setCurrentPage(index)

      if (!app && index === SHOW_CTA_FROM_INDEX) {
        trackEvent({
          ga: ['대표사진_앱에서더보기_노출'],
          fa: { action: '대표사진_앱에서더보기_노출' },
        })

        return
      }

      const currentImage = images[index]

      if (currentImage) {
        const { attachmentId, id, type } = currentImage
        const action = '대표사진선택'
        const label = `스와이프${attachmentId ? '_사용자등록' : ''}`

        trackEvent({
          fa: {
            action,
            label,
            ...(attachmentId ? { attachment_id: attachmentId } : {}),
            media_id: id,
            type: type === 'video' ? '비디오' : '이미지',
          },
          ga: ['대표사진_스와이프'],
        })
      }

      if (app && index > images.length - 5) {
        onImagesFetch()
      }
    },
    [setCurrentPage, currentPage, images, app, onImagesFetch, trackEvent],
  )

  const publicPageLabelRenderer = ({
    currentIndex,
  }: {
    currentIndex: number
  }) => {
    if (!totalImagesCount) {
      return null
    }

    if (guestMode || currentIndex !== SHOW_CTA_FROM_INDEX) {
      const totalCount =
        guestMode && totalImagesCount > SHOW_CTA_FROM_INDEX
          ? SHOW_CTA_FROM_INDEX
          : totalImagesCount

      return <PageLabel currentIndex={currentPage} totalCount={totalCount} />
    }

    return null
  }

  const ConditionalPageLabel = app ? undefined : publicPageLabelRenderer

  const CTA = ({ currentIndex }: { currentIndex: number }) =>
    !app && currentIndex === SHOW_CTA_FROM_INDEX ? <CtaOverlay /> : null

  return (
    <>
      <Responsive maxWidth={706}>
        <FixedRatio ratio={0.6}>
          <ImageCarousel
            images={visibleImages}
            displayedTotalCount={totalImagesCount}
            currentPage={currentPage}
            options={{
              height,
              optimized,
            }}
            showMoreRenderer={CTA}
            pageLabelRenderer={ConditionalPageLabel}
            onImageClick={handleImageClick}
            onMoveEnd={handlePageChange}
            css={{
              borderRadius,
            }}
          />
        </FixedRatio>
      </Responsive>
      <Responsive minWidth={707}>
        <Container
          css={{
            minHeight: 400,
          }}
        >
          <ImageCarousel
            images={visibleImages}
            displayedTotalCount={totalImagesCount}
            currentPage={currentPage}
            options={{
              size: 'large',
              optimized,
            }}
            onImageClick={handleImageClick}
            onMoveEnd={handlePageChange}
            showMoreRenderer={CTA}
            pageLabelRenderer={ConditionalPageLabel}
            css={{
              borderRadius,
            }}
          />
        </Container>
      </Responsive>
    </>
  )
}
