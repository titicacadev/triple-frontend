import renderer from 'react-test-renderer'

import { List } from './list'

it('should accept weight divided prop', () => {
  const tree = renderer
    .create(
      <List divided dividerWeight={10}>
        <List.Item />
      </List>,
    )
    .toJSON()

  expect(tree).toHaveStyleRule('border-bottom', 'solid 10px #efefef', {
    modifier: '> li:not(:last-child)::after',
  })
  expect(tree).toHaveStyleRule('content', "''", {
    modifier: '> li:not(:last-child)::after',
  })
})

it('should accept marker prop', () => {
  const tree = renderer
    .create(
      <List marker>
        <List.Item />
      </List>,
    )
    .toJSON()

  expect(tree).toHaveStyleRule('content', "'·'", { modifier: '> li::before' })
})

it('should override style with css prop', () => {
  const tree = renderer
    .create(
      <List css={{ color: 'red' }}>
        <List.Item />
      </List>,
    )
    .toJSON()

  expect(tree).toHaveStyleRule('color', 'red')
})
