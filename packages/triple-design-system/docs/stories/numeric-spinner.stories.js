import React from 'react'
import { storiesOf } from '@storybook/react'

import { NumericSpinner } from '@titicaca/triple-design-system'

storiesOf('NumericSpinner', module).add('숙박 인원', () => (
  <NumericSpinner
    borderless
    size="big"
    label="성인"
    min={1}
    max={8}
    value={2}
  />
))
