import React from 'react'
import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { GlobalStyle } from '@titicaca/core-elements'

addDecorator(withKnobs)
addDecorator((stories) => (
  <>
    <GlobalStyle />
    {stories()}
  </>
))
