import { addParameters, addDecorator, configure } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withKnobs } from '@storybook/addon-knobs'
import '@titicaca/core-elements/lib/global-style'

addDecorator(jsxDecorator)
addDecorator(withKnobs)

addParameters({
  viewport: {
    defaultViewport: 'iPhone X',
  },
})

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module)
