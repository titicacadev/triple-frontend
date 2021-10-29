import React from 'react'
import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { GlobalStyle } from '@titicaca/core-elements'
import { RouterContext } from 'next/dist/next-server/lib/router-context' // next < 11.2

addDecorator(withKnobs)
addDecorator((stories) => (
  <>
    <GlobalStyle />
    {stories()}
  </>
))

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
