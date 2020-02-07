import React, { useState, useEffect, useCallback, ComponentType } from 'react'
import styled from 'styled-components'
import {
  Rail,
  Slider as OriginalSlider,
  Handles,
  Tracks,
} from 'react-compound-slider'
import { debounce } from '@titicaca/view-utilities'
import { Container } from '@titicaca/core-elements'
import Track from './track'
import Handle from './handle'

type SliderValue = readonly number[]
type ValueTransformer = (x: number) => number

interface RangeSliderProps {
  initialValues?: SliderValue
  step?: number
  min: number
  max: number
  labelComponent?: ComponentType<{
    fromValue: SliderValue[0]
    toValue: SliderValue[1]
  }>
  onChange: (values: SliderValue) => void
  nonLinear?: boolean
}

const SliderContainer = styled.div`
  margin: 24px 0 21px 0;
  padding: 0 9px;
  height: 18px;
  touch-action: pan-x;
`

const RailBase = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 4px;
  background-color: #efefef;
  height: 3px;
  transform: translate(0, -50%);
`

const IDENTICAL_SCALE: ValueTransformer = (x) => x

const LINEAR_FN_SET: ValueTransformer[] = [IDENTICAL_SCALE, IDENTICAL_SCALE]

const EXPONENT = 1 / Math.E
const NON_LINEAR_FN_SET: ValueTransformer[] = [
  (x) => Math.round(Math.pow(x, EXPONENT)),
  (x) => Math.round(Math.pow(x, 1 / EXPONENT)),
]

export default function RangeSlider({
  step = 1,
  initialValues,
  min,
  max,
  onChange,
  labelComponent: LabelComponent,
  nonLinear,
}: RangeSliderProps) {
  const [values, setValues] = useState<SliderValue>(initialValues || [min, max])

  const [scaleFn, scaleFnInverse] = nonLinear
    ? NON_LINEAR_FN_SET
    : LINEAR_FN_SET

  const limiter: ValueTransformer = (value) => {
    if (value < min) {
      return min
    }
    if (value > max) {
      return max
    }
    return value
  }

  const debouncedChangeHandler = useCallback(debounce(onChange, 500), [
    onChange,
  ])

  useEffect(() => {
    debouncedChangeHandler(values)
  }, [debouncedChangeHandler, values])

  return (
    <Container>
      {LabelComponent ? (
        <LabelComponent fromValue={values[0]} toValue={values[1]} />
      ) : null}

      <SliderContainer>
        <OriginalSlider
          values={values.map(scaleFn)}
          mode={2}
          step={scaleFn(step)}
          domain={[min, max].map(scaleFn)}
          rootStyle={{ position: 'relative' }}
          onUpdate={(newValues) =>
            setValues(newValues.map(scaleFnInverse).map(limiter))
          }
        >
          <Rail>{() => <RailBase />}</Rail>

          <Handles>
            {({ handles, getHandleProps }) => (
              <>
                {handles.map(({ id, percent }, i) => (
                  <Handle key={i} percent={percent} {...getHandleProps(id)} />
                ))}
              </>
            )}
          </Handles>

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
                    />
                  ),
                )}
              </>
            )}
          </Tracks>
        </OriginalSlider>
      </SliderContainer>
    </Container>
  )
}
