import { ComponentStoryObj, Meta } from '@storybook/react'
import { TransitionModal } from '@titicaca/modals'
import {
  UserAgentProvider,
  generateUserAgentValues,
} from '@titicaca/react-contexts'
import { QueryClient, QueryClientProvider } from 'react-query'

import { authHandlers, handlers } from './mocks/reviews'

import { Reviews } from '.'

const queryClient = new QueryClient()

export default {
  title: 'Review / Reviews',
  component: Reviews,
  decorators: [
    (Story) => (
      <>
        <Story />
        <TransitionModal deepLink="/" />
      </>
    ),
    (Story) => (
      <UserAgentProvider
        value={generateUserAgentValues(
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        )}
      >
        <Story />
      </UserAgentProvider>
    ),
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta

export const Basic: ComponentStoryObj<typeof Reviews> = {
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

export const HasMyReview: ComponentStoryObj<typeof Reviews> = {
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
