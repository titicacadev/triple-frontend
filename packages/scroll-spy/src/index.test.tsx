import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import 'jest-canvas-mock'

import { ScrollSpyContainer, ScrollSpyEntity } from './index'

test('container와 entity를 렌더링 합니다..', () => {
  const { getByTestId } = render(
    <ScrollSpyContainer activeId="" onChange={jest.fn()}>
      <div data-testid="container-element">
        container
        <ScrollSpyEntity id="">
          <div data-testid="entity-element">entity</div>
        </ScrollSpyEntity>
      </div>
    </ScrollSpyContainer>,
  )

  expect(getByTestId('container-element')).toHaveTextContent('container')
  expect(getByTestId('entity-element')).toHaveTextContent('entity')
})
