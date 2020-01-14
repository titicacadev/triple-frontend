import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs'
import Pricing from '@titicaca/pricing'
import { Container, Text } from '@titicaca/core-elements'

function PricingDescription() {
  return (
    <Container>
      <Text size="tiny" inlineBlock margin={{ right: 3 }}>
        쿠폰 적용시
      </Text>
      <Text size="tiny" inlineBlock>
        270,500원
      </Text>
    </Container>
  )
}

storiesOf('Pricing', module)
  .addDecorator(withKnobs)
  .add('일반', () => <Pricing basePrice={30000} salePrice={25000} />)
  .add('Rich', () => {
    const useStringDescription = boolean('문자 타입의 설명')

    return (
      <Pricing
        basePrice={number('basePrice', 30000)}
        pricingNote={text('문구', '1박, 세금포함')}
        salePrice={25000}
        label="트리플가"
        rich
        description={
          useStringDescription ? (
            text('설명', '쿠폰적용시 10,000원')
          ) : (
            <PricingDescription />
          )
        }
      />
    )
  })
  .add('Fixed', () => {
    const useStringDescription = boolean('문자 타입의 설명')
    const useStringLabel = boolean('문자 타입의 라벨')

    return (
      <Pricing
        fixed
        active={boolean('열림', true)}
        basePrice={30000}
        salePrice={25000}
        label={
          useStringLabel ? (
            text('라벨', '1박 세금포함')
          ) : (
            <Text size="mini">1박 세금포함</Text>
          )
        }
        buttonText="객실예약"
        description={
          useStringDescription ? (
            text('설명', '쿠폰적용시 10,000원')
          ) : (
            <PricingDescription />
          )
        }
      />
    )
  })
