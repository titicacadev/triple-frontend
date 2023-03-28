import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Popup from './popup'

test('올바른 aria attributes를 가집니다.', async () => {
  const onClose = jest.fn()

  await act(() => {
    render(
      <Popup open onClose={onClose}>
        contents
      </Popup>,
    )
  })

  const modal = screen.getByRole('dialog')

  expect(modal).toHaveAttribute('role', 'dialog')
  expect(modal).toHaveAttribute('aria-modal', 'true')
})

test('외부를 클릭하면 닫습니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  await act(() => {
    render(
      <Popup open onClose={onClose}>
        contents
      </Popup>,
    )
  })

  await user.click(document.body)

  expect(onClose).toHaveBeenCalledTimes(1)
})

test('ESC 키를 누르면 닫습니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  await act(() => {
    render(
      <Popup open onClose={onClose}>
        contents
      </Popup>,
    )
  })

  await user.keyboard('{Escape}')

  expect(onClose).toHaveBeenCalledTimes(1)
})

test('focus trap을 사용합니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  await act(() => {
    render(
      <Popup open onClose={onClose}>
        <button>Button 1</button>
        <button>Button 2</button>
      </Popup>,
    )
  })

  await user.tab()

  expect(document.activeElement).toHaveTextContent('Button 1')

  await user.tab()

  expect(document.activeElement).toHaveTextContent('Button 2')

  await user.tab()

  expect(document.activeElement).toHaveTextContent('Button 1')
})
