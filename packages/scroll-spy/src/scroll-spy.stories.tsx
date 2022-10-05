import { useState } from 'react'
import { ComponentStoryObj, Meta } from '@storybook/react'

import POIS from './mocks/pois.sample.json'

import { ScrollSpyContainer, ScrollSpyEntity } from '.'

function ScrollSpy() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <ScrollSpyContainer
      activeId={activeId}
      scrollOffset={30}
      onChange={setActiveId}
    >
      {POIS.map((poi) => {
        const {
          source: { id },
        } = poi

        return (
          <ScrollSpyEntity key={id} id={id}>
            <div onClick={() => setActiveId(id)}>
              {/* <PoiListElement as="div" poi={poi as unknown as ListingPoi} /> */}
            </div>
          </ScrollSpyEntity>
        )
      })}
    </ScrollSpyContainer>
  )
}

export default {
  title: 'Scroll Spy',
  component: ScrollSpy,
} as Meta

export const BaseScrollSpy: ComponentStoryObj<typeof ScrollSpy> = {
  name: '기본 스크롤 스파이',
}
