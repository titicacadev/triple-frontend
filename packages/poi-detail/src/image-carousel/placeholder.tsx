import { useTranslation } from '@titicaca/next-i18next'
import styled, { css } from 'styled-components'
import { Text, Responsive } from '@titicaca/core-elements'

import { PoiType } from './carousel-section'

const DEFAULT_ICON_URLS: Record<PoiType, string> = {
  attraction: 'https://assets.triple.guide/images/seoulcon/default/ic_spot.svg',
  hotel: 'https://assets.triple.guide/images/seoulcon/default/ic_hotel.svg',
  restaurant:
    'https://assets.triple.guide/images/seoulcon/default/ic_restaurant.svg',
}

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

const PlaceholderIcon = styled.img`
  width: 60px;
  height: 60px;
  vertical-align: baseline;
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

interface ImagePlaceholderProps {
  large?: boolean
  noContent?: boolean
  guestMode?: boolean
  type?: PoiType
  onClick: () => void
}

function ImagePlaceholder({
  large,
  noContent,
  guestMode,
  type,
  onClick,
}: ImagePlaceholderProps) {
  const { t } = useTranslation('common-web')

  return (
    <ImagePlaceholderContainer large={large} onClick={onClick}>
      <ImagePlaceholderContent large={large}>
        {noContent ? null : guestMode ? (
          <PlaceholderIcon
            src={DEFAULT_ICON_URLS[type || 'attraction']}
            css={{ opacity: 0.3 }}
          />
        ) : (
          <>
            <PlaceholderIcon src="https://assets.triple.guide/images/img-empty-photo-m@4x.png" />
            <Text size="small" color="gray" alpha={0.3}>
              {t([
                'igosyi-ceos-beonjjae-sajineul-olryeojuseyo.',
                '이곳의 첫 번째 사진을 올려주세요.',
              ])}
            </Text>
          </>
        )}
      </ImagePlaceholderContent>
    </ImagePlaceholderContainer>
  )
}

export default function ResponsiveImagePlaceholder({
  noContent,
  guestMode,
  type,
  onClick,
}: Omit<ImagePlaceholderProps, 'large'>) {
  return (
    <>
      <Responsive maxWidth={706}>
        <ImagePlaceholder
          noContent={noContent}
          guestMode={guestMode}
          type={type}
          onClick={onClick}
        />
      </Responsive>
      <Responsive minWidth={707}>
        <ImagePlaceholder
          noContent={noContent}
          guestMode={guestMode}
          type={type}
          large
          onClick={onClick}
        />
      </Responsive>
    </>
  )
}
