import type { Meta } from '@storybook/react'

import IMATE_TYPE_SAMPLE from './mocks/image-type.sample.json'
import JSON_TYPE_SAMPLE from './mocks/json-type.sample.json'
import TripleHeader from './triple-header'
import { TripleHeader as TripleHeaderProps } from './types'

export default {
  title: 'triple-header / TripleHeader',
} as Meta<typeof TripleHeader>

export function ImageType() {
  return <TripleHeader>{IMATE_TYPE_SAMPLE as TripleHeaderProps}</TripleHeader>
}

export function JsonType() {
  return <TripleHeader>{JSON_TYPE_SAMPLE as TripleHeaderProps}</TripleHeader>
}
