import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
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
      buttonText="객실예약"
      description="10,000원 쿠폰 할인 가능"
    />
  ))
  .add('Fixed (Tooltip) ', () => (
    <Pricing
      fixed
      active={boolean('열림', true)}
      basePrice={30000}
      salePrice={25000}
      buttonText="객실예약"
      description="10,000원 쿠폰 할인 가능"
      tooltipLabel="쿠폰사용시 -15,000원 더 할인!"
      onTooltipClick={boolean('툴팁액션', true)}
    />
  ))
