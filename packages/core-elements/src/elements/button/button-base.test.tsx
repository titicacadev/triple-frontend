import { render } from '@testing-library/react'

import { ButtonBase } from './button-base'

import '@testing-library/jest-dom'

test('type attribute 기본값은 button 입니다.', () => {
  const { getByText } = render(<ButtonBase>Default</ButtonBase>)

  expect(getByText('Default')).toHaveAttribute('type', 'button')
})

test('type attribute를 변경할 수 있습니다.', () => {
  const { getByText } = render(
    <>
      <ButtonBase type="button">Button</ButtonBase>
      <ButtonBase type="submit">Submit</ButtonBase>
      <ButtonBase type="reset">Reset</ButtonBase>
    </>,
  )

  expect(getByText('Button')).toHaveAttribute('type', 'button')
  expect(getByText('Submit')).toHaveAttribute('type', 'submit')
  expect(getByText('Reset')).toHaveAttribute('type', 'reset')
})
