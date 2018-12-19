import React from 'react'
import styled, { css } from 'styled-components'
import List from './list'
import Image from './image'

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
  vertical-align: top;
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

export function RegionElement({ value, onClick }) {
  if (value) {
    const {
      nameOverride,
      source: { id, names, style },
    } = value

    return (
      <ResourceListItem key={id} onClick={onClick}>
        <Image
          circular
          size="small"
          floated="left"
          src={style && style.backgroundImageUrl}
        />
        <ListLabel>
          {nameOverride || names.ko || names.en || names.local}
        </ListLabel>
        <List.Action>바로가기</List.Action>
      </ResourceListItem>
    )
  }

  return null
}
