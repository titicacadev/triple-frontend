import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs'
import {
  Image,
  GlobalSizes,
  FrameRatioAndSizes,
  ImageSource,
  ImageSourceType,
} from '@titicaca/core-elements'
import { action } from '@storybook/addon-actions'

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

const ROUND_SIZES: GlobalSizes[] = ['small', 'medium']

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

const FRAME_GROUP = '틀 관련 props'

enum IMAGE_SOURCE_TYPE {
  CORE_ELEMENTS = 'core-elements',
  CUSTOM_NEW = 'custom_new',
  CUSTOM_OLD = 'custom_old',
  UNDEFINED = 'undefined',
}

const IMAGE_SOURCE_COMPONENTS: {
  [key in IMAGE_SOURCE_TYPE]: ImageSourceType | undefined
} = {
  [IMAGE_SOURCE_TYPE.CORE_ELEMENTS]: ImageSource,
  [IMAGE_SOURCE_TYPE.CUSTOM_OLD]: function OldCustomImageSource({
    children,
  }: {
    children: string
  }) {
    return `출처 ${children.replace(/^https?:\/\//, '')}`
  },
  [IMAGE_SOURCE_TYPE.CUSTOM_NEW]: function CustomImageSource({
    sourceUrl,
  }: {
    sourceUrl?: string
  }) {
    return (
      <div style={{ fontSize: 20, border: 'solid 1px red', overflow: 'auto' }}>
        커스텀 컴포넌트입니다.
        {sourceUrl}
      </div>
    )
  },
  [IMAGE_SOURCE_TYPE.UNDEFINED]: undefined,
}

storiesOf('Core-Elements | Image', module)
  .add('기본', () => {
    const useFixedDemensions = boolean('틀 고정', true, FRAME_GROUP)
    const useDirectDemension =
      useFixedDemensions && boolean('width, height 사용', false, FRAME_GROUP)

    return (
      <Image
        src={text('src', 'https://triple-corp.com/static/images/img-bg-0.jpg')}
        borderRadius={number('borderRadius', 6)}
        sourceUrl={text('sourceUrl', 'https://triple-corp.com')}
        ImageSource={
          IMAGE_SOURCE_COMPONENTS[
            select(
              'ImageSource',
              [
                IMAGE_SOURCE_TYPE.CORE_ELEMENTS,
                IMAGE_SOURCE_TYPE.CUSTOM_OLD,
                IMAGE_SOURCE_TYPE.CUSTOM_NEW,
                IMAGE_SOURCE_TYPE.UNDEFINED,
              ],
              IMAGE_SOURCE_TYPE.UNDEFINED,
            )
          ]
        }
        withLinkIndicator={boolean('withLinkIndicator', false)}
        floated={select('floated', ['right', 'left', 'none'], 'none')}
        margin={{
          top: number('margin-top', 0),
          right: number('margin-right', 0),
          bottom: number('margin-bottom', 0),
          left: number('margin-left', 0),
        }}
        asPlaceholder={boolean('asPlaceholder', false)}
        alt={text('alt', '')}
        frame={
          boolean('frame 사용', false, FRAME_GROUP)
            ? select('frame', FRAME_RATIO_AND_SIZES, 'original', FRAME_GROUP)
            : undefined
        }
        size={
          useFixedDemensions && !useDirectDemension
            ? select('size', GLOBAL_SIZES, 'medium', FRAME_GROUP)
            : undefined
        }
        width={
          useFixedDemensions && useDirectDemension
            ? number('width', 500, undefined, FRAME_GROUP)
            : undefined
        }
        height={
          useFixedDemensions && useDirectDemension
            ? number('height', 500, undefined, FRAME_GROUP)
            : undefined
        }
        onClick={action('onClick')}
      />
    )
  })
  .add('circular', () => {
    const useDirectWidth = boolean('크기 직접 입력', false)

    return (
      <Image
        circular
        src={text('src', 'https://triple-corp.com/static/images/img-bg-0.jpg')}
        floated={select('floated', ['right', 'left', 'none'], 'none')}
        size={
          !useDirectWidth ? select('size', ROUND_SIZES, 'medium') : undefined
        }
        width={useDirectWidth ? number('width', 20) : undefined}
      />
    )
  })
