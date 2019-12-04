import { addParameters, addDecorator, configure } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withKnobs } from '@storybook/addon-knobs'
import '@titicaca/core-elements/lib/global-style'

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

addDecorator(jsxDecorator)
addDecorator(withKnobs)

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
})

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module)
