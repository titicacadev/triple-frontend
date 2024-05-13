import { Meta, StoryObj } from '@storybook/react'

import { Video } from './video'

const meta = {
  title: 'tds-ui (Media) / Video',
  component: Video,
} satisfies Meta<typeof Video>

export default meta
type Story = StoryObj<typeof Video>

export const Default: Story = {
  render: () => (
    <Video
      frame="medium"
      src="https://media.triple.guide/triple-dev/video/upload/c_fill,h_256,w_256,f_auto/580e50be-d1d5-4ad8-a477-ad13f4faec9d.mp4"
      fallbackImageUrl="https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_1024,w_1024/580e50be-d1d5-4ad8-a477-ad13f4faec9d.jpeg"
      cloudinaryId="580e50be-d1d5-4ad8-a477-ad13f4faec9d"
      cloudinaryBucket="triple-dev"
    />
  ),
}
