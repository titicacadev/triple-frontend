import React from 'react'
import { boolean, text } from '@storybook/addon-knobs'
import {
  Spinner,
  Text,
  Container,
  RollingSpinner,
} from '@titicaca/core-elements'

export default {
  title: 'Core-Elements | Spinner',
}

const TextElement = () => (
  <Container margin={{ top: 12 }}>
    <Text bold lineHeight={1.57}>
      {text('타이틀', '보이는 가격 그대로 결제!')}
    </Text>
    <Text lineHeight={1.57}>
      {text('서브 타이틀', '트리플 가격은 세금 및 봉사료 포함 가격입니다.')}
    </Text>
  </Container>
)

export function BaseSpinner() {
  return (
    <>
      <Text>겨울왕국</Text>
      <Spinner full={boolean('배경 채우기', false)}>
        {boolean('문구 노출', false) && <TextElement />}
      </Spinner>
    </>
  )
}

BaseSpinner.story = {
  name: '기본 스피너',
}

export function BaseRollingSpinner() {
  const logos = [
    'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/7C.png',
    'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/TW.png',
    'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/AC.png',
  ]
  return <RollingSpinner imageUrls={logos} />
}

BaseRollingSpinner.story = {
  name: '롤링 스피너',
}
