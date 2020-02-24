import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import { NumericSpinner } from '@titicaca/core-elements'

storiesOf('numeric-spinner | NumericSpinner', module)
  .add('숙박 인원', () => (
    <NumericSpinner
      size="big"
      label="성인"
      min={1}
      max={8}
      value={2}
      padding={{ top: 15, right: 125, bottom: 15, left: 16 }}
    />
  ))
  .add('스타일 변경', () => {
    const NewStyledNumericSpinner = styled(NumericSpinner)`
      > div:first-child {
        color: red;
      }
    `
    return (
      <NewStyledNumericSpinner
        size="big"
        label="성인"
        min={1}
        max={8}
        value={2}
        padding={{ top: 15, right: 125, bottom: 15, left: 16 }}
      ></NewStyledNumericSpinner>
    )
  })
