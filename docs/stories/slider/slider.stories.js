import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { number } from '@storybook/addon-knobs'
import { SingleSlider, RangeSlider } from '@titicaca/slider'
import { Text } from '@titicaca/core-elements'

function SingleLabel({ value }) {
  return <Text size="large">컴포넌트 내부: {value}</Text>
}

function RangeLabel({ fromValue, toValue }) {
  return (
    <Text size="large">
      컴포넌트 내부: {fromValue} ~ {toValue}
    </Text>
  )
}

storiesOf('slider | Slider', module)
  .add('기본', () => <SingleSlider onChange={action('onChange')} />)
  .add('단일', () => {
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
          debounceTime={number('debounceTime')}
        />
      </div>
    )
  })
  .add('단일 non linear', () => {
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
          nonLinear
          debounceTime={number('debounceTime')}
        />
      </div>
    )
  })
  .add('범위', () => {
    const [values, setValues] = useState([0, 500000])

    return (
      <div>
        컴포넌트 외부: {values.join(', ')}
        <RangeSlider
          initialValues={values}
          min={0}
          max={500000}
          onChange={setValues}
          labelComponent={RangeLabel}
          debounceTime={number('debounceTime')}
        />
      </div>
    )
  })
  .add('범위 non linear', () => {
    const [values, setValues] = useState([0, 500000])

    return (
      <div>
        컴포넌트 외부: {values.join(', ')}
        <RangeSlider
          initialValues={values}
          min={0}
          max={500000}
          onChange={setValues}
          labelComponent={RangeLabel}
          nonLinear
          debounceTime={number('debounceTime')}
        />
      </div>
    )
  })
