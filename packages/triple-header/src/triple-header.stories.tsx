import type { Meta } from '@storybook/react'

import FRAMER_TYPE_SAMPLE from './mocks/framer-type.sample.json'
import LOTTIE_TYPE_SAMPLE from './mocks/lottie-type.sample.json'
import TripleHeader from './triple-header'
import { TripleHeader as TripleHeaderProps } from './types'

export default {
  title: 'triple-header / TripleHeader',
  component: TripleHeader,
} as Meta<typeof TripleHeader>

export function FramerType() {
  return <TripleHeader>{FRAMER_TYPE_SAMPLE as TripleHeaderProps}</TripleHeader>
}

export function LottieType() {
  return <TripleHeader>{LOTTIE_TYPE_SAMPLE as TripleHeaderProps}</TripleHeader>
}
