import React from 'react'
import { addDecorator } from '@storybook/react'
import { GlobalStyle } from '@titicaca/core-elements'
import { RouterContext } from "next/dist/shared/lib/router-context"; // next 12

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
