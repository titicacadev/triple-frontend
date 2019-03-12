import { addParameters, configure } from '@storybook/react'

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
