import { ComponentMeta } from '@storybook/react'

import TripleHeader from './triple-header'
import { TripleHeader as TripleHeaderProps } from './types'
import SAMPLE from './mocks/triple-header.sample.json'

export default {
  title: 'triple-header / TripleHeader',
} as ComponentMeta<typeof TripleHeader>

export function Sample() {
  return <TripleHeader>{SAMPLE as TripleHeaderProps}</TripleHeader>
}
