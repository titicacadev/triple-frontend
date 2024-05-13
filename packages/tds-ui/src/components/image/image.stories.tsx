import { Meta, StoryObj } from '@storybook/react'

import { Image } from './image'

const meta = {
  title: 'tds-ui (Media) / Image',
  component: Image,
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof Image>

export const FixedRatioFrame: Story = {
  render: () => (
    <Image>
      <Image.FixedRatioFrame frame="mini">
        <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
      </Image.FixedRatioFrame>
    </Image>
  ),
}

export const FixedDimensionsFrame: Story = {
  render: () => (
    <Image>
      <Image.FixedDimensionsFrame size="medium" width={320} height={180}>
        <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
      </Image.FixedDimensionsFrame>
    </Image>
  ),
}

export const Overlay: Story = {
  render: () => (
    <Image>
      <Image.FixedRatioFrame frame="mini">
        <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
        <Image.Overlay overlayType="dark" padding={{ top: 20, bottom: 20 }}>
          <div style={{ fontSize: 14, color: 'white' }}>오버레이입니다.</div>
        </Image.Overlay>
      </Image.FixedRatioFrame>
    </Image>
  ),
}

export const LinkIndicator: Story = {
  render: () => (
    <Image>
      <Image.FixedRatioFrame frame="mini">
        <Image.Img src="https://triple-corp.com/static/images/img-bg-0.jpg" />
        <Image.LinkIndicator />
      </Image.FixedRatioFrame>
    </Image>
  ),
}

export const Placeholder: Story = {
  render: () => (
    <Image>
      <Image.FixedRatioFrame frame="mini">
        <Image.Placeholder src="https://assets.triple.guide/images/ico-blank-hotel@2x.png" />
      </Image.FixedRatioFrame>
    </Image>
  ),
}

export const Circular: Story = {
  render: () => (
    <Image.Circular
      src="https://triple-corp.com/static/images/img-bg-0.jpg"
      size="medium"
    />
  ),
}
