import React from 'react'
import { render } from '@testing-library/react'

import ResourceListElementStats from './stats'

describe('ResourceListElementStats', () => {
  it('should render stats.', () => {
    const { container } = render(
      <ResourceListElementStats>
        <span>저장 61</span>
      </ResourceListElementStats>,
    )

    expect(container).toHaveTextContent('저장 61')
  })

  it('should render middle dot between stats.', () => {
    const { container } = render(
      <ResourceListElementStats>
        <span>(2)</span>
        <span>저장 61</span>
      </ResourceListElementStats>,
    )

    expect(container).toHaveTextContent('(2) · 저장 61')
  })
})
