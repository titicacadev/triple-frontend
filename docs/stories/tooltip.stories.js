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
        absolute={
          boolean('위치 절대값 사용')
            ? {
                top: number('top'),
                right: number('right'),
                bottom: number('bottom'),
                left: number('left'),
              }
            : undefined
        }
        pointingPosition={select('포인팅 위치', ['above', 'below'], 'below')}
      />
    </Base>
  ))
  .add('아이콘', () => (
    <Navbar>
      <div style={{ height: '100%', position: 'relative' }}>
        <Navbar.Item icon="list" />

        <Tooltip
          label="모든 호텔 보기"
          borderRadius={12}
          absolute={{
            bottom: -25,
            left: -14,
          }}
          pointingPosition="above"
          floating={true}
        />
      </div>
    </Navbar>
  ))
