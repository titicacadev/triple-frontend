import { render, screen } from '@testing-library/react'

import { Text } from './text'

it('should have default styles', () => {
  render(<Text>text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('overflow-wrap', 'break-word')
  expect(element).toHaveStyleRule('float', 'none')
  expect(element).toHaveStyleRule('font-weight', '500')
  expect(element).toHaveStyleRule('white-space', 'pre-line')
})

it('should accept style shortcut props', () => {
  render(
    <Text
      cursor="pointer"
      floated="left"
      textAlign="right"
      whiteSpace="pre"
      wordBreak="keep-all"
    >
      text
    </Text>,
  )

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('cursor', 'pointer')
  expect(element).toHaveStyleRule('float', 'left')
  expect(element).toHaveStyleRule('text-align', 'right')
  expect(element).toHaveStyleRule('white-space', 'pre')
  expect(element).toHaveStyleRule('word-break', 'keep-all')
})

it('should accept inline prop', () => {
  render(<Text inline>text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('display', 'inline')
})

it('should accept inlineBlock prop', () => {
  render(<Text inlineBlock>text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('display', 'inline-block')
})

it('should take on inlineBlock than inline when both are passed', () => {
  render(
    <Text inline inlineBlock>
      text
    </Text>,
  )

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('display', 'inline-block')
})

it('should accept bold prop', () => {
  render(<Text bold>text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('font-weight', 'bold')
})

it('should take center prop', () => {
  render(<Text center>text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('text-align', 'center')
})

it('should take on textAlign than center when both are passed', () => {
  render(
    <Text center textAlign="right">
      text
    </Text>,
  )

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('text-align', 'right')
})

it('should accept strikethrough prop', () => {
  render(<Text strikethrough>text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('text-decoration', 'line-through')
})

it('should accept underline prop', () => {
  render(<Text underline>text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('text-decoration', 'underline')
})

it('should take on strikethrough than underline when both are passed', () => {
  render(
    <Text strikethrough underline>
      text
    </Text>,
  )

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('text-decoration', 'line-through')
})

it('should accept color prop', () => {
  render(<Text color="white">text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('color', 'rgba(255,255,255,1)')
})

it('should accept color prop with alpha', () => {
  render(
    <Text alpha={0.5} color="white">
      text
    </Text>,
  )

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('color', 'rgba(255,255,255,0.5)')
})

it('should accept spacing props', () => {
  render(
    <Text
      margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
      padding={{ top: 50, right: 60, bottom: 70, left: 80 }}
    >
      text
    </Text>,
  )

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('margin', '10px 20px 30px 40px')
  expect(element).toHaveStyleRule('padding', '50px 60px 70px 80px')
})

it('should accept ellipsis mixin', () => {
  render(<Text ellipsis>text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('white-space', 'nowrap')
  expect(element).toHaveStyleRule('text-overflow', 'ellipsis')
  expect(element).toHaveStyleRule('overflow', 'hidden')
})

it('should accept maxLines mixin', () => {
  render(<Text maxLines={2}>text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('display', '-webkit-box')
  expect(element).toHaveStyleRule('-webkit-box-orient', 'vertical')
  expect(element).toHaveStyleRule('-webkit-line-clamp', '2')
  expect(element).toHaveStyleRule('text-overflow', 'ellipsis')
  expect(element).toHaveStyleRule('overflow', 'hidden')
})

it('should accept legacy typography props', () => {
  render(
    <Text size="large" lineHeight={1} letterSpacing={0.1}>
      text
    </Text>,
  )

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('font-size', '16px')
  expect(element).toHaveStyleRule('line-height', '1')
  expect(element).toHaveStyleRule('letter-spacing', '0.1px')
})

it('should accept textStyle mixin', () => {
  render(<Text textStyle="M">text</Text>)

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('font-size', '20px')
  expect(element).toHaveStyleRule('line-height', '24px')
  expect(element).toHaveStyleRule('letter-spacing', '-0.2px')
})

it('should ignore legacy typography props when textStyle mixin is passed', () => {
  render(
    <Text textStyle="M" size="large" lineHeight={1} letterSpacing={0.1}>
      text
    </Text>,
  )

  const element = screen.getByText('text')

  expect(element).toHaveStyleRule('font-size', '20px')
  expect(element).toHaveStyleRule('line-height', '24px')
  expect(element).toHaveStyleRule('letter-spacing', '-0.2px')
})
