import styled from 'styled-components'
import { MarginPadding, formatMarginPadding } from '@titicaca/core-elements'
import { FrameRatioAndSizes } from '@titicaca/type-definitions'

const RATIOS = {
  '4:1': '25%',
  '9:5': '55.56%',
  '5:3': '60%',
  '11:7': '63.64%',
  '4:3': '75%',
  '1:1': '100%',
  '10:11': '110%',
  '5:8': '160%',
}

const MEDIA_FRAME_OPTIONS: {
  [key in FrameRatioAndSizes]: string | undefined
} = {
  mini: RATIOS['4:1'],
  small: RATIOS['5:3'],
  medium: RATIOS['4:3'],
  large: RATIOS['1:1'],
  big: RATIOS['10:11'],
  huge: RATIOS['5:8'],
  original: undefined,
  ...RATIOS,
}

const RatioBox = styled.td<{
  padding?: MarginPadding
  frame: FrameRatioAndSizes
  overflowHidden?: boolean
}>`
  position: relative;

  ${({ frame }) =>
    frame !== 'original' &&
    formatMarginPadding({ top: MEDIA_FRAME_OPTIONS[frame] }, 'padding')}

  ${({ overflowHidden }) => overflowHidden && 'overflow: hidden;'}
`

export default RatioBox
