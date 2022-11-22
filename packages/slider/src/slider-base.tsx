import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  ComponentType,
  PropsWithChildren,
} from 'react'
import styled from 'styled-components'
import { Rail, Slider as OriginalSlider, Handles } from 'react-compound-slider'
import { debounce } from '@titicaca/view-utilities'
import { Container } from '@titicaca/core-elements'

import Handle from './handle'
import { ValueTransformer, SliderValue } from './types'

export interface SliderBaseProps {
  initialValues?: SliderValue
  /**
   * 증감량의 단위 정확하게 작동하지 않으니 상대적인 값으로 생각해주세요.
   */
  step?: number
  /**
   * 범위의 최소값.
   */
  min?: number
  /**
   * 범위의 최대값.
   */
  max?: number
  labelComponent?: ComponentType<{
    values: SliderValue
  }>
  onChange: (values: SliderValue) => void
  /**
   * 비선형적으로 증감하게 만듧니다.
   */
  nonLinear?: boolean
  /**
   * onChange 함수에 걸리는 debounce 시간 (ms).
   */
  debounceTime?: number
  /**
   * initialValues가 step의 배수가 아닐 경우 가까운 숫자로 조정
   */
  adjustInitValues?: boolean
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

const RailBase = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 4px;
  background-color: #efefef;
  height: 3px;
  transform: translate(0, -50%);
`
const adjustMax = (maxVal: number, step: number) =>
  maxVal % step ? Math.ceil(maxVal / step) * step : maxVal
const adjustMin = (minVal: number, step: number) =>
  minVal % step ? Math.floor(minVal / step) * step : minVal

export default function SliderBase({
  step = 1,
  initialValues,
  min = 0,
  max = 100,
  onChange,
  labelComponent: LabelComponent,
  nonLinear,
  debounceTime = 500,
  adjustInitValues,
  children,
}: PropsWithChildren<SliderBaseProps>) {
  const [values, setValues] = useState<SliderValue>(
    adjustInitValues && initialValues
      ? [adjustMin(initialValues[0], step), adjustMax(initialValues[1], step)]
      : initialValues || [0],
  )

  const adjustedMin = adjustMin(min, step)
  const adjustedMax = adjustMax(max, step)

  const [scaleFn, scaleFnInverse] = nonLinear
    ? NON_LINEAR_FN_SET
    : LINEAR_FN_SET

  const limiter: ValueTransformer = (value) => {
    if (value < adjustedMin) {
      return adjustedMin
    }
    if (value > adjustedMax) {
      return adjustedMax
    }
    return value
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(debounce(onChange, debounceTime), [
    onChange,
    debounceTime,
  ])

  const adjustedValues = useMemo(() => {
    if (values.length === 1) {
      return [Math.max(min, values[0])]
    } else {
      return [Math.max(min, values[0]), Math.min(max, values[1])]
    }
  }, [max, min, values])

  useEffect(() => {
    debouncedChangeHandler(adjustedValues)
  }, [adjustedValues]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      {LabelComponent ? <LabelComponent values={adjustedValues} /> : null}

      <SliderContainer>
        <OriginalSlider
          values={values.map(scaleFn)}
          mode={2}
          step={scaleFn(step)}
          domain={[adjustedMin, adjustedMax].map(scaleFn)}
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
          <Rail>{() => <RailBase />}</Rail>

          <Handles>
            {({ handles, getHandleProps }) => (
              <>
                {handles.map(({ id, percent }, i) => (
                  <Handle
                    key={i}
                    percent={percent}
                    {...getHandleProps(id)}
                    tabIndex={0}
                    role="slider"
                    aria-valuemax={
                      i === 0 && adjustedValues.length > 1
                        ? adjustedValues[1] - step
                        : max
                    }
                    aria-valuemin={i === 0 ? min : adjustedValues[0] + step}
                    aria-valuenow={adjustedValues[i]}
                    aria-orientation="horizontal"
                  />
                ))}
              </>
            )}
          </Handles>

          {children}
        </OriginalSlider>
      </SliderContainer>
    </Container>
  )
}
