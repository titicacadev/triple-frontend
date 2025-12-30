import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { ActionSheet } from './action-sheet'

test('올바른 aria attributes를 가집니다.', () => {
  const onClose = jest.fn()

  render(
    <ActionSheet open title="Title" onClose={onClose}>
      contents
    </ActionSheet>,
  )

  const modal = screen.getByRole('dialog')

  expect(modal).toHaveAttribute('role', 'dialog')
  expect(modal).toHaveAttribute('aria-modal', 'true')
  expect(modal).toHaveAttribute('aria-labelledby', screen.getByText('Title').id)
})

test('외부를 클릭하면 닫습니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  render(
    <>
      <button>outside</button>
      <ActionSheet open title="Title" onClose={onClose}>
        contents
      </ActionSheet>
    </>,
  )

  await user.click(screen.getByText('outside'))

  expect(onClose).toHaveBeenCalledTimes(1)
})

test('ESC 키를 누르면 닫습니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  render(
    <ActionSheet open title="Title" onClose={onClose}>
      contents
    </ActionSheet>,
  )

  await user.keyboard('{Escape}')

  expect(onClose).toHaveBeenCalledTimes(1)
})

test('focus trap을 사용합니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  render(
    <ActionSheet open title="Title" onClose={onClose}>
      <button>Button 1</button>
      <button>Button 2</button>
    </ActionSheet>,
  )

  await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 1')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 2')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 1')).toHaveFocus())
})
