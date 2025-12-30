import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import Popup from './popup'

test('올바른 aria attributes를 가집니다.', () => {
  const onClose = jest.fn()

  render(
    <Popup open onClose={onClose}>
      contents
    </Popup>,
  )

  const modal = screen.getByRole('dialog')

  expect(modal).toHaveAttribute('role', 'dialog')
  expect(modal).toHaveAttribute('aria-modal', 'true')
})

test('ESC 키를 누르면 닫습니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  render(
    <Popup open onClose={onClose}>
      contents
    </Popup>,
  )

  await user.keyboard('{Escape}')

  expect(onClose).toHaveBeenCalledTimes(1)
})

test('focus trap을 사용합니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  render(
    <Popup open onClose={onClose}>
      <button>Button 1</button>
      <button>Button 2</button>
    </Popup>,
  )

  await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 1')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 2')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 1')).toHaveFocus())
})
