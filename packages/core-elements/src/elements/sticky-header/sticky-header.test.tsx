import renderer from 'react-test-renderer'

import { StickyHeader } from './sticky-header'

it('should override style with css prop', () => {
  const tree = renderer.create(<StickyHeader css={{ top: 10 }} />).toJSON()

  expect(tree).toHaveStyleRule('top', '10px')
})
