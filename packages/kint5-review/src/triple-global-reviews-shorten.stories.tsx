import type { Meta, StoryObj } from '@storybook/react'
import { TransitionModal } from '@titicaca/modals'
import {
  SessionContextProvider,
  UserAgentProvider,
  generateUserAgentValues,
} from '@titicaca/react-contexts'
import { QueryClient, QueryClientProvider } from 'react-query'

import { authHandlers, handlers } from './mocks/reviews'
import { FilterProvider } from './components/filter-context'
import { SortingOptionsProvider } from './components/sorting-context'
import { ReviewLanguageProvider } from './components/language-context'

import { TripleGlobalReviewsShorten } from '.'

const queryClient = new QueryClient()

const meta: Meta<typeof TripleGlobalReviewsShorten> = {
  title: 'kint5-review / TripleGlobalReviewsShorten',
  component: TripleGlobalReviewsShorten,
  decorators: [
    (Story) => (
      <>
        <Story />
        <TransitionModal deepLink="/" />
      </>
    ),
    (Story) => (
      <UserAgentProvider value={generateUserAgentValues(navigator.userAgent)}>
        <Story />
      </UserAgentProvider>
    ),
    (Story) => (
      <SessionContextProvider
        type="browser"
        props={{
          initialUser: { uid: 'random-uid' },
          initialSessionAvailability: true,
        }}
      >
        <Story />
      </SessionContextProvider>
    ),
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
    (Story) => (
      <FilterProvider>
        <SortingOptionsProvider resourceId="">
          <ReviewLanguageProvider reviewLang="ja" userLang="ja">
            <Story />
          </ReviewLanguageProvider>
        </SortingOptionsProvider>
      </FilterProvider>
    ),
  ],
}

export default meta

export const Basic: StoryObj<typeof TripleGlobalReviewsShorten> = {
  name: '일반',
  args: {
    initialReviewsCount: 120,
    resourceId: 'f939b4cb-ea3b-34b6-b430-eb5d28fbf467',
    resourceType: 'tna',
    placeholderText: '이 투어·티켓 어떠셨나요?',
  },
  parameters: {
    msw: {
      handlers,
    },
  },
}

export const HasMyReview: StoryObj<typeof TripleGlobalReviewsShorten> = {
  name: '내 리뷰 작성됨',
  args: {
    ...Basic.args,
  },
  parameters: {
    msw: {
      handlers: {
        ...handlers,
        ...authHandlers,
      },
    },
  },
}
