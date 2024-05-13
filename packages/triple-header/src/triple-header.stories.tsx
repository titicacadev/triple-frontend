import type { Meta } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import FRAMER_TYPE_SAMPLE from './mocks/framer-type.sample.json'
// import LOTTIE_TYPE_SAMPLE from './mocks/lottie-type.sample.json'
import { TripleHeader } from './triple-header'
import { TripleHeaderProps } from './types'

export default {
  title: 'triple-header / TripleHeader',
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
  component: TripleHeader,
} as Meta<typeof TripleHeader>

export function FramerType() {
  return <TripleHeader>{FRAMER_TYPE_SAMPLE as TripleHeaderProps}</TripleHeader>
}

// TODO: Lottie 에러 해결후 주석 해제 필요
// export function LottieType() {
//   return <TripleHeader>{LOTTIE_TYPE_SAMPLE as TripleHeaderProps}</TripleHeader>
// }
