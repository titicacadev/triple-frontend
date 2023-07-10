import type { Meta } from '@storybook/react'

import SAMPLE from './mocks/triple-header.sample.json'
import TripleHeader from './triple-header'
import { TripleHeader as TripleHeaderProps } from './types'

export default {
  title: 'triple-header / TripleHeader',
} as Meta<typeof TripleHeader>

export function Sample() {
  return <TripleHeader>{SAMPLE as TripleHeaderProps}</TripleHeader>
}
