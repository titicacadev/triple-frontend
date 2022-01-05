import React, { useState } from 'react'
import { ComponentStoryObj, Meta } from '@storybook/react'
import { ScrollSpyContainer, ScrollSpyEntity } from '@titicaca/scroll-spy'
import { PoiListElement } from '@titicaca/poi-list-elements'
import { ListingPOI } from '@titicaca/type-definitions'

import POIS from '../__mocks__/pois.sample.json'

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
              <PoiListElement as="div" poi={poi as unknown as ListingPOI} />
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
  storyName: '기본 스크롤 스파이',
}
