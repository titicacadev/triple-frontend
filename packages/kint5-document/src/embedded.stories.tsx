import type { Meta } from '@storybook/react'

import ELEMENTS from './elements'
import MOCK_EMBEDDED_DATA from './mocks/embedded.sample.json'

const { embedded: Embedded } = ELEMENTS

export default { title: 'kint5-document / embedded' } as Meta

export function EmbeddedExample() {
  return <Embedded value={{ entries: MOCK_EMBEDDED_DATA }} />
}
EmbeddedExample.storyName = '기본'
