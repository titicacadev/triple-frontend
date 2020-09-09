import React from 'react'
import { Image, GlobalSizes, FrameRatioAndSizes } from '@titicaca/core-elements'
import { boolean, select, number } from '@storybook/addon-knobs'

const GLOBAL_SIZES: GlobalSizes[] = [
  'mini',
  'tiny',
  'small',
  'medium',
  'large',
  'big',
  'huge',
  'massive',
]

const FRAME_RATIO_AND_SIZES: FrameRatioAndSizes[] = [
  '10:11',
  '11:7',
  '1:1',
  '4:1',
  '4:3',
  '5:3',
  '5:8',
  '9:5',
  'big',
  'huge',
  'large',
  'medium',
  'mini',
  'original',
  'small',
]

export default {
  title: 'Image 컴포넌트',
}

export function baseExample() {
  return (
    <Image
      borderRadius={
        boolean('borderRadius prop 사용', false)
          ? number('borderRadius', 0)
          : undefined
      }
    >
      <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
    </Image>
  )
}

export function fixedRatioExample() {
  return (
    <Image>
      <Image.FixedRatioFrame
        frame={
          boolean('frame 사용', false)
            ? select('frame', FRAME_RATIO_AND_SIZES, 'original')
            : undefined
        }
      >
        <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
      </Image.FixedRatioFrame>
    </Image>
  )
}

export function fixedDimensionsExample() {
  const withDirectDimensions = boolean('width, height 사용', false)

  return (
    <Image>
      <Image.FixedDimensionsFrame
        size={
          !withDirectDimensions
            ? select('size', GLOBAL_SIZES, 'medium')
            : undefined
        }
        width={
          withDirectDimensions ? number('width', 500, undefined) : undefined
        }
        height={
          withDirectDimensions ? number('height', 500, undefined) : undefined
        }
      >
        <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
      </Image.FixedDimensionsFrame>
    </Image>
  )
}

export function sourceUrlExample() {
  return (
    <>
      <Image>
        <Image.FixedRatioFrame frame="small">
          <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />

          <Image.SourceUrl>출처: https://triple-corp.com</Image.SourceUrl>
        </Image.FixedRatioFrame>
      </Image>

      <Image>
        <Image.FixedRatioFrame frame="small" margin={{ top: 100 }}>
          <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />

          <Image.SourceUrl>
            <div
              style={{
                fontSize: 20,
                border: 'solid 1px red',
                overflow: 'auto',
              }}
            >
              커스텀 컴포넌트입니다.
              <br />
              출처: https://triple-corp.com
            </div>
          </Image.SourceUrl>
        </Image.FixedRatioFrame>
      </Image>
    </>
  )
}

export function overlayExample() {
  return (
    <Image>
      <Image.FixedRatioFrame frame="mini">
        <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />

        <Image.Overlay
          overlayType={select('overlayType', ['gradient', 'dark'], 'dark')}
          padding={{ top: 20, bottom: 20 }}
        >
          <div style={{ fontSize: 14, color: 'white' }}>오버레이입니다.</div>
        </Image.Overlay>
      </Image.FixedRatioFrame>
    </Image>
  )
}

export function linkIndicatorExample() {
  return (
    <Image>
      <Image.FixedRatioFrame frame="mini">
        <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />

        <Image.LinkIndicator />
      </Image.FixedRatioFrame>
    </Image>
  )
}

export function placeholderExample() {
  return (
    <>
      <Image>
        <Image.FixedRatioFrame frame="mini">
          <Image.Placeholder src="https://assets.triple.guide/images/ico-blank-hotel@2x.png" />
        </Image.FixedRatioFrame>
      </Image>

      <Image>
        <Image.FixedDimensionsFrame
          width={90}
          height={160}
          margin={{ top: 50 }}
        >
          <Image.Placeholder src="https://assets.triple.guide/images/ico-blank-hotel@2x.png" />
        </Image.FixedDimensionsFrame>
      </Image>
    </>
  )
}

export function circularImageExample() {
  const withDirectDimensions = boolean('width 사용', false)
  return (
    <Image.Circular
      src="https://triple-corp.com/static/images/img-bg-0.jpg"
      size={
        !withDirectDimensions
          ? select('size', ['small', 'medium'], 'medium')
          : undefined
      }
      width={withDirectDimensions ? number('width', 40) : undefined}
    />
  )
}
