/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react'

import { Section } from './section'

it('should render null if children is empty', () => {
  render(<Section data-testid="id" />)

  const element = screen.queryByText('id')

  expect(element).not.toBeInTheDocument()
})

it('should accept anchor prop', () => {
  render(<Section anchor="anchorValue">section</Section>)

  const element = screen.getByText('section')

  expect(element).toHaveAttribute('id', 'anchorValue')
})

it('should show top divider', () => {
  render(<Section divider="top">section</Section>)

  const element = screen.getByText('section')

  expect(element.previousSibling).toBeInTheDocument()
  expect(element.nextSibling).not.toBeInTheDocument()
})

it('should show bottom divider', () => {
  render(<Section divider="bottom">section</Section>)

  const element = screen.getByText('section')

  expect(element.previousSibling).not.toBeInTheDocument()
  expect(element.nextSibling).toBeInTheDocument()
})

it('should override style with css prop', () => {
  render(
    <Section position="absolute" css={{ position: 'fixed' }}>
      section
    </Section>,
  )

  const element = screen.getByText('section')

  expect(element).toHaveStyleRule('position', 'fixed')
})
