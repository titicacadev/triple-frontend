import { FC, MouseEventHandler, PropsWithChildren, ReactNode } from 'react'
import '@titicaca/core-elements'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { render, screen } from '@testing-library/react'
import {
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'

jest.mock('@titicaca/react-triple-client-interfaces')
jest.mock('@titicaca/react-contexts')
jest.mock('@titicaca/core-elements', () => ({
  ...jest.requireActual('@titicaca/core-elements'),
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
      useEventTrackingContext as unknown as jest.MockedFunction<
        () => Pick<ReturnType<typeof useEventTrackingContext>, 'trackEvent'>
      >
    ).mockImplementation(() => ({
      trackEvent: mockTrackEvent,
    }))
    ;(
      useHistoryFunctions as unknown as jest.MockedFunction<
        () => Pick<ReturnType<typeof useHistoryFunctions>, 'push' | 'back'>
      >
    ).mockImplementation(() => ({
      push: mockPush,
      back: jest.fn(),
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
      useEventTrackingContext as unknown as jest.MockedFunction<
        () => Pick<ReturnType<typeof useEventTrackingContext>, 'trackEvent'>
      >
    ).mockImplementation(() => ({
      trackEvent: mockTrackEvent,
    }))
    ;(
      useHistoryFunctions as unknown as jest.MockedFunction<
        () => Pick<ReturnType<typeof useHistoryFunctions>, 'push' | 'back'>
      >
    ).mockImplementation(() => ({
      push: mockPush,
      back: jest.fn(),
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
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(mockPush).not.toHaveBeenCalled()
  })
})
