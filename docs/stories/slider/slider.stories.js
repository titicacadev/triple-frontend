import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { number, select, boolean } from '@storybook/addon-knobs'
import { SingleSlider, RangeSlider } from '@titicaca/slider'
import { Text, Container } from '@titicaca/core-elements'

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
  .add('단일 (tootip)', () => {
    const [value, setValue] = useState(0)

    return (
      <Container padding={{ top: 50, bottom: 50, left: 20, right: 20 }}>
        <SingleSlider
          initialValue={value}
          min={0}
          max={10}
          railHeight={number('레일 높이', 8)}
          displayPercent={boolean('퍼센트 노출', true)}
          ActivateHandlerShadow={boolean('핸들러 그림자', true)}
          color={select('핸들러 색상', ['white', 'blue'], 'blue')}
          handlerSize={number('핸들러 사이즈', 40)}
          handlerBorderWeight={number('핸들러 테두리 굵기', 4)}
          onChange={setValue}
          toolTipLabel={['별로였어요', '괜찮았어요', '아주 좋았어요']}
          debounceTime={number('debounceTime')}
        />
      </Container>
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
