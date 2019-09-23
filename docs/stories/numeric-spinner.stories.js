import React from 'react'
import { storiesOf } from '@storybook/react'

import { NumericSpinner } from '@titicaca/core-elements'

storiesOf('NumericSpinner', module).add('숙박 인원', () => (
  <NumericSpinner
    size="big"
    label="성인"
    min={1}
    max={8}
    value={2}
    padding={{ top: 15, right: 125, bottom: 15, left: 16 }}
  />
))
