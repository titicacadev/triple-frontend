import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { defaultTheme } from '@titicaca/tds-theme'

import { Popup } from './popup'

function ThemeWrapper({ children }: PropsWithChildren<unknown>) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
}

test('올바른 aria attributes를 가집니다.', () => {
  const onClose = jest.fn()

  render(
    <Popup open onClose={onClose}>
      contents
    </Popup>,
    { wrapper: ThemeWrapper },
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
    { wrapper: ThemeWrapper },
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
    { wrapper: ThemeWrapper },
  )

  await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 1')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 2')).toHaveFocus())

  await user.tab()

  await waitFor(() => expect(screen.getByText('Button 1')).toHaveFocus())
})
