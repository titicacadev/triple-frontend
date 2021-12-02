import React from 'react'
import { GlobalStyle } from '@titicaca/core-elements'
import { RouterContext } from "next/dist/shared/lib/router-context"; // next 12

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
]

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
