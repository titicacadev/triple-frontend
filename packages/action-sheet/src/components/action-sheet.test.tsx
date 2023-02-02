import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ActionSheet from './action-sheet'

describe('ActionSheet', () => {
  it('should render with no error.', () => {
    render(<ActionSheet title="액션시트 제목" />)

    expect(screen.getByTestId('action-sheet')).toHaveTextContent(
      '액션시트 제목',
    )
  })

  it('should not propagate click event.', () => {
    const outsideClickHandler = jest.fn()

    render(
      <div onClick={outsideClickHandler}>
        <ActionSheet title="액션시트 제목">
          <button data-testid="button">테스트용 버튼</button>
        </ActionSheet>
      </div>,
    )

    fireEvent.click(screen.getByTestId('button'))
    expect(outsideClickHandler).not.toBeCalled()

    fireEvent.click(screen.getByTestId('overlay'))
    expect(outsideClickHandler).not.toBeCalled()
  })
})
