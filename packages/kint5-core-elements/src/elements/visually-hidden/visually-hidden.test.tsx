import { render, screen } from '@testing-library/react'

import { VisuallyHidden } from './visually-hidden'

test('스크린 리더가 읽을 수 있습니다.', () => {
  render(<VisuallyHidden>Visually Hidden</VisuallyHidden>)

  expect(screen.getByText('Visually Hidden')).toBeInTheDocument()
})
