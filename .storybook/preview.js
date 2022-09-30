import { RouterContext } from 'next/dist/shared/lib/router-context' // next 12

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
