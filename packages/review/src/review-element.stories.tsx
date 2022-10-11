import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import monoImageData from './mocks/review-element.mono-image.json'
import duoImagesData from './mocks/review-element.duo-images.json'
import triImagesData from './mocks/review-element.tri-images.json'
import quadImagesData from './mocks/review-element.quad-images.json'
import pentaImagesData from './mocks/review-element.penta-images.json'
import moreImagesData from './mocks/review-element.more-images.json'
import monoVideoData from './mocks/review-element.mono-video.json'
import duoVideosData from './mocks/review-element.duo-videos.json'
import triVideosData from './mocks/review-element.tri-videos.json'
import moreVideosData from './mocks/review-element.more-vidoes.json'
import ReviewElement from './components/review-element'
import { ReviewLikesProvider } from './components/review-likes-context'

const queryClient = new QueryClient()

export default {
  title: 'Review / Review Element',
  component: ReviewElement,
  decorators: [
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
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof ReviewElement>

type ReviewData = ComponentProps<typeof ReviewElement>['review']

export const MonoImage: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: monoImageData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const DuoImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: duoImagesData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const TriImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: triImagesData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const QuadImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: quadImagesData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const PentaImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: pentaImagesData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const MoreImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: moreImagesData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const MonoVideo: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: monoVideoData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const DuoVideos: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: duoVideosData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const TriVideos: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: triVideosData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const MoreVideos: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: moreVideosData as ReviewData,
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}
