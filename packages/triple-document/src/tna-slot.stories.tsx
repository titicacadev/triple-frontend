import type { Meta } from '@storybook/react'
import { ScrapsProvider } from '@titicaca/react-contexts'
import { appWithTranslation } from '@titicaca/next-i18next'
import { rest } from 'msw'

import { koCommonWeb } from '../../i18n/src/assets/ko/common-web'
import { jaCommonWeb } from '../../i18n/src/assets/ja/common-web'
import { zhTwCommonWeb } from '../../i18n/src/assets/zh-TW/common-web'

import ELEMENTS from './elements'
import SLOTS from './mocks/slots.sample.json'

const locales = ['ko', 'ja', 'zh-TW']
const resources = {
  ko: {
    'common-web': koCommonWeb,
  },
  ja: {
    'common-web': jaCommonWeb,
  },
  'zh-TW': {
    'common-web': zhTwCommonWeb,
  },
}

const { tnaProducts: TnaProducts } = ELEMENTS

export default {
  title: 'triple-document / T&A Slot',
  component: TnaProducts,
  decorators: [
    (Story, context) => {
      const App = appWithTranslation(Story, {
        i18n: { locales, defaultLocale: locales[0] },
        lng: context.globals.locale,
        fallbackLng: 'ko',
        resources,
        defaultNS: 'common-web',
        serializeConfig: false,
      })

      return <App pageProps={{}} />
    },
  ],
} as Meta

export function InTripleDocument() {
  return (
    <ScrapsProvider>
      <TnaProducts
        value={{
          slotId: 1546,
        }}
      />
    </ScrapsProvider>
  )
}
InTripleDocument.storyName = 'Triple-document에 포함된 Slot'
InTripleDocument.parameters = {
  msw: {
    handlers: [
      rest.get('/api/tna-v2/slots/:slotId', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(SLOTS))
      }),
    ],
  },
}
