import React, { useState } from 'react'
import { ComponentStoryObj, Meta } from '@storybook/react'
import { Container } from '@titicaca/core-elements'
import { ScrollSpyContainer, ScrollSpyEntity } from '@titicaca/scroll-spy'

const ENTITIES = Array.from(
  {
    length: 10,
  },
  (ele, i) => ({ id: `${i + 1}` }),
)

function ScrollSpy() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <ScrollSpyContainer
      activeId={activeId}
      scrollOffset={30}
      onChange={setActiveId}
    >
      {ENTITIES.map(({ id }) => (
        <ScrollSpyEntity key={id} id={id}>
          <Container width={300} height={150} onClick={() => setActiveId(id)}>
            {`[${id}] 해당 Entity의 위치로 scrolling`}
          </Container>
        </ScrollSpyEntity>
      ))}
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
