import styled from 'styled-components'
import { Meta } from '@storybook/react'

import { Navbar } from '../navbar'

import { Tooltip } from './tooltip'

export default {
  title: 'core-elements / Tooltip',
  component: Tooltip,
} as Meta

const Base = styled.div`
  position: relative;
  margin: 50px;
  border: solid 1px black;
  padding: 10px;
`

export const Basic = () => {
  return (
    <Base>
      툴팁 표시 대상
      <Tooltip
        label="모든 호텔 보기"
        pointing={{
          vertical: 'bottom',
          horizontal: 'left',
          horizontalOffset: 26,
        }}
        backgroundColor="rgba(13, 208, 175, 1)"
        nowrap={false}
      />
    </Base>
  )
}
Basic.storyName = '기본'
Basic.args = {}

export const Price = () => {
  return (
    <Base>
      툴팁 표시 대상
      <Tooltip
        borderRadius="30"
        positioning={{ top: -12 }}
        label="쿠폰사용시 -15,000원 더 할인!"
        onClick={() => {}}
      />
    </Base>
  )
}
Price.storyName = '가격'

export const HotelListIcon = () => {
  return (
    <Navbar>
      <Navbar.Item floated="right" icon="list" position="relative">
        <Tooltip
          label={`${'호찌민'} 모든 호텔 보기`}
          borderRadius="12"
          positioning={{
            bottom: -25,
            right: -14,
          }}
          pointing={{
            vertical: 'top',
            horizontal: 'right',
            horizontalOffset: 24,
          }}
          hasShadow
          backgroundColor="#368fff"
          nowrap
        />
      </Navbar.Item>
    </Navbar>
  )
}
HotelListIcon.storyName = '호텔 목록 아이콘'
