import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

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

storiesOf('Slider', module)
  .add('기본', () => {
    const [value, setValue] = useState(500000)

    return (
      <div style={{ height: '4000px', padding: '500px 20px 0 20px' }}>
        컴포넌트 외부: {value}
        <SingleSlider
          initialValue={value}
          min={0}
          max={500000}
          onChange={setValue}
          labelComponent={SingleLabel}
        />
      </div>
    )
  })
  .add('범위', () => {
    const [values, setValues] = useState([0, 500000])

    return (
      <div style={{ height: '4000px', padding: '500px 20px 0 20px' }}>
        컴포넌트 외부: {values.join(', ')}
        <RangeSlider
          initialValues={values}
          min={0}
          max={500000}
          onChange={setValues}
          labelComponent={RangeLabel}
        />
      </div>
    )
  })
  .add('Non linear', () => {
    const [values, setValues] = useState([0, 500000])

    return (
      <div style={{ height: '4000px', padding: '500px 20px 0 20px' }}>
        컴포넌트 외부: {values.join(', ')}
        <RangeSlider
          initialValues={values}
          min={0}
          max={500000}
          onChange={setValues}
          labelComponent={RangeLabel}
          nonLinear
        />
      </div>
    )
  })
