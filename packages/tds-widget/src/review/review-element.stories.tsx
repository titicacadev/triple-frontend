import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ReviewElement } from './components/review-element'
import duoImagesData from './mocks/review-element.duo-images.json'
import duoVideosData from './mocks/review-element.duo-videos.json'
import monoImageData from './mocks/review-element.mono-image.json'
import monoVideoData from './mocks/review-element.mono-video.json'
import moreImagesData from './mocks/review-element.more-images.json'
import moreVideosData from './mocks/review-element.more-vidoes.json'
import pentaImagesData from './mocks/review-element.penta-images.json'
import quadImagesData from './mocks/review-element.quad-images.json'
import triImagesData from './mocks/review-element.tri-images.json'
import triVideosData from './mocks/review-element.tri-videos.json'

const queryClient = new QueryClient()

const meta: Meta<typeof ReviewElement> = {
  title: 'Review / Review Element',
  component: ReviewElement,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
}

export default meta

export const MonoImage: StoryObj<typeof ReviewElement> = {
  args: {
    review: monoImageData,
    isMyReview: false,
    isFullList: false,
  },
}

export const DuoImages: StoryObj<typeof ReviewElement> = {
  args: {
    review: duoImagesData,
    isMyReview: false,
    isFullList: false,
  },
}

export const TriImages: StoryObj<typeof ReviewElement> = {
  args: {
    review: triImagesData,
    isMyReview: false,
    isFullList: false,
  },
}

export const QuadImages: StoryObj<typeof ReviewElement> = {
  args: {
    review: quadImagesData,
    isMyReview: false,
    isFullList: false,
  },
}

export const PentaImages: StoryObj<typeof ReviewElement> = {
  args: {
    review: pentaImagesData,
    isMyReview: false,
    isFullList: false,
  },
}

export const MoreImages: StoryObj<typeof ReviewElement> = {
  args: {
    review: moreImagesData,
    isMyReview: false,
    isFullList: false,
  },
}

export const MonoVideo: StoryObj<typeof ReviewElement> = {
  args: {
    review: monoVideoData,
    isMyReview: false,
    isFullList: false,
  },
}

export const DuoVideos: StoryObj<typeof ReviewElement> = {
  args: {
    review: duoVideosData,
    isMyReview: false,
    isFullList: false,
  },
}

export const TriVideos: StoryObj<typeof ReviewElement> = {
  args: {
    review: triVideosData,
    isMyReview: false,
    isFullList: false,
  },
}

export const MoreVideos: StoryObj<typeof ReviewElement> = {
  args: {
    review: moreVideosData,
    isMyReview: false,
    isFullList: false,
  },
}
