import React, { useState } from 'react'
import styled from 'styled-components'
import { number, select, boolean } from '@storybook/addon-knobs'
import { SingleSlider, RangeSlider } from '@titicaca/slider'
import { Text } from '@titicaca/core-elements'

const Wrapper = styled.div`
  padding: 50px 20px;
`

export default {
  title: 'Slider',
}

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

export function BasicSingleSlider() {
  const [value, setValue] = useState(500000)

  return (
    <Wrapper>
      <Text>컴포넌트 외부: {value}</Text>
      <SingleSlider
        initialValue={value}
        min={0}
        max={500000}
        onChange={setValue}
        labelComponent={SingleLabel}
        debounceTime={number('debounceTime')}
        nonLinear={boolean('nonLinear', false)}
      />
    </Wrapper>
  )
}

BasicSingleSlider.story = {
  name: 'Single Slider',
}

export function SingleSliderWithToolTip() {
  const [value, setValue] = useState(0)

  return (
    <Wrapper>
      <SingleSlider
        initialValue={value}
        min={0}
        max={10}
        railHeight={number('레일 높이', 8)}
        displayPercent={boolean('퍼센트 노출', true)}
        color={select('thumb 색상', ['white', 'blue'], 'blue')}
        thumbActivateShadow={boolean('thumb 그림자', true)}
        thumbSize={number('thumb 사이즈', 40)}
        thumbBorderWeight={number('thumb 테두리 굵기', 4)}
        displayMark={boolean('인디케이터 노출', true)}
        onChange={setValue}
        toolTipLabel={['별로였어요', '괜찮았어요', '아주 좋았어요']}
        debounceTime={number('debounceTime')}
      />
    </Wrapper>
  )
}

SingleSliderWithToolTip.story = {
  name: 'Single Slider (Tooltip)',
}

export function BasicRangeSlider() {
  const [values, setValues] = useState([0, 500000])

  return (
    <Wrapper>
      <Text>컴포넌트 외부: {values.join(', ')}</Text>
      <RangeSlider
        initialValues={values}
        min={0}
        max={500000}
        onChange={setValues}
        labelComponent={RangeLabel}
        nonLinear={boolean('nonLinear', false)}
        debounceTime={number('debounceTime')}
      />
    </Wrapper>
  )
}

BasicRangeSlider.story = {
  name: 'Range Slider',
}
