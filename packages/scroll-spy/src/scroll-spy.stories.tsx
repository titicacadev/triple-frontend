import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import POIS from './mocks/pois.sample.json'
import { ScrollSpyContainer, ScrollSpyEntity } from './scroll-spy'

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
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
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
  title: 'scroll-spy / Scroll Spy',
  component: ScrollSpy,
} as Meta

export const BaseScrollSpy: StoryObj<typeof ScrollSpy> = {
  name: '기본 스크롤 스파이',
}
