import React, { ComponentType } from 'react'
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

export default function RangeSlider({
  labelComponent: LabelComponent,
  railHeight,
  ...restProps
}: RangeSliderProps) {
  return (
    <SliderBase
      {...restProps}
      railHeight={railHeight}
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
            {tracks.map(
              ({
                id,
                source: { id: sourceId, percent: sourcePercent },
                target: { id: targetId, percent: targetPercent },
              }) => (
                <Track
                  key={id}
                  left={sourcePercent}
                  right={targetPercent}
                  {...getTrackProps()}
                  active={sourceId !== '$' && targetId !== '$'}
                  railHeight={railHeight}
                />
              ),
            )}
          </>
        )}
      </Tracks>
    </SliderBase>
  )
}
