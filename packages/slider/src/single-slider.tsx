import React, { ComponentType } from 'react'
import { Tracks } from 'react-compound-slider'

import Track from './track'
import SliderBase, { SliderBaseProps } from './slider-base'
import ToolTip from './tooltip'

interface SingleSliderProps
  extends Omit<
    SliderBaseProps,
    'initialValues' | 'labelComponent' | 'onChange'
  > {
  initialValue?: number
  labelComponent?: ComponentType<{ value: number }>
  toolTipLabel?: string[]
  onChange: (value: number) => void
}

export default function SingleSlider({
  initialValue,
  labelComponent: LabelComponent,
  onChange,
  toolTipLabel,
  handlerSize,
  railHeight,
  ...restProps
}: SingleSliderProps) {
  return (
    <SliderBase
      {...restProps}
      initialValues={initialValue ? [initialValue] : undefined}
      handlerSize={handlerSize}
      onChange={(values) => onChange(values[0])}
      railHeight={railHeight}
      labelComponent={
        LabelComponent
          ? ({ values }) => <LabelComponent value={values[0]} />
          : undefined
      }
    >
      <Tracks>
        {({ tracks, getTrackProps }) => (
          <>
            {toolTipLabel ? (
              <ToolTip
                handlerSize={handlerSize}
                tracks={tracks}
                toolTipLabel={toolTipLabel}
              />
            ) : null}
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
