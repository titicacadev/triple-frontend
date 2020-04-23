import React from 'react'
import styled, { css } from 'styled-components'
import { Text, Responsive } from '@titicaca/core-elements'

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

function ImagePlaceholder({
  large,
  onClick,
}: {
  large?: boolean
  onClick: () => void
}) {
  return (
    <ImagePlaceholderContainer large={large} onClick={onClick}>
      <ImagePlaceholderContent large={large}>
        <PlaceholderIcon src="https://assets.triple.guide/images/img-empty-photo-m@4x.png" />
        <Text size="small" color="gray" alpha={0.3}>
          이곳의 첫 번째 사진을 올려주세요.
        </Text>
      </ImagePlaceholderContent>
    </ImagePlaceholderContainer>
  )
}

export default function ResponsiveImagePlaceholder({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <>
      <Responsive maxWidth={706}>
        <ImagePlaceholder onClick={onClick} />
      </Responsive>
      <Responsive minWidth={707}>
        <ImagePlaceholder large onClick={onClick} />
      </Responsive>
    </>
  )
}
