import { TransitionModal } from '@titicaca/modals'
import { Reviews, ReviewLikesProvider, QueryProvider } from '@titicaca/review'
import {
  UserAgentProvider,
  generateUserAgentValues,
} from '@titicaca/react-contexts'
import { ComponentStoryObj, Meta } from '@storybook/react'

import {
  historyProviderDecorator,
  sessionContextProviderDecorator,
  tripleClientMetadataDecorator,
} from '../../decorators'

export default {
  title: 'Reviews / Reviews',
  component: Reviews,
  decorators: [
    (Story) => (
      <>
        <Story />
        <TransitionModal deepLink="/" />
      </>
    ),
    (Story) => (
      <ReviewLikesProvider
        subscribeLikedChangeEvent={() => {}}
        notifyReviewLiked={() => {}}
        notifyReviewUnliked={() => {}}
      >
        <Story />
      </ReviewLikesProvider>
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
      <QueryProvider>
        <Story />
      </QueryProvider>
    ),
    historyProviderDecorator,
    sessionContextProviderDecorator,
    tripleClientMetadataDecorator,
  ],
} as Meta

export const Basic: ComponentStoryObj<typeof Reviews> = {
  storyName: '일반',
  args: {
    shortened: false,
    reviewsCount: 120,
    resourceId: 'f939b4cb-ea3b-34b6-b430-eb5d28fbf467',
    resourceType: 'tna',
    placeholderText: '이 투어·티켓 어떠셨나요?',
    appNativeActions: {
      notifyReviewDeleted: () => {},
      showToast: () => {},
    },
  },
}
