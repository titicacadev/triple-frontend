import { render, screen } from '@testing-library/react'

import { ButtonBase } from './button-base'

test('type attribute 기본값은 button 입니다.', () => {
  render(<ButtonBase>Default</ButtonBase>)

  expect(screen.getByText('Default')).toHaveAttribute('type', 'button')
})

test('type attribute를 변경할 수 있습니다.', () => {
  render(
    <>
      <ButtonBase type="button">Button</ButtonBase>
      <ButtonBase type="submit">Submit</ButtonBase>
      <ButtonBase type="reset">Reset</ButtonBase>
    </>,
  )

  expect(screen.getByText('Button')).toHaveAttribute('type', 'button')
  expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit')
  expect(screen.getByText('Reset')).toHaveAttribute('type', 'reset')
})
