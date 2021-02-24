import React, { useState } from 'react'
import { number, boolean } from '@storybook/addon-knobs'
import { SingleSlider, RangeSlider } from '@titicaca/slider'
import { Text } from '@titicaca/core-elements'

function SingleLabel({ value }: { value: number }) {
  return <Text size="large">컴포넌트 내부: {value}</Text>
}

function RangeLabel({
  fromValue,
  toValue,
}: {
  fromValue: number
  toValue: number
}) {
  return (
    <Text size="large">
      컴포넌트 내부: {fromValue} ~ {toValue}
    </Text>
  )
}

export default {
  title: 'slider | Slider',
}

export function BaseSingleSlider() {
  const [value, setValue] = useState(500000)

  return (
    <div>
      컴포넌트 외부: {value}
      <SingleSlider
        initialValue={value}
        min={0}
        max={500000}
        onChange={setValue}
        labelComponent={SingleLabel}
        debounceTime={number('debounceTime', 800)}
        nonLinear={boolean('nonLinear', false)}
      />
    </div>
  )
}

BaseSingleSlider.storyName = 'SingleSlider'

export function BaseRangeSlider() {
  const [values, setValues] = useState([0, 500000])
  return (
    <div>
      컴포넌트 외부: {values.join(', ')}
      <RangeSlider
        initialValues={values}
        min={0}
        max={500000}
        onChange={([form, to]) => {
          setValues([form, to])
        }}
        labelComponent={RangeLabel}
        debounceTime={number('debounceTime', 800)}
        nonLinear={boolean('nonLinear', false)}
      />
    </div>
  )
}

BaseRangeSlider.storyName = 'RangeSlider'

export function AdjustedRangeSlider() {
  const [values, setValues] = useState([1, 31])
  return (
    <div>
      컴포넌트 외부: {values.join(', ')}
      <RangeSlider
        initialValues={values}
        min={1}
        max={31}
        step={3}
        onChange={([form, to]) => {
          setValues([form, to])
        }}
        adjustInitValues
        labelComponent={RangeLabel}
        debounceTime={number('debounceTime', 800)}
        nonLinear={boolean('nonLinear', false)}
      />
    </div>
  )
}

AdjustedRangeSlider.storyName = 'AdjustedRangeSlider'
