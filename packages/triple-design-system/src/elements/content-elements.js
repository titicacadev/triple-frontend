import React from 'react'
import styled from 'styled-components'
import PagerCarousel from 'nuka-carousel'
import List from './list'

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #3a3a3a;
  font-family: sans-serif;
  margin: 40px 30px;
`

const IMAGE_HEIGHT_OPTIONS = {
  small: '200px',
}

const ImageFrameContent = ({ imageUrl, sourceUrl, ImageSource }) => (
  <>
    <Image src={imageUrl} />
    {sourceUrl && (
      <SourceUrl>
        {ImageSource ? <ImageSource>{sourceUrl}</ImageSource> : sourceUrl}
      </SourceUrl>
    )}
  </>
)

export function ImageFrame({
  image: { height, frame, sizes, sourceUrl },
  ratio,
  ImageSource,
  onClick,
}) {
  if (ratio || frame) {
    return (
      <ImageFrameWithFixedRatio ratio={ratio} frame={frame} onClick={onClick}>
        <ImageFrameContent
          imageUrl={sizes.large.url}
          sourceUrl={sourceUrl}
          ImageSource={ImageSource}
        />
      </ImageFrameWithFixedRatio>
    )
  }

  return (
    <ImageFrameWithFixedHeight
      height={IMAGE_HEIGHT_OPTIONS[height || 'small']}
      onClick={onClick}
    >
      <ImageFrameContent
        imageUrl={sizes.large.url}
        sourceUrl={sourceUrl}
        ImageSource={ImageSource}
      />
    </ImageFrameWithFixedHeight>
  )
}

const ImageFrameBase = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const ImageFrameWithFixedHeight = styled(ImageFrameBase)`
  height: ${({ height }) => height};
`

const ImageFrameWithFixedRatio = styled(ImageFrameBase)`
  padding-top: ${({ ratio, frame }) => {
    if (ratio) {
      return `${(100 * 1) / (ratio || 1)}%`
    }

    return {
      small: '60%',
      medium: '75%',
      large: '100%',
    }[frame || 'small']
  }};
`

export const Image = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
`

export const SourceUrl = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: sans-serif;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.9);
`

export const ImageCarousel = styled.div`
  margin-top: 30px;
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const ImageCarouselElementContainer = styled.div`
  display: inline-block;
  width: calc(100% - 60px);

  margin-left: 15px;

  &:first-child {
    margin-left: 30px;
  }
  &:last-child {
    margin-right: 30px;
  }
`

export const ImageCaption = styled.div`
  margin-top: 8px;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: rgba(58, 58, 58, 0.7);
`

export const Carousel = styled.div`
  margin-top: 20px;
  padding-right: 30px;
  padding-bottom: 10px;
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const CarouselElementContainer = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ size }) =>
    ({ small: '140px', medium: '270px' }[size || 'small'])};
  font-family: sans-serif;
  vertical-align: top;
  white-space: normal;

  margin-left: ${({ size }) =>
    ({ small: '10px', medium: '15px' }[size || 'small'])};

  &:first-child {
    margin-left: 30px;
  }
`

export const HR1 = styled.div`
  margin: 50px 30px;
  height: 1px;
  background-color: #efefef;
`

export const HR2 = styled.div`
  margin: 50px 0;
  height: 10px;
  background-color: #efefef;
`

export const HR3 = styled.div`
  margin: 0;
  height: 10px;
  background-color: transparent;
`

const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  float: left;
  background-color: #efefef;
  border-radius: 2px;
`

const RoundThumbnail = styled.img`
  width: 40px;
  height: 40px;
  float: left;
  background-color: #efefef;
  border-radius: 20px;
`

const ListLabel = styled.div`
  float: left;
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
  text-align: left center;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #3a3a3a;
`

const ListHeader = styled.div`
  line-height: 19px;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #3a3a3a;
  margin-left: 50px;
  margin-right: ${({ priced }) => (priced ? 80 : 34)}px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ListDescription = styled.div`
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(58, 58, 58, 0.7);
  margin-top: 4px;
  margin-left: 50px;
`

const PoiListScrapButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: 34px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-list-on@2x.png' : 'btn-content-scrap-list-off@2x.png')});
  background-size: 34px 34px;
`

const PoiPrice = styled.div`
  position: absolute;
  top: 3px;
  right: 0;
  width: 80px;
  padding-top: 8px;
  padding-bottom: 7px;
  text-align: center;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #3a3a3a;
  border-radius: 17px;
  background-color: #fafafa;
`

function PoiType({ children }) {
  return { attraction: '관광명소', restaurant: '음식점', hotel: '호텔' }[
    children
  ]
}

function PoiListContent({ value, onScrapedChange }) {
  const {
    type,
    nameOverride,
    source: { names, pricing },
    scraped,
  } = value

  if (pricing) {
    return (
      <>
        <ListHeader priced>
          {nameOverride || names.ko || names.en || names.local}
        </ListHeader>
        <ListDescription>
          <PoiType>{type}</PoiType>
        </ListDescription>
        <PoiPrice>
          {pricing.nightlyPrice
            ? `₩${pricing.nightlyPrice.toLocaleString()}`
            : '보기'}
        </PoiPrice>
      </>
    )
  }

  return (
    <>
      <ListHeader>
        {nameOverride || names.ko || names.en || names.local}
      </ListHeader>
      <ListDescription>
        <PoiType>{type}</PoiType>
      </ListDescription>
      <PoiListScrapButton
        pressed={scraped}
        onClick={
          onScrapedChange &&
          ((e) => {
            e.stopPropagation()
            onScrapedChange(e, { ...value, scraped: !scraped })
          })
        }
      />
    </>
  )
}

export const ResourceList = styled(List)`
  margin: 20px 30px 0 30px;
`

const ResourceListItem = styled(List.Item)`
  height: 40px;
  margin: 20px 0;
`

export function PoiListElement({ value, onClick, onScrapedChange }) {
  const {
    source: { image },
  } = value

  if (value) {
    return (
      <ResourceListItem onClick={onClick}>
        <Thumbnail src={image && image.sizes.large.url} />
        <PoiListContent value={value} onScrapedChange={onScrapedChange} />
      </ResourceListItem>
    )
  }

  return null
}

export const SquareImage = styled.img`
  width: ${({ size }) =>
    ({ small: '140px', medium: '200px' }[size || 'small'])};
  height: ${({ size }) =>
    ({ small: '140px', medium: '200px' }[size || 'small'])};
  background-color: #efefef;
  border-radius: 6px;
  object-fit: cover;
`

export const FluidSquareImage = styled.div`
  position: relative;
  width: 100%;
  background-color: #efefef;
  padding-bottom: 100%;
  height: 0;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center center;
`

const PoiCarouselName = styled.div`
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #3a3a3a;
  margin-top: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const PoiCarouselDescription = styled.div`
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(58, 58, 58, 0.7);
  margin-top: 2px;
`

const PoiCarouselScrapButton = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 36px;
  height: 36px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-overlay-on@2x.png' : 'btn-content-scrap-overlay-off@2x.png')});
  background-size: 36px 36px;
`

export function PoiCarouselElement({ value, onClick, onScrapedChange }) {
  if (value) {
    const {
      type,
      nameOverride,
      source: { image, names },
      scraped,
    } = value

    return (
      <CarouselElementContainer size="small" onClick={onClick}>
        <SquareImage size="small" src={image && image.sizes.large.url} />
        <PoiCarouselName>
          {nameOverride || names.ko || names.en || names.local}
        </PoiCarouselName>
        <PoiCarouselDescription>
          <PoiType>{type}</PoiType>
        </PoiCarouselDescription>
        <PoiCarouselScrapButton
          pressed={scraped}
          onClick={
            onScrapedChange &&
            ((e) => {
              e.stopPropagation()
              onScrapedChange(e, { ...value, scraped: !scraped })
            })
          }
        />
      </CarouselElementContainer>
    )
  }

  return null
}

export const SimpleLink = styled.a`
  font-family: sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #2987f0;
  text-decoration: underline;
`

export const Segment = styled.div`
  margin: 20px 30px 0 30px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fafafa;
`

const CurrentPage = styled.div`
  margin: 10px;
  padding: 5px 7px;
  font-size: 11px;
  line-height: 11px;
  font-weight: bold;
  color: #ffffff;
  border-radius: 11px;
  background-color: rgba(0, 0, 0, 0.2);
`

const ImagePagerContainer = styled.div``

export function ImagePager({ images, onImageClick, ImageSource }) {
  return (
    <ImagePagerContainer>
      <PagerCarousel
        renderTopRightControls={({ currentSlide }) => (
          <CurrentPage>{`${currentSlide + 1} / ${images.length}`}</CurrentPage>
        )}
        renderBottomCenterControls={null}
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
      >
        {images.map((image, i) => (
          <ImageFrame
            key={i}
            image={image}
            ImageSource={ImageSource}
            onClick={onImageClick && ((e) => onImageClick(e, image))}
          />
        ))}
      </PagerCarousel>
    </ImagePagerContainer>
  )
}

const LabelContent = styled.div`
  display: inline;

  * {
    vertical-align: middle;
  }
`

export function Label({ children }) {
  return <LabelContent>{children}</LabelContent>
}

const RatingStar = styled.span`
  width: 16px;
  height: 16px;
  display: inline-block;
  background-size: 16px 16px;
  background-image: url(http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/${({
      full,
      half,
    }) => {
      if (full) {
        return 'img-review-star-full@2x.png'
      } else if (half) {
        return 'img-review-star-half@2x.png'
      }

      return 'img-review-star-empty@2x.png'
    }});
`

export function Rating({ score }) {
  const full = Math.floor(score)
  const half = Math.floor((score - full) * 2)
  const empty = 5 - full - half

  return (
    <>
      {[...Array(full)].map((_, i) => (
        <RatingStar key={`full-${i}`} full />
      ))}
      {[...Array(half)].map((_, i) => (
        <RatingStar key={`half-${i}`} half />
      ))}
      {[...Array(empty)].map((_, i) => (
        <RatingStar key={`empty-${i}`} />
      ))}
    </>
  )
}

export function RegionElement({ value, onClick }) {
  if (value) {
    const {
      nameOverride,
      source: { id, names, style },
    } = value

    return (
      <ResourceListItem key={id} onClick={onClick}>
        <RoundThumbnail src={style && style.backgroundImageUrl} />
        <ListLabel>
          {nameOverride || names.ko || names.en || names.local}
        </ListLabel>
        <List.Action>바로가기</List.Action>
      </ResourceListItem>
    )
  }

  return null
}
