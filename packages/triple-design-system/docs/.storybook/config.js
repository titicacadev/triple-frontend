import { addParameters, addDecorator, configure } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withKnobs } from '@storybook/addon-knobs'

addDecorator(jsxDecorator)
addDecorator(withKnobs)

addParameters({
  viewport: {
    defaultViewport: 'iPhone X',
  },
})

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
