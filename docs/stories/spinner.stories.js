import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text, number } from '@storybook/addon-knobs'

import { Spinner, Text, Button, Container } from '@titicaca/core-elements'

storiesOf('Spinner', module).add('Basic ', () => {
  const TextElement = () => (
    <Container margin={{ top: 12 }}>
      <Text size="small" bold lineHeight={1.57}>
        {text('타이틀', '보이는 가격 그대로 결제!')}
      </Text>
      <Text size="small" lineHeight={1.57}>
        {text('서브 타이틀', '트리플 가격은 세금 및 봉사료 포함 가격입니다.')}
      </Text>
    </Container>
  )

  return (
    <>
      <Button onClick={() => window.alert('재밌다!')}>겨울왕국</Button>
      <Spinner
        clickThrough={boolean('클릭 여부', false)}
        alpha={number('alpha', 0)}
      >
        {boolean('문구 노출', false) && <TextElement />}
      </Spinner>
    </>
  )
})
