import { FC, MouseEventHandler, PropsWithChildren, ReactNode } from 'react'
import '@titicaca/tds-ui'
import { render, screen } from '@testing-library/react'
import { ClientAppName } from '@titicaca/triple-web'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'

import { PoiDetailHeader } from './index'

const addUriHashMockFn = jest.fn()
const removeUriHashMockFn = jest.fn()
const hasUriHashMockFn = jest.fn().mockReturnValue(false)

jest.mock('@titicaca/triple-web', () => ({
  ...jest.requireActual('@titicaca/triple-web'),
  useTrackEvent: jest.fn().mockImplementation(() => jest.fn()),
  useHashRouter: jest.fn().mockImplementation(() => ({
    addUriHash: addUriHashMockFn,
    removeUriHash: removeUriHashMockFn,
    hasUriHash: hasUriHashMockFn,
  })),
  useSessionAvailability: jest.fn(),
}))
jest.mock('@titicaca/tds-ui', () => ({
  ...jest.requireActual('@titicaca/tds-ui'),
  longClickable: (Component: FC<{ children?: ReactNode; onClick: unknown }>) =>
    function WrappedLongClickable({
      onLongClick,
      children,
    }: PropsWithChildren<{
      onLongClick?: unknown
    }>) {
      return (
        <Component
          onClick={onLongClick as MouseEventHandler<HTMLDivElement>}
          data-testid="mock-clickable-section"
        >
          {children}
        </Component>
      )
    },
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('when user is on app', () => {
  test('attaches long-click handler to the outermost section', () => {
    render(
      <PoiDetailHeader
        names={{ ko: 'test', en: 'test', local: 'test' }}
        areaName="테스트 지역"
        scrapsCount={1}
        reviewsCount={0}
        reviewsRating={0}
        onReviewsRatingClick={jest.fn()}
        onCopy={jest.fn()}
      />,
      {
        wrapper: createTestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: {
              name: ClientAppName.iOS,
              version: '6.5.0',
              isMacApp: false,
            },
          },
        }),
      },
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(addUriHashMockFn).toHaveBeenCalled()
  })
})

describe('when user is on web', () => {
  test('attaches long-click handler to the outermost section', () => {
    render(
      <PoiDetailHeader
        names={{ ko: 'test', en: 'test', local: 'test' }}
        areaName="테스트 지역"
        scrapsCount={1}
        reviewsCount={0}
        reviewsRating={0}
        onReviewsRatingClick={jest.fn()}
        onCopy={jest.fn()}
      />,
      {
        wrapper: createTestWrapper(),
      },
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(addUriHashMockFn).not.toHaveBeenCalled()
  })
})
