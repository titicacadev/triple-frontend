import renderer from 'react-test-renderer'

import Stack from './stack'

import 'jest-styled-components'

it('should override style with css prop', () => {
  const tree = renderer.create(<Stack css={{ position: 'fixed' }} />).toJSON()

  expect(tree).toHaveStyleRule('position', 'fixed')
})
