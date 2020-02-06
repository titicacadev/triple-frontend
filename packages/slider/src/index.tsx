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

interface SliderProps {
  initialValues?: SliderValue
  step?: number
  min: number
  max: number
  labelComponent?: ComponentType<{
    fromValue: SliderValue[0]
    toValue: SliderValue[1]
  }>
  onChange: (values: SliderValue) => void
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

export default function Slider({
  step = 1,
  initialValues,
  min,
  max,
  onChange,
  labelComponent: LabelComponent,
}: SliderProps) {
  const [values, setValues] = useState<SliderValue>(initialValues || [0, 0])

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
          values={values}
          mode={2}
          step={step}
          domain={[min, max]}
          rootStyle={{ position: 'relative' }}
          onUpdate={(values) => setValues(values)}
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
