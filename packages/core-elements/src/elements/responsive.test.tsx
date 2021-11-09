import React from 'react'
import renderer from 'react-test-renderer'

import Responsive from './Responsive'

import 'jest-styled-components'

it('should have media query for maxWidth is passed', () => {
  const tree = renderer.create(<Responsive maxWidth={1000} />).toJSON()

  expect(tree).toHaveStyleRule('display', 'none', {
    media: '(min-width:1001px)',
  })
})

it('should have media query when minWidth is passed', () => {
  const tree = renderer.create(<Responsive minWidth={1000} />).toJSON()

  expect(tree).toHaveStyleRule('display', 'none', {
    media: '(max-width:999px)',
  })
})
