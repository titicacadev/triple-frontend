import React from 'react'
import {
  ImageV2,
  GlobalSizes,
  FrameRatioAndSizes,
} from '@titicaca/core-elements'
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
  title: 'ImageV2 컴포넌트',
}

export function baseExample() {
  return (
    <ImageV2
      borderRadius={
        boolean('borderRadius prop 사용', false)
          ? number('borderRadius', 0)
          : undefined
      }
    >
      <ImageV2.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
    </ImageV2>
  )
}

export function fixedRatioExample() {
  return (
    <ImageV2>
      <ImageV2.FixedRatioFrame
        frame={
          boolean('frame 사용', false)
            ? select('frame', FRAME_RATIO_AND_SIZES, 'original')
            : undefined
        }
      >
        <ImageV2.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
      </ImageV2.FixedRatioFrame>
    </ImageV2>
  )
}

export function fixedDimensionsExample() {
  const withDirectDimensions = boolean('width, height 사용', false)

  return (
    <ImageV2>
      <ImageV2.FixedDimensionsFrame
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
        <ImageV2.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
      </ImageV2.FixedDimensionsFrame>
    </ImageV2>
  )
}

export function sourceUrlExample() {
  return (
    <>
      <ImageV2>
        <ImageV2.FixedRatioFrame frame="small">
          <ImageV2.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />

          <ImageV2.SourceUrl>출처: https://triple-corp.com</ImageV2.SourceUrl>
        </ImageV2.FixedRatioFrame>
      </ImageV2>

      <ImageV2>
        <ImageV2.FixedRatioFrame frame="small" margin={{ top: 100 }}>
          <ImageV2.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />

          <ImageV2.SourceUrl>
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
          </ImageV2.SourceUrl>
        </ImageV2.FixedRatioFrame>
      </ImageV2>
    </>
  )
}

export function overlayExample() {
  return (
    <ImageV2>
      <ImageV2.FixedRatioFrame frame="mini">
        <ImageV2.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />

        <ImageV2.Overlay
          overlayType={select('overlayType', ['gradient', 'dark'], 'dark')}
          padding={{ top: 20, bottom: 20 }}
        >
          <div style={{ fontSize: 14, color: 'white' }}>오버레이입니다.</div>
        </ImageV2.Overlay>
      </ImageV2.FixedRatioFrame>
    </ImageV2>
  )
}

export function linkIndicatorExample() {
  return (
    <ImageV2>
      <ImageV2.FixedRatioFrame frame="mini">
        <ImageV2.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />

        <ImageV2.LinkIndicator />
      </ImageV2.FixedRatioFrame>
    </ImageV2>
  )
}

export function placeholderExample() {
  return (
    <>
      <ImageV2>
        <ImageV2.FixedRatioFrame frame="mini">
          <ImageV2.Placeholder src="https://assets.triple.guide/images/ico-blank-hotel@2x.png" />
        </ImageV2.FixedRatioFrame>
      </ImageV2>

      <ImageV2>
        <ImageV2.FixedDimensionsFrame
          width={90}
          height={160}
          margin={{ top: 50 }}
        >
          <ImageV2.Placeholder src="https://assets.triple.guide/images/ico-blank-hotel@2x.png" />
        </ImageV2.FixedDimensionsFrame>
      </ImageV2>
    </>
  )
}

export function circularImageExample() {
  const withDirectDimensions = boolean('width 사용', false)
  return (
    <ImageV2.Circular
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
