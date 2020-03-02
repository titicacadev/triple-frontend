import React from 'react'
import { withKnobs, number } from '@storybook/addon-knobs'

import Container from './components/container'

export default {
  title: 'Style-box | Style-box',
  decorators: [withKnobs],
}

export const BaseContinaer = () => (
  <Container
    margin={{ top: number('기본 마진 top', 0) }}
    padding={{ top: 200 }}
    ellipsis
  >
    Container
  </Container>
)

BaseContinaer.story = {
  name: 'Container',
}
