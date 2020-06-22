import React from 'react'
import { boolean, text, number } from '@storybook/addon-knobs'
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
  return (
    <RollingSpinner imageUrls={logos} size={number('size', 36)}>
      {boolean('children', false) ? (
        <Container textAlign="center" margin={{ bottom: 20 }}>
          <Text size="huge" lineHeight={1.29} bold>
            {`항공을 예약하면, \n 나만의 여행일정이 생겨요!`}
          </Text>
          <Text size="small" lineHeight={1.29} alpha={0.5} margin={{ top: 14 }}>
            {`200개 도시 무료가이드로 \n 나머지 준비도 완성해보세요.`}
          </Text>
        </Container>
      ) : null}
    </RollingSpinner>
  )
}

BaseRollingSpinner.story = {
  name: '롤링 스피너',
}
