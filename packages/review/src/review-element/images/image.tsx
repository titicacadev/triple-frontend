import React from 'react'
import { Responsive } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

export const MultipleImageElement = styled.img<{
  absolute?: boolean
  height?: number
}>`
  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      top: 0;
    `}

  height: 100%;
  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}

  border-radius: 4px;
  width: 100%;
  object-fit: cover;
`

const SingleImageElement = styled.img<{ absolute?: boolean; height?: number }>`
  width: 100%;
  border-radius: 4px;
  object-fit: cover;

  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      top: 0;
      height: 100%;
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}
`

export const SquareFrame = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  height: 0 !important;
`

export function SingleImage({
  width,
  height,
  sourceUrl,
}: {
  width: number
  height: number
  sourceUrl: string
}) {
  return (
    <>
      <Responsive maxWidth={499}>
        {width > height ? (
          <SingleImageElement src={sourceUrl} />
        ) : (
          <SquareFrame>
            <SingleImageElement src={sourceUrl} absolute />
          </SquareFrame>
        )}
      </Responsive>
      <Responsive minWidth={500}>
        <SingleImageElement src={sourceUrl} height={293} />
      </Responsive>
    </>
  )
}
