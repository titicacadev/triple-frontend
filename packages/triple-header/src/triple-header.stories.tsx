import { ComponentMeta } from '@storybook/react'

import TripleHeader from './triple-header'
import SAMPLE from './mocks/triple-header.sample.json'

export default {
  title: 'triple-header / TripleHeader',
} as ComponentMeta<typeof TripleHeader>

export function Sample() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TripleHeader>{SAMPLE as any}</TripleHeader>
}
