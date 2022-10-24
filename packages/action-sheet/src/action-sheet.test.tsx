import { render, screen } from '@testing-library/react'

import { ActionSheet } from './action-sheet'

import '@testing-library/jest-dom'

describe('ActionSheet', () => {
  it('should render with no error.', () => {
    render(<ActionSheet title="액션시트 제목" />)

    expect(screen.getByRole('dialog')).toHaveTextContent('액션시트 제목')
  })
})
