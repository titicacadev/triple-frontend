import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { ReviewElement, ReviewLikesProvider } from '@titicaca/review'
import { ComponentProps } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
  deviceProviderDecorator,
  eventTrackingProviderDecorator,
  historyProviderDecorator,
  sessionContextProviderDecorator,
  tripleClientMetadataDecorator,
} from '../../decorators'
import monoImageData from '../__mocks__/review/review-element.mono-image.json'
import duoImagesData from '../__mocks__/review/review-element.duo-images.json'
import triImagesData from '../__mocks__/review/review-element.tri-images.json'
import quadImagesData from '../__mocks__/review/review-element.quad-images.json'
import pentaImagesData from '../__mocks__/review/review-element.penta-images.json'
import moreImagesData from '../__mocks__/review/review-element.more-images.json'
import monoVideoData from '../__mocks__/review/review-element.mono-video.json'
import duoVideosData from '../__mocks__/review/review-element.duo-videos.json'
import triVideosData from '../__mocks__/review/review-element.tri-videos.json'
import moreVideosData from '../__mocks__/review/review-element.more-vidoes.json'

const queryClient = new QueryClient()

export default {
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
    historyProviderDecorator,
    sessionContextProviderDecorator,
    tripleClientMetadataDecorator,
    deviceProviderDecorator,
    eventTrackingProviderDecorator,
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
