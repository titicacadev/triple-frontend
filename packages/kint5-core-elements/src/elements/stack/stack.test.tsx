import { render, screen } from '@testing-library/react'

import { Stack } from './stack'

it('should override style with css prop', () => {
  render(
    <Stack position="absolute" css={{ position: 'fixed' }}>
      stack
    </Stack>,
  )

  const element = screen.getByText('stack')

  expect(element).toHaveStyleRule('position', 'fixed')
})
