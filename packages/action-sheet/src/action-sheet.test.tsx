import { render, screen } from '@testing-library/react'

import { ActionSheet } from './action-sheet'

describe('ActionSheet', () => {
  it('should render with no error.', () => {
    render(<ActionSheet open title="액션시트 제목" />)

    expect(screen.getByRole('dialog')).toHaveTextContent('액션시트 제목')
  })
})
