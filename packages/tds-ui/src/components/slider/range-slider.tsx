import { ComponentType } from 'react'
import { Tracks } from 'react-compound-slider'

import Track from './track'
import SliderBase, { SliderBaseProps } from './slider-base'
import { SliderValue } from './types'

interface RangeSliderProps extends Omit<SliderBaseProps, 'labelComponent'> {
  labelComponent?: ComponentType<{
    fromValue: SliderValue[0]
    toValue: SliderValue[1]
  }>
}

function RangeSlider({
  labelComponent: LabelComponent,
  ...restProps
}: RangeSliderProps) {
  return (
    <SliderBase
      {...restProps}
      labelComponent={
        LabelComponent
          ? ({ values }) => (
              <LabelComponent fromValue={values[0]} toValue={values[1]} />
            )
          : undefined
      }
    >
      <Tracks>
        {({ tracks, getTrackProps }) => (
          <>
            {tracks.map(({ id, source, target }) => (
              <Track
                key={id}
                active={source.id !== '$' && target.id !== '$'}
                left={source.percent}
                right={target.percent}
                getTrackProps={getTrackProps}
              />
            ))}
          </>
        )}
      </Tracks>
    </SliderBase>
  )
}

export default RangeSlider
