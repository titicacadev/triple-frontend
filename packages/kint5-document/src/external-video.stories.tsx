import type { Meta } from '@storybook/react'

import ELEMENTS from './elements'

const { video: Youtube } = ELEMENTS

export default { title: 'kint5-document / 유튜브' } as Meta

export function YoutubeExample() {
  return <Youtube value={{ provider: 'youtube', identifier: 'hYIe4VrfHoA' }} />
}
YoutubeExample.storyName = '기본'
