import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { HistoryProvider } from '@titicaca/react-contexts'

import { LoginCTAModalProvider, useLoginCTAModal } from './login-cta-modal'

function OpenLoginModal() {
  const { show } = useLoginCTAModal()
  return (
    <button data-testid="modal-open-button" onClick={() => show()}>
      열기
    </button>
  )
}

describe('Login CTA Modal', () => {
  it('should render children.', () => {
    const { getByTestId } = render(
      <LoginCTAModalProvider>
        <div data-testid="child-element-1">42</div>

        <LoginCTAModalProvider>
          <div data-testid="child-element-2">4242</div>
        </LoginCTAModalProvider>
      </LoginCTAModalProvider>,
      { wrapper: HistoryProvider },
    )

    expect(getByTestId('child-element-1')).toHaveTextContent('42')
    expect(getByTestId('child-element-2')).toHaveTextContent('4242')
  })

  it('should render login cta modal using hook.', () => {
    const { getByRole, getByTestId } = render(
      <LoginCTAModalProvider>
        <div data-testid="child-element-1">42</div>
        <OpenLoginModal />
      </LoginCTAModalProvider>,
      {
        wrapper: HistoryProvider,
      },
    )

    fireEvent.click(getByTestId('modal-open-button'))

    expect(getByRole('dialog')).toHaveTextContent('로그인이 필요합니다.')
  })

  it('should render single dialog with multiple providers.', () => {
    const { getAllByRole, getByTestId } = render(
      <LoginCTAModalProvider>
        <div data-testid="child-element-1">42</div>

        <LoginCTAModalProvider>
          <div data-testid="child-element-2">4242</div>
          <OpenLoginModal />
        </LoginCTAModalProvider>
      </LoginCTAModalProvider>,
      {
        wrapper: HistoryProvider,
      },
    )

    fireEvent.click(getByTestId('modal-open-button'))

    expect(getAllByRole('dialog')).toHaveLength(1)
  })
})
