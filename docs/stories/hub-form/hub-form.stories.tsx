import React from 'react'
import { text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { HubForm, Cell, Cta } from '@titicaca/hub-form'

export default {
  title: 'hub-form | HubForm',
}

export function HotelHubForm() {
  return (
    <>
      <HubForm>
        <Cell
          type="DESTINATION"
          placeholder={text('목적지 Placeholder', '도시, 또는 호텔')}
          value={text('목적지', '')}
        />
        <Cell
          type="SCHEDULE"
          placeholder={text('일정 Placeholder', '날짜')}
          value={text('일정', '')}
        />
        <Cell
          type="PEOPLE"
          placeholder={text('투숙인원 Placeholder', '')}
          value={text('투숙인원', '인원 2명')}
        />
      </HubForm>
      <Cta
        available={boolean('available', false)}
        onSubmit={action('onSubmit')}
      >
        호텔 검색
      </Cta>
    </>
  )
}

export function AirHubForm() {
  return (
    <>
      <HubForm>
        <Cell
          type="ORIGIN"
          placeholder={text('출발지 Placeholder', '출발 도시')}
          value={text('출발지', '')}
        />
        <Cell
          type="DESTINATION"
          placeholder={text('목적지 Placeholder', '도착 도시')}
          value={text('목적지', '')}
        />
        <Cell
          type="SCHEDULE"
          placeholder={text('일정 Placeholder', '날짜')}
          value={text('일정', '')}
        />
        <Cell
          type="PEOPLE"
          placeholder={text('탑승객 Placeholder', '')}
          value={text('탑승객', '탑승객 1명, 일반석 외 1')}
        />
      </HubForm>
      <Cta
        available={boolean('available', false)}
        onSubmit={action('onSubmit')}
      >
        항공권 검색
      </Cta>
    </>
  )
}
