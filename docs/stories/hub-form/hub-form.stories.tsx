import { HubForm, Cell, Cta } from '@titicaca/hub-form'
import { Meta } from '@storybook/react'

export default {
  title: 'hub-form / HubForm',
  component: HubForm,
} as Meta

export function HotelHubForm() {
  return (
    <>
      <HubForm shadow="">
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

export function AirHubForm() {
  return (
    <>
      <HubForm shadow="">
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
