import { render, screen } from '@testing-library/react'

import { StickyHeader } from './sticky-header'

it('should override style with css prop', () => {
  render(<StickyHeader css={{ top: 10 }} />)

  const element = screen.getByRole('banner')

  expect(element).toHaveStyleRule('top', '10px')
})
