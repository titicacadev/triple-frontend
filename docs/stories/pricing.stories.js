import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import Pricing from '@titicaca/pricing'

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
      label={text('라벨')}
      buttonText="객실예약"
      description={text('설명')}
      tooltipLabel={text('툴팁 라벨', '쿠폰사용시 -15,000원 더 할인!')}
      onTooltipClick={boolean('툴팁액션', true)}
    />
  ))
