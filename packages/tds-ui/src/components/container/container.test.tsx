import { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@titicaca/tds-theme'

import { Container } from './container'

function ThemeWrapper({ children }: PropsWithChildren<unknown>) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
}

test('should accept style shortcut props', () => {
  render(
    <Container
      position="absolute"
      display="inline-block"
      floated="none"
      backgroundColor="white"
      css={{
        textAlign: 'center',
        whiteSpace: 'pre',
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      container
    </Container>,
    { wrapper: ThemeWrapper },
  )

  const element = screen.getByText('container')

  expect(element).toHaveStyleRule('position', 'absolute')
  expect(element).toHaveStyleRule('text-align', 'center')
  expect(element).toHaveStyleRule('white-space', 'pre')
  expect(element).toHaveStyleRule('user-select', 'none')
  expect(element).toHaveStyleRule('display', 'inline-block')
  expect(element).toHaveStyleRule('cursor', 'pointer')
  expect(element).toHaveStyleRule('float', 'none')
  expect(element).toHaveStyleRule('background-color', 'rgba(255,255,255,1)')
})

test('should accept spacing props', () => {
  render(
    <Container
      css={{
        margin: '10px 20px 30px 40px',
        padding: '50px 60px 70px 80px',
      }}
    >
      container
    </Container>,
  )

  const element = screen.getByText('container')

  expect(element).toHaveStyleRule('margin', '10px 20px 30px 40px')
  expect(element).toHaveStyleRule('padding', '50px 60px 70px 80px')
})

test('should accept sizing props', () => {
  render(
    <Container
      css={{
        width: 10,
        height: 20,
        minWidth: 30,
        minHeight: 40,
        maxWidth: 50,
        maxHeight: 60,
      }}
    >
      container
    </Container>,
  )

  const element = screen.getByText('container')

  expect(element).toHaveStyleRule('width', '10px')
  expect(element).toHaveStyleRule('height', '20px')
  expect(element).toHaveStyleRule('min-width', '30px')
  expect(element).toHaveStyleRule('min-height', '40px')
  expect(element).toHaveStyleRule('max-width', '50px')
  expect(element).toHaveStyleRule('max-height', '60px')
})

test('should accept centered mixin', () => {
  render(<Container centered>container</Container>)

  const element = screen.getByText('container')

  expect(element).toHaveStyleRule('margin-left', 'auto')
  expect(element).toHaveStyleRule('margin-right', 'auto')
})

test('should accept borderRadius mixin', () => {
  render(<Container borderRadius={10}>container</Container>)

  const element = screen.getByText('container')

  expect(element).toHaveStyleRule('border-radius', '10px')
})

test('should accept clearing mixin', () => {
  render(
    <Container data-testid="test" clearing>
      container
    </Container>,
  )

  const element = screen.getByText('container')

  expect(element).toHaveStyleRule('content', "''", { modifier: '::after' })
  expect(element).toHaveStyleRule('display', 'block', { modifier: '::after' })
  expect(element).toHaveStyleRule('clear', 'both', { modifier: '::after' })
})

test('should accept horizontalScroll mixin', () => {
  render(<Container horizontalScroll>container</Container>)

  const element = screen.getByText('container')

  expect(element).toHaveStyleRule('white-space', 'nowrap')
  expect(element).toHaveStyleRule('overflow', 'auto hidden')
})

test('should accept shadow mixin', () => {
  render(<Container shadow="large">container</Container>)

  const element = screen.getByText('container')

  expect(element).toHaveStyleRule('box-shadow', '0 0 30px 0 rgba(0,0,0,0.1)')
})

test('should override style with css prop', () => {
  render(
    <Container position="absolute" css={{ position: 'fixed' }}>
      container
    </Container>,
  )

  const element = screen.getByText('container')

  expect(element).toHaveStyleRule('position', 'fixed')
})
