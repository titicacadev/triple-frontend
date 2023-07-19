import { render, screen } from '@testing-library/react'

import { Responsive } from './responsive'

it('should have media query for maxWidth is passed', () => {
  render(<Responsive maxWidth={1000}>responsive</Responsive>)

  const element = screen.getByText('responsive')

  expect(element).toHaveStyleRule('display', 'none', {
    media: '(min-width:1001px)',
  })
})

it('should have media query when minWidth is passed', () => {
  render(<Responsive minWidth={1000}>responsive</Responsive>)

  const element = screen.getByText('responsive')

  expect(element).toHaveStyleRule('display', 'none', {
    media: '(max-width:999px)',
  })
})

it('should accept inline prop', () => {
  render(<Responsive inline>responsive</Responsive>)

  const element = screen.getByText('responsive')

  expect(element).toHaveStyleRule('display', 'inline')
})
