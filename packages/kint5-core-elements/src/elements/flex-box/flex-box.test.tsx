import { render, screen } from '@testing-library/react'

import { FlexBox } from './flex-box'

it('should accept style shortcut props', () => {
  render(
    <FlexBox
      flex
      flexGrow={1}
      flexShrink={1}
      flexBasis="auto"
      flexDirection="column"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      alignSelf="center"
      order={1}
      gap="10px"
    >
      flexbox
    </FlexBox>,
  )

  const element = screen.getByText('flexbox')

  expect(element).toHaveStyleRule('display', 'flex')
  expect(element).toHaveStyleRule('flex-grow', '1')
  expect(element).toHaveStyleRule('flex-shrink', '1')
  expect(element).toHaveStyleRule('flex-basis', 'auto')
  expect(element).toHaveStyleRule('flex-direction', 'column')
  expect(element).toHaveStyleRule('flex-wrap', 'wrap')
  expect(element).toHaveStyleRule('justify-content', 'center')
  expect(element).toHaveStyleRule('align-items', 'center')
  expect(element).toHaveStyleRule('align-content', 'center')
  expect(element).toHaveStyleRule('align-self', 'center')
  expect(element).toHaveStyleRule('order', '1')
  expect(element).toHaveStyleRule('gap', '10px')
})

it('should override style with css prop', () => {
  render(
    <FlexBox justifyContent="center" css={{ justifyContent: 'flex-end' }}>
      flexbox
    </FlexBox>,
  )

  const element = screen.getByText('flexbox')

  expect(element).toHaveStyleRule('justify-content', 'flex-end')
})
