import { Children, PropsWithChildren } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import styled, { css } from 'styled-components'

import { FluidTable, Box } from '../common'

type ImageFrameRatio =
  | 'mini'
  | 'small'
  | 'medium'
  | 'large'
  | 'big'
  | 'original'

export type ExtendedImageMeta = ImageMeta & {
  link?: ImageMeta['link'] & {
    id?: string
  }
  frame?: ImageFrameRatio
}

export interface ImageDocument {
  type: 'images'
  value: {
    images: ExtendedImageMeta[]
    display: 'default' | 'gapless-block' | 'default-v2'
  }
}

export const MEDIA_FRAME_OPTIONS: {
  [key in ImageFrameRatio]: string | undefined
} = {
  mini: '80px',
  small: '200px',
  medium: '240px',
  large: '400px',
  big: '800px',
  original: undefined,
}

const Img = styled.img<{ borderRadius: number; frame: ImageFrameRatio }>`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};

  ${({ frame }) =>
    frame !== 'original' &&
    css`
      max-height: ${MEDIA_FRAME_OPTIONS[frame]};
    `}
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
  color: rgba(58, 58, 58, 0.7);
  white-space: pre-wrap;
`

const ImageLink = styled.a`
  img {
    border: 0 none;
  }
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
    'default-v2': { top: 20, bottom: 20 },
    'gapless-block': undefined,
  }
  const firstImagePaddings = {
    default: { left: 30, right: second !== undefined ? 15 : 30 },
    'default-v2': { left: 30, right: second !== undefined ? 5 : 30 },
    'gapless-block': undefined,
  }
  const secondImagePaddings = {
    default: { left: 15, right: 30 },
    'default-v2': { left: 5, right: 30 },
    'gapless-block': undefined,
  }

  if (first === undefined) {
    return null
  }

  const borderRadius = {
    default: 0,
    'default-v2': 6,
    'gapless-block': 0,
  }

  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box padding={paddings[display]}>
            <FluidTable>
              <tbody>
                <ImagesRow>
                  <Box padding={firstImagePaddings[display]}>
                    <Image image={first} borderRadius={borderRadius[display]} />
                  </Box>

                  {second !== undefined ? (
                    <Box padding={secondImagePaddings[display]}>
                      <Image
                        image={second}
                        borderRadius={borderRadius[display]}
                      />
                    </Box>
                  ) : null}
                </ImagesRow>
              </tbody>
            </FluidTable>
          </Box>
        </tr>
      </tbody>
    </FluidTable>
  )
}

function ImagesRow({ children }: PropsWithChildren<unknown>) {
  const count = Children.toArray(children).filter((child) => !!child).length

  return <Tr tdWidth={100 / count}>{children}</Tr>
}

function Image({
  image: {
    title,
    link,
    sizes: {
      full: { url },
    },
    frame = 'original',
  },
  borderRadius,
}: {
  image: ExtendedImageMeta
  borderRadius: number
}) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <Box>
            {link ? (
              <ImageLink href={link.href} ses:tags={`links:${link.id}`}>
                <Img src={url} borderRadius={borderRadius} frame={frame} />
              </ImageLink>
            ) : (
              <Img src={url} borderRadius={borderRadius} frame={frame} />
            )}
          </Box>
        </tr>

        {title ? (
          <tr>
            <Box padding={{ top: 8, bottom: 8 }}>
              <ImageCaption>{title}</ImageCaption>
            </Box>
          </tr>
        ) : null}
      </tbody>
    </FluidTable>
  )
}
