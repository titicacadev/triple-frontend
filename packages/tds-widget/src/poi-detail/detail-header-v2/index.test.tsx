import { FC, MouseEventHandler, PropsWithChildren, ReactNode } from 'react'
import '@titicaca/tds-ui'
import { render, screen } from '@testing-library/react'
import {
  useTrackEvent,
  useHashRouter,
  TestWrapper,
  ClientAppName,
} from '@titicaca/triple-web'

jest.mock('@titicaca/triple-web')
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

/* eslint-disable-next-line */
import DetailHeaderV2 from '.'

describe('when user is on app', () => {
  it('attaches long-click handler to the outermost section', () => {
    const mockTrackEvent = jest.fn()
    const mockPush = jest.fn()

    ;(
      useTrackEvent as unknown as jest.MockedFunction<
        () => ReturnType<typeof useTrackEvent>
      >
    ).mockImplementation(() => mockTrackEvent)
    ;(
      useHashRouter as unknown as jest.MockedFunction<
        () => Pick<
          ReturnType<typeof useHashRouter>,
          'addUriHash' | 'removeUriHash'
        >
      >
    ).mockImplementation(() => ({
      addUriHash: mockPush,
      removeUriHash: jest.fn(),
    }))

    render(
      <DetailHeaderV2
        names={{ ko: 'test', en: 'test', local: 'test' }}
        areaName="테스트 지역"
        scrapsCount={1}
        reviewsCount={0}
        reviewsRating={0}
        onReviewsRatingClick={jest.fn()}
        onCopy={jest.fn()}
      />,
      {
        wrapper: TestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.Android, version: '1.0.0' },
          },
        }),
      },
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(mockPush).toHaveBeenCalled()
  })
})

describe('when user is on web', () => {
  it('attaches long-click handler to the outermost section', () => {
    const mockTrackEvent = jest.fn()
    const mockPush = jest.fn()

    ;(
      useTrackEvent as unknown as jest.MockedFunction<
        () => ReturnType<typeof useTrackEvent>
      >
    ).mockImplementation(() => mockTrackEvent)
    ;(
      useHashRouter as unknown as jest.MockedFunction<
        () => Pick<
          ReturnType<typeof useHashRouter>,
          'addUriHash' | 'removeUriHash'
        >
      >
    ).mockImplementation(() => ({
      addUriHash: mockPush,
      removeUriHash: jest.fn(),
    }))

    render(
      <DetailHeaderV2
        names={{ ko: 'test', en: 'test', local: 'test' }}
        areaName="테스트 지역"
        scrapsCount={1}
        reviewsCount={0}
        reviewsRating={0}
        onReviewsRatingClick={jest.fn()}
        onCopy={jest.fn()}
      />,
      {
        wrapper: TestWrapper({
          clientAppProvider: null,
        }),
      },
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(mockPush).not.toHaveBeenCalled()
  })
})
