import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs'
import Pricing from '@titicaca/pricing'

storiesOf('Pricing', module)
  .addDecorator(withKnobs)
  .add('일반', () => <Pricing basePrice={30000} salePrice={25000} />)
  .add('Rich', () => (
    <Pricing
      basePrice={number('basePrice', 30000)}
      pricingNote={text('문구', '1박, 세금포함')}
      salePrice={25000}
      label="트리플가"
      rich
    />
  ))
  .add('Fixed', () => {
    const hasAction = boolean('툴팁액션', true)

    return (
      <Pricing
        fixed
        active={boolean('열림', true)}
        basePrice={30000}
        salePrice={25000}
        label={text('라벨')}
        buttonText="객실예약"
        description={text('설명')}
        tooltipLabel={text('툴팁 라벨', '쿠폰사용시 -15,000원 더 할인!')}
        onTooltipClick={hasAction ? () => window.alert('레릿꼬오') : null}
      />
    )
  })
