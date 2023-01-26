import { screen } from '@testing-library/react'
import { portalRender } from '@titicaca/frontend-integration-test/src/utils/portalRender'

import { ActionSheet } from './action-sheet'

import '@testing-library/jest-dom'

describe('ActionSheet', () => {
  it('should render with no error.', () => {
    portalRender(<ActionSheet open title="액션시트 제목" />)

    expect(screen.getByRole('dialog')).toHaveTextContent('액션시트 제목')
  })
})
