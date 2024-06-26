import { ComponentType } from 'react'
import { Tracks } from 'react-compound-slider'

import { Track } from './track'
import { SliderBaseProps, SliderBase } from './slider-base'

interface SingleSliderProps
  extends Omit<
    SliderBaseProps,
    'initialValues' | 'labelComponent' | 'onChange'
  > {
  /**
   * 초기값.
   */
  initialValue?: number
  /**
   * 슬라이더 상단 라벨 영역을 표시하는 컴포넌트.
   */
  labelComponent?: ComponentType<{ value: number }>
  onChange: (value: number) => void
}

export function SingleSlider({
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
            {tracks.map(({ id, source, target }) => (
              <Track
                key={id}
                active={target.id !== '$'}
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
