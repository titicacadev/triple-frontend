import React, {
  useState,
  useEffect,
  useCallback,
  ComponentType,
  PropsWithChildren,
} from 'react'
import styled from 'styled-components'
import {
  Rail as RailContainer,
  Slider as OriginalSlider,
  Handles,
} from 'react-compound-slider'
import { debounce } from '@titicaca/view-utilities'
import { Container } from '@titicaca/core-elements'

import Rail from './rail'
import Handle from './handle'
import { ValueTransformer, SliderValue } from './types'
import MarkFrame from './mark'
import { Color } from './color'

export interface SliderBaseProps {
  initialValues?: SliderValue
  step?: number
  min?: number
  max?: number
  labelComponent?: ComponentType<{
    values: SliderValue
  }>
  handlerBorderWeight?: number
  displayPercent?: boolean
  displayMark?: boolean
  onChange: (values: SliderValue) => void
  nonLinear?: boolean
  debounceTime?: number
  railHeight?: number
  handlerSize?: number
  ActivateHandlerShadow?: boolean
  color?: Color
}

const IDENTICAL_SCALE: ValueTransformer = (x) => x

const LINEAR_FN_SET: ValueTransformer[] = [IDENTICAL_SCALE, IDENTICAL_SCALE]

const EXPONENT = 1 / Math.E
const NON_LINEAR_FN_SET: ValueTransformer[] = [
  (x) => Math.round(Math.pow(x, EXPONENT)),
  (x) => Math.round(Math.pow(x, 1 / EXPONENT)),
]

const SliderContainer = styled.div`
  position: relative;
  height: 18px;
  touch-action: pan-x;
`

export default function SliderBase({
  step = 1,
  initialValues,
  min = 0,
  max = 100,
  onChange,
  labelComponent: LabelComponent,
  nonLinear,
  displayPercent,
  displayMark,
  debounceTime = 500,
  handlerSize = 18,
  handlerBorderWeight = 3,
  ActivateHandlerShadow,
  color = 'white',
  railHeight = 3,
  children,
}: PropsWithChildren<SliderBaseProps>) {
  const [values, setValues] = useState<SliderValue>(initialValues || [0])

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

  const debouncedChangeHandler = useCallback(debounce(onChange, debounceTime), [
    onChange,
    debounceTime,
  ])

  useEffect(() => {
    debouncedChangeHandler(values)
  }, [values]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      {LabelComponent ? <LabelComponent values={values} /> : null}

      <SliderContainer>
        <OriginalSlider
          values={values.map(scaleFn)}
          mode={2}
          step={scaleFn(step)}
          domain={[min, max].map(scaleFn)}
          rootStyle={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
          }}
          onUpdate={(newValues) =>
            setValues(newValues.map(scaleFnInverse).map(limiter))
          }
        >
          <RailContainer>
            {() => <Rail railHeight={railHeight} />}
          </RailContainer>

          <Handles>
            {({ handles, getHandleProps }) => (
              <>
                {handles.map(({ id, percent }, i) => (
                  <Handle
                    key={i}
                    percent={percent}
                    color={color}
                    ActivateHandlerShadow={ActivateHandlerShadow}
                    displayPercent={displayPercent}
                    handlerBorderWeight={handlerBorderWeight}
                    handlerSize={handlerSize}
                    {...getHandleProps(id)}
                  />
                ))}
              </>
            )}
          </Handles>

          {children}
        </OriginalSlider>
        {displayMark ? (
          <MarkFrame min={min} max={max} railHeight={railHeight} />
        ) : null}
      </SliderContainer>
    </Container>
  )
}
