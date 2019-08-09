import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import { Pricing } from '@titicaca/triple-design-system'

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
      suffix="박"
    />
  ))
