import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

import Slider from '@titicaca/slider'
import { Text } from '@titicaca/core-elements'

function Label({ fromValue, toValue }) {
  return (
    <Text size="large">
      컴포넌트 내부: {fromValue} ~ {toValue}
    </Text>
  )
}

storiesOf('Slider', module).add('일반', () => {
  const [values, setValues] = useState([])

  return (
    <div style={{ height: '4000px', padding: '500px 20px 0 20px' }}>
      컴포넌트 외부: {values.join(', ')}
      <Slider
        min={0}
        max={500000}
        onChange={setValues}
        labelComponent={Label}
      />
    </div>
  )
})
