import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, text, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Tooltip, Navbar } from '@titicaca/core-elements'
import styled from 'styled-components'

const Base = styled.div`
  position: relative;
  display: inline-block;
  margin: 50px;
  border: solid 1px black;
  padding: 10px;
`

storiesOf('Tooltip', module)
  .add('기본', () => (
    <Base>
      툴팁 표시 대상
      <Tooltip
        label={text('내용', '모든 호텔 보기')}
        borderRadius={text('border radius')}
        floating={boolean('floating')}
        onClick={boolean('클릭 가능') ? action('툴팁 클릭') : undefined}
        positioning={
          boolean('위치 절대값 사용')
            ? {
                top: number('top'),
                right: number('right'),
                bottom: number('bottom'),
                left: number('left'),
              }
            : undefined
        }
        pointing={{
          vertical: select('포인팅 상하 위치', ['top', 'bottom'], 'bottom'),
          horizontal: select('포인팅 좌우 위치', ['left', 'right'], 'left'),
          horizontalOffset: number('포인팅 가로 오프셋', 26),
        }}
        backgroundColor={select(
          '툴팁 색',
          ['rgba(13, 208, 175, 1)', '#368fff'],
          'rgba(13, 208, 175, 1)',
        )}
        nowrap={boolean('텍스트 줄바꿈 없음', false)}
      />
    </Base>
  ))
  .add('가격', () => (
    <Base style={{ width: '300px' }}>
      툴팁 표시 대상
      <Tooltip
        borderRadius="30"
        positioning={{ top: -12 }}
        label={text('툴팁 라벨', '쿠폰사용시 -15,000원 더 할인!')}
        onClick={action('툴팁 클릭')}
      />
    </Base>
  ))
  .add('호텔 목록 아이콘', () => (
    <div style={{ width: '500px', height: '700px', border: 'solid 1px black' }}>
      <Navbar>
        <Navbar.Item floated="right" icon="list" position="relative">
          <Tooltip
            label={`${text('리전 이름', '호찌민')} 모든 호텔 보기`}
            borderRadius={12}
            positioning={{
              bottom: -25,
              right: -14,
            }}
            pointing={{
              vertical: 'top',
              horizontal: 'right',
              horizontalOffset: 24,
            }}
            floating={true}
            backgroundColor="#368fff"
            nowrap={true}
          />
        </Navbar.Item>
      </Navbar>
    </div>
  ))
