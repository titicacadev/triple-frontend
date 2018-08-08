import React from 'react'
import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #3a3a3a;
  font-family: sans-serif;
  margin: 40px 30px;
`

export function LineBreak ({ children }) {
  const Line = ({ children }) => <>{children}<br /></>

  return (
    <>
      {
        (children || '').split("\n").map((text, i) => <Line key={i}>{text}</Line>)
      }
    </>
  )
}

export const TextComponent = styled.div`
  margin: ${({ compact }) => compact ? '0' : '0 30px'};
  font-family: sans-serif;
`

export const H1 = styled(TextComponent)`
  font-size: 21px;
  font-weight: bold;
  color: ${({ emphasize }) => emphasize ? '#2987f0' : '#3a3a3a'};
  margin-top: 30px;
  margin-bottom: 20px;

  small {
    display: block;
    font-size: 13px;
    font-weight: bold;
    color: #2987f0;
    margin-bottom: 3px;
  }
`

export const H2 = styled(TextComponent)`
  font-size: 19px;
  font-weight: 500;
  color: #3a3a3a;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const H3 = styled(TextComponent)`
  font-size: 16px;
  font-weight: bold;
  color: #3a3a3a;
  margin-top: 20px;
`

export const H4 = styled(TextComponent)`
  font-size: 16px;
  font-weight: bold;
  color: #2987f0;
  margin-top: 20px;
`

export const Paragraph = styled(TextComponent)`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  margin-top: 10px;
  color: rgba(58, 58, 58, 0.7);
`

export const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${({ frame }) => ({ small: '60%', medium: '75%', large: '100%' }[frame || 'small'])};
  overflow: hidden;
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
  text-overflow: ellipsis;
  font-family: sans-serif;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.9);
`

export const ImageCarousel = styled.div`
  margin-top: 30px;
  white-space: nowrap;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const ImageCarouselElementContainer = styled.div`
  display: inline-block;
  width: calc(100% - 40px);

  margin-left: 10px;

  &:first-child {
    margin-left: 20px;
  }
`

export const ImageCaption = styled(TextComponent)`
  margin-top: 8px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: rgba(58, 58, 58, 0.7);
`

export const Carousel = styled.div`
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  margin: 30px 20px;
`

export const CarouselElementContainer = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ size }) => ({ small: '140px', medium: '200px' }[size || 'small'])};
  font-family: sans-serif;
  vertical-align: top;

  margin-left: ${({ size }) => ({ small: '10px', medium: '15px' }[size || 'small'])};

  &:first-child {
    margin-left: 30px;
  }
`

export const HR1 = styled.div`
  margin: 50px 20px;
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
  font-weight: 500;
  color: #3a3a3a;
`

const ListHeader = styled.div`
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #3a3a3a;
  margin-left: 50px;
`

const ListDescription = styled.div`
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(58, 58, 58, 0.7);
  margin-top: 4px;
  margin-left: 50px;
`

const ListItem = styled.div`
  height: 40px;
  clear: both;
  margin: 20px 0;
  position: relative;
`

const PoiListScrapButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: 34px;
  background-image: url(http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/${
    ({ pressed }) => pressed ? 'btn-content-scrap-list-on@2x.png' : 'btn-content-scrap-list-off@2x.png'
  });
  background-size: 34px 34px;
`

function PoiType ({ children }) {
  return { attraction: '관광명소', restaurant: '음식점', hotel: '호텔' }[children]
}

export const ListContainer = styled.div`
  margin: 20px 30px 0 30px;
  font-family: sans-serif;
`

export function PoiListElement ({ value, onClick }) {
  if (value) {
    const { type, nameOverride, source: { image, names }, scraped } = value

    return (
      <ListItem onClick={onClick}>
        <Thumbnail src={image && image.sizes.large.url} />
        <ListHeader>{nameOverride || names.ko || names.en || names.local}</ListHeader>
        <ListDescription>
          <PoiType>{type}</PoiType>
        </ListDescription>
        <PoiListScrapButton pressed={scraped} />
      </ListItem>
    )
  }

  return null
}

export const SquareImage = styled.img`
  width: ${({ size }) => ({ small: '140px', medium: '200px' }[size || 'small'])};
  height: 140px;
  background-color: #efefef;
  border-radius: 6px;
`

export const FluidSquareImage = styled.div`
  width: 100%;
  background-color: #efefef;
  padding-bottom: 100%;
  height: 0;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center center;
`

const PoiCarouselName = styled.div`
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
  background-image: url(http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/${
    ({ pressed }) => pressed ? 'btn-content-scrap-overlay-on@2x.png' : 'btn-content-scrap-overlay-off@2x.png'
  });
  background-size: 36px 36px;
`

export function PoiCarouselElement ({ value, onClick }) {
  if (value) {
    const { type, nameOverride, source: { image, names }, scraped } = value

    return (
      <CarouselElementContainer size='small' onClick={onClick}>
        <SquareImage size='small' src={image && image.sizes.large.url} />
        <PoiCarouselName>{nameOverride || names.ko || names.en || names.local}</PoiCarouselName>
        <PoiCarouselDescription>
          <PoiType>{type}</PoiType>
        </PoiCarouselDescription>
        <PoiCarouselScrapButton pressed={scraped} />
      </CarouselElementContainer>
    )
  }

  return null
}

export const PoiCarousel = styled.div`
  margin-top: 20px;
  padding-right: 30px;
  white-space: nowrap;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const SimpleLink = styled.a`
  font-family: sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #2987f0;
  text-decoration: underline;
`

export const NoteTitle = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  color: #3a3a3a;
`

export const NoteDescription = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  color: rgba(58, 58, 58, 0.7);
`

export const SimpleButton = styled.a`
  display: inline-block;
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 25px;
  padding-right: 25px;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  border-radius: 21px;
  background-color: #368fff;
  text-decoration: none;
`

const ListActions = styled.div`
  float: right;
`

const ListActionCell = styled.div`
  height: 40px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`

const ListActionLabel = styled.div`
  display: inline-block;
  padding-top: 8px;
  padding-bottom: 7px;
  padding-left: 17px;
  padding-right: 17px;
  text-align: center;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #3a3a3a;
  border-radius: 17px;
  background-color: #fafafa;
`

function ListAction ({ children }) {
  return (
    <ListActions>
      <ListActionCell>
        <ListActionLabel>{children}</ListActionLabel>
      </ListActionCell>
    </ListActions>
  )
}

export function RegionElement ({ value, onClick }) {
  if (value) {
    const { nameOverride, source: { id, names, style } } = value

    return (
      <ListItem key={id} onClick={onClick}>
        <RoundThumbnail src={style && style.backgroundImageUrl} />
        <ListLabel>{nameOverride || names.ko || names.en || names.local}</ListLabel>
        <ListAction>바로가기</ListAction>
      </ListItem>
    )
  }

  return null
}
