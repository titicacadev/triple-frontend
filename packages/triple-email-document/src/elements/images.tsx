import React, { PropsWithChildren } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import styled from 'styled-components'

import FluidTable from '../common/fluid-table'

export type ExtendedImageMeta = ImageMeta & {
  link?: ImageMeta['link'] & {
    id?: string
  }
}

export interface ImageDocument {
  type: 'images'
  value: {
    images: ExtendedImageMeta[]
    display: 'default' | 'gapless-block'
  }
}

interface Positioning {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

const Box = styled.td<{ padding?: Positioning }>`
  padding: ${({ padding }) => {
    const { top, bottom, left, right } = padding || {}
    return [top, right, bottom, left].map(addUnit).join(' ')
  }};
`

const Img = styled.img`
  width: 100%;
  display: block;
`

const Tr = styled.tr<{ tdWidth: number }>`
  > td {
    width: ${({ tdWidth }) => `${tdWidth}%`};
  }
`

const ImageCaption = styled.div`
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: var(--color-gray700);
  white-space: pre-wrap;
`

const ImageLink = styled.a`
  display: block;
  font-size: 14px;
  line-height: 17px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: var(--color-gray);
  border-style: solid;
  border-color: var(--color-gray200);
  border-radius: 4px;
  border-width: 1px;
  padding: 7px 12px;
`

export default function Images({
  value: {
    display,
    images: [first, second],
  },
}: {
  value: ImageDocument['value']
}) {
  const paddings = {
    default: { top: 40, bottom: 30 },
    'gapless-block': undefined,
  }
  const firstImagePaddings = {
    default: { left: 30, right: second !== undefined ? 15 : 30 },
    'gapless-block': undefined,
  }
  const secondImagePaddings = {
    default: { left: 15, right: 30 },
    'gapless-block': undefined,
  }

  if (first === undefined) {
    return null
  }

  return (
    <FluidTable>
      <tr>
        <Box padding={paddings[display]}>
          <FluidTable>
            <ImagesRow>
              <Box padding={firstImagePaddings[display]}>
                <Image image={first} />
              </Box>

              {second !== undefined ? (
                <Box padding={secondImagePaddings[display]}>
                  <Image image={second} />
                </Box>
              ) : null}
            </ImagesRow>
          </FluidTable>
        </Box>
      </tr>
    </FluidTable>
  )
}

function ImagesRow({ children }: PropsWithChildren<unknown>) {
  const count = React.Children.toArray(children).filter(
    (child) => !!child,
  ).length

  return <Tr tdWidth={100 / count}>{children}</Tr>
}

function Image({
  image: {
    title,
    link,
    sizes: {
      full: { url },
    },
  },
}: {
  image: ExtendedImageMeta
}) {
  return (
    <FluidTable>
      <tr>
        <Box>
          <Img src={url} />
        </Box>
      </tr>

      {title ? (
        <tr>
          <Box padding={{ top: 8, bottom: 8 }}>
            <ImageCaption>{title}</ImageCaption>
          </Box>
        </tr>
      ) : null}

      {link ? (
        <tr>
          <Box padding={{ top: title ? 0 : 8, bottom: 8 }}>
            <ImageLink href={link.href}>{link.label}</ImageLink>
          </Box>
        </tr>
      ) : null}
    </FluidTable>
  )
}

function addUnit(value: number | undefined) {
  return value !== undefined && value !== 0 ? `${value}px` : 0
}
