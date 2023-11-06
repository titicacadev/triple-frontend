import styled, { css } from 'styled-components'
import {
  FlagIcon,
  Responsive,
  SpoonAndForkIcon,
} from '@titicaca/kint5-core-elements'

import { CarouselSectionProps } from './carousel-section'

const ImagePlaceholderContainer = styled.div<{ large?: boolean }>`
  width: 100%;
  overflow: hidden;
  border-radius: 6px;
  background-color: #efefef;
  ${({ large }) =>
    large
      ? css`
          height: 400px;
        `
      : css`
          padding-top: 60%;
        `};
`

const ImagePlaceholderContent = styled.div<{ large?: boolean }>`
  text-align: center;
  transform: translate(0, -50%);
  ${({ large }) =>
    large
      ? css`
          margin-top: 200px;
        `
      : css`
          margin-top: -30%;
        `};
`

interface ImagePlaceholderProps extends Pick<CarouselSectionProps, 'poiType'> {
  large?: boolean
  noContent?: boolean
  onClick: () => void
}

function PlaceholderIcon({ poiType }: Pick<ImagePlaceholderProps, 'poiType'>) {
  return (
    <>
      {poiType === 'attraction' ? (
        <FlagIcon width={60} height={60} />
      ) : (
        <SpoonAndForkIcon width={60} height={60} />
      )}
    </>
  )
}

function ImagePlaceholder({
  large,
  noContent,
  poiType,
  onClick,
}: ImagePlaceholderProps) {
  return (
    <ImagePlaceholderContainer large={large} onClick={onClick}>
      <ImagePlaceholderContent large={large}>
        {noContent ? null : <PlaceholderIcon poiType={poiType} />}
      </ImagePlaceholderContent>
    </ImagePlaceholderContainer>
  )
}

interface ResponsiveImagePlaceholderProps
  extends Pick<CarouselSectionProps, 'poiType'> {
  onClick: () => void
  noContent?: boolean
}

export default function ResponsiveImagePlaceholder({
  noContent,
  poiType,
  onClick,
}: ResponsiveImagePlaceholderProps) {
  return (
    <>
      <Responsive maxWidth={706}>
        <ImagePlaceholder
          noContent={noContent}
          poiType={poiType}
          onClick={onClick}
        />
      </Responsive>
      <Responsive minWidth={707}>
        <ImagePlaceholder
          large
          noContent={noContent}
          poiType={poiType}
          onClick={onClick}
        />
      </Responsive>
    </>
  )
}
