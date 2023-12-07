import { FC, MouseEventHandler, PropsWithChildren, ReactNode } from 'react'
import '@titicaca/tds-ui'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { render, screen } from '@testing-library/react'
import { useTrackEvent, useHashRouter } from '@titicaca/triple-web'

jest.mock('@titicaca/react-triple-client-interfaces')
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

/* eslint-disable-next-line import/first */
import DetailHeader from '.'

describe('when user is on app', () => {
  beforeEach(() => {
    ;(
      useTripleClientMetadata as unknown as jest.MockedFunction<
        typeof useTripleClientMetadata
      >
    ).mockImplementation(() => ({
      appName: 'Triple-iOS',
      appVersion: '5.13.0',
    }))
  })

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
      <DetailHeader
        names={{ ko: 'test', en: 'test', local: 'test' }}
        areaName="테스트 지역"
        scrapsCount={1}
        reviewsCount={0}
        reviewsRating={0}
        onReviewsRatingClick={jest.fn()}
        onCopy={jest.fn()}
      />,
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(mockPush).toHaveBeenCalled()
  })
})

describe('when user is on web', () => {
  beforeEach(() => {
    ;(
      useTripleClientMetadata as unknown as jest.MockedFunction<
        typeof useTripleClientMetadata
      >
    ).mockImplementation(() => null)
  })

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
      <DetailHeader
        names={{ ko: 'test', en: 'test', local: 'test' }}
        areaName="테스트 지역"
        scrapsCount={1}
        reviewsCount={0}
        reviewsRating={0}
        onReviewsRatingClick={jest.fn()}
        onCopy={jest.fn()}
      />,
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(mockPush).not.toHaveBeenCalled()
  })
})
