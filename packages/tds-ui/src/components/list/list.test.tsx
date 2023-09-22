import { render, screen } from '@testing-library/react'

import { List } from './list'

it('should accept weight divided prop', () => {
  render(
    <List divided dividerWeight={10}>
      <List.Item />
    </List>,
  )

  const element = screen.getByRole('list')

  expect(element).toHaveStyleRule('border-bottom', 'solid 10px #efefef', {
    modifier: '> li:not(:last-child)::after',
  })
  expect(element).toHaveStyleRule('content', "''", {
    modifier: '> li:not(:last-child)::after',
  })
})

it('should accept marker prop', () => {
  render(
    <List marker>
      <List.Item />
    </List>,
  )

  const element = screen.getByRole('list')

  expect(element).toHaveStyleRule('content', "'·'", {
    modifier: '> li::before',
  })
})

it('should override style with css prop', () => {
  render(
    <List css={{ color: 'red' }}>
      <List.Item />
    </List>,
  )

  const element = screen.getByRole('list')

  expect(element).toHaveStyleRule('color', 'red')
})
