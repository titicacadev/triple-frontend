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

export const Image = styled.img`
  width: 100%;
  min-height: 140px;
  height: auto;
  border-radius: 6px;
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

const ListHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #3a3a3a;
  margin-left: 50px;
`

const ListDescription = styled.div`
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
`

function PoiType ({ children }) {
  return { attraction: '관광명소', restaurant: '음식점', hotel: '호텔' }[children]
}

export const ListContainer = styled.div`
  margin: 20px 30px 0 30px;
  font-family: sans-serif;
`

export function PoiListElement ({ value }) {
  if (value) {
    const { type, source } = value

    return (
      <ListItem>
        <Thumbnail src={source.image && source.image.sizes.large.url} />
        <ListHeader>{source.names.ko || source.names.en || source.names.local}</ListHeader>
        <ListDescription>
          <PoiType>{type}</PoiType>
        </ListDescription>
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
  font-size: 16px;
  font-weight: bold;
  color: #3a3a3a;
  margin-top: 8px;
`

const PoiCarouselDescription = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: rgba(58, 58, 58, 0.7);
  margin-top: 2px;
`

export function PoiCarouselElement ({ value }) {
  if (value) {
    const { type, source } = value

    return (
      <CarouselElementContainer size='small'>
        <SquareImage size='small' src={source.image && source.image.sizes.large.url} />
        <PoiCarouselName>{source.names.ko || source.names.en || source.names.local}</PoiCarouselName>
        <PoiCarouselDescription>
          <PoiType>{type}</PoiType>
        </PoiCarouselDescription>
      </CarouselElementContainer>
    )
  }

  return null
}

export const PoiCarousel = styled.div`
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
