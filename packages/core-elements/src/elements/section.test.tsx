import React from 'react'
import renderer from 'react-test-renderer'

import Section from './section'

import 'jest-styled-components'

it('should override style with css prop', () => {
  const tree = renderer
    .create(
      <Section position="absolute" css={{ position: 'fixed' }}>
        Section
      </Section>,
    )
    .toJSON()

  expect(tree).toHaveStyleRule('position', 'fixed')
})
