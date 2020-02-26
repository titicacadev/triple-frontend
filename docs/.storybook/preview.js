import React from 'react'
import { addDecorator } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withKnobs } from '@storybook/addon-knobs'
import { GlobalStyle } from '@titicaca/core-elements'

addDecorator(jsxDecorator)
addDecorator(withKnobs)
addDecorator((stories) => (
  <>
    <GlobalStyle />
    {stories()}
  </>
))
