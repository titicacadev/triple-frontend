import React from 'react'
import TripleHeader from '@titicaca/triple-header'
import { TripleHeader as TripleHeaderType } from '@titicaca/triple-header/src/types'

export default function Motion({ value }: { value: TripleHeaderType }) {
  return <TripleHeader>{value}</TripleHeader>
}
