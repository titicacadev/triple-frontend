import React, { ComponentType } from 'react'
import { Tracks } from 'react-compound-slider'

import Track from './track'
import SliderBase, { SliderBaseProps } from './slider-base'

interface SingleSliderProps
  extends Omit<
    SliderBaseProps,
    'initialValues' | 'labelComponent' | 'onChange'
  > {
  initialValue?: number
  labelComponent?: ComponentType<{ value: number }>
  onChange: (value: number) => void
}

export default function SingleSlider({
  initialValue,
  labelComponent: LabelComponent,
  onChange,
  ...restProps
}: SingleSliderProps) {
  return (
    <SliderBase
      {...restProps}
      initialValues={initialValue ? [initialValue] : undefined}
      onChange={(values) => onChange(values[0])}
      labelComponent={
        LabelComponent
          ? ({ values }) => <LabelComponent value={values[0]} />
          : undefined
      }
    >
      <Tracks>
        {({ tracks, getTrackProps }) => (
          <>
            {tracks.map(
              ({
                id,
                source: { percent: sourcePercent },
                target: { id: targetId, percent: targetPercent },
              }) => (
                <Track
                  key={id}
                  left={sourcePercent}
                  right={targetPercent}
                  {...getTrackProps()}
                  active={targetId !== '$'}
                />
              ),
            )}
          </>
        )}
      </Tracks>
    </SliderBase>
  )
}
