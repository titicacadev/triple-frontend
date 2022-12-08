import { ComponentMeta, ComponentStory } from '@storybook/react'

import Cell from './cell'
import Cta from './cta'
import HubForm from './hub-form'

export default {
  title: 'hub-form / HubForm',
  component: HubForm,
} as ComponentMeta<typeof HubForm>

export const Hotel: ComponentStory<typeof HubForm> = () => {
  return (
    <>
      <HubForm>
        <Cell type="DESTINATION" placeholder="도시, 또는 호텔" value="" />
        <Cell type="SCHEDULE" placeholder="날짜" value="" />
        <Cell type="PEOPLE" placeholder="" value="인원 2명" />
      </HubForm>
      <Cta available={false} onSubmit={() => {}}>
        호텔 검색
      </Cta>
    </>
  )
}

export const Air: ComponentStory<typeof HubForm> = () => {
  return (
    <>
      <HubForm>
        <Cell type="ORIGIN" placeholder="출발 도시" value="" />
        <Cell type="DESTINATION" placeholder="도착 도시" value="" />
        <Cell type="SCHEDULE" placeholder="날짜" value="" />
        <Cell type="PEOPLE" placeholder="" value="탑승객 1명, 일반석 외 1" />
      </HubForm>
      <Cta available={false} onSubmit={() => {}}>
        항공권 검색
      </Cta>
    </>
  )
}
