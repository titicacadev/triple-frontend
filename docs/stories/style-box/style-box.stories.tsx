import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import Container from './components/container'

export default {
  title: 'Style-box | Style-box',
  decorators: [withKnobs],
}

export const BaseContinaer = () => (
  <Container margin={{ top: 10 }}>Container</Container>
)

BaseContinaer.story = {
  name: 'Container',
}
