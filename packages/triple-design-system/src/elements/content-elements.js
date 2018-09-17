import React from 'react'
import styled, { css } from 'styled-components'
import List from './list'

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

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

export const HR2 = styled.div`
  margin: 50px 0;
  height: 10px;
  background-color: #efefef;

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

export const HR3 = styled.div`
  margin: 0;
  height: ${({ height }) => height || 10}px;
  background-color: transparent;
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

export const ResourceListItem = styled(List.Item)`
  height: 40px;
  margin: 20px 0;
`

export const SquareImage = styled.img`
  width: ${({ size = 'medium' }) => ({ small: 40, medium: 140 }[size])}px;
  height: ${({ size = 'medium' }) => ({ small: 40, medium: 140 }[size])}px;
  border-radius: ${({ size = 'medium' }) => ({ small: 2, medium: 6 }[size])}px;

  background-color: #efefef;
  object-fit: cover;

  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
    `};

  ${({ floated }) =>
    floated &&
    css`
      float: ${floated};
    `};
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

export const SimpleLink = styled.a`
  font-family: sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #2987f0;
  text-decoration: underline;
`

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
