import React from 'react'
import { number, text, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { TransitionModal } from '@titicaca/modals'
import { Reviews, ReviewLikesProvider } from '@titicaca/review'
import {
  UserAgentProvider,
  generateUserAgentValues,
  HistoryProvider,
} from '@titicaca/react-contexts'
import { storiesOf } from '@storybook/react'

storiesOf('Reviews | Reviews', module).add('일반', () => (
  <ReviewLikesProvider
    subscribeLikedChangeEvent={action('subscribeLikedChangeEvent')}
    notifyReviewLiked={action('notifyReviewLiked')}
    notifyReviewUnliked={action('notifyReviewUnliked')}
  >
    <UserAgentProvider
      value={generateUserAgentValues(
        select(
          'User-Agent',
          [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/3.0.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
          ],
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        ),
      )}
    >
      <HistoryProvider>
        <TransitionModal deepLink="/" />
        <Reviews
          shortened={boolean('Shortened', false)}
          reviewsCount={number('Review count', 120)}
          appNativeActions={{
            subscribeReviewUpdateEvent: action('subscribeReviewUpdateEvent'),
            unsubscribeReviewUpdateEvent: action(
              'unsubscribeReviewUpdateEvent',
            ),
            notifyReviewDeleted: action('notifyReviewDeleted'),
            showToast: action('showToast'),
          }}
          resourceId={text(
            'Resource ID',
            'f939b4cb-ea3b-34b6-b430-eb5d28fbf467',
          )}
          resourceType={select(
            'Resource Type',
            ['poi', 'tna', 'article', 'hotel'],
            'tna',
          )}
          placeholderText={text('placeholder text', '이 투어·티켓 어떠셨나요?')}
          onFullListButtonClick={action('onFullListButtonClick')}
        />
      </HistoryProvider>
    </UserAgentProvider>
  </ReviewLikesProvider>
))
