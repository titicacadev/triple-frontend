import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import { Pricing, Text } from '@titicaca/triple-design-system'

storiesOf('Pricing', module)
  .addDecorator(withKnobs)
  .add('일반', () => <Pricing basePrice={30000} salePrice={25000} />)
  .add('Rich', () => (
    <Pricing basePrice={30000} salePrice={25000} label="트리플가" rich />
  ))
  .add('Fixed', () => (
    <Pricing
      fixed
      active={boolean('열림', true)}
      basePrice={30000}
      salePrice={25000}
      label="트리플 클럽가"
      buttonText="객실예약"
      description="10,000원 쿠폰 할인 가능"
    />
  ))
  .add('Fixed (Custom Label) ', () => (
    <Pricing
      fixed
      active={boolean('열림', true)}
      basePrice={30000}
      salePrice={25000}
      label={
        <Text size="mini" alpha={0.8}>
          트리플 클럽가
        </Text>
      }
      buttonText="객실예약"
    />
  ))
