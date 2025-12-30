import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Modal } from './modal'

test('올바른 aria attributes를 가집니다.', () => {
  const onClose = jest.fn()

  render(
    <Modal open onClose={onClose}>
      <Modal.Body>
        <Modal.Title>Title</Modal.Title>
        <Modal.Description>Description</Modal.Description>
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action>Close</Modal.Action>
      </Modal.Actions>
    </Modal>,
  )

  const modal = screen.getByRole('dialog')

  expect(modal).toHaveAttribute('role', 'dialog')
  expect(modal).toHaveAttribute('aria-modal', 'true')
  expect(modal).toHaveAttribute('aria-labelledby', screen.getByText('Title').id)
  expect(modal).toHaveAttribute(
    'aria-describedby',
    screen.getByText('Description').id,
  )
})

test('외부를 클릭하면 닫습니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  render(
    <>
      <button>outside</button>
      <Modal open onClose={onClose}>
        <Modal.Body>
          <Modal.Title>Title</Modal.Title>
          <Modal.Description>Description</Modal.Description>
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action>Close</Modal.Action>
        </Modal.Actions>
      </Modal>
    </>,
  )

  await user.click(screen.getByText('outside'))

  expect(onClose).toHaveBeenCalledTimes(1)
})

test('ESC 키를 누르면 닫습니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  render(
    <Modal open onClose={onClose}>
      <Modal.Body>
        <Modal.Title>Title</Modal.Title>
        <Modal.Description>Description</Modal.Description>
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action>Close</Modal.Action>
      </Modal.Actions>
    </Modal>,
  )

  await user.keyboard('{Escape}')

  expect(onClose).toHaveBeenCalledTimes(1)
})

test('focus trap을 사용합니다.', async () => {
  const user = userEvent.setup()

  const onClose = jest.fn()

  render(
    <Modal open onClose={onClose}>
      <Modal.Body>
        <button>Button 1</button>
        <button>Button 2</button>
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action>Close</Modal.Action>
      </Modal.Actions>
    </Modal>,
  )

  await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 1')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 2')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 1')).toHaveFocus())
})
