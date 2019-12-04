import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'

import { Spinner, Text, Container } from '@titicaca/core-elements'

storiesOf('Spinner', module).add('Basic ', () => {
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

  return (
    <>
      <Text>겨울왕국</Text>
      <Spinner
        full={boolean('배경 채우기', false)}
        element={boolean('문구 노출', false) && <TextElement />}
      />
    </>
  )
})
