import App from 'next/app'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import { StyleSheetManager, ThemeProvider, WebTarget } from 'styled-components'
import {
  buildTripleWebProps,
  BuildTripleWebPropsResult,
  TripleWeb,
} from '@titicaca/triple-web-nextjs-pages'
import { defaultTheme, GlobalStyle } from '@titicaca/tds-theme'
import isPropValid from '@emotion/is-prop-valid'

type MyAppProps = BuildTripleWebPropsResult

export default function MyApp({
  Component,
  pageProps,
  clientAppProvider,
  sessionProvider,
  userAgentProvider,
}: AppProps & MyAppProps) {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <TripleWeb
          clientAppProvider={clientAppProvider}
          envProvider={{
            afOnelinkId: '',
            afOnelinkPid: '',
            afOnelinkSubdomain: '',
            appUrlScheme: '',
            basePath: '/',
            defaultPageDescription: '',
            defaultPageTitle: '',
            facebookAppId: '',
            webUrlBase: '',
          }}
          i18nProvider={{ defaultLocale: 'ko' }}
          sessionProvider={sessionProvider}
          userAgentProvider={userAgentProvider}
        >
          <Component {...pageProps} />
        </TripleWeb>
      </ThemeProvider>
    </StyleSheetManager>
  )
}

MyApp.getInitialProps = async (
  context: AppContext,
): Promise<MyAppProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)

  return {
    ...ctx,
    ...(await buildTripleWebProps(context.ctx)),
  }
}

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName: string, target: WebTarget) {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName)
  }
  // For other elements, forward all props
  return true
}
