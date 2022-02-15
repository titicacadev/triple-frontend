import { GlobalStyle } from '@titicaca/core-elements'
import { RouterContext } from 'next/dist/shared/lib/router-context' // next 12

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
]

export const parameters = {
  actions: {
    argTypesRegex: '^on.*',
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
